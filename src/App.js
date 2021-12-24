import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import EntryComponent from './EntryComponent/EntryComponent';
import HeaderComponent from './HeaderComponent/HeaderComponent';
import ReceptionComponent from './ReceptionComponent/ReceptionComponent';
import RecordComponent from './RecordComponent/RecordComponent';
import Button from '@material-ui/core/Button';
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
        <Route path='/reception'>
          <HeaderComponent name="Приемы">
            <div>
            <Link to='/login'><Button variant="outlined">Выход</Button></Link>
            </div>
          </HeaderComponent>
          <ReceptionComponent />
        </Route>
        <Redirect from='/' to='/login' />
      </Switch>
    </div >
  );
}

export default App;
