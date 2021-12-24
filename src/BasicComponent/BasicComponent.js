import React, { useState } from 'react';
import moment from 'moment';
import DeleteComponent from '../DeleteComponent/DeleteComponent';
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
import './BasicComponent.scss';

const BasicComponent = ({ receptions, setReceptions }) => {
  const [deleteIndex, setDelete] = useState(-1);
  const [open, setOpen] = useState(false)

  const opendeleteModal = (index) => {
    setOpen(true);
    handleClickOpen(index);
  };

  const closedeleteModal = (index) => {
    setOpen(false)
    setDelete(-1);
  };

  const tableheight = ['Имя', 'Врач', 'Дата', 'Жалобы', ''];

  const handleClickOpen = (index) => {
    setDelete(index)
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
                  <DeleteOutlineRoundedIcon variant="outlined" color="primary" onClick={() => opendeleteModal(index)}>
                    Open alert dialog
                  </DeleteOutlineRoundedIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {deleteIndex >= 0 && <DeleteComponent
        reception={receptions[deleteIndex]}
        setReceptions={setReceptions}
        closedeleteModal={closedeleteModal}
        open={open}
      />}
    </>
  );
}

export default BasicComponent;