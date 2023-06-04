import React, { useState, useEffect } from 'react';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import '../Styles/Toggle.css';

const Toggle = ({ status, onToggle }) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (status === 'Inativo') {
      setToggle(true);
    }
  }, [status]);

  const handleToggle = () => {
    setToggle(!toggle);
    onToggle(!toggle);
  };

  return (
    <div className="toggleContainer">
      <label className="switch">
        <input type="checkbox" checked={toggle} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default Toggle;