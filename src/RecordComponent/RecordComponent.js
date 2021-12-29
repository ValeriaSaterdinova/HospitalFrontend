import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import building from '../Source/building.svg';
import {
  Snackbar,
  Button,
  TextField
} from '@material-ui/core';
import './RecordComponent.scss';

const RecordComponent = () => {
  const history = useHistory();
  const ruleLogin = /^[A-Za-z0-9]{6,}$/;
  const rulePassword = /^[A-Za-z0-9]{5,}\d{1,}$/;
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, text: '' });

  const createNewUser = async () => {
    if (ruleLogin.test(login)) {
      if (rulePassword.test(password)) {
        if (password === repeatPassword) {
          try {
            await axios.post('http://localhost:8000/createNewUser', {
              login,
              password
            }).then(res => {
              localStorage.setItem('token', res.data.token);
              history.push('/reception');
            });
          } catch {
            setSnackbar({ open: true, text: 'A user with this name exists' });
          }
        } else setSnackbar({ open: true, text: 'Password mismatch' });
      } else setSnackbar({ open: true, text: 'Password length at least 6 characters (required in Latin letters) of which 1 digit' });
    } else setSnackbar({ open: true, text: 'Login length at least 6 characters' });
  }
  const { open, text } = snackbar;

  return (
    <div className="allPageElement">
      <div className="image">
        <img src={building} />
      </div>
      <div className="allTable">
        <div className="table">
          <h1>Регистрация</h1>
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
            <label>Repeat password:</label>
            <TextField
              type="password"
              id="outlined-basic"
              variant="outlined"
              onBlur={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div className="registration">
            <Button
              onClick={() => createNewUser()}
              variant="outlined">Зарегистрироваться</Button>
            <Link to='/login'><p>Авторизоваться</p></Link>
          </div>
        </div>
      </div>
      <Snackbar
        onClose={() => setSnackbar({ open: false })}
        open={open}
        autoHideDuration={6000}
        message={text}
      />
    </div>
  )
}

export default RecordComponent;