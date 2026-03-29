import React from "react";

export const DocumentationView: React.FC = () => {
  return (
    <div
      style={{
        padding: "40px",
        lineHeight: "1.6",
        color: "#334155",
        maxWidth: "1100px",
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* 0. QUICKSTART */}
      <section style={{ marginBottom: "60px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ec4899",
              color: "white",
              padding: "8px 12px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            00
          </div>
          <h2 style={{ fontSize: "1.8rem", color: "#1e293b", margin: 0 }}>
            Arranque del Sistema
          </h2>
        </div>

        <p style={{ marginBottom: "24px", fontSize: "1.05rem" }}>
          Tienes dos formas de levantar el proyecto: mediante Docker (la más
          rápida y limpia) o localmente con Node.js.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          {/* DOCKER */}
          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: "12px",
              padding: "24px",
              position: "relative",
              border: "1px solid #334155",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", gap: "8px" }}>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#ef4444",
                  }}
                ></div>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#eab308",
                  }}
                ></div>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#22c55e",
                  }}
                ></div>
              </div>
              <span
                style={{
                  color: "#38bdf8",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  letterSpacing: "0.05em",
                }}
              >
                DOCKER (RECOMENDADO)
              </span>
            </div>
            <pre
              style={{
                margin: 0,
                color: "#a7f3d0",
                fontFamily: "monospace",
                fontSize: "0.9rem",
                lineHeight: "1.8",
                whiteSpace: "pre-wrap",
              }}
            >
              <span style={{ color: "#94a3b8" }}>
                # Requiere Docker y Docker Compose
              </span>
              <br />
              <span style={{ color: "#94a3b8" }}>
                # Levanta el entorno aislado en un solo comando
              </span>
              <br />
              <br />
              $ docker compose up --build
              <br />
              <br />
              <span style={{ color: "#94a3b8" }}>
                # Estará disponible en http://localhost:5173
              </span>
            </pre>
          </div>

          {/* LOCAL NODE */}
          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: "12px",
              padding: "24px",
              position: "relative",
              border: "1px solid #334155",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", gap: "8px" }}>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#ef4444",
                  }}
                ></div>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#eab308",
                  }}
                ></div>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#22c55e",
                  }}
                ></div>
              </div>
              <span
                style={{
                  color: "#a3e635",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  letterSpacing: "0.05em",
                }}
              >
                LOCAL (NODE.JS)
              </span>
            </div>
            <pre
              style={{
                margin: 0,
                color: "#a7f3d0",
                fontFamily: "monospace",
                fontSize: "0.9rem",
                lineHeight: "1.8",
                whiteSpace: "pre-wrap",
              }}
            >
              <span style={{ color: "#94a3b8" }}>
                # 1. Instalar dependencias
              </span>
              <br />
              $ npm install
              <br />
              <br />
              <span style={{ color: "#94a3b8" }}>
                # 2. Levantar servidor Vite con HMR
              </span>
              <br />
              $ npm run dev
              <br />
              <br />
              <span style={{ color: "#94a3b8" }}>
                # 3. Compilar para producción
              </span>
              <br />$ npm run build
            </pre>
          </div>
        </div>
      </section>

      {/* 1. FLUJO DEL SISTEMA Y PIPELINE DE DATOS */}
      <section style={{ marginBottom: "60px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "8px 12px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            01
          </div>
          <h2 style={{ fontSize: "1.8rem", color: "#1e293b", margin: 0 }}>
            Pipeline Interactivo
          </h2>
        </div>

        <p style={{ marginBottom: "32px", fontSize: "1.05rem" }}>
          Para entender cómo funciona la aplicación, vamos a seguir paso a paso
          lo que sucede desde que el usuario ingresa una regla hasta que se
          dibuja el árbol.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            borderLeft: "4px solid #e2e8f0",
            paddingLeft: "32px",
            marginLeft: "16px",
          }}
        >
          {/* PASO A: INPUT Y ZOD */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "-50px",
                top: "0",
                width: "32px",
                height: "32px",
                backgroundColor: "#3b82f6",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                border: "4px solid white",
              }}
            >
              1
            </div>
            <h3 style={{ margin: "0 0 12px 0", color: "#1e3a8a" }}>
              Entrada y Validación Estricta (View → Model)
            </h3>
            <p style={{ marginBottom: "16px" }}>
              El usuario llena el formulario. Inmediatamente, los datos pasan
              por <code>Zod</code>. Validamos tipos, pero también las leyes
              fundamentales de los lenguajes formales (ej:{" "}
              <code>V ∩ Σ = ∅</code>).
            </p>

            <div
              style={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                padding: "16px",
                fontSize: "0.85rem",
              }}
            >
              <div
                style={{
                  color: "#94a3b8",
                  borderBottom: "1px solid #334155",
                  paddingBottom: "8px",
                  marginBottom: "12px",
                }}
              >
                src/schemas/grammar.ts
              </div>
              <pre style={{ margin: 0, color: "#e2e8f0" }}>
                {`.refine((data) => {
  // Regla 5: Disyunción estricta entre No Terminales (V) y Terminales (Σ)
  const intersection = data.terminals.filter((t) =>
    data.nonTerminals.includes(t),
  );
  return intersection.length === 0;
}, { message: "Un símbolo no puede ser Terminal y No Terminal a la vez" })`}
              </pre>
            </div>
          </div>

          {/* PASO B: PRESENTER */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "-50px",
                top: "0",
                width: "32px",
                height: "32px",
                backgroundColor: "#8b5cf6",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                border: "4px solid white",
              }}
            >
              2
            </div>
            <h3 style={{ margin: "0 0 12px 0", color: "#4c1d95" }}>
              Orquestación (Presenter)
            </h3>
            <p style={{ marginBottom: "16px" }}>
              Si la gramática es válida, la UI invoca al{" "}
              <code>DerivationPresenter</code>. Este es el encargado de hablar
              con el motor matemático y preparar los datos para la vista.
            </p>

            <div
              style={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                padding: "16px",
                fontSize: "0.85rem",
              }}
            >
              <div
                style={{
                  color: "#94a3b8",
                  borderBottom: "1px solid #334155",
                  paddingBottom: "8px",
                  marginBottom: "12px",
                }}
              >
                src/presentation/presenters/DerivationPresenter.ts
              </div>
              <pre style={{ margin: 0, color: "#e2e8f0" }}>
                {`public async validate(word: string) {
  // 1. Calculamos si la palabra pertenece al lenguaje
  const validation = this.engine.validateWord(word);
  
  // 2. Si pertenece, pedimos el XML visual del camino ganador
  let xml = undefined;
  if (validation.isValid && validation.derivationTree) {
    xml = this.engine.generateXML(validation.derivationTree);
  }
  
  return { validation, xml }; // Se lo devolvemos a React
}`}
              </pre>
            </div>
          </div>

          {/* PASO C: ENGINE */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "-50px",
                top: "0",
                width: "32px",
                height: "32px",
                backgroundColor: "#10b981",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                border: "4px solid white",
              }}
            >
              3
            </div>
            <h3 style={{ margin: "0 0 12px 0", color: "#064e3b" }}>
              Cálculo Matemático (DerivationEngine)
            </h3>
            <p style={{ marginBottom: "16px" }}>
              El corazón del sistema evalúa la derivación. Usa{" "}
              <strong>DFS (Búsqueda en Profundidad)</strong> y derivación por la
              izquierda, guardando los pasos en un historial para prevenir
              ciclos infinitos.
            </p>

            <div
              style={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                padding: "16px",
                fontSize: "0.85rem",
              }}
            >
              <div
                style={{
                  color: "#94a3b8",
                  borderBottom: "1px solid #334155",
                  paddingBottom: "8px",
                  marginBottom: "12px",
                }}
              >
                src/schemas/derivation.ts (Fragmento)
              </div>
              <pre style={{ margin: 0, color: "#e2e8f0" }}>
                {`// Evitamos ciclos infinitos como A -> A evaluando el Set 'visitedInBranch'
if (visitedInBranch.has(currentString)) return false;

for (const prod of applicableProductions) {
  // Generamos los hijos de este paso
  targetNode.children = newChildren;
  
  // Backtracking: Si una rama falla, regresamos y probamos otra
  if (this.derive(newSequence, targetWord, visitedInBranch)) return true;
  
  targetNode.children = undefined; // Limpieza
}`}
              </pre>
            </div>
          </div>

          {/* PASO D: RENDER NATIVO */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "-50px",
                top: "0",
                width: "32px",
                height: "32px",
                backgroundColor: "#f59e0b",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                border: "4px solid white",
              }}
            >
              4
            </div>
            <h3 style={{ margin: "0 0 12px 0", color: "#78350f" }}>
              Pintado del Lienzo (Flexbox + SVG)
            </h3>
            <p style={{ marginBottom: "16px" }}>
              El árbol no depende de librerías externas de renderizado para
              funcionar. Lo dibujamos nativamente utilizando una arquitectura
              recursiva de componentes React. Usamos <strong>Flexbox</strong>{" "}
              para la alineación estructural de los hijos y matemáticas con{" "}
              <strong>SVG</strong> dinámico para trazar las aristas y flechas
              exactas entre los nodos padre e hijo.
            </p>

            <div
              style={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                padding: "16px",
                fontSize: "0.85rem",
              }}
            >
              <div
                style={{
                  color: "#94a3b8",
                  borderBottom: "1px solid #334155",
                  paddingBottom: "8px",
                  marginBottom: "12px",
                }}
              >
                src/ui/components/DerivationTree.tsx (Fragmento)
              </div>
              <pre style={{ margin: 0, color: "#e2e8f0" }}>
                {`// Renderizado recursivo nativo
const TreeNode: React.FC<TreeNodeProps> = ({ node, depth, maxDepth }) => {
  // 1. Calculamos las posiciones reales en el DOM para trazar las flechas
  useLayoutEffect(() => {
    // Calculamos el centro de cada hijo relativo al contenedor del padre
    const relativeCenter = (childRect.left + (childRect.width / 2)) - containerRect.left;
    setChildrenCenters(centers); // Guardamos para el SVG
  }, [hasChildren]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* 2. Nodo Actual */}
      <div className="tree-node">{node.symbol}</div>
      
      {/* 3. Renderizado de Aristas SVG a medida */}
      {hasChildren && (
        <svg>
          {node.children.map((child, i) => (
             <line x1={startX} y1="0" x2={endX} y2="100%" stroke="#9ca3af" />
          ))}
        </svg>
      )}

      {/* 4. Recursión Flexbox para los hijos */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        {node.children.map(child => <TreeNode node={child} />)}
      </div>
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ESTRUCTURA DE CARPETAS Y ARQUITECTURA */}
      <section style={{ marginBottom: "60px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "#8b5cf6",
              color: "white",
              padding: "8px 12px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            02
          </div>
          <h2 style={{ fontSize: "1.8rem", color: "#1e293b", margin: 0 }}>
            Arquitectura Limpia (Carpetas)
          </h2>
        </div>

        <p style={{ marginBottom: "20px" }}>
          Esta separación asegura que si mañana cambiamos React por Vue, o Zod
          por Yup, el Core Matemático siga intacto.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "20px",
          }}
        >
          <pre
            style={{
              backgroundColor: "#1e293b",
              color: "#f8fafc",
              padding: "24px",
              borderRadius: "12px",
              fontSize: "0.9rem",
              overflowX: "auto",
              lineHeight: "1.7",
              margin: 0,
            }}
          >
            {`📂 src
 ┣ 📂 presentation
 ┃ ┗ 📂 presenters
 ┣ 📂 schemas
 ┃ ┣ 📜 derivation.ts
 ┃ ┗ 📜 grammar.ts
 ┣ 📂 types
 ┃ ┣ 📜 derivation.ts
 ┃ ┗ 📜 grammar.ts
 ┗ 📂 ui
   ┗ 📂 components`}
          </pre>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div
              style={{
                backgroundColor: "#f1f5f9",
                padding: "16px",
                borderRadius: "8px",
                borderLeft: "4px solid #8b5cf6",
              }}
            >
              <strong>Presentation:</strong> Orquestadores (Classes) que
              puentean la UI con los datos.
            </div>
            <div
              style={{
                backgroundColor: "#f1f5f9",
                padding: "16px",
                borderRadius: "8px",
                borderLeft: "4px solid #10b981",
              }}
            >
              <strong>Schemas (Core):</strong> La lógica pura. Aquí están los
              algoritmos de derivación y las reglas de negocio (Zod). Ninguno de
              estos archivos importa "react".
            </div>
            <div
              style={{
                backgroundColor: "#f1f5f9",
                padding: "16px",
                borderRadius: "8px",
                borderLeft: "4px solid #3b82f6",
              }}
            >
              <strong>UI:</strong> Componentes visuales puros (React + CSS/SVG).
              Se encargan de la recursividad (<code>TreeNode</code>) y pintar
              las derivaciones sin librerías externas.
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUALIZACIONES Y DERIVACIONES */}
      <section style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "#6366f1",
              color: "white",
              padding: "8px 12px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            03
          </div>
          <h2 style={{ fontSize: "1.8rem", color: "#1e293b", margin: 0 }}>
            Teoría de Derivaciones: Enfoque Exhaustivo vs. Selectivo
          </h2>
        </div>

        <p
          style={{
            marginBottom: "24px",
            fontSize: "1.05rem",
            lineHeight: "1.6",
          }}
        >
          En el contexto de la Teoría de Lenguajes Formales, el proceso de
          transformar el Símbolo Axiomático (S) en una palabra (w) contenida en
          el lenguaje (L(G)) se denomina derivación. Nuestro motor expone este
          proceso lógico-matemático desde dos perspectivas analíticas
          fundamentales:
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          {/* Arbol Particular */}
          <div
            style={{
              backgroundColor: "#f0fdf4",
              padding: "32px",
              borderRadius: "16px",
              border: "1px solid #bbf7d0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#16a34a",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                w ∈ L(G)
              </div>
              <h3 style={{ fontSize: "1.3rem", color: "#166534", margin: 0 }}>
                Árbol de Derivación Particular
              </h3>
            </div>

            <p
              style={{
                fontSize: "0.95rem",
                color: "#15803d",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}
            >
              Representa la demostración constructiva de pertenencia. Es la
              secuencia determinística de sustituciones por la izquierda
              (Leftmost Derivation) que el algoritmo de validación comprobó como
              exitosa para alcanzar la palabra objetivo $w$.
            </p>

            <div
              style={{
                backgroundColor: "#dcfce7",
                padding: "16px",
                borderRadius: "8px",
                borderLeft: "4px solid #22c55e",
              }}
            >
              <h4
                style={{
                  margin: "0 0 8px 0",
                  color: "#166534",
                  fontSize: "0.9rem",
                }}
              >
                Propiedades Estructurales:
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  color: "#15803d",
                  fontSize: "0.85rem",
                }}
              >
                <li style={{ marginBottom: "4px" }}>
                  Solo se instanciará si y solo si la demostración de
                  pertenencia es verdadera.
                </li>
                <li style={{ marginBottom: "4px" }}>
                  La concatenación de las hojas (frontera o <em>yield</em>) de
                  izquierda a derecha conforma exactamente la palabra $w$.
                </li>
                <li>
                  Se depura cualquier inferencia no exitosa mediante las rutinas
                  de Backtracking del motor.
                </li>
              </ul>
            </div>
          </div>

          {/* Arbol General */}
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "32px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <h3 style={{ fontSize: "1.3rem", color: "#0f172a", margin: 0 }}>
                Árbol de Generación General
              </h3>
            </div>

            <p
              style={{
                fontSize: "0.95rem",
                color: "#475569",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}
            >
              Consiste en la representación topológica exhaustiva del espacio de
              estados. Ejemplifica visualmente el poder generativo de las reglas
              de producción $P$, expandiendo todos los nodos simultáneamente
              según las producciones aplicables.
            </p>

            <div
              style={{
                backgroundColor: "#f1f5f9",
                padding: "16px",
                borderRadius: "8px",
                borderLeft: "4px solid #64748b",
              }}
            >
              <h4
                style={{
                  margin: "0 0 8px 0",
                  color: "#334155",
                  fontSize: "0.9rem",
                }}
              >
                Propiedades Analíticas:
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  color: "#475569",
                  fontSize: "0.85rem",
                }}
              >
                <li style={{ marginBottom: "4px" }}>
                  Resulta fundamental para la detección de{" "}
                  <strong>Ambigüedad Formal</strong> (existencia de múltiples
                  derivaciones por la izquierda para una misma palabra).
                </li>
                <li style={{ marginBottom: "4px" }}>
                  Expone ramas divergentes o secuencias que jamás derivarán en
                  terminales completos.
                </li>
                <li>
                  Para preservar la complejidad computacional $O(b^d)$ en
                  gramáticas recursivas, la profundidad de inferencia está
                  limitida superiormente a <code>maxDepth = 7</code>.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer
        style={{
          textAlign: "center",
          paddingTop: "40px",
          marginTop: "60px",
          borderTop: "1px solid #e2e8f0",
          color: "#94a3b8",
          fontSize: "0.95rem",
        }}
      >
        <strong>Sistema de Derivación de Gramáticas Formales</strong>
        <br />
        Creado con React, Vite, Zod y cariño• 2026
      </footer>
    </div>
  );
};
