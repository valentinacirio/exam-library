//EmptyState, componente che dice che non ci sono esami e tasto aggiungi esame

import React from 'react';
import { FiPlus } from 'react-icons/fi'; //importa icona del +

/**
 * @param {Object} props - Component props
 * @param {Function} props.onAddExam - proprietà che richiama funzione handleAddExam per aggiungere un esame
 */
function EmptyState({ onAddExam }) {
  return (
    <div className="empty-state">
      <h3>Nessun esame trovato</h3>
      
      <p>Aggiungi il tuo primo esame per iniziare a tenere traccia dei tuoi risultati.</p>
      
      {/*bottone aggiungi esame*/}
      <button onClick={onAddExam}>
        <FiPlus /> Aggiungi Esame
      </button>
    </div>
  );
}

export default EmptyState;
