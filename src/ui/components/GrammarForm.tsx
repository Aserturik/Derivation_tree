import { useState } from "react";
import type { Production } from "../../types/grammar";
import { grammarSchema, type GrammarSchema } from "../../schemas/grammar";

interface GrammarFormProps {
  onGrammarSubmit: (grammar: GrammarSchema) => void;
}

interface ProductionRow {
  id: string;
  left: string;
  right: string;
}

export const GrammarForm = ({ onGrammarSubmit }: GrammarFormProps) => {
  const [terminals, setTerminals] = useState("");
  const [nonTerminals, setNonTerminals] = useState("");
  const [axiom, setAxiom] = useState("");
  const [productionRows, setProductionRows] = useState<ProductionRow[]>([
    { left: "", right: "", id: Math.random().toString(36).substr(2, 9) },
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addRow = () => {
    setProductionRows([
      ...productionRows,
      { left: "", right: "", id: Math.random().toString(36).substr(2, 9) },
    ]);
  };

  const removeRow = (index: number) => {
    setProductionRows(productionRows.filter((_, i) => i !== index));
  };

  const updateRow = (
    index: number,
    field: keyof ProductionRow,
    value: string,
  ) => {
    const newRows = [...productionRows];
    newRows[index][field] = value;
    setProductionRows(newRows);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const terminalsList = terminals
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const nonTerminalsList = nonTerminals
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedProductions: Production[] = [];

    for (const row of productionRows) {
      if (!row.left.trim()) continue;

      const alternatives = row.right.split("|").map((s) => s.trim());

      for (const alt of alternatives) {
        // Si alt está vacío, es una producción lambda
        let symbols: string[] = [];
        const trimmedAlt = alt.trim();
        if (trimmedAlt !== "" && trimmedAlt !== "λ" && trimmedAlt !== "ε") {
          symbols = trimmedAlt.includes(" ")
            ? trimmedAlt
                .split(" ")
                .map((s) => s.trim())
                .filter(Boolean)
            : trimmedAlt.split("");
        }

        parsedProductions.push({
          left: row.left.trim(),
          right: symbols,
        });
      }
    }

    const grammarData = {
      terminals: terminalsList,
      nonTerminals: nonTerminalsList,
      axiom: axiom.trim(),
      productions: parsedProductions,
    };

    const result = grammarSchema.safeParse(grammarData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    onGrammarSubmit(result.data);
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: "600",
    fontSize: "0.9rem",
    marginBottom: "4px",
    color: "#444",
  };

  const inputStyle: React.CSSProperties = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    color: "#1f2937",
    WebkitTextFillColor: "#1f2937",
    // Sobrescribir el estilo de autofill de los navegadores
    boxShadow: "0 0 0px 1000px white inset",
    transition: "background-color 5000s ease-in-out 0s",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 16px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "background-color 0.2s",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "24px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        color: "#1f2937",
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1.2fr",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="terminals" style={labelStyle}>
            Terminales (a, b, +)
          </label>
          <input
            id="terminals"
            value={terminals}
            onChange={(e) => setTerminals(e.target.value)}
            placeholder="a, b, +"
            style={{
              ...inputStyle,
              borderColor: errors.terminals ? "#ef4444" : "#d1d5db",
            }}
          />
          {errors.terminals && (
            <span
              style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}
            >
              {errors.terminals}
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="nonTerminals" style={labelStyle}>
            No Terminales (E, T)
          </label>
          <input
            id="nonTerminals"
            value={nonTerminals}
            onChange={(e) => setNonTerminals(e.target.value)}
            placeholder="E, T, F"
            style={{
              ...inputStyle,
              borderColor: errors.nonTerminals ? "#ef4444" : "#d1d5db",
            }}
          />
          {errors.nonTerminals && (
            <span
              style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}
            >
              {errors.nonTerminals}
            </span>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="axiom" style={labelStyle}>
          Símbolo Inicial (Axioma)
        </label>
        <input
          id="axiom"
          value={axiom}
          onChange={(e) => setAxiom(e.target.value)}
          placeholder="E"
          style={{
            ...inputStyle,
            width: "100px",
            borderColor: errors.axiom ? "#ef4444" : "#d1d5db",
          }}
        />
        {errors.axiom && (
          <span
            style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}
          >
            {errors.axiom}
          </span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ ...labelStyle, margin: 0 }}>Producciones</h3>
        {errors.productions && (
          <span
            style={{ color: "#ef4444", fontSize: "12px", marginBottom: "4px" }}
          >
            {errors.productions}
          </span>
        )}
        {productionRows.map((row, index) => (
          <div
            key={row.id}
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <select
                id={`left-${index}`}
                aria-label={`Símbolo no terminal de la fila ${index + 1}`}
                value={row.left}
                onChange={(e) => updateRow(index, "left", e.target.value)}
                style={{
                  ...inputStyle,
                  width: "80px",
                  minWidth: "80px",
                  textAlign: "center",
                  borderColor: errors[`productions.${index}.left`]
                    ? "#ef4444"
                    : "#d1d5db",
                }}
              >
                <option value="" disabled>
                  —
                </option>
                {nonTerminals
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((nt) => (
                    <option key={nt} value={nt}>
                      {nt}
                    </option>
                  ))}
              </select>
              <span style={{ fontWeight: "bold", color: "#6b7280" }}>→</span>
              <input
                id={`right-${index}`}
                aria-label={`Producciones de la fila ${index + 1}`}
                value={row.right}
                onChange={(e) => updateRow(index, "right", e.target.value)}
                placeholder="λ"
                style={{
                  ...inputStyle,
                  flex: 1,
                  borderColor: errors[`productions.${index}.right`]
                    ? "#ef4444"
                    : "#d1d5db",
                }}
              />
              {productionRows.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#ef4444",
                    padding: "8px 12px",
                    minWidth: "40px",
                  }}
                >
                  ✕
                </button>
              )}
            </div>
            {errors[`productions.${index}.left`] && (
              <span style={{ color: "#ef4444", fontSize: "11px" }}>
                {errors[`productions.${index}.left`]}
              </span>
            )}
            {errors[`productions.${index}.right`] && (
              <span style={{ color: "#ef4444", fontSize: "11px" }}>
                {errors[`productions.${index}.right`]}
              </span>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addRow}
          style={{
            ...buttonStyle,
            backgroundColor: "#10b981",
            alignSelf: "flex-start",
            marginTop: "4px",
          }}
        >
          + Añadir Producción
        </button>
      </div>

      {Object.keys(errors).length > 0 && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#fef2f2",
            borderRadius: "6px",
            border: "1px solid #fee2e2",
          }}
        >
          <p
            style={{
              color: "#dc2626",
              margin: 0,
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Corrige los errores antes de continuar:
          </p>
          <ul
            style={{
              margin: "8px 0 0 0",
              paddingLeft: "20px",
              color: "#dc2626",
              fontSize: "13px",
            }}
          >
            {Object.entries(errors).map(([key, msg]) => (
              <li key={key}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <button type="submit" style={{ ...buttonStyle, marginTop: "10px" }}>
        Guardar Gramática
      </button>
    </form>
  );
};
