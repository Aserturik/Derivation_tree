import { useState } from "react";
import type { GrammarSchema } from "../schemas/grammar";
import { DerivationEngine, type ValidationResult } from "../schemas/derivation";

interface WordValidatorProps {
  grammar: GrammarSchema;
}

export const WordValidator = ({ grammar }: WordValidatorProps) => {
  const [word, setWord] = useState("");
  const [result, setResult] = useState<{ validation: ValidationResult, xml?: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const engine = new DerivationEngine(grammar);
    const validation = engine.validateWord(word);
    
    let xml: string | undefined;
    if (validation.isValid && validation.derivationTree) {
      xml = engine.generateXML(validation.derivationTree);
    }
    
    setResult({ validation, xml });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", height: "100%" }}>
      <form 
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-end"
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <label htmlFor="wordToValidate" style={{ fontWeight: 600, color: "#444" }}>
            Palabra a validar
          </label>
          <input
            id="wordToValidate"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Ej: abba"
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
              outline: "none"
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "12px 24px",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "16px",
            height: "46px"
          }}
        >
          Validar
        </button>
      </form>

      {result && (
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "16px",
          flex: 1
        }}>
          <div style={{
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: result.validation.isValid ? "#ecfdf5" : "#fef2f2",
            border: `1px solid ${result.validation.isValid ? "#10b981" : "#ef4444"}`,
            color: result.validation.isValid ? "#065f46" : "#991b1b"
          }}>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "1.1rem" }}>
              {result.validation.isValid ? "✅ Palabra válida" : "❌ Error de validación"}
            </h3>
            {!result.validation.isValid && (
              <p style={{ margin: 0 }}>{result.validation.error}</p>
            )}
          </div>

          {result.xml && (
            <div style={{
              flex: 1,
              backgroundColor: "#1f2937",
              borderRadius: "8px",
              padding: "20px",
              overflow: "auto"
            }}>
              <h4 style={{ margin: "0 0 12px 0", color: "#e5e7eb" }}>Árbol de Derivación (XML)</h4>
              <pre style={{
                margin: 0,
                color: "#10b981",
                fontFamily: "monospace",
                fontSize: "13px"
              }}>
                {result.xml}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
