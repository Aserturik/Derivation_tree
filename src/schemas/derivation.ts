import type { GrammarSchema } from "./grammar";
import type { DerivationNode, ValidationResult } from "../types/derivation";

export class DerivationEngine {
  public grammar: GrammarSchema;
  private nodeIdCounter: number = 0;

  constructor(grammar: GrammarSchema) {
    this.grammar = grammar;
  }

  private getNextId(): number {
    return this.nodeIdCounter++;
  }

  public validateWord(word: string): ValidationResult {
    this.nodeIdCounter = 0;

    // Validación previa: ¿Contiene símbolos que no están en la gramática?
    for (const char of word) {
      if (!this.grammar.terminals.includes(char)) {
        return {
          isValid: false,
          word,
          error: `Símbolo inválido: '${char}' no es un terminal de la gramática.`
        };
      }
    }
    
    const root: DerivationNode = {
      id: this.getNextId(),
      symbol: this.grammar.axiom,
      isTerminal: false,
    };

    const success = this.derive([root], word, 0);

    if (success) {
      return { isValid: true, word, derivationTree: root };
    }

    return { 
      isValid: false, 
      word, 
      error: "La palabra no pertenece a la gramática o supera el límite de profundidad (ambigüedad/loops)." 
    };
  }

  private derive(currentSequence: DerivationNode[], targetWord: string, depth: number): boolean {
    if (depth > 50) return false;

    const currentString = currentSequence.map(n => n.symbol).join('');
    const isAllTerminals = currentSequence.every(n => n.isTerminal);
    
    if (isAllTerminals) {
      return currentString === targetWord;
    }

    const nonTerminalIndex = currentSequence.findIndex(n => !n.isTerminal);
    if (nonTerminalIndex === -1) return false;

    const targetNode = currentSequence[nonTerminalIndex];

    const applicableProductions = this.grammar.productions.filter(
      p => p.left === targetNode.symbol
    );

    for (const prod of applicableProductions) {
      const newChildren: DerivationNode[] = prod.right.map(symbol => ({
        id: this.getNextId(),
        symbol: symbol,
        isTerminal: this.grammar.terminals.includes(symbol)
      }));

      targetNode.children = newChildren;

      const newSequence = [
        ...currentSequence.slice(0, nonTerminalIndex),
        ...newChildren,
        ...currentSequence.slice(nonTerminalIndex + 1)
      ];

      if (this.derive(newSequence, targetWord, depth + 1)) {
        return true;
      }

      targetNode.children = undefined;
    }

    return false;
  }

  public generateXML(root: DerivationNode): string {
    const states: string[] = [];
    const transitions: string[] = [];

    const traverse = (node: DerivationNode, x: number, y: number) => {
      states.push(`
<state id="${node.id}" name="${node.symbol}">
<x>${x.toFixed(1)}</x>
<y>${y.toFixed(1)}</y>
${node.id === 0 ? '<initial/>\n' : ''}${node.isTerminal ? '<final/>\n' : ''}</state>`);

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
<!--The list of states-->${states.join('')}
<!--The list of transitions-->${transitions.join('')}
</automaton>
</structure>`;
  }
}
