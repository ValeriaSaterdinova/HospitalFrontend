import React from "react";
import { Link } from 'react-router-dom';
import building from '../Source/building.svg';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './RecordComponent.scss';

const RecordComponent = () => {
  return (
    <div className="allElement">
      <div className="image">
        <img src={building} />
      </div>
      <div className="allTable">
        <div className="table">
          <h1>Регистрация</h1>
          <div className="field">
            <label>Login:</label>
            <TextField type="text" id="outlined-basic" variant="outlined" />
            <label>Password:</label>
            <TextField type="password" id="outlined-basic" variant="outlined" />
            <label>Repeat password:</label>
            <TextField type="password" id="outlined-basic" variant="outlined" />
          </div>
          <div className="registration">
            <Button variant="outlined">Зарегистрироваться</Button>
            <Link to='/login'><p>Авторизоваться</p></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecordComponent;