import React, { useRef, useState, useLayoutEffect } from "react";
import type { DerivationNode } from "../../types/derivation";

const getMaxDepth = (node: DerivationNode, currentDepth = 0): number => {
  if (!node.children || node.children.length === 0) return currentDepth;
  return Math.max(...node.children.map(c => getMaxDepth(c, currentDepth + 1)));
};

interface TreeNodeProps {
  node: DerivationNode;
  depth: number;
  maxDepth: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, depth, maxDepth }) => {
  const hasChildren = node.children && node.children.length > 0;
  const isLeaf = !hasChildren;
  const containerRef = useRef<HTMLDivElement>(null);
  const [childrenCenters, setChildrenCenters] = useState<number[]>([]);
  const [idealCenter, setIdealCenter] = useState<number>(50);

  // Matemáticas para calcular el largo de la línea punteada:
  // 40px de marginTop del contenedor de hijos + 44px de altura del nodo padre = 84px por nivel
  const LEVEL_HEIGHT = 84; 
  const BASE_DASH_HEIGHT = 40;
  const levelsBelow = maxDepth - depth;

  useLayoutEffect(() => {
    if (!hasChildren || !containerRef.current) return;

    const updateLines = () => {
      if (!containerRef.current) return;
      
      const childrenContainer = containerRef.current.querySelector('.children-container') as HTMLDivElement;
      if (!childrenContainer) return;

      const childrenNodes = Array.from(childrenContainer.children).filter(child => child.tagName !== 'svg');
      const containerRect = childrenContainer.getBoundingClientRect();
      
      const centers = childrenNodes.map(child => {
        const childNode = child.querySelector('.tree-node') as HTMLDivElement;
        if (!childNode) return 50; // fallback
        
        const childRect = childNode.getBoundingClientRect();
        if (containerRect.width === 0) return 50;
        
        const relativeCenter = (childRect.left + (childRect.width / 2)) - containerRect.left;
        return (relativeCenter / containerRect.width) * 100;
      });

      setChildrenCenters(centers);
      if (centers.length > 0) {
        setIdealCenter((centers[0] + centers[centers.length - 1]) / 2);
      } else {
        setIdealCenter(50);
      }
    };

    updateLines();
    window.addEventListener('resize', updateLines);
    
    const timeout1 = setTimeout(updateLines, 10);
    const timeout2 = setTimeout(updateLines, 50);
    const timeout3 = setTimeout(updateLines, 150);

    return () => {
      window.removeEventListener('resize', updateLines);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [hasChildren]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", padding: "0 16px" }} ref={containerRef}>
      {/* Nodo Actual */}
      <div
        className="tree-node"
        style={{
          height: "44px", // Altura fija para que el cálculo matemático de las líneas punteadas sea perfecto
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          border: "2px solid",
          borderColor: node.isTerminal ? "#10b981" : "#4f46e5",
          borderRadius: "8px",
          backgroundColor: node.isTerminal ? "#ecfdf5" : "#e0e7ff",
          color: node.isTerminal ? "#065f46" : "#3730a3",
          fontWeight: "bold",
          fontSize: "1.2rem",
          minWidth: "40px",
          textAlign: "center",
          zIndex: 2,
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          position: "relative",
          left: `${idealCenter - 50}%`,
        }}
      >
        {node.symbol}
      </div>

      {/* Línea punteada y símbolo final alineado al fondo para las hojas */}
      {isLeaf && (
        <div 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            position: "relative", 
            left: `${idealCenter - 50}%` 
          }}
        >
          <div 
            style={{ 
              width: 0, 
              height: `${BASE_DASH_HEIGHT + (levelsBelow * LEVEL_HEIGHT)}px`, 
              borderLeft: "2px dashed #9ca3af",
            }} 
          />
          <div 
            style={{ 
              marginTop: "8px", 
              fontWeight: "bold", 
              fontSize: "1.5rem", 
              color: "#059669", 
              padding: "4px 12px",
              backgroundColor: "#ecfdf5",
              borderRadius: "6px",
              border: "2px solid #10b981",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              zIndex: 2,
            }}
          >
            {node.symbol}
          </div>
        </div>
      )}

      {/* Conexión a Hijos */}
      {hasChildren && (
        <div className="children-container" style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "100%", marginTop: "40px", position: "relative" }}>
          
          <svg 
            style={{ 
              position: "absolute", 
              top: "-40px", 
              left: 0, 
              width: "100%", 
              height: "40px",
              pointerEvents: "none",
              zIndex: 1,
              overflow: "visible"
            }} 
            aria-hidden="true"
          >
            <defs>
              <marker id={`arrowhead-${node.id}`} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" />
              </marker>
            </defs>
            <title>Conexiones entre nodos</title>
            {node.children!.map((child: DerivationNode, index: number) => {
              const startX = `${idealCenter}%`;
              const startY = "0";
              
              const endX = childrenCenters.length > 0 && childrenCenters[index] !== undefined
                ? `${childrenCenters[index]}%` 
                : `${(100 / (node.children!.length * 2)) + (index * (100 / node.children!.length))}%`;
              
              const endY = "100%";

              return (
                <line 
                  key={`arrow-${child.id}-${index}`}
                  x1={startX} y1={startY} 
                  x2={endX} y2={endY} 
                  stroke="#9ca3af" strokeWidth="2" 
                  markerEnd={`url(#arrowhead-${node.id})`}
                />
              );
            })}
          </svg>

          {node.children!.map((child: DerivationNode, index: number) => (
            <div key={`${child.id}-${index}`} style={{ display: "flex", justifyContent: "center" }}>
              <TreeNode node={child} depth={depth + 1} maxDepth={maxDepth} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const DerivationTree: React.FC<{ root: DerivationNode }> = ({ root }) => {
  const maxDepth = getMaxDepth(root);
  
  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        overflowY: "auto",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        border: "1px dashed #d1d5db",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          minWidth: "100%",
          justifyContent: "center",
          padding: "40px",
          paddingBottom: "80px", // Un poco más de aire abajo para que entren bien las letras finales
          boxSizing: "border-box"
        }}
      >
        <TreeNode node={root} depth={0} maxDepth={maxDepth} />
      </div>
    </div>
  );
};
