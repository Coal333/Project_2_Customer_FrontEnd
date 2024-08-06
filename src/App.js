import React, { useState } from 'react';
import QueueStatus from './QueueStatus';
import Register from './Register';
import WaitingNumber from './WaitingNumber';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('queue');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'queue' && <QueueStatus navigateTo={navigateTo} />}
      {currentPage === 'register' && <Register navigateTo={navigateTo} />}
      {currentPage === 'waitingNumber' && <WaitingNumber navigateTo={navigateTo} />}
    </div>
  );
}

export default App;