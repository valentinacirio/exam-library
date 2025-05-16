import { useState, useEffect } from 'react';
import './App.css';
import { formatDate } from './utils/dateUtils';

//importo i componenti
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SearchSort from './components/SearchSort';
import ExamTable from './components/ExamTable';
import EmptyState from './components/EmptyState';
import ExamFormModal from './components/ExamFormModal';
import ConfirmationModal from './components/ConfirmationModal';

//Dati iniziali per popolare l'app quando ancora non ci sono dati salvati
const initialExams = [
  {
    id: 1,
    name: 'Matematica',
    date: '2023-01-15',
    grade: 30,
    credits: 12,
    status: 'passed'
  },
];

function App() {
  /*useState componente hook per creare e gestire variabili di stato:
  exams è un array di esami inizializzata con gli esami nel localStorage, se vuoto con initialExams, è uno stato
  searchTerm è la stringa per filtrare gli esami per nome
  sortConfig determina come devono essere ordinati (ordine asc o desc)
  ShowAddModal, ShowEditModal, ShowDeleteModal gestiscono la visibilità delle finestre di dialogo,
  messe a false di default
  CurrentExam tiene traccia dell'esame che si sta cercando di modificare o eliminare al momento
  */
  const [exams, setExams] = useState(() => {
    const savedExams = localStorage.getItem('exams');
    return savedExams ? JSON.parse(savedExams) : initialExams;
  });
  //stati:
  const [searchTerm, setSearchTerm] = useState(''); //la search bar inizialmete vuota
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [showAddModal, setShowAddModal] = useState(false); //le modal inizialmente chiuse
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentExam, setCurrentExam] = useState(null); //current exam è lo stato tenente traccia dell'esame attualmente selezionato
  
  //Hook che salva gli esami nel localStorage ogni volta che cambiano
  useEffect(() => {
    localStorage.setItem('exams', JSON.stringify(exams));
  }, [exams]);
  
  //Calcoliamo le statistiche per la dashboard (media calcolata fino a 30 anche se voto=31 per "30 e lode")
  const totalExams = exams.length;
  const passedExams = exams.filter(exam => exam.status === 'passed').length;
  const failedExams = exams.filter(exam => exam.status === 'failed').length;
  const averageGrade = exams.length > 0 
    ? (exams.reduce((sum, exam) => sum + (exam.grade > 30 ? 30 : exam.grade), 0) / totalExams).toFixed(2) 
    : 0;
  
  //Filtro gli esami in base a ciò che scrivo (ricerca è case-insensitive)
  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  /*Quando cerco un esame gli esami si ordinano in base all'ordine attuale in cui sono elencati
  Crea un nuovo array(sortedExams, copia dell'array filteredExams) per non modificare l'originale (filteredExams)
  sortConfig.Key stabilisce una chiave con cui ordinare, in questo caso a,b quindi lettere 
  */
  const sortedExams = [...filteredExams].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1; //restituisce 1 o -1 a seconda se asc o desc
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0; //0 se i valori sono uguali. Quindi non viene cambiato l'ordine
  });
  
  //requestSort cambia l'ordine in cui sono elencati gli esami quando si clicca sui tasti appositi
  //key è la chiave con cui si sceglie come ordinare (nome, crediti, voto)
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  //funzione handleSubmit per modificare o aggiungere un esame
  const handleSubmit = (exam) => {
    if (currentExam) { //se currentExam esiste
      //lo modofichiamo, setExams aggiorna con i nuovi dati (mantiene stesso id)
      setExams(exams.map(e => e.id === currentExam.id ? { ...exam, id: currentExam.id } : e));
    } else {
      //altrimenti se currentExam non esiste lo aggiungiamo
      const newExam = { //creando newExam
        ...exam,
        id: Date.now(), //genera un ID 
        status: exam.grade >= 18 ? 'passed' : 'failed' //determina in automatico se passato o meno
      };
      setExams([...exams, newExam]);
    }
    setShowAddModal(false); //ora chiude le finestre di dialogo settandole su false
    setShowEditModal(false);
    setCurrentExam(null);
  };
  
  //handleDelete rimuove currentExam dall'array exams
  const handleDelete = () => {
    if (currentExam) {
      setExams(exams.filter(exam => exam.id !== currentExam.id)); //Filtra l'array exams rimuovendo 
      //l'esame che ha lo stesso id di quello attualmente selezionato (currentExam)
      setShowDeleteModal(false);
      setCurrentExam(null);
    }
  };
  
  //Modal control functions
  //Queste funzioni gestiscono lo stato per aprire le varie finestre di dialogo (modals)
  //Apre modal per aggiungere esame
  const handleAddExam = () => {
    setCurrentExam(null); //null perchè non siamo su un exam esistente, vogliamo crearne uno
    setShowAddModal(true);
  };
  //Apre modal per modificare esame specifico
  const handleEditExam = (exam) => {
    setCurrentExam(exam);
    setShowEditModal(true);
  };
  //Apre la modal per confermare eliminazione di un esame specifico
  const handleDeleteExam = (exam) => {
    setCurrentExam(exam);
    setShowDeleteModal(true);
  };
  
  
  return (
    <div className="app">
      {/*Header con titolo dell'app e tasto aggiungi esame*/}
      <Header onAddExam={handleAddExam} /> {/* <Componente proprietà = {valore}/> */}
      
      <div className="container">
        {/*Componente Dashboard che mostra le statistiche*/}
        <Dashboard 
          totalExams={totalExams}
          averageGrade={averageGrade}
          passedExams={passedExams}
          failedExams={failedExams}
        />
        
        {/*componente SearchSort per cercare e ordinare gli esami*/}
        <SearchSort 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortConfig={sortConfig}
          requestSort={requestSort}
          setSortConfig={setSortConfig}
        />
        
        {/*Quando si cercano gli esami per lettere mostra esami se ce ne sono*/}
        {sortedExams.length > 0 ? (
          <ExamTable 
            exams={sortedExams}
            formatDate={formatDate}
            onEdit={handleEditExam}
            onDelete={handleDeleteExam}
          />
        ) : (
          <EmptyState onAddExam={handleAddExam} /> //oppure EmptyState (dice che non ci sono esami) e tasto 
          //aggiungi esame (sia se non ce n'è nessuno con le lettere cercate sia se non ci sono proprio esmi)
        )}
      </div>
      
      {/*Modal per aggiungere/modificare esami (mostrate solo quando showAddModal or showEditModal sono true)*/}
      {(showAddModal || showEditModal) && (
        <ExamFormModal 
          exam={currentExam}
          onClose={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            setCurrentExam(null);
          }}
          onSubmit={handleSubmit} //proprietà={valore}
          isEdit={showEditModal} //proprietà={valore}
        />
      )}
      
      {/*modal di conferma per eliminare esame (mostrata solo quando showDeleteModal è true)*/}
      {showDeleteModal && (
        <ConfirmationModal
          message={`Sei sicuro di voler eliminare l'esame "${currentExam?.name}"?`}
          onConfirm={handleDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setCurrentExam(null);
          }}
        />
      )}
    </div>
  );
}

export default App;