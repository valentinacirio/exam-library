//Dashboard, componente che mostra le statistiche degli esami

import React from 'react';

/**
 * @param {Object} props - props del component
 * @param {number} props.totalExams - numero totale esami
 * @param {string} props.averageGrade - media di tutti gli esami
 * @param {number} props.passedExams - Numero di esami passati (≥18)
 * @param {number} props.failedExams - Numero di esami non passati (<18)
 */
function Dashboard({ totalExams, averageGrade, passedExams, failedExams }) {
  return (
    <div className="dashboard">
      <div className="stat-card">
        <h3>Esami Totali</h3>
        <p>{totalExams}</p>
      </div>
      
      <div className="stat-card">
        <h3>Media Voti</h3>
        <p>{averageGrade}</p>
      </div>
      
      <div className="stat-card">
        <h3>Esami Superati</h3>
        <p>{passedExams}</p>
      </div>
      
      <div className="stat-card">
        <h3>Esami Non Superati</h3>
        <p>{failedExams}</p>
      </div>
    </div>
  );
}

export default Dashboard;
