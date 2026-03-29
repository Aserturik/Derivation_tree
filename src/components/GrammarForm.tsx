import React, { useState } from 'react';
import type { Grammar, Production } from '../types/grammar';

interface GrammarFormProps {
  onGrammarSubmit: (grammar: Grammar) => void;
}

interface ProductionRow {
  left: string;
  right: string;
}

export const GrammarForm: React.FC<GrammarFormProps> = ({ onGrammarSubmit }) => {
  const [terminals, setTerminals] = useState('');
  const [nonTerminals, setNonTerminals] = useState('');
  const [axiom, setAxiom] = useState('');
  const [productionRows, setProductionRows] = useState<ProductionRow[]>([{ left: '', right: '' }]);
  const [error, setError] = useState<string | null>(null);

  const addRow = () => {
    setProductionRows([...productionRows, { left: '', right: '' }]);
  };

  const removeRow = (index: number) => {
    setProductionRows(productionRows.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: keyof ProductionRow, value: string) => {
    const newRows = [...productionRows];
    newRows[index][field] = value;
    setProductionRows(newRows);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const terminalsList = terminals.split(',').map(s => s.trim()).filter(Boolean);
    const nonTerminalsList = nonTerminals.split(',').map(s => s.trim()).filter(Boolean);
    
    const parsedProductions: Production[] = [];

    for (const row of productionRows) {
      if (!row.left.trim() || !row.right.trim()) continue;

      const alternatives = row.right.split('|').map(s => s.trim()).filter(Boolean);
      for (const alt of alternatives) {
        const symbols = alt.includes(' ') ? alt.split(' ').map(s => s.trim()) : alt.split('');
        parsedProductions.push({
          left: row.left.trim(),
          right: symbols
        });
      }
    }

    if (parsedProductions.length === 0) {
      setError('Debes agregar al menos una producción válida.');
      return;
    }

    const grammar: Grammar = {
      terminals: terminalsList,
      nonTerminals: nonTerminalsList,
      axiom: axiom.trim(),
      productions: parsedProductions
    };

    onGrammarSubmit(grammar);
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: '600',
    fontSize: '0.9rem',
    marginBottom: '4px',
    color: '#444'
  };

  const inputStyle: React.CSSProperties = {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    color: '#1f2937'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 16px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        color: '#1f2937',
        border: '1px solid #e5e7eb'
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="terminals" style={labelStyle}>Terminales (a, b, +)</label>
          <input 
            id="terminals"
            value={terminals}
            onChange={(e) => setTerminals(e.target.value)}
            placeholder="a, b, +"
            style={inputStyle}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="nonTerminals" style={labelStyle}>No Terminales (E, T)</label>
          <input 
            id="nonTerminals"
            value={nonTerminals}
            onChange={(e) => setNonTerminals(e.target.value)}
            placeholder="E, T, F"
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="axiom" style={labelStyle}>Símbolo Inicial (Axioma)</label>
        <input 
          id="axiom"
          value={axiom}
          onChange={(e) => setAxiom(e.target.value)}
          placeholder="E"
          style={{ ...inputStyle, width: '100px' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={labelStyle}>Producciones</label>
        {productionRows.map((row, index) => (
          <div key={`prod-${index}`} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
            <input 
              id={`left-${index}`}
              aria-label={`Símbolo no terminal de la fila ${index + 1}`}
              value={row.left}
              onChange={(e) => updateRow(index, 'left', e.target.value)}
              placeholder="NT"
              style={{ ...inputStyle, width: '60px', minWidth: '60px', textAlign: 'center' }}
            />
            <span style={{ fontWeight: 'bold', color: '#6b7280' }}>→</span>
            <input 
              id={`right-${index}`}
              aria-label={`Producciones de la fila ${index + 1}`}
              value={row.right}
              onChange={(e) => updateRow(index, 'right', e.target.value)}
              placeholder="E + T | T"
              style={{ ...inputStyle, flex: 1 }}
            />
            {productionRows.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeRow(index)}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#ef4444',
                  padding: '8px 12px',
                  minWidth: '40px'
                }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button 
          type="button" 
          onClick={addRow}
          style={{
            ...buttonStyle,
            backgroundColor: '#10b981',
            alignSelf: 'flex-start',
            marginTop: '4px'
          }}
        >
          + Añadir Producción
        </button>
      </div>

      {error && <p style={{ color: '#dc2626', margin: 0, fontSize: '14px', fontWeight: '500' }}>{error}</p>}

      <button type="submit" style={{ ...buttonStyle, marginTop: '10px' }}>
        Guardar Gramática
      </button>
    </form>
  );
};
