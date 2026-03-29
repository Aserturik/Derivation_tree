import { z } from 'zod';

const terminalSchema = z.string().regex(/^[a-z0-9\W]$/, 'Terminales deben ser un solo caracter en minúscula o símbolo');
const nonTerminalSchema = z.string().regex(/^[A-Z]$/, 'No Terminales deben ser una sola letra mayúscula');

export const productionSchema = z.object({
  left: nonTerminalSchema,
  right: z.array(z.string()).min(1, 'La producción no puede estar vacía'),
});

export const grammarSchema = z.object({
  terminals: z.array(terminalSchema).min(1, 'Debe haber al menos un terminal'),
  nonTerminals: z.array(nonTerminalSchema).min(1, 'Debe haber al menos un no terminal'),
  axiom: nonTerminalSchema,
  productions: z.array(productionSchema).min(1, 'Debe haber al menos una producción'),
}).refine((data) => data.nonTerminals.includes(data.axiom), {
  message: "El axioma debe estar incluido en los No Terminales",
  path: ["axiom"],
}).refine((data) => {
  const intersection = data.terminals.filter(t => data.nonTerminals.includes(t));
  return intersection.length === 0;
}, {
  message: "Un símbolo no puede ser Terminal y No Terminal al mismo tiempo",
  path: ["terminals"],
});

export type GrammarSchema = z.infer<typeof grammarSchema>;
