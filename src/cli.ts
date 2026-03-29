import { DerivationEngine } from "./schemas/derivation";
import { grammarSchema } from "./schemas/grammar";

console.log("=== Motor de Derivación ===");

// 1. Definimos una gramática válida (Ej: S -> a A, A -> b)
const rawGrammar = {
  terminals: ["a", "b", "c"],
  nonTerminals: ["S", "A", "B"],
  axiom: "S",
  productions: [
    { left: "S", right: ["a", "A"] },
    { left: "A", right: ["b"] },
    { left: "A", right: ["c", "B"] },
    { left: "B", right: ["b"] },
  ],
};

// 2. Validamos la gramática con Zod para asegurar que el contrato se cumple
const parseResult = grammarSchema.safeParse(rawGrammar);

if (!parseResult.success) {
  console.error("Error en la definición de la gramática:", parseResult.error.format());
  throw new Error("Invalid grammar");
}

const grammar = parseResult.data!;
console.log("Gramática validada correctamente.\\n");

// 3. Instanciamos el motor
const engine = new DerivationEngine(grammar);

// 4. Palabra a validar
const targetWord = "acb";
console.log(`Evaluando palabra: "${targetWord}"...`);

const result = engine.validateWord(targetWord);

// 5. Resultados
if (result.isValid && result.derivationTree) {
  console.log("\\n¡Palabra válida! Árbol de derivación generado:\\n");
  const xml = engine.generateXML(result.derivationTree);
  console.log(xml);
} else {
  console.error("\\nError al derivar:", result.error);
}
