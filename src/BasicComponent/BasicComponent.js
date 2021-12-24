import React, { useState } from 'react';
import moment from 'moment';
import DeleteComponent from '../DeleteComponent/DeleteComponent';
import EditComponent from '../EditComponent/EditComponent';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import './BasicComponent.scss';

const BasicComponent = ({ receptions, setReceptions }) => {
  const [deleteIndex,  setDelete] = useState(-1);
  const [editIndex, setEdit] = useState(-1);
  const [open, setOpen] = useState(false)
  const [openly, setOpenly] = useState(false)

  const openDeleteModal = (index) => {
    setOpen(true);
    handleClickOpen(index);
  };

  const closeDeleteModal = (index) => {
    setOpen(false)
    setDelete(-1);
  };

  const openEditModal = (index) => {
    setOpenly(true);
    handleClickOpen(index);
  };

  const closeEditModal = (index) => {
    setOpenly(false)
    setEdit(-1);
  };

  const tableheight = ['Имя', 'Врач', 'Дата', 'Жалобы', ''];

  const handleClickOpen = (index) => {
    setDelete(index)
    setEdit(index)
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow>
              {tableheight.map((value, index) =>
                <TableCell align="center" key={`cell-${index}`}>{value}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {receptions.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.doctor}</TableCell>
                <TableCell align="center">{moment(row.date).format('DD.MM.YYYY')}</TableCell>
                <TableCell align="center">{row.complaints}</TableCell>
                <TableCell align="center">
                  <DeleteOutlineRoundedIcon  onClick={() => openDeleteModal(index)} />
                  <EditRoundedIcon onClick={() => openEditModal(index)}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {deleteIndex >= 0 && <DeleteComponent
        reception={receptions[deleteIndex]}
        setReceptions={setReceptions}
        closeDeleteModal={closeDeleteModal}
        open={open}
      />}
      {editIndex >= 0 && <EditComponent
        reception={receptions[editIndex]}
        setReceptions={setReceptions}
        closeEditModal={closeEditModal}
        openly={openly}
      />}
    </>
  );
}

export default BasicComponent;