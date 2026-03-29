# 🤖 Agents.md - Guía de Desarrollo Asistido

Esta guía define el roadmap y las reglas de oro para que cualquier Agente IA o Desarrollador pueda completar el proyecto cumpliendo todos los requisitos académicos y técnicos.

## 🎯 Objetivo Final
El programa debe validar gramáticas formales $G_n = (\Sigma_T, \Sigma_{NT}, S, P_n)$, validar palabras y generar árboles de derivación (particular y general) con código estructurado en **MVP** y documentado.

---

## 🛠️ Reglas de Arquitectura (MVP + Clean)

### 1. Capa de Dominio (Model) - `src/domain/`
- **Interfaces (`interfaces/`)**: Define contratos para `Grammar`, `Production`, `DerivationNode`, `ValidationResult`.
- **Modelos (`models/`)**: Implementaciones puras de la lógica de gramáticas (clases o funciones sin efectos secundarios).
- **Casos de Uso (`use-cases/`)**: El "Motor Lógico de Derivación". Debe ser independiente de React. Ej: `validateWord(grammar, word)`.

### 2. Capa de Presentación (Presenter) - `src/presentation/`
- **Presenters (`presenters/`)**: Orquestadores de estado. Usar hooks de React o clases que implementen interfaces de presentación. Manejan la comunicación entre la UI y el Dominio.

### 3. Capa de UI (View) - `src/ui/`
- **Views (`views/`)**: Páginas principales (Ingreso de Gramática, Validación, Resultados).
- **Components (`components/`)**: Elementos reutilizables (Inputs, Visualizador de Árbol, Tablas de Producción).

---

## 🚀 Roadmap de Implementación

### Fase 1: Definición de Tipos (Priority: High)
- [ ] Crear interfaces en `src/domain/interfaces/` para `Grammar`, `Production`, `Symbol`.
- [ ] Definir el contrato del motor de derivación.

### Fase 2: Motor Lógico (Priority: High)
- [ ] Implementar algoritmo de derivación (Top-down o Bottom-up) en `src/domain/use-cases/`.
- [ ] Generación de estructura de árbol (Particular y General).
- [ ] Comentar cada función clave con JSDoc (Propósito, Parámetros, Retorno).

### Fase 3: Interfaz de Usuario (Priority: Medium)
- [ ] Formulario de ingreso de Gramática (Validar min. 2 terminales, 3 no terminales, 3 producciones).
- [ ] Input de palabra a validar.
- [ ] Renderizado de árboles (usar librerías como `react-d3-tree` o similar).

### Fase 4: Documentación y Pruebas (Priority: High)
- [ ] Completar `docs/FOLDER_STRUCTURE.md`.
- [ ] Completar `docs/TECHNICAL_DOCS.md` (funciones clave).
- [ ] Ejecutar y documentar los 4 casos de prueba en `docs/TEST_CASES.md`.
- [ ] Crear tabla de especificaciones (Lenguaje, SO, Hardware).

---

## 🧪 Casos de Prueba Obligatorios
- **Válido 1**: Gramática simple, palabra que pertenece.
- **Válido 2**: Gramática con recursividad, palabra que pertenece.
- **Inválido 1**: Palabra con símbolos no definidos.
- **Inválido 2**: Estructura de palabra correcta pero no derivable por la gramática.

---

## 📝 Notas para el Agente
- **NO usar atajos**: Cada lógica debe estar en su capa correspondiente.
- **Comentarios**: Obligatorios en español y técnicos.
- **Manejo de Errores**: Validar entradas de usuario antes de procesar.
