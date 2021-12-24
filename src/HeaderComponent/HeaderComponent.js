import React from 'react';
import patch from '../Source/patch.svg'
import './HeaderComponent.scss';

const HeaderComponent = ({ name, children }) => {
  return (
    <div className="header">
      <div className="image">
        <img src={patch} />
      </div>
      <div className="string">
        <h1>{name}</h1>
        {children}
      </div>
    </div>
  )
}

export default HeaderComponent;