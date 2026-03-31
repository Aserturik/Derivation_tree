# Casos de Prueba - Derivation Tree

Este documento detalla 4 casos de prueba técnicos (2 de pertenencia válida y 2 de rechazo) diseñados para comprobar el correcto funcionamiento del motor de inferencia matemática y el algoritmo de derivación por la izquierda implementado en el sistema.

Puedes ingresar estas gramáticas exactas en la interfaz del programa para replicar y visualizar los resultados.

---

## 🧪 Gramática 1: Lenguaje $a^n b^n$ anidado (Libre de Contexto)

Diseñaremos una gramática clásica de contexto libre (para mostrar anidamiento), adaptada para cumplir estrictamente con los requisitos (≥2 terminales, ≥3 no terminales, ≥3 producciones) manteniendo un árbol pequeño y simétrico.

- **No Terminales ($\Sigma_{NT}$):** `S, A, B`
- **Terminales ($\Sigma_T$):** `a, b`
- **Símbolo Inicial:** `S`
- **Producciones:**
  - `S -> aAb`
  - `A -> aBb`
  - `B -> aBb`
  - `B -> ab`

### Caso de Prueba 1: Pertenencia Válida (Éxito)

- **Palabra a validar:** `aaaabbbb`
- **Resultado Esperado:** Válida (Aceptada)
- **Explicación del Motor:**
  Sin reglas unitarias confusas (como S->A o A->B), esta gramática es directa y genera infinitas palabras balanceadas ($a^n b^n$ para $n \ge 3$). El árbol crece directo sin pasos intermedios inútiles:
  1. `S` $\to$ `aAb`
  2. `aAb` $\to$ `aaBbb`
  3. `aaBbb` $\to$ `aaaBbbb`
  4. `aaaBbbb` $\to$ `aaaabbbb`
- **Visualización:** El sistema dibujará el Árbol de Derivación demostrando cómo la palabra crece desde el centro hacia afuera, que es la marca registrada de una gramática libre de contexto.

### Caso de Prueba 2: Pertenencia Inválida (Rechazo)

- **Palabra a validar:** `aabbb`
- **Resultado Esperado:** Inválida (Rechazada)
- **Explicación del Motor:**
  La palabra está desbalanceada. El motor expande obligatoriamente `S -> aAb` y luego `A -> aBb`, generando como mínimo la base de dos 'a' y dos 'b'. Nunca podrá encajar con el tamaño o forma de `aabbb`. Se detiene rápido sin hacer loops raros y rechazará la cadena limpiamente.

---

## 🧪 Gramática 2: Lenguaje $a^+bc$ (Lineal con Recursión)

Diseñaremos una gramática que cumple estrictamente con los requisitos, pero que incluye una recursión para generar infinitas palabras del estilo "cualquier cantidad de 'a' seguidas de una 'b' y una 'c'".

- **No Terminales ($\Sigma_{NT}$):** `S, A, B`
- **Terminales ($\Sigma_T$):** `a, b, c`
- **Símbolo Inicial:** `S`
- **Producciones:**
  - `S -> aS`
  - `S -> aA`
  - `A -> bB`
  - `B -> c`

### Caso de Prueba 3: Pertenencia Válida (Éxito)

- **Palabra a validar:** `aabc`
- **Resultado Esperado:** Válida (Aceptada)
- **Explicación del Motor:**
  Gracias a la recursión `S -> aS`, el lenguaje es infinito ($a^+ bc$). Para derivar `aabc`, hace esto:
  1. `S` $\to$ `aS`
  2. `aS` $\to$ `aaA`
  3. `aaA` $\to$ `aabB`
  4. `aabB` $\to$ `aabc`
- **Visualización:** El Árbol General mostrará una expansión lineal por la derecha de 5 niveles de profundidad. Sigue siendo muy limpio para la interfaz pero con más dinamismo.

### Caso de Prueba 4: Terminación Incorrecta (Rechazo)

- **Palabra a validar:** `aac`
- **Resultado Esperado:** Inválida (Rechazada)
- **Explicación del Motor:**
  1. El motor puede derivar `S -> aS -> aaA` intentando armar las dos 'a'.
  2. Pero al llegar a `A`, la única salida válida es `A -> bB`, obligando a que venga una 'b'.
  3. Como la palabra tiene una 'c' en lugar de la 'b' esperada, las ramas se cortan ahí mismo y rechaza la cadena.
