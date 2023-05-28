import React, { useState, useEffect } from 'react';
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
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Toggle;