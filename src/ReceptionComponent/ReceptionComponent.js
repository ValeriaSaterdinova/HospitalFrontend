import React, { useState } from "react";
import {
  Button,
  TextField
} from '@material-ui/core';
import {
  MenuItem,
  Select
} from '@mui/material';
import './ReceptionComponent.scss';

const ReceptionComponent = () => {
  const allDoctor = [
    {fullName: 'Иванов Иван Иванович'}, 
    {fullName: 'Сергеев Сергей Сергеевич'}, 
    {fullName: 'Семенов Семен Семенович'}, 
    {fullName: 'Павлов Павел Павлович'}
  ];
  
  const [doctor, setDoctor] = useState('');

  const handleChange = (event) => {
    setDoctor(event.target.value);
  };

  return (
    <div className="allPage">
      <div className="field">
        <p>Имя:</p>
        <TextField type="text" id="outlined-basic" variant="outlined" />
      </div>
      <div className="field">
        <p>Врач:</p>
        <Select
          value={doctor}
          onChange={handleChange}
        >
          {allDoctor.map((value) =>
            <MenuItem value={value.fullName}>{value.fullName}</MenuItem>
          )}
        </Select>
      </div>
      <div className="field">
        <p>Дата: </p>
        <TextField type="date" id="outlined-basic" variant="outlined" />
      </div>
      <div className="field">
        <p>Жалобы: </p>
        <TextField type="text" id="outlined-basic" variant="outlined" />
      </div>
      <div className="button">
        <Button variant="outlined">Добавить</Button>
      </div>
    </div>
  )
}

export default ReceptionComponent;