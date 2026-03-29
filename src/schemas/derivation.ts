import type { GrammarSchema } from "./grammar";
import type { DerivationNode, ValidationResult } from "../types/derivation";

/**
 * Motor central de derivación para gramáticas formales.
 * Se encarga de validar palabras, generar árboles de derivación y exportar a XML.
 */
export class DerivationEngine {
  public grammar: GrammarSchema;
  private nodeIdCounter: number = 0;

  constructor(grammar: GrammarSchema) {
    this.grammar = grammar;
  }

  /** Genera un ID incremental único para cada nodo del árbol visual */
  private getNextId(): number {
    return this.nodeIdCounter++;
  }

  /**
   * Valida si una palabra pertenece al lenguaje definido por la gramática.
   * Utiliza una búsqueda en profundidad (DFS) con derivación por la izquierda.
   */
  public validateWord(word: string): ValidationResult {
    this.nodeIdCounter = 0;

    // 1. Verificación preliminar de símbolos terminales
    for (const char of word) {
      if (!this.grammar.terminals.includes(char)) {
        return {
          isValid: false,
          word,
          error: `Símbolo inválido: '${char}' no es un terminal de la gramática.`,
        };
      }
    }

    const root: DerivationNode = {
      id: this.getNextId(),
      symbol: this.grammar.axiom,
      isTerminal: false,
    };

    // Set para detectar ciclos infinitos en la rama actual (ej: A -> B -> A)
    const visitedSequences = new Set<string>();

    try {
      const success = this.derive([root], word, visitedSequences);
      if (success) {
        return { isValid: true, word, derivationTree: root };
      }

      return {
        isValid: false,
        word,
        error: `La palabra "${word}" no puede ser generada por esta gramática.`,
      };
    } catch (e: any) {
      return {
        isValid: false,
        word,
        error: e.message || "Error durante la validación.",
      };
    }
  }

  /**
   * Algoritmo recursivo de derivación.
   * @param currentSequence Secuencia actual de nodos (nodos terminales y no terminales)
   * @param targetWord Palabra objetivo a validar
   * @param visitedInBranch Historial de secuencias en la rama actual para control de recursión
   */
  private derive(
    currentSequence: DerivationNode[],
    targetWord: string,
    visitedInBranch: Set<string>,
  ): boolean {
    const currentString = currentSequence.map((n) => n.symbol).join("");

    // 2. Control de Loops: Evita recursión infinita si volvemos al mismo estado
    if (visitedInBranch.has(currentString)) {
      throw new Error(
        "Se detectó un loop infinito en la gramática (ej. A -> A).",
      );
    }

    // 3. Poda por longitud: Si ya excedimos los terminales necesarios, esta rama no sirve
    const terminalCount = currentSequence.filter((n) => n.isTerminal).length;
    if (terminalCount > targetWord.length) return false;

    // 4. Margen de seguridad para producciones vacías (λ)
    if (currentSequence.length > targetWord.length + 20) return false;

    // Caso base: ¿Llegamos a una secuencia de puros terminales?
    const isAllTerminals = currentSequence.every(
      (n) => n.isTerminal || n.symbol === "λ",
    );
    if (isAllTerminals) {
      const realWord = currentSequence
        .filter((n) => n.symbol !== "λ")
        .map((n) => n.symbol)
        .join("");
      return realWord === targetWord;
    }

    // Estrategia: Derivación por la izquierda (expandir el primer No Terminal encontrado)
    const nonTerminalIndex = currentSequence.findIndex((n) => !n.isTerminal);
    if (nonTerminalIndex === -1) return false;

    const targetNode = currentSequence[nonTerminalIndex];
    const applicableProductions = this.grammar.productions.filter(
      (p) => p.left === targetNode.symbol,
    );

    visitedInBranch.add(currentString);

    for (const prod of applicableProductions) {
      const newChildren: DerivationNode[] =
        prod.right.length > 0
          ? prod.right.map((symbol) => ({
              id: this.getNextId(),
              symbol: symbol,
              isTerminal: this.grammar.terminals.includes(symbol),
            }))
          : [
              {
                id: this.getNextId(),
                symbol: "λ",
                isTerminal: true,
                children: [], 
              },
            ];

      targetNode.children = newChildren;

      const newSequence = [
        ...currentSequence.slice(0, nonTerminalIndex),
        ...(prod.right.length > 0 ? newChildren : []),
        ...currentSequence.slice(nonTerminalIndex + 1),
      ];

      if (this.derive(newSequence, targetWord, visitedInBranch)) {
        return true;
      }

      // Backtracking: Si esta producción no llevó al éxito, limpiamos hijos
      targetNode.children = undefined;
    }

    visitedInBranch.delete(currentString);
    return false;
  }

  /**
   * Genera el espacio de búsqueda completo (Árbol General) hasta un límite.
   * Útil para visualizar todas las bifurcaciones posibles de la gramática.
   */
  public generateGeneralTree(maxDepth: number = 7): DerivationNode {
    this.nodeIdCounter = 0;
    let nodeCount = 0;
    const MAX_NODES = 1500;

    const expand = (sequence: string[], depth: number): DerivationNode => {
      nodeCount++;
      const currentString = sequence.join("");
      const isTerminal = sequence.every((sym) => this.grammar.terminals.includes(sym) || sym === "λ");

      const node: DerivationNode = {
        id: this.getNextId(),
        symbol: currentString || "λ",
        isTerminal: isTerminal,
        children: [],
      };

      if (isTerminal) return node;

      // Límites preventivos para no colapsar el renderizado del navegador
      if (depth >= maxDepth || nodeCount >= MAX_NODES) {
        node.children!.push({
          id: this.getNextId(),
          symbol: "...",
          isTerminal: false,
        });
        return node;
      }

      const nonTerminalIndex = sequence.findIndex(
        (sym) => !this.grammar.terminals.includes(sym) && sym !== "λ"
      );
      if (nonTerminalIndex === -1) return node;

      const targetSymbol = sequence[nonTerminalIndex];
      const applicableProductions = this.grammar.productions.filter(
        (p) => p.left === targetSymbol
      );

      for (const prod of applicableProductions) {
        let newSequence: string[];
        if (prod.right.length === 0 || (prod.right.length === 1 && prod.right[0] === "λ")) {
          newSequence = [
            ...sequence.slice(0, nonTerminalIndex),
            ...sequence.slice(nonTerminalIndex + 1),
          ];
          if (newSequence.length === 0) newSequence = ["λ"];
        } else {
          newSequence = [
            ...sequence.slice(0, nonTerminalIndex),
            ...prod.right,
            ...sequence.slice(nonTerminalIndex + 1),
          ];
        }
        node.children!.push(expand(newSequence, depth + 1));
      }

      return node;
    };

    return expand([this.grammar.axiom], 0);
  }

  /**
   * Transforma el árbol de derivación en un string XML compatible con JFLAP/Simuladores.
   * Calcula coordenadas básicas (X, Y) para el posicionamiento de los estados.
   */
  public generateXML(root: DerivationNode): string {
    const states: string[] = [];
    const transitions: string[] = [];

    const traverse = (node: DerivationNode, x: number, y: number) => {
      states.push(`
<state id="${node.id}" name="${node.symbol}">
<x>${x.toFixed(1)}</x>
<y>${y.toFixed(1)}</y>
${node.id === 0 ? "<initial/>\n" : ""}${node.isTerminal ? "<final/>\n" : ""}</state>`);

      if (node.children) {
        const width = 120;
        let startX = x - (width * (node.children.length - 1)) / 2;

        for (const child of node.children) {
          transitions.push(`
<transition>
<from>${node.id}</from>
<to>${child.id}</to>
</transition>`);

          traverse(child, startX, y + 100);
          startX += width;
        }
      }
    };

    traverse(root, 300, 100);

    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!--Created by Derivation Engine-->
<structure>
<type>fa</type>
<automaton>
<!--The list of states-->${states.join("")}
<!--The list of transitions-->${transitions.join("")}
</automaton>
</structure>`;
  }
}
