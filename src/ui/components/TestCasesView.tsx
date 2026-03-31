import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const testCasesMarkdown = `
# Casos de Prueba - Derivation Tree

Este documento detalla 4 casos de prueba técnicos (2 de pertenencia válida y 2 de rechazo) diseñados para comprobar el correcto funcionamiento del motor de inferencia matemática y el algoritmo de derivación por la izquierda implementado en el sistema.

Puedes ingresar estas gramáticas exactas en la interfaz del programa para replicar y visualizar los resultados.

## Gramática 1: Lenguaje $a^n b^n$ anidado (Libre de Contexto)

Diseñaremos una gramática clásica de contexto libre (para mostrar anidamiento), adaptada para cumplir estrictamente con los requisitos (≥2 terminales, ≥3 no terminales, ≥3 producciones) manteniendo un árbol pequeño y simétrico.

- **No Terminales ($\\Sigma_{NT}$):** \`S, A, B\`
- **Terminales ($\\Sigma_T$):** \`a, b\`
- **Símbolo Inicial:** \`S\`
- **Producciones:**
  - \`S -> aAb\`
  - \`A -> aBb\`
  - \`B -> aBb\`
  - \`B -> ab\`

  ![Configuración de la Gramática 1 en la interfaz](image.png)

- **Árbol de Derivación general:**
![Visualización del Árbol de Derivación General para la Gramática 1](image1.png)
### Caso de Prueba 1: Pertenencia Válida (Éxito)

- **Palabra a validar:** \`aaaabbbb\`
- **Resultado Esperado:** Válida (Aceptada)
- **Explicación del Motor:**
  Sin reglas unitarias confusas (como S->A o A->B), esta gramática es directa y genera infinitas palabras balanceadas ($a^n b^n$ para $n \\ge 3$). El árbol crece directo sin pasos intermedios inútiles:
  1. \`S\` $\\to$ \`aAb\`
  2. \`aAb\` $\\to$ \`aaBbb\`
  3. \`aaBbb\` $\\to$ \`aaaBbbb\`
  4. \`aaaBbbb\` $\\to$ \`aaaabbbb\`
- **Visualización:** El sistema dibujará el Árbol de Derivación demostrando cómo la palabra crece desde el centro hacia afuera, que es la marca registrada de una gramática libre de contexto.

**Árbol de Derivación particular:**
![Árbol de derivación detallado para la palabra aaaabbbb](image2.png)

### Caso de Prueba 2: Pertenencia Inválida (Rechazo)

- **Palabra a validar:** \`aabbb\`
- **Resultado Esperado:** Inválida (Rechazada)
- **Explicación del Motor:**
  La palabra está desbalanceada. El motor expande obligatoriamente \`S -> aAb\` y luego \`A -> aBb\`, generando como mínimo la base de dos 'a' y dos 'b'. Nunca podrá encajar con el tamaño o forma de \`aabbb\`. Se detiene rápido sin hacer loops raros y rechazará la cadena limpiamente.

**Error por no pertenencia:**
![Mensaje de error mostrado al validar la palabra aabbb](image3.png)
---

## Gramática 2: Lenguaje $a^+bc$ (Lineal con Recursión)

Diseñaremos una gramática que cumple estrictamente con los requisitos, pero que incluye una recursión para generar infinitas palabras del estilo "cualquier cantidad de 'a' seguidas de una 'b' y una 'c'".

- **No Terminales ($\\Sigma_{NT}$):** \`S, A, B\`
- **Terminales ($\\Sigma_T$):** \`a, b, c\`
- **Símbolo Inicial:** \`S\`
- **Producciones:**
  - \`S -> aS\`
  - \`S -> aA\`
  - \`A -> bB\`
  - \`B -> c\`

  ![Configuración de la Gramática 2 en la interfaz](image4.png)
  ![Visualización del Árbol de Derivación General para la Gramática 2](image5.png)

### Caso de Prueba 3: Pertenencia Válida (Éxito)

- **Palabra a validar:** \`aabc\`
- **Resultado Esperado:** Válida (Aceptada)
- **Explicación del Motor:**
  Gracias a la recursión \`S -> aS\`, el lenguaje es infinito ($a^+ bc$). Para derivar \`aabc\`, hace esto:
  1. \`S\` $\\to$ \`aS\`
  2. \`aS\` $\\to$ \`aaA\`
  3. \`aaA\` $\\to$ \`aabB\`
  4. \`aabB\` $\\to$ \`aabc\`
- **Visualización:** El Árbol General mostrará una expansión lineal por la derecha de 5 niveles de profundidad. Sigue siendo muy limpio para la interfaz pero con más dinamismo.

**Árbol de Derivación particular:**
![Árbol de derivación detallado para la palabra aabc](image6.png)

### Caso de Prueba 4: Terminación Incorrecta (Rechazo)

- **Palabra a validar:** \`aac\`
- **Resultado Esperado:** Inválida (Rechazada)
- **Explicación del Motor:**
  1. El motor puede derivar \`S -> aS -> aaA\` intentando armar las dos 'a'.
  2. Pero al llegar a \`A\`, la única salida válida es \`A -> bB\`, obligando a que venga una 'b'.
  3. Como la palabra tiene una 'c' en lugar de la 'b' esperada, las ramas se cortan ahí mismo y rechaza la cadena.

**Error por no pertenencia:**
![Mensaje de error mostrado al validar la palabra aac](image7.png)
`;

export const TestCasesView: React.FC = () => {
  return (
    <div style={{ color: '#374151', lineHeight: '1.6' }}>
      <ReactMarkdown 
        remarkPlugins={[remarkMath]} 
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#111827', marginBottom: '1.5rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginTop: '2.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
              {children}
            </h3>
          ),
          p: ({ children }) => <p style={{ marginBottom: '1rem' }}>{children}</p>,
          ul: ({ children }) => <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>{children}</ul>,
          li: ({ children }) => <li style={{ marginBottom: '0.5rem' }}>{children}</li>,
          code: ({ children }) => (
            <code style={{ backgroundColor: '#f3f4f6', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.9em', fontFamily: 'monospace', color: '#eb5757' }}>
              {children}
            </code>
          ),
          hr: () => <hr style={{ border: '0', borderTop: '1px solid #e5e7eb', margin: '2rem 0' }} />,
          img: ({ src, alt, ...props }) => (
            <div style={{ margin: '2rem 0', textAlign: 'center' }}>
              <img 
                {...props} 
                src={`/${src}`} 
                alt={alt}
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto', 
                  borderRadius: '12px', 
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #f3f4f6' 
                }} 
              />
              {alt && <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem', fontStyle: 'italic' }}>{alt}</p>}
            </div>
          )
        }}
      >
        {testCasesMarkdown}
      </ReactMarkdown>
    </div>
  );
};
