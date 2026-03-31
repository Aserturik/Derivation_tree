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
  const nodeRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Guardamos las coordenadas exactas en píxeles
  const [lineCoords, setLineCoords] = useState<{startX: number, endX: number}[]>([]);

  // Matemáticas para calcular el largo de la línea punteada:
  // 40px de marginTop del contenedor de hijos + 44px de altura del nodo padre = 84px por nivel
  const LEVEL_HEIGHT = 84; 
  const BASE_DASH_HEIGHT = 40;
  const levelsBelow = maxDepth - depth;

  useLayoutEffect(() => {
    if (!hasChildren || !containerRef.current) return;

    const updateLines = () => {
      if (!nodeRef.current || !svgRef.current || !containerRef.current) return;
      
      const childrenContainer = containerRef.current.querySelector('.children-container') as HTMLDivElement;
      if (!childrenContainer) return;

      const parentRect = nodeRef.current.getBoundingClientRect();
      const svgRect = svgRef.current.getBoundingClientRect();
      
      // Coordenadas exactas en píxeles, proyectadas dentro del sistema de coordenadas del SVG
      // Esto ignora scroll, márgenes, flexbox o lo que sea, porque usa la caja real en pantalla
      const startX = (parentRect.left + (parentRect.width / 2)) - svgRect.left;
      
      const childrenNodes = Array.from(childrenContainer.children).filter(child => child.tagName !== 'svg');
      
      const coords = childrenNodes.map(child => {
        // Buscamos el nodo .tree-node del hijo
        const childNode = child.querySelector('.tree-node') as HTMLDivElement;
        if (!childNode) return { startX, endX: startX }; // fallback
        
        const childRect = childNode.getBoundingClientRect();
        
        // Lo mismo: centro del hijo mapeado al sistema del SVG
        const endX = (childRect.left + (childRect.width / 2)) - svgRect.left;
        
        return { startX, endX };
      });

      setLineCoords(coords);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasChildren, node]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", padding: "0 16px" }} ref={containerRef}>
      {/* Nodo Actual */}
      <div
        ref={nodeRef}
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
          // ¡Eliminamos el desplazamiento (left)! El padre se queda exactamente en su centro natural
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
            // Eliminamos el desplazamiento aquí también
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
            ref={svgRef}
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
              const coords = lineCoords[index];
              
              // Usamos coordenadas exactas en píxeles (o caemos al 50% inicial de fallback visual)
              const startX = coords ? `${coords.startX}px` : "50%";
              const endX = coords ? `${coords.endX}px` : `${(100 / (node.children!.length * 2)) + (index * (100 / node.children!.length))}%`;
              
              const startY = "0";
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
            <div key={`${child.id}-${index}`} style={{ display: "flex", justifyContent: "center", width: node.children!.length === 1 ? "100%" : "auto" }}>
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
