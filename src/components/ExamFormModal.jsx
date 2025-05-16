/*ExamFormModal, componente modal per aggiungere o modificare esame
Provides a form with validation and handles state management
*/

import React, { useState } from 'react';

/**
 * @param {Object} props - proprietà componente
 * @param {Object} props.exam //nelle greffe {} diciamo che tipo di oggetto è la proprietà
 * @param {Function} props.onClose - chiude la finestra di dialogo, vedi App.jsx riga 178
 * @param {Function} props.onSubmit - submit the data
 * @param {boolean} props.isEdit - booleano indica se si tratta di modifica (true) o operazione di eliminazione (false). vedi riga 63
 */
function ExamFormModal({ exam, onClose, onSubmit, isEdit }) {
  //componente hook useState initializza uno stato con i dati esistenti degli esami o valori di default
  const [formData, setFormData] = useState({
    name: exam?.name || '',
    date: exam?.date || '',
    grade: exam?.grade || 0,
    credits: exam?.credits || 0,  //sono i valori default dentro la modal
  });
  
  /**gestisce i cambiamenti messi in input
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target; //prende il nome del campo(name) e il value inserito dall'utente
    let processedValue = value;
    
    //se il campo (name) è grade
    if (name === 'grade') {
      processedValue = Math.min(31, Math.max(0, parseInt(value) || 0)); //val min 0, val max 31, nessun val=0
    } else if (name === 'credits') { //se il campo credits
      processedValue = Math.max(0, parseInt(value) || 0); //valore min 0, se non mette nessun valore = 0
    }
    
    setFormData({
      ...formData,
      [name]: processedValue
    });
  };
  
  /**gestore per fare submit
   * @param {Object} e - Event object
   */
  const handleSubmit = (e) => {
    e.preventDefault(); //fa si che il form non si invii da solo al suo completamento
    
    //calcola lo status dell'esame in base al voto
    const status = formData.grade >= 18 ? 'passed' : 'failed';
    
    onSubmit({ //funzione submit contiene formData e lo status che è stato calcolato
      ...formData,
      status
    });
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          {/*header della modal con titolo: se isEdit quindi tasto per modificare compare titolo Modifica esame, altrimenti (tasto Aggiungi esame) compare titolo Aggiungi Nuovo Esame*/}
          <h2>{isEdit ? 'Modifica Esame' : 'Aggiungi Nuovo Esame'}</h2> 
          <button className="close-button" onClick={onClose}>×</button> {/*bottone x per chiudere*/}
        </div>
        
        {/*form*/}
        <form onSubmit={handleSubmit}>
          {/*campo per inserire nome*/}
          <div className="form-group">
            <label htmlFor="name">Nome Esame</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          {/*campo per inserire data*/}
          <div className="form-group">
            <label htmlFor="date">Data Esame</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          {/*campo per inserire voto*/}
          <div className="form-group">
            <label htmlFor="grade">Voto (0-31)</label>
            <input
              type="number"
              id="grade"
              name="grade"
              min="0"
              max="31"
              value={formData.grade}
              onChange={handleChange}
              required
            />
            {/*mostra un messaggio se voto = 31*/}
            {formData.grade === 31 && (
              <p style={{ color: 'var(--primary-color)', marginTop: '5px' }}>
                Sarà visualizzato come "30 e lode"
              </p>
            )}
          </div>
          
          {/*campo per inserire crediti*/}
          <div className="form-group">
            <label htmlFor="credits">Crediti</label>
            <input
              type="number"
              id="credits"
              name="credits"
              min="1"
              value={formData.credits}
              onChange={handleChange}
              required
            />
          </div>
          
          {/*stato esame calcolato automaticamente in base al voto*/}
          <div className="form-group">
            <label>Stato</label>
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              borderRadius: 'var(--border-radius)',
              color: formData.grade >= 18 ? 'var(--success-color)' : 'var(--error-color)'
            }}>
              {formData.grade >= 18 ? 'Promosso' : 'Bocciato'}
            </div>
          </div>
          
          {/*bottoni del form*/}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Annulla
            </button>
            <button type="submit" className="submit-button">
              {/*tasto Salva modifiche se il form si apre dal tasto per modicficare esame altrimenti tasto Aggiungi Esame*/}
              {isEdit ? 'Salva Modifiche' : 'Aggiungi Esame'} 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExamFormModal;
