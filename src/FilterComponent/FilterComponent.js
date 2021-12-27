import React, { useState } from "react";
import {
  Button,
  TextField
} from '@material-ui/core';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import './FilterComponent.scss';

const FilterComponent = ({ setOpen, setReceptions, receptions, filterReceptions }) => {
  const [filterParams, setFilterParams] = useState({
    dateStartFilter: '',
    dateFinishFilter: ''
  });

  const { dateStartFilter, dateFinishFilter } = filterParams;


  const clearFilterReseptions = () => {
    setReceptions([...receptions]);
    setOpen(false)
  };

  const filterListReseptions = () => {
    filterReceptions = receptions.filter((item) => {
      if (!dateStartFilter && !dateFinishFilter) return dateStartFilter <= item.date && item.date <= dateFinishFilter;
      else if (dateStartFilter && !dateFinishFilter) return dateStartFilter <= item.date;
      else if (!dateStartFilter && dateFinishFilter) return item.date <= dateFinishFilter;
      else
        return (
          setReceptions([...receptions])
        );
    });
    return setReceptions([...filterReceptions]);
  };

  const startDate = (value) => {
    setFilterParams({ ...filterParams, dateStartFilter: value });
  };

  const finishDate = (value) => {
    setFilterParams({ ...filterParams, dateFinishFilter: value });
  };

  return (
    <div className="all-elements" >
      <div className="date">
        <p>c:</p>
        <TextField
          type="date"
          id="outlined-basic"
          variant="outlined"
          InputProps={{ inputProps: { min: "2020-01-01", max: "2025-12-31" } }}
          onChange={(e) => startDate(e.target.value)}
        />
      </div>
      <div className="date">
        <p> по:</p>
        <TextField
          type="date"
          id="outlined-basic"
          variant="outlined"
          InputProps={{ inputProps: { min: "2020-01-01", max: "2025-12-31" } }}
          onChange={(e) => finishDate(e.target.value)}
        />
      </div>
      <div className="functional">
        <Button
          variant="outlined"
          onClick={() => filterListReseptions()}
        >
          Фильтровать
        </Button>
        <DeleteOutlineRoundedIcon onClick={() => clearFilterReseptions()} />
      </div>
    </div>
  )
}

export default FilterComponent;