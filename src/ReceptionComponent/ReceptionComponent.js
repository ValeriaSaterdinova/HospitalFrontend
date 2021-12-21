import React, { useState }from "react";
import Button from '@material-ui/core/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@material-ui/core/TextField';
import './ReceptionComponent.scss';

const ReceptionComponent = () => {
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
          <MenuItem value={0}>Иванов Иван Иванович</MenuItem>
          <MenuItem value={1}>Сергеев Сергей Сергеевич</MenuItem>
          <MenuItem value={2}>Семенов Семен Семенович</MenuItem>
          <MenuItem value={3}>Павлов Павел Павлович</MenuItem>
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