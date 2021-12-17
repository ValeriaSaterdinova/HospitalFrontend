import React from "react";
import building from '../Source/building.svg';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './EntryComponent.scss';

const EntryComponent = () => {
  return (
    <div className="allElement">
      <div className="image">
        <img src={building} />
      </div>
      <div className="allTable">
        <div className="table">
          <h1>Войти в систему</h1>
          <div className="field">
            <label>Login:</label>
            <TextField type="text" id="outlined-basic" variant="outlined" />
            <label>Password:</label>
            <TextField type="password" id="outlined-basic" variant="outlined" />
          </div>
          <div className="come">
            <Button variant="outlined">Войти</Button>
            <p>Зарегистрироваться</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntryComponent;