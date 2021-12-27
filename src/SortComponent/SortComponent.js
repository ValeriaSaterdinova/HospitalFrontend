import React, { useState } from "react";
import {
  MenuItem,
  Select
} from '@mui/material';
import './SortComponent.scss';

const SortComponent = ({ receptions, setReceptions }) => {
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

    receptions.sort((a, b) =>
      a[whatSort] > b[whatSort]
        ? 1
        : a[whatSort] < b[whatSort]
          ? -1
          : 0
    );
    if (howSort === "desc") receptions.reverse();
    setReceptions([...receptions]);
  };

  return (
    <div className='allSort'>
      <div className='paramSort'>
        <p>Сортировать по:</p>
        <Select
          value={column}
          onChange={(e) => handleChangeColumn(e.target.value)}
        >
          {sortPosition.map((element, index) =>
            <MenuItem value={element.value} key={`key-${index}`}>{element.key}</MenuItem>
          )}
        </Select>
      </div>
    { column !== "_id"  && (
      <div className='paramSort'>
        <p>Направление:</p>
        <Select
          value={direction}
          onChange={(e) => handleChangeDirection(e.target.value)}
        >
          {sortType.map((element, index) =>
            <MenuItem value={element.type} key={`title -${index}`}>{element.title}</MenuItem>
          )}
        </Select>
      </div>
    )}
    </div>
  )
}

export default SortComponent;