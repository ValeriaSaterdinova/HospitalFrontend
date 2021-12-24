import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {
  TextField,
  Button,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import {
  MenuItem,
  Select
} from '@mui/material';

const EditComponent = ({ reception, setReceptions, closeEditModal, openly }) => {
  const ruleDate = /^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](202)?[0-5]{1}$/;
  const { _id, name, doctor, date, complaints } = reception;
  const [snackbar, setSnackbar] = useState({ open: false, text: '' });
  const { open, text } = snackbar;
  const history = useHistory();

  const [data, setData] = useState({
    newName: name,
    newDoctor: doctor,
    newDate: date,
    newComplaints: complaints
  });

  const allDoctor = [
    { fullName: 'Иванов Иван Иванович' },
    { fullName: 'Сергеев Сергей Сергеевич' },
    { fullName: 'Семенов Семен Семенович' },
    { fullName: 'Павлов Павел Павлович' }
  ];

  const { newName, newDoctor, newDate, newComplaints } = data;

  const changeReceptionInfo = async () => {
    try {
      if (ruleDate.test(moment(newDate).format('MM/DD/YYYY'))) {
        await axios.patch('http://localhost:8000/changeReceptionInfo', {
          _id,
          name: newName,
          doctor: newDoctor,
          date: newDate,
          complaints: newComplaints
        },
          {
            headers: {
              token: localStorage.getItem('token')
            },
          }
        ).then(res => {
          closeEditModal();
          setReceptions(res.data.data);
        })
      } else setSnackbar({ open: true, text: 'Please enter a valid date (min:"01-01-2020", max:"31-12-2025")' });
    } catch {
      history.push('/login');
    }
  }

  return (
    <div>
      <Dialog
        open={openly}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Изменить прием"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>Имя:</p>
            <TextField
              type="text"
              value={newName}
              onChange={(e) => setData({ ...data, newName: e.target.value.trim() })}
            />
            <p>Врач</p>
            <Select
              value={newDoctor}
              onChange={(e) => setData({ ...data, newDoctor: e.target.value })}
            >
              {allDoctor.map((value, index) =>
                <MenuItem value={value.fullName} key={`newDoctor-${index}`}>{value.fullName}</MenuItem>
              )}
            </Select>
            <p>Дата:</p>
            <TextField
              type="date"
              value={newDate}
              onChange={(e) => setData({ ...data, newDate: e.target.value })} />
            <p>Жалоба:</p>
            <TextField
              type="text"
              value={newComplaints}
              onChange={(e) => setData({ ...data, newComplaints: e.target.value })} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <DialogActions>
            <Button onClick={(e) => closeEditModal()} color="primary">
              Cansel
            </Button>
          </DialogActions>
          <Button onClick={changeReceptionInfo} color="primary" autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        onClose={() => setSnackbar({ open: false })}
        open={open}
        autoHideDuration={6000}
        message={text}
      />
    </div >
  );
}

export default EditComponent;