import { useState } from "react";
import "./App.css";
import { GrammarForm } from "./components/GrammarForm";
import { WordValidator } from "./components/WordValidator";
import type { GrammarSchema } from "./schemas/grammar";

function App() {
  const [grammar, setGrammar] = useState<GrammarSchema | null>(null);

  const handleGrammarSubmit = (newGrammar: GrammarSchema) => {
    setGrammar(newGrammar);
    console.log("Gramática recibida:", newGrammar);
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw',
      overflow: 'hidden',
      fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
      backgroundColor: '#f9fafb'
    }}>
      {/* Lado Izquierdo: Formulario (Fixed width, no horizontal scroll) */}
      <aside style={{ 
        width: '450px', 
        minWidth: '450px',
        maxWidth: '450px',
        borderRight: '1px solid #e5e7eb', 
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '32px',
        boxSizing: 'border-box',
        backgroundColor: '#f3f4f6',
        zIndex: 10
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>Gramática Formal</h2>
        <GrammarForm onGrammarSubmit={handleGrammarSubmit} />
        
        {grammar && (
          <div style={{ 
            marginTop: '32px',
            backgroundColor: '#111827',
            padding: '20px',
            borderRadius: '12px',
            color: '#10b981',
            maxWidth: '100%',
            overflowX: 'auto'
          }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: '#9ca3af' }}>Objeto Gramática</h3>
            <pre style={{ 
              fontSize: '11px', 
              margin: 0,
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
            }}>
              {JSON.stringify(grammar, null, 2)}
            </pre>
          </div>
        )}
      </aside>

      {/* Lado Derecho: Árboles (Flex grow) */}
      <main style={{ 
        flex: 1, 
        padding: '40px', 
        overflowY: 'auto',
        overflowX: 'auto',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>Visualización de Árboles</h2>
        {!grammar ? (
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '2px dashed #e5e7eb',
            borderRadius: '16px',
            color: '#9ca3af',
            fontSize: '1.1rem',
            textAlign: 'center',
            padding: '20px'
          }}>
            Configurá y guardá una gramática para visualizar la derivación
          </div>
        ) : (
          <div style={{ 
            flex: 1,
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}>
            <WordValidator grammar={grammar} />
          </div>
        )}
      </main>
    </div>
  );
}


export default App;

