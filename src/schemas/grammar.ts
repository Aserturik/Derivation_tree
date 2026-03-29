import { z } from "zod";

/**
 * ESQUEMA DE VALIDACIÓN DEL MODELO MATEMÁTICO (ZOD)
 * Aquí reside la "Verdad" sobre qué es y qué no es una gramática formal válida en nuestro sistema.
 * Utilizamos Zod no solo para tipar en TypeScript, sino para asegurar en tiempo de ejecución 
 * que el usuario no introduzca una gramática inconsistente.
 */

// 1. Terminales (Alfabeto minúscula/símbolos)
const terminalSchema = z
  .string()
  .regex(
    /^[a-z0-9\W]$/,
    "Terminales deben ser un solo caracter en minúscula o símbolo",
  );

// 2. No Terminales (Variables mayúscula)
const nonTerminalSchema = z
  .string()
  .regex(/^[A-Z]$/, "No Terminales deben ser una sola letra mayúscula");

// 3. Reglas de Producción (A -> α)
export const productionSchema = z.object({
  left: nonTerminalSchema,
  right: z
    .union([z.string(), z.array(z.string())])
    .transform((val) => {
      // Normalización en vuelo: 
      // Transformamos strings vacíos o símbolos nulos clásicos (λ, ε) en un array vacío
      // que representa una producción nula real para el motor.
      if (typeof val === "string") {
        const trimmed = val.trim();
        if (trimmed === "" || trimmed === "λ" || trimmed === "ε") return [];
        return trimmed.split("");
      }
      return val.filter((s) => s !== "λ" && s !== "ε");
    })
    .pipe(z.array(z.string())),
});

// 4. Esquema Raíz de la Gramática G = (V, Σ, R, S)
export const grammarSchema = z
  .object({
    terminals: z
      .array(terminalSchema)
      .min(1, "Debe haber al menos 1 terminal"),
    nonTerminals: z
      .array(nonTerminalSchema)
      .min(1, "Debe haber al menos 1 no terminal"),
    axiom: nonTerminalSchema, // Axioma Inicial (S)
    productions: z
      .array(productionSchema)
      .min(1, "Debe haber al menos 1 producción"),
  })
  // REFINAMIENTOS CRUZADOS (Reglas de Integridad de la Gramática)
  .refine(
    (data) => {
      // Regla 1: Todo lado izquierdo (A) debe estar en el conjunto de No Terminales
      return data.productions.every((prod) =>
        data.nonTerminals.includes(prod.left),
      );
    },
    {
      message:
        "El lado izquierdo de cada producción debe ser un No Terminal definido",
      path: ["productions"],
    },
  )
  .refine(
    (data) => {
      // Regla 2: El lado derecho solo puede contener símbolos definidos previamente (V ∪ Σ)
      const allSymbols = new Set([...data.terminals, ...data.nonTerminals]);
      return data.productions.every((prod) =>
        prod.right.every((symbol) => allSymbols.has(symbol)),
      );
    },
    {
      message:
        "El lado derecho contiene símbolos que no son ni Terminales ni No Terminales",
      path: ["productions"],
    },
  )
  .refine(
    (data) => {
      // Regla 3: No pueden existir producciones 100% duplicadas (ej: A -> aB y A -> aB)
      const seen = new Set<string>();
      for (const prod of data.productions) {
        const key = `${prod.left}->${prod.right.join(",")}`;
        if (seen.has(key)) return false;
        seen.add(key);
      }
      return true;
    },
    {
      message:
        "Las producciones no pueden ser exactamente iguales (duplicadas)",
      path: ["productions"],
    },
  )
  .refine((data) => data.nonTerminals.includes(data.axiom), {
    // Regla 4: El Axioma inicial debe ser un No Terminal válido
    message: "El símbolo axiomático debe estar incluido en los No Terminales",
    path: ["axiom"],
  })
  .refine(
    (data) => {
      // Regla 5: Disyunción estricta entre V y Σ (V ∩ Σ = ∅)
      const intersection = data.terminals.filter((t) =>
        data.nonTerminals.includes(t),
      );
      return intersection.length === 0;
    },
    {
      message: "Un símbolo no puede ser Terminal y No Terminal al mismo tiempo",
      path: ["terminals"],
    },
  );

export type GrammarSchema = z.infer<typeof grammarSchema>;
