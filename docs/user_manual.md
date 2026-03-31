# Manual de Usuario - Derivation Tree

Bienvenido a **Derivation Tree**, tu validador y visualizador interactivo de Gramáticas Formales. Esta herramienta está diseñada para que puedas experimentar, visualizar y validar gramáticas libres de contexto (y regulares) de una forma sencilla y visual.

---

## 🚀 1. Configuración de la Gramática

El panel izquierdo de la aplicación está dedicado a la definición de tu gramática formal $G = (\Sigma_T, \Sigma_{NT}, S, P)$.

### 1.1. Símbolos No Terminales ($\Sigma_{NT}$)
* **¿Qué son?** Son las variables de tu gramática que pueden derivar en otros símbolos (ej. `S`, `A`, `B`).
* **¿Cómo ingresarlos?** Escríbelos separados por comas. Por convención, se suelen usar letras mayúsculas.
* *Ejemplo:* `S, A, B`

### 1.2. Símbolos Terminales ($\Sigma_T$)
* **¿Qué son?** Son los caracteres literales que formarán las palabras finales generadas por la gramática (ej. `a`, `b`, `0`, `1`).
* **¿Cómo ingresarlos?** Escríbelos separados por comas. Por convención, se usan letras minúsculas o números.
* *Ejemplo:* `a, b, c`

### 1.3. Símbolo Inicial ($S$)
* **¿Qué es?** Es el símbolo no terminal por el cual comienza cualquier derivación.
* **¿Cómo ingresarlo?** Selecciona uno de los símbolos no terminales que definiste previamente desde el menú desplegable.

### 1.4. Producciones ($P$)
* **¿Qué son?** Son las reglas de sustitución de tu gramática (ej. `S -> aA | b`).
* **¿Cómo ingresarlas?**
  1. Haz clic en **"Agregar Producción"**.
  2. Selecciona el símbolo No Terminal de origen (lado izquierdo de la regla).
  3. Escribe la derivación (lado derecho de la regla) usando los símbolos definidos.
  4. Para representar la cadena vacía (Epsilon / $\epsilon$), puedes dejar el campo en blanco o usar el símbolo específico indicado en la interfaz.

> **⚠️ Importante:** Una vez configurados todos los parámetros, presiona el botón **Guardar Gramática** para que el sistema procese tu configuración y habilite las herramientas visuales en el panel derecho.

---

## 🌳 2. Visualización y Validación

Una vez guardada la gramática, el panel derecho se activará con tres herramientas principales:

### 2.1. Visualización de la Gramática
Muestra un resumen claro y matemático de la gramática que acabas de configurar, ideal para verificar que no haya errores tipográficos en tus conjuntos o producciones.

### 2.2. Árbol de Derivación General
* Esta sección dibuja automáticamente el árbol de derivación de tu gramática comenzando desde el Símbolo Inicial.
* Te permite explorar visualmente cómo se expanden las producciones y qué caminos puede tomar la generación de cadenas.
* Puedes interactuar con el árbol (hacer zoom, arrastrar) para explorar gramáticas complejas con mayor facilidad.

### 2.3. Validador de Palabras
* **¿Para qué sirve?** Para comprobar si una palabra específica puede ser generada por tu gramática.
* **¿Cómo usarlo?**
  1. Escribe la cadena (formada solo por los símbolos terminales definidos) en el campo de texto.
  2. Presiona el botón para validar.
  3. El sistema evaluará todos los caminos posibles de derivación y te indicará con un mensaje de éxito o error si la palabra pertenece o no al lenguaje generado por la gramática $L(G)$.

---

## 📖 3. Documentación Técnica Integrada

Si en algún momento deseas entender cómo funciona la herramienta por debajo (algoritmos, arquitecturas o decisiones de diseño), puedes hacer clic en el botón superior derecho **"Ver Documentación"**. 

Esto ocultará temporalmente la vista de árboles y mostrará una vista de lectura con los detalles técnicos del proyecto. Para volver a tu gramática, simplemente haz clic en **"Cerrar Documentación"**.