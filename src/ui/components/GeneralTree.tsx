import React, { useMemo } from "react";
import type { GrammarSchema } from "../../schemas/grammar";
import { DerivationEngine } from "../../schemas/derivation";
import { DerivationTree } from "./DerivationTree";

interface GeneralTreeProps {
  grammar: GrammarSchema;
}

export const GeneralTree: React.FC<GeneralTreeProps> = ({ grammar }) => {
  const rootNode = useMemo(() => {
    const engine = new DerivationEngine(grammar);
    // Generamos el árbol general hasta 7 niveles o 1500 nodos para evitar colgar el navegador
    return engine.generateGeneralTree(7);
  }, [grammar]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "24px",
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        border: "1px solid #cbd5e1",
        marginBottom: "24px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, color: "#334155", fontSize: "1.2rem" }}>
          Árbol de Derivación General (Lenguaje Generado)
        </h3>
        <span style={{ fontSize: "0.85rem", color: "#64748b", backgroundColor: "#e2e8f0", padding: "4px 8px", borderRadius: "4px" }}>
          Max 7 niveles
        </span>
      </div>
      
      <div 
        style={{ 
          width: "100%", 
          maxHeight: "600px", 
          display: "flex",
          flexDirection: "column",
          minWidth: 0
        }}
      >
        <DerivationTree root={rootNode} />
      </div>
    </div>
  );
};
