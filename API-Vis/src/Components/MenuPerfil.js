import React, { useState } from "react";
import { Link } from "react-router-dom";
import Style from "../Styles/Perfil.module.css";

function DropdownButton({ isOpen, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      <i className="bx bx-user-circle"></i>
      Usuário
      <i className={`bx ${isOpen ? "bx-chevron-up" : "bx-chevron-down"}`}></i>
    </button>
  );
}

function Perfil() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = function () {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCloseDropdown = function () {
    setDropdownOpen(false);
  };

  return (
    <>
      <link href="https://unpkg.com/boxicons/css/boxicons.min.css" rel="stylesheet" />
      <div className={Style.perfil_user_profile}>
        <div className="dropdown">
          <div className="container">
            <DropdownButton isOpen={dropdownOpen} onClick={handleToggleDropdown} />
            {dropdownOpen && (
              <div className="dropdown" onClick={handleCloseDropdown}>
                <Link to="/dashboard">
                  <i className="bx bx-bar-chart"></i>
                  Dashboard
                </Link>
                <Link to="/perfil">
                  <i className="bx bx-user"></i>
                  Meu Perfil
                </Link>
                <Link to="/">
                  <i className="bx bx-log-out-circle"></i>
                  Sair
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>
        {`
          .perfil_user_profile {
            margin-right: 50px;
          }
          
          .dropdown {
            display: block;
            flex-direction: column;
            box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 10px 0px,
            rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;
            border-radius: 5px;
            transform: translateY(0.5rem);
            transition: all 0.1s cubic-bezier(0.16, 1, 0.5, 1);
            margin-top: 0.3rem;
            background: white;
            right: 0;
            z-index: 1;
            top: 2.5rem;
            margin-right: 50px;
            margin-left: auto;
            position: absolute;
            
          }
          
          .dropdown a {
            padding: 8px;
            display: block;
            flex-direction: column;
            align-items: center;
            padding: 0.8rem 1rem;
            text-decoration: none;
            color: black;
            column-gap: 0.5rem;
            width: 150px;;
          }
          
          .btn {
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            column-gap: 0.5rem;
            padding: 0.6rem;
            cursor: pointer;
            border-radius: 5px;
            border: none;
            box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 10px 0px,
            rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;
            position: relative;
          }

          .bx {
            font-size: 1.1rem;
          }

          .dropdown a:hover {
            background-color: white;
            color: #E76100;
            width: 150px;
          }
        `}
      </style>
    </>
  );
}

export default Perfil;