import React, { useRef, useState, useLayoutEffect } from "react";
import type { DerivationNode } from "../../types/derivation";

interface TreeNodeProps {
  node: DerivationNode;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  const hasChildren = node.children && node.children.length > 0;
  const containerRef = useRef<HTMLDivElement>(null);
  const [childrenCenters, setChildrenCenters] = useState<number[]>([]);

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
        // Calculamos el centro relativo al contenedor de hijos
        // Tenemos que tener cuidado con el width=0 o divisiones por cero
        if (containerRect.width === 0) return 50;
        
        const relativeCenter = (childRect.left + (childRect.width / 2)) - containerRect.left;
        // Lo convertimos a porcentaje
        return (relativeCenter / containerRect.width) * 100;
      });

      setChildrenCenters(centers);
    };

    updateLines();
    window.addEventListener('resize', updateLines);
    
    // Un pequeño delay para asegurar que los componentes de abajo se hayan renderizado
    const timeoutId = setTimeout(updateLines, 50);

    return () => {
      window.removeEventListener('resize', updateLines);
      clearTimeout(timeoutId);
    };
  }, [hasChildren]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", padding: "0 16px" }} ref={containerRef}>
      {/* Nodo Actual */}
      <div
        className="tree-node"
        style={{
          padding: "8px 16px",
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
          position: "relative"
        }}
      >
        {node.symbol}
      </div>

      {/* Conexión a Hijos */}
      {hasChildren && (
        <div className="children-container" style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "100%", marginTop: "40px", position: "relative" }}>
          
          {/* SVG Container absoluto para dibujar las líneas que SALEN del nodo padre */}
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
            <title>Conexiones entre nodos</title>
            {node.children!.map((child: DerivationNode, index: number) => {
              const startX = "50%";
              const startY = "0";
              
              // Usamos el centro real calculado, o un fallback razonable si aún no se calculó
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
                />
              );
            })}
          </svg>

          {node.children!.map((child: DerivationNode, index: number) => (
            <div key={`${child.id}-${index}`} style={{ display: "flex", justifyContent: "center" }}>
              <TreeNode node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const DerivationTree: React.FC<{ root: DerivationNode }> = ({ root }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        overflowX: "auto",
        padding: "32px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        border: "1px dashed #d1d5db",
      }}
    >
      <TreeNode node={root} />
    </div>
  );
};
