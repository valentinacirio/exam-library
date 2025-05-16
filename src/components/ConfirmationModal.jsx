//ConfirmationModal, Modal component per confermare l'eliminazione di un esame

import React from 'react';

/**
 * @param {Object} props - Component props
 * @param {string} props.message - messaggio di conferma
 * @param {Function} props.onConfirm - richiama la funzione handleDelete
 * @param {Function} props.onCancel - chiama funzione quando l'utente annulla l'azione
 */
function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay confirmation-modal">
      <div className="modal">
        <div className="modal-header">
          <h2>Conferma</h2>
          <button className="close-button" onClick={onCancel}>×</button>
        </div>
        
        <p>{message}</p>
        
        {/*tasti annulla e conferma*/}
        <div className="confirmation-actions">
          <button className="cancel-button" onClick={onCancel}>
            Annulla
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Conferma
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
//export default per esportare il componente così che si può importare in altri file
