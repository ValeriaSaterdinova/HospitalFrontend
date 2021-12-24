import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

const DeleteComponent = ({ reception, setReceptions, closeDeleteModal, open }) => {
  const { _id } = reception;
  const history = useHistory();

  const deleteReception = async () => {
    try {
      await axios.delete(`http://localhost:8000/deleteReception?_id=${_id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(res => {
        closeDeleteModal();
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
            <Button onClick={(e) => closeDeleteModal()} color="primary">
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