import { DerivationEngine } from "../../schemas/derivation";
import type { GrammarSchema } from "../../schemas/grammar";
import type { ValidationResult } from "../../types/derivation";

export interface WordValidationState {
  validation: ValidationResult;
  xml?: string;
}

export class DerivationPresenter {
  private engine: DerivationEngine;

  constructor(grammar: GrammarSchema) {
    this.engine = new DerivationEngine(grammar);
  }

  public async validate(word: string): Promise<WordValidationState> {
    // Simulamos un delay mínimo para feedback de carga si es instantáneo
    await new Promise(resolve => setTimeout(resolve, 300));

    const validation = this.engine.validateWord(word);
    let xml: string | undefined;

    if (validation.isValid && validation.derivationTree) {
      xml = this.engine.generateXML(validation.derivationTree);
    }

    return { validation, xml };
  }
}
