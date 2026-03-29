import { DerivationEngine } from "../../schemas/derivation";
import type { GrammarSchema } from "../../schemas/grammar";
import type { ValidationResult } from "../../types/derivation";

export interface WordValidationState {
  validation: ValidationResult;
  xml?: string;
}

/**
 * PRESENTER: El puente entre la UI (React) y la Lógica de Dominio (DerivationEngine)
 * Separa la vista del motor matemático, permitiendo que la UI solo se preocupe
 * por mostrar datos, y el motor solo por calcular.
 */
export class DerivationPresenter {
  private engine: DerivationEngine;

  constructor(grammar: GrammarSchema) {
    // Inicializamos el motor inyectándole la gramática previamente validada por Zod
    this.engine = new DerivationEngine(grammar);
  }

  /**
   * Orquesta la validación de una palabra dada por el usuario.
   * 1. Llama al motor.
   * 2. Si el motor la valida como correcta, orquesta la transformación a XML.
   * 3. Devuelve un estado consolidado a la vista.
   */
  public async validate(word: string): Promise<WordValidationState> {
    // UX Touch: Simulamos un delay mínimo para evitar un "parpadeo" inmediato 
    // en la interfaz cuando el cálculo es absurdamente rápido.
    // Da sensación de "proceso" al usuario.
    await new Promise(resolve => setTimeout(resolve, 300));

    // Ejecución del Core
    const validation = this.engine.validateWord(word);
    let xml: string | undefined;

    // Si la palabra pertenece al lenguaje, extraemos el XML del camino de éxito
    if (validation.isValid && validation.derivationTree) {
      xml = this.engine.generateXML(validation.derivationTree);
    }

    return { validation, xml };
  }
}
