/**SearchSort, component per cercare e che che ordina gli esami, 
include una search bar e bottoni per ordinare in diversi criteri
*/

import React from 'react';
import { FiSearch } from 'react-icons/fi'; //Importa icona lente d'ingrandimento da React Icons

/**
 * @param {Object} props - Component props
 * @param {string} props.searchTerm - Current search term
 * @param {Function} props.setSearchTerm - Function to update search term
 * @param {Object} props.sortConfig - Current sort configuration con key e direzione (asc o desc)
 * @param {Function} props.requestSort - Function to request sorting by a key
 * @param {Function} props.setSortConfig - Function to directly set sort configuration
 */
function SearchSort({ searchTerm, setSearchTerm, sortConfig, requestSort, setSortConfig }) {
  return (
    <div className="search-sort">
      {/*barra di ricerca con icona e input field */}
      <div className="search-bar">
        <FiSearch/>
        <input type="text" placeholder="Cerca esame per nome..." value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/*Sort buttons*/}
      <div className="sort-buttons">
        {/*ordina per lettera crescente*/}
        <button 
          className={`sort-button ${sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'active' : ''}`}
          onClick={() => requestSort('name')}
        >
          Nome A-Z
        </button>
        
        {/*ordina per lettera decrescente*/}
        <button 
          className={`sort-button ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'active' : ''}`}
          onClick={() => {
            setSortConfig({ key: 'name', direction: 'desc' });
          }}
        >
          Nome Z-A
        </button>
        
        {/*ordina per creciti in ordine crescente (da basso a alto) */}
        <button 
          className={`sort-button ${sortConfig.key === 'credits' && sortConfig.direction === 'asc' ? 'active' : ''}`}
          onClick={() => requestSort('credits')}
        >
          Crediti ↑
        </button>
        
        {/*ordina per crediti in modo decrescente (da alto a basso)*/}
        <button 
          className={`sort-button ${sortConfig.key === 'credits' && sortConfig.direction === 'desc' ? 'active' : ''}`}
          onClick={() => {
            setSortConfig({ key: 'credits', direction: 'desc' });
          }}
        >
          Crediti ↓
        </button>
        
        {/*ordina per voto crescente*/}
        <button 
          className={`sort-button ${sortConfig.key === 'grade' && sortConfig.direction === 'asc' ? 'active' : ''}`}
          onClick={() => requestSort('grade')}
        >
          Voto ↑
        </button>
        
        {/*ordina per voto decrescente*/}
        <button 
          className={`sort-button ${sortConfig.key === 'grade' && sortConfig.direction === 'desc' ? 'active' : ''}`}
          onClick={() => {
            setSortConfig({ key: 'grade', direction: 'desc' });
          }}
        >
          Voto ↓
        </button>
      </div>
    </div>
  );
}

export default SearchSort;
