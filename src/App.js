import React from 'react';
import EntryComponent from './EntryComponent/EntryComponent';
import HeaderComponent from './HeaderComponent/HeaderComponent';
import './App.scss';

const App = () => {
  return (
    <div className="page">
      <HeaderComponent name="Войти в систему" />
      <EntryComponent />
    </div>
  );
}

export default App;
