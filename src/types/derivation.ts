export interface DerivationNode {
  id: number;
  symbol: string;
  isTerminal: boolean;
  children?: DerivationNode[];
}

export interface ValidationResult {
  isValid: boolean;
  word: string;
  derivationTree?: DerivationNode;
  error?: string;
}
