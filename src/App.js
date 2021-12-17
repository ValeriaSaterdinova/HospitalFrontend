import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import EntryComponent from './EntryComponent/EntryComponent';
import HeaderComponent from './HeaderComponent/HeaderComponent';
import RecordComponent from './RecordComponent/RecordComponent';
import './App.scss';

const App = () => {
  return (
    <div className="page">
      <Switch>
        <Route path='/login'>
          <HeaderComponent name="Войти в систему" />
          <EntryComponent />
        </Route>
        <Route path='/authorization'>
          <HeaderComponent name="Зарегистрироваться в системе" />
          <RecordComponent />
        </Route>
        <Redirect from='/' to='/login' />
      </Switch>
    </div>
  );
}

export default App;
