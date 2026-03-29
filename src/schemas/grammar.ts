import { z } from "zod";

const terminalSchema = z
  .string()
  .regex(
    /^[a-z0-9\W]$/,
    "Terminales deben ser un solo caracter en minúscula o símbolo",
  );
const nonTerminalSchema = z
  .string()
  .regex(/^[A-Z]$/, "No Terminales deben ser una sola letra mayúscula");

export const productionSchema = z.object({
  left: nonTerminalSchema,
  right: z
    .union([z.string(), z.array(z.string())])
    .transform((val) => (typeof val === "string" ? val.split("") : val))
    .pipe(z.array(z.string()).min(1, "La producción no puede estar vacía")),
});

export const grammarSchema = z
  .object({
    terminals: z
      .array(terminalSchema)
      .min(2, "Debe haber al menos 2 terminales"),
    nonTerminals: z
      .array(nonTerminalSchema)
      .min(3, "Debe haber al menos 3 no terminales"),
    axiom: nonTerminalSchema,
    productions: z
      .array(productionSchema)
      .min(3, "Debe haber al menos 3 producciones"),
  })
  .refine(
    (data) => {
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
      const seen = new Set<string>();
      for (const prod of data.productions) {
        // Combinamos lado izquierdo y derecho para formar una llave única de la producción completa
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
    message: "El símbolo axiomático debe estar incluido en los No Terminales",
    path: ["axiom"],
  })
  .refine(
    (data) => {
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
