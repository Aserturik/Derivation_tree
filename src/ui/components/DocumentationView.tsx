import React from 'react';

export const DocumentationView: React.FC = () => {
  return (
    <div style={{ padding: '24px', lineHeight: '1.6', color: '#374151', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#111827', marginBottom: '24px', fontWeight: 'bold' }}>
        Documentación Técnica del Sistema
      </h1>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#1f2937', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          1. Pipeline de Ejecución y Arquitectura
        </h2>
        <p style={{ marginBottom: '12px' }}>
          El sistema está construido sobre una arquitectura <strong>MVP (Model-View-Presenter)</strong> adaptada a React. Este enfoque garantiza que la lógica dura de teoría de lenguajes formales no se mezcle con los componentes visuales:
        </p>
        <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
          <li style={{ marginBottom: '8px' }}><strong>Entrada de Usuario (View):</strong> El usuario ingresa símbolos terminales, no terminales, producciones y el axioma inicial a través del <code>GrammarForm</code>.</li>
          <li style={{ marginBottom: '8px' }}><strong>Validación del Modelo (Model):</strong> La gramática se valida de forma estricta utilizando esquemas de Zod (<code>src/schemas/grammar.ts</code>), asegurando la integridad matemática de los datos.</li>
          <li style={{ marginBottom: '8px' }}><strong>Procesamiento (Presenter):</strong> El <code>DerivationPresenter</code> orquesta el flujo. Es el puente que recibe la gramática y utiliza el <code>DerivationEngine</code> subyacente para calcular las derivaciones.</li>
          <li><strong>Renderizado (View):</strong> Los resultados (estado de validación y XML) retornan a la vista para ser dibujados en pantalla.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#1f2937', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          2. Proceso de Validación de Gramática
        </h2>
        <p style={{ marginBottom: '12px' }}>
          El motor central (<code>DerivationEngine</code>) evalúa si una palabra puede ser generada por la gramática definida mediante un proceso de exploración del espacio de búsqueda:
        </p>
        <ol style={{ paddingLeft: '24px', marginBottom: '16px' }}>
          <li style={{ marginBottom: '8px' }}>Se parte del <strong>Axioma Inicial</strong>.</li>
          <li style={{ marginBottom: '8px' }}>Se aplican las reglas de producción iterativamente, expandiendo los símbolos no terminales.</li>
          <li style={{ marginBottom: '8px' }}>El motor utiliza algoritmos de búsqueda para generar posibles cadenas.</li>
          <li>Si la cadena coincide con la palabra objetivo, se registra la secuencia exacta de producciones (<em>Camino de éxito</em>). Si se agota el espacio de búsqueda o se supera el límite de profundidad sin coincidencias, la palabra es rechazada.</li>
        </ol>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#1f2937', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          3. Generación de XML para la Vista
        </h2>
        <p style={{ marginBottom: '12px' }}>
          Para que el usuario pueda visualizar los árboles gráficamente, la estructura matemática en memoria debe transformarse en un formato estándar. Aquí es donde entra la capa de transformación a XML:
        </p>
        <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
          <li style={{ marginBottom: '8px' }}><strong>Nodos:</strong> Cada estado intermedio de la cadena en derivación se convierte en un nodo XML.</li>
          <li style={{ marginBottom: '8px' }}><strong>Aristas (Edges):</strong> Las transiciones (la regla de producción aplicada para mutar la cadena) se mapean como conexiones dirigidas entre los nodos.</li>
          <li>El motor recorre la estructura de árbol generada internamente y serializa estos datos en un string XML compatible con el motor de renderizado gráfico de la aplicación.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#1f2937', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          4. Renderizado de Árboles (General y Particular)
        </h2>
        <p style={{ marginBottom: '12px' }}>
          El sistema provee dos perspectivas clave para entender el comportamiento de la gramática:
        </p>
        <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#111827', marginBottom: '8px' }}>Árbol General</h3>
          <p style={{ margin: 0 }}>
            Muestra el espacio de búsqueda completo explorado por el motor (hasta el límite de profundidad configurado). Es una herramienta analítica excelente para observar la complejidad, recursividad y bifurcaciones posibles que permite la gramática ingresada.
          </p>
        </div>
        <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#111827', marginBottom: '8px' }}>Árbol Particular (Derivación)</h3>
          <p style={{ margin: 0 }}>
            Se activa únicamente cuando una palabra es validada exitosamente. Muestra <strong>exclusivamente</strong> el camino directo (la rama ganadora) desde el axioma hasta la cadena final. Permite auditar exactamente qué producciones se utilizaron para llegar al resultado.
          </p>
        </div>
      </section>
    </div>
  );
};
