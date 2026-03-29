import React from "react";
import type { GrammarSchema } from "../../schemas/grammar";

interface GrammarVisualizerProps {
  grammar: GrammarSchema;
}

export const GrammarVisualizer: React.FC<GrammarVisualizerProps> = ({ grammar }) => {
  // Agrupamos las producciones por lado izquierdo
  const groupedProductions = grammar.productions.reduce((acc, prod) => {
    if (!acc[prod.left]) acc[prod.left] = [];
    acc[prod.left].push(prod.right);
    return acc;
  }, {} as Record<string, string[][]>);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "24px",
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        border: "1px solid #cbd5e1",
        marginBottom: "24px",
      }}
    >
      <h3 style={{ margin: 0, color: "#334155", fontSize: "1.2rem" }}>
        Producciones de la Gramática
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {Object.entries(groupedProductions).map(([left, rights], index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 20px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              border: "1px solid #e2e8f0",
            }}
          >
            {/* Lado Izquierdo (No Terminal) */}
            <div
              style={{
                fontWeight: "bold",
                color: "#4f46e5",
                fontSize: "1.2rem",
                padding: "8px 16px",
                backgroundColor: "#e0e7ff",
                borderRadius: "6px",
              }}
            >
              {left}
            </div>

            {/* Flecha */}
            <div style={{ color: "#94a3b8", fontSize: "1.5rem" }}>→</div>

            {/* Lados Derechos */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              {rights.map((rightSymbols, rIdx) => (
                <React.Fragment key={rIdx}>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {rightSymbols.length === 0 ? (
                      <span style={{ color: "#10b981", fontWeight: "bold", fontSize: "1.2rem" }}>λ</span>
                    ) : (
                      rightSymbols.map((sym, sIdx) => {
                        const isTerminal = grammar.terminals.includes(sym);
                        return (
                          <span
                            key={sIdx}
                            style={{
                              padding: "4px 8px",
                              backgroundColor: isTerminal ? "#ecfdf5" : "#f1f5f9",
                              color: isTerminal ? "#059669" : "#334155",
                              borderRadius: "4px",
                              border: `1px solid ${isTerminal ? "#a7f3d0" : "#cbd5e1"}`,
                              fontWeight: isTerminal ? "normal" : "bold",
                            }}
                          >
                            {sym}
                          </span>
                        );
                      })
                    )}
                  </div>
                  {/* Separador OR si no es el último */}
                  {rIdx < rights.length - 1 && (
                    <span style={{ color: "#cbd5e1", fontWeight: "bold", margin: "0 4px" }}>|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
