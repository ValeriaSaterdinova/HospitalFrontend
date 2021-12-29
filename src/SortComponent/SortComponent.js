import React, { useState } from "react";
import {
  MenuItem,
  Select
} from '@mui/material';
import AddBoxIcon from '@material-ui/icons/AddBox';
import './SortComponent.scss';
import FilterComponent from "../FilterComponent/FilterComponent";

const SortComponent = ({ receptions, setReceptions, filterReceptions }) => {
  const [open, setOpen] = useState(false)
  const [sortParams, setSortParams] = useState({
    column: "_id",
    direction: "asc"
  });

  const { column, direction } = sortParams;
  const sortPosition = [
    {
      key: 'Имя',
      value: 'name'
    },
    {
      key: 'Врач',
      value: 'doctor'
    },
    {
      key: 'Дата',
      value: 'date'
    },
    {
      key: 'none',
      value: '_id'
    }
  ];

  const sortType = [
    {
      type: 'ask',
      title: 'По возрастанию'
    },
    {
      type: 'desc',
      title: 'По убыванию'
    }
  ];

  const handleChangeColumn = (value) => {
    setSortParams({ ...sortParams, column: value });
    sortReseptions(value, direction);
  }

  const handleChangeDirection = (value) => {
    setSortParams({ ...sortParams, direction: value });
    sortReseptions(column, value)
  }

  const sortReseptions = (whatSort, howSort) => {
    filterReceptions.sort((a, b) =>
      a[whatSort] > b[whatSort]
        ? 1
        : a[whatSort] < b[whatSort]
          ? -1
          : 0
    );
    if (howSort === "desc") filterReceptions.reverse();
    setReceptions([...filterReceptions]);
  };

  return (
    <>
      <div className='all-sort'>
        <div className='param-sort'>
          <p>Сортировать по:</p>
          <Select
            className='field'
            value={column}
            onChange={(e) => handleChangeColumn(e.target.value)}
          >
            {sortPosition.map((element, index) =>
              <MenuItem value={element.value} key={`key-${index}`}>{element.key}</MenuItem>
            )}
          </Select>
        </div>
        {column !== "_id" && (
          <div className='param-sort'>
            <p>Направление:</p>
            <Select
              className='field'
              value={direction}
              onChange={(e) => handleChangeDirection(e.target.value)}
            >
              {sortType.map((element, index) =>
                <MenuItem value={element.type} key={`title -${index}`}>{element.title}</MenuItem>
              )}
            </Select>
          </div>
        )}
        {open === false && (
          <div className="add-filter">
            <p>Фильтровать по дате:</p>
            <AddBoxIcon onClick={() => setOpen(!open)} />
          </div>
        )}
      </div>
      {open === true && (
        <FilterComponent
          setOpen={setOpen}
          receptions={receptions}
          setReceptions={setReceptions}
          filterReceptions={filterReceptions}
        />
      )}
    </>
  )
}

export default SortComponent;