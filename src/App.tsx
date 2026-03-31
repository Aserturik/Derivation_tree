import { useState } from "react";
import "./App.css";
import { GrammarForm } from "./ui/components/GrammarForm";
import { WordValidator } from "./ui/components/WordValidator";
import { GrammarVisualizer } from "./ui/components/GrammarVisualizer";
import { GeneralTree } from "./ui/components/GeneralTree";
import { DocumentationView } from "./ui/components/DocumentationView";
import { TestCasesView } from "./ui/components/TestCasesView";
import type { GrammarSchema } from "./schemas/grammar";

function App() {
  const [grammar, setGrammar] = useState<GrammarSchema | null>(null);
  const [activeView, setActiveView] = useState<'none' | 'docs' | 'tests'>('none');

  const handleGrammarSubmit = (newGrammar: GrammarSchema) => {
    setGrammar(newGrammar);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
        backgroundColor: "#f9fafb",
      }}
    >
      {/* Lado Izquierdo: Formulario (Fixed width, no horizontal scroll) */}
      <aside
        style={{
          width: "550px",
          minWidth: "550px",
          maxWidth: "550px",
          borderRight: "1px solid #e5e7eb",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "32px",
          boxSizing: "border-box",
          backgroundColor: "#f3f4f6",
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "24px",
            color: "#111827",
          }}
        >
          Gramática Formal
        </h2>
        <GrammarForm onGrammarSubmit={handleGrammarSubmit} />
      </aside>

      {/* Lado Derecho: Árboles (Flex grow) */}
      <main
        style={{
          flex: 1,
          padding: "40px",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              margin: 0,
              color: "#111827",
            }}
          >
            {activeView === 'docs' ? 'Documentación Técnica' : activeView === 'tests' ? 'Casos de Prueba' : 'Visualización de Árboles'}
          </h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setActiveView(activeView === 'tests' ? 'none' : 'tests')}
              style={{
                padding: '10px 20px',
                backgroundColor: activeView === 'tests' ? '#ef4444' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {activeView === 'tests' ? 'Cerrar Casos' : 'Casos de prueba'}
            </button>
            <button
              type="button"
              onClick={() => setActiveView(activeView === 'docs' ? 'none' : 'docs')}
              style={{
                padding: '10px 20px',
                backgroundColor: activeView === 'docs' ? '#ef4444' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {activeView === 'docs' ? 'Cerrar Documentación' : 'Ver Documentación'}
            </button>
          </div>
        </div>

        {activeView === 'docs' ? (
          <div
            style={{
              flex: 1,
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              border: "1px solid #e5e7eb",
              overflowY: "auto",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          >
            <DocumentationView />
          </div>
        ) : activeView === 'tests' ? (
          <div
            style={{
              flex: 1,
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              border: "1px solid #e5e7eb",
              overflowY: "auto",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          >
            <TestCasesView />
          </div>
        ) : !grammar ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed #e5e7eb",
              borderRadius: "16px",
              color: "#9ca3af",
              fontSize: "1.1rem",
              textAlign: "center",
              padding: "20px",
            }}
          >
            Configura y guarda una gramática para visualizar la derivación
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              border: "1px solid #e5e7eb",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              minWidth: 0,
            }}
          >
            <GrammarVisualizer grammar={grammar} />
            <GeneralTree grammar={grammar} />
            <WordValidator grammar={grammar} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
