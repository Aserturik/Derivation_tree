# Casos de Prueba - Derivation Tree

Este documento detalla 4 casos de prueba técnicos (2 de pertenencia válida y 2 de rechazo) diseñados para comprobar el correcto funcionamiento del motor de inferencia matemática y el algoritmo de derivación por la izquierda implementado en el sistema.

Puedes ingresar estas gramáticas exactas en la interfaz del programa para replicar y visualizar los resultados.

---

## 🧪 Gramática 1: Lenguaje de Palíndromos (Libre de Contexto)

Diseñaremos una gramática que genere palíndromos binarios de longitud par.
* **No Terminales ($\Sigma_{NT}$):** `S`
* **Terminales ($\Sigma_T$):** `0, 1`
* **Símbolo Inicial:** `S`
* **Producciones:**
  * `S -> 0S0`
  * `S -> 1S1`
  * `S -> ε` *(cadena vacía, dejar campo derecho en blanco)*

### Caso de Prueba 1: Pertenencia Válida (Éxito)
* **Palabra a validar:** `0110`
* **Resultado Esperado:** Válida (Aceptada)
* **Explicación del Motor:**
  El algoritmo aplicará derivación por la izquierda evaluando el árbol en profundidad. Encontrará el siguiente camino exitoso:
  1. `S` $\to$ `0S0`
  2. `0S0` $\to$ `01S10`
  3. `01S10` $\to$ `01ε10` $\to$ `0110`
* **Visualización:** El sistema deberá dibujar el Árbol de Derivación Particular demostrando las sustituciones paso a paso.

### Caso de Prueba 2: Pertenencia Inválida (Rechazo)
* **Palabra a validar:** `010`
* **Resultado Esperado:** Inválida (Rechazada)
* **Explicación del Motor:**
  La palabra es un palíndromo, pero de longitud *impar*. Nuestra gramática solo admite palíndromos de longitud par. El motor evaluará recursivamente las combinaciones, pero se detendrá por restricciones de longitud o por incompatibilidad de los extremos. Agotará las opciones y devolverá un mensaje de error limpio, sin colgar la interfaz.

---

## 🧪 Gramática 2: Lenguaje $a^*b^*$ (Regular)

Diseñaremos una gramática regular que exija cero o más 'a' seguidas de cero o más 'b'.
* **No Terminales ($\Sigma_{NT}$):** `S, A, B`
* **Terminales ($\Sigma_T$):** `a, b`
* **Símbolo Inicial:** `S`
* **Producciones:**
  * `S -> A`
  * `A -> aA`
  * `A -> B`
  * `B -> bB`
  * `B -> ε`

### Caso de Prueba 3: Pertenencia Válida (Éxito)
* **Palabra a validar:** `aabb`
* **Resultado Esperado:** Válida (Aceptada)
* **Explicación del Motor:**
  1. `S` $\to$ `A`
  2. `A` $\to$ `aA`
  3. `aA` $\to$ `aaA`
  4. `aaA` $\to$ `aaB`
  5. `aaB` $\to$ `aabB`
  6. `aabB` $\to$ `aabbB`
  7. `aabbB` $\to$ `aabbε` $\to$ `aabb`
* **Visualización:** El Árbol General mostrará las expansiones lineales características de una gramática regular por la derecha, mientras que el árbol particular mostrará la traza exacta listada arriba.

### Caso de Prueba 4: Orden Inverso (Rechazo por Backtracking)
* **Palabra a validar:** `bbaa`
* **Resultado Esperado:** Inválida (Rechazada)
* **Explicación del Motor:**
  El usuario ingresa las letras correctas, pero en el orden equivocado para la gramática definida. 
  1. El motor intentará derivar `S` $\to$ `A` $\to$ `B` (para poder insertar una `b`).
  2. Logrará generar `bbB`.
  3. Sin embargo, a partir del estado `B`, las únicas producciones posibles son `bB` o `ε`. Es matemáticamente imposible volver atrás o generar una `a` desde `B`.
  4. El Backtracking confirmará que no existe ruta posible, fallando la validación y mostrando la alerta visual de rechazo.