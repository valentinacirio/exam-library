//Header, component con il titolo dell'applicazione e tasto "Aggiungi Esame" 

import React from 'react';
import { FiPlus } from 'react-icons/fi'; //Importa l'icona del + da React Icons

/**
 * @param {Object} props proprietà del component
 * @param {Function} props.onAddExam - proprietà che chiama funzione per aprire la modal add exam
 */
function Header({ onAddExam }) {
  return (
    <header className="header">
      <h1>Gestione Esami Universitari</h1>
      
      {/*bottone per aggiungere esame apre finestra di dialogo */}
      <button 
        className="add-button" 
        onClick={onAddExam}
      >
        <FiPlus /> Aggiungi Esame
      </button>
    </header>
  );
}

export default Header;
