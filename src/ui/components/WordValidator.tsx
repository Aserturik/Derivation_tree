import { useState, useMemo } from "react";
import type { GrammarSchema } from "../../schemas/grammar";
import { DerivationPresenter, type WordValidationState } from "../../presentation/presenters/DerivationPresenter";

interface WordValidatorProps {
  grammar: GrammarSchema;
}

export const WordValidator = ({ grammar }: WordValidatorProps) => {
  const [word, setWord] = useState("");
  const [result, setResult] = useState<WordValidationState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Instanciamos el presenter solo cuando cambia la gramática
  const presenter = useMemo(() => new DerivationPresenter(grammar), [grammar]);

  // Limpiar resultado al cambiar la palabra para evitar confusión de errores "congelados"
  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    if (result) setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) {
      setIsLoading(true);
      setResult(null);
      try {
        const validationResult = await presenter.validate("");
        setResult(validationResult);
      } catch (error) {
        console.error("Error validando palabra vacía:", error);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setIsLoading(true);
    setResult(null); // Limpiar previo

    try {
      const validationResult = await presenter.validate(word);
      setResult(validationResult);
    } catch (error) {
      console.error("Error validando palabra:", error);
    } finally {
      setIsLoading(false);
    }
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
            onChange={handleWordChange}
            placeholder="Ej: abba"
            disabled={isLoading}
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
              outline: "none",
              backgroundColor: isLoading ? "#f3f4f6" : "white",
              color: "#1f2937",
              WebkitTextFillColor: "#1f2937",
              boxShadow: "0 0 0px 1000px white inset",
              transition: "background-color 5000s ease-in-out 0s",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "12px 24px",
            backgroundColor: isLoading ? "#9ca3af" : "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: 600,
            fontSize: "16px",
            height: "46px",
            transition: "all 0.2s"
          }}
        >
          {isLoading ? "Validando..." : "Validar"}
        </button>
      </form>

      {isLoading && (
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          padding: "20px",
          color: "#4f46e5",
          fontWeight: 500
        }}>
          <div className="spinner" style={{ marginRight: "10px" }}>⌛</div>
          Procesando árbol de derivación...
        </div>
      )}

      {result && !isLoading && (
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
