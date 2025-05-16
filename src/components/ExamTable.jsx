/*ExamTable, component che mostra gli esami in una tabella
include i dettagli dell'esame e i tasti per modificare o eliminare
*/

import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi'; //importa le icone della matita e del cestino

/**ExamTable component
 * @param {Object} props - Component props
 * @param {Array} props.exams - Array di esami da mostrare
 * @param {Function} props.formatDate - Function to format date strings
 * @param {Function} props.onEdit - Chiama la funzione quando il tasto di modifica viene cliccato
 * @param {Function} props.onDelete - Chiama la funzione quando il tasto elimina viene cliccato
 */
function ExamTable({ exams, formatDate, onEdit, onDelete }) {
  return (
    <table className="exams-table">
      <thead>
        <tr>
          <th>Nome Esame</th>
          <th>Data</th>
          <th>Voto</th>
          <th>Crediti</th>
          <th>Stato</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        {/*mostra nome esame a cui assegnato un id unico come chiave*/}
        {exams.map(exam => (
          <tr key={exam.id}>
            <td>{exam.name}</td>
            {/*mostra data*/}
            <td>{formatDate(exam.date)}</td>
            {/*mostra "30 e lode" se voto 31, altrimenti voto normale*/}
            <td>{exam.grade === 31 ? '30 e lode' : exam.grade}</td>
            <td>{exam.credits}</td>
            <td>
              {/*applica classe css diversa in base allo stato dell'esame*/}
              <span className={`status ${exam.status}`}>
                {exam.status === 'passed' ? 'Promosso' : 'Bocciato'}
              </span>
            </td>
            <td className="action-buttons">
              {/*bottone modifica e icona matita*/}
              <button 
                className="edit-button"
                onClick={() => onEdit(exam)}
              >
                <FiEdit2 /> 
              </button>
              {/*bottone elimina e icona cestino*/}
              <button 
                className="delete-button"
                onClick={() => onDelete(exam)}
              >
                <FiTrash2 />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExamTable;
