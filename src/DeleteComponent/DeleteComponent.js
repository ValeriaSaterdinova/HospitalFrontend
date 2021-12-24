import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const DeleteComponent = ({ reception, setReceptions, closedeleteModal, open }) => {
  const { _id } = reception;
  const history = useHistory();

  const deleteReception = async () => {
    try {
      await axios.delete(`http://localhost:8000/deleteReception?_id=${_id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(res => {
        closedeleteModal();
        setReceptions(res.data.data);
      });
    } catch {
      history.push('/login');
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Удалить прием"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы действительно хотите удалить прием?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <DialogActions>
            <Button onClick={(e) => closedeleteModal()} color="primary">
              Cansel
            </Button>
          </DialogActions>
          <Button onClick={deleteReception} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteComponent;