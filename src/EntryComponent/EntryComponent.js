import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import building from '../Source/building.svg';
import {
  Button,
  TextField,
  Snackbar 
} from '@material-ui/core';
import './EntryComponent.scss';

const EntryComponent = () => {
  const history = useHistory();
  const ruleLogin = /^[A-Za-z0-9]{6,}$/;
  const rulePassword = /^[A-Za-z0-9]{5,}\d{1,}$/;
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, text: '' });

  const userAuthorization = async () => {
    if (ruleLogin.test(login)) {
      if (rulePassword.test(password)) {
        try {
          await axios.post('http://localhost:8000/userAuthorization', {
            login,
            password
          }).then(res => {
            localStorage.setItem('token', res.data.token);
            history.push('/reception');
          });
        } catch {
          setSnackbar({ open: true, text: 'Incorrect login or password' });
        }
      } else setSnackbar({ open: true, text: 'Password length at least 6 characters (required in Latin letters) of which 1 digit' });
    } else setSnackbar({ open: true, text: 'Login length at least 6 characters' });
  }

  const { open, text } = snackbar;

  return (
    <div className="all-element">
      <div className="image">
        <img src={building} />
      </div>
      <div className="all-table">
        <div className="table">
          <h1>Войти в систему</h1>
          <div className="field">
            <label>Login:</label>
            <TextField
              type="text"
              id="outlined-basic"
              variant="outlined"
              onBlur={(e) => setLogin(e.target.value)}
            />
            <label>Password:</label>
            <TextField
              type="password"
              id="outlined-basic"
              variant="outlined"
              onBlur={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="come">
            <Button onClick={() => userAuthorization()} variant="outlined">Войти</Button>
            <Link to='/authorization'><p>Зарегистрироваться</p></Link>
          </div>
        </div>
      </div>
      <Snackbar
        onClose={() => setSnackbar({ open: false })}
        open={open}
        autoHideDuration={6000}
        message={text} />
    </div>
  )
}

export default EntryComponent;