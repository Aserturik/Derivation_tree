export interface Production {
  left: string;
  right: string[];
}

export interface Grammar {
  terminals: string[];
  nonTerminals: string[];
  axiom: string;
  productions: Production[];
}
