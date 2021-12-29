import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import BasicComponent from '../BasicComponent/BasicComponent';
import {
  Button,
  Snackbar,
  TextField
} from '@material-ui/core';
import {
  MenuItem,
  Select
} from '@mui/material';
import './ReceptionComponent.scss';

const ReceptionComponent = () => {
  const history = useHistory();
  const [snackbar, setSnackbar] = useState({ open: false, text: '' });
  const [receptions, setReceptions] = useState([]);
  const [filterReceptions, setFilterReceptions] = useState([]);

  const ruleDate = /^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](202)?[0-5]{1}$/;

  const allDoctor = [
    { fullName: 'Иванов Иван Иванович' },
    { fullName: 'Сергеев Сергей Сергеевич' },
    { fullName: 'Семенов Семен Семенович' },
    { fullName: 'Павлов Павел Павлович' }
  ];

  const [data, setData] = useState({
    name: "",
    doctor: "",
    date: moment(new Date()).format('yyyy-MM-dd'),
    complaints: ""
  });

  const { name, doctor, date, complaints } = data;
  const { open, text } = snackbar;

  useEffect(() => {
    axios.get('http://localhost:8000/getAllReceptions', {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(res => {
      setReceptions([...res.data.data]);
      setFilterReceptions([...res.data.data]);
    }).catch(error => {
      localStorage.clear();
      history.push('/login');
    });
  }, [])

  const createNewReception = async () => {
    if (name && doctor && date && complaints) {
      if (ruleDate.test(moment(date).format('MM/DD/YYYY'))) {
        await axios.post('http://localhost:8000/createNewReception', data, {
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
          }
        }).then(res => {
          receptions.push(res.data.data);
          setReceptions([...receptions]);
          filterReceptions.push(res.data.data);
          setFilterReceptions([...filterReceptions]);
          setData({
            name: "",
            doctor: "",
            date: new Date(),
            complaints: ""
          });
        });
      } else setSnackbar({ open: true, text: 'Please enter a valid date (min:"01-01-2020", max:"31-12-2025")' });
    } else setSnackbar({ open: true, text: 'Please fill in all fields' });
  }

  return (
    <div className="all-page">
      <div className="add">
        <div className="field">
          <p>Имя:</p>
          <TextField
            className="input-data"
            type="text"
            variant="outlined"
            value={name}
            onChange={(e) => setData({ ...data, name: e.target.value.trim() })}
          />
        </div>
        <div className="field">
          <p>Врач:</p>
          <Select
            className="field-doctor"
            value={doctor}
            onChange={(e) => setData({ ...data, doctor: e.target.value })}
          >
            {allDoctor.map((value, index) =>
              <MenuItem value={value.fullName} key={`doctor-${index}`}>{value.fullName}</MenuItem>
            )}
          </Select>
        </div>
        <div className="field">
          <p>Дата:</p>
          <TextField
            className="input-data"
            type="date"
            variant="outlined"
            value={date}
            InputProps={{ inputProps: { min: "2020-01-01", max: "2025-12-31" } }}
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
        </div>
        <div className="field">
          <p>Жалобы:</p>
          <TextField
            className="input-data"
            type="text"
            variant="outlined"
            value={complaints}
            onChange={(e) => setData({ ...data, complaints: e.target.value.trim() })}
          />
        </div>
        <div className="button">
          <Button
            disabled={(name && doctor && date && complaints) ? false : true}
            variant="outlined"
            onClick={() => createNewReception()}
          >
            Добавить
          </Button>
        </div>
        <Snackbar
          onClose={() => setSnackbar({ open: false })}
          open={open}
          autoHideDuration={6000}
          message={text}
        />
      </div>
      <BasicComponent
        receptions={receptions}
        filterReceptions={filterReceptions}
        setFilterReceptions={setFilterReceptions}
        setReceptions={setFilterReceptions}
      />
    </div >
  )
}

export default ReceptionComponent;