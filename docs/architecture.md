# Arquitectura del Proyecto: Árbol de Derivación

Este proyecto implementa una arquitectura basada en **MVP (Model-View-Presenter)** adaptada a aplicaciones modernas con React y TypeScript, priorizando la separación de responsabilidades y la validación de datos en tiempo de ejecución.

## Estructura de Directorios

### `src/presentation/`

Contiene la **lógica de orquestación** de la aplicación.

- **`presenters/`**: Actúan como el puente entre los datos (Modelo) y la interfaz (View). Se encargan de transformar las gramáticas y derivaciones en estructuras de datos optimizadas para el renderizado, manteniendo la lógica de negocio fuera de los componentes de React.

### `src/schemas/`

Representa la **definición del Modelo** y sus reglas de integridad.

- Utiliza **Zod** para definir esquemas de validación. Aquí reside la "verdad" de lo que constituye una gramática válida (ej. reglas para terminales, no terminales y producciones).
- Garantiza que los datos que entran a la lógica de presentación sean correctos.

### `src/types/`

Define las **interfaces y tipos de TypeScript** globales.

- Proporciona tipado estático para asegurar la consistencia en todo el flujo de datos. A menudo, estos tipos se infieren directamente de los esquemas en `src/schemas/`.

### `src/ui/`

Representa la **View (Vista)** en el patrón MVP.

- **`views/`**: Componentes de alto nivel que representan pantallas o páginas completas. Son componentes "tontos" que reciben datos procesados por los Presenters.
- **`components/`**: Componentes visuales atómicos y reutilizables (botones, inputs, visualizadores de árboles) que se enfocan puramente en el renderizado y la interacción del usuario.

### `src/hooks/`

Contiene **Custom Hooks** de React.

- Encapsulan lógica de estado reutilizable o integraciones con el ciclo de vida de React que pueden ser compartidas por múltiples componentes de la UI.

### `src/assets/`

Recursos estáticos como imágenes, SVGs y fuentes que son procesados por el pipeline de construcción (Vite).

### `public/`

Archivos estáticos que se sirven directamente sin procesamiento. Ideal para el `favicon` o archivos de configuración global.

---

## Flujo de Datos (MVP)

1. **Entrada**: El usuario interactúa con la **View** (`src/ui/`).
2. **Validación**: Los datos ingresados se validan contra el **Modelo** definido en `src/schemas/`.
3. **Procesamiento**: El **Presenter** (`src/presentation/`) recibe los datos validados, ejecuta los algoritmos de derivación (lógica de negocio) y prepara el resultado.
4. **Actualización**: El Presenter entrega los datos procesados a la **View**, que se encarga de renderizar el árbol de derivación final.
