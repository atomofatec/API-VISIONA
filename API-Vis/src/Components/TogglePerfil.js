import React, { useState, useEffect } from 'react';
import '../Styles/Toggle.css';

const Toggle = ({ perfil, onToggle }) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (perfil === 'Admin') {
      setToggle(true);
    }
  }, [perfil]);

  const handleToggle = () => {
    const novoPerfil = toggle ? 'Comum' : 'Admin';
    setToggle(!toggle);
    onToggle(novoPerfil);
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
