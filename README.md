# Derivation Tree - Validador de Gramáticas Formales

Este proyecto es una herramienta para la validación de palabras mediante gramáticas formales $G_n = (\Sigma_T, \Sigma_{NT}, S, P_n)$. Permite ingresar gramáticas, validar palabras y visualizar árboles de derivación (particulares y generales).

---

## Cómo Correr el Proyecto

La forma más rápida y sencilla es usando **Docker**.

### Prerrequisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Ejecución

1. Clona el repositorio.
2. En la raíz del proyecto, ejecuta:

   ```bash
   docker compose up --build
   ```

3. El proyecto estará disponible en: [http://localhost:5173](http://localhost:5173)

---

## Estructura del Proyecto y Arquitectura

El proyecto sigue un patrón **MVP (Model-View-Presenter)** con interfaces estrictas en TypeScript para separar la lógica de negocio de la interfaz de usuario.

Para un desglose detallado de la responsabilidad de cada carpeta y el flujo de datos, consulta la **[Guía de Arquitectura](docs/architecture.md)**.

### Capas Principales

- **`src/schemas` (Model)**: Definición y validación de datos mediante Zod.
- **`src/presentation` (Presenter)**: Orquestadores que manejan la lógica de negocio y transformación de datos.
- **`src/ui` (View)**: Componentes de React encargados del renderizado.

---

## Rutas de Documentación

| Documento                                       | Descripción                                                       |
| :---------------------------------------------- | :---------------------------------------------------------------- |
| [Arquitectura](docs/architecture.md)            | Explicación técnica de la estructura MVP y carpetas.              |
| [Pruebas de Funcionamiento](docs/TEST_CASES.md) | 4 Casos de prueba (2 válidos, 2 inválidos) con resultados.        |
| [Guía para Agentes](Agents.md)                  | Roadmap y guía de implementación para desarrollo asistido por IA. |

---

## 🛠️ Especificaciones de Desarrollo

- **Lenguaje:** TypeScript 5.9 / React 19.
- **Entorno:** Node.js 22 (Vite 8).
- **SO Recomendado:** Linux / macOS / Windows con WSL2.
