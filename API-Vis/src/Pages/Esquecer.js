import CirculosEsquecer from '../Components/CirculosEsquecer';
import LogoEsquecer from '../Components/LogoEsquecer';
import Style from '../Styles/Esquecer.module.css';
import { Link } from 'react-router-dom';
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export function Esquecer() {
  const [values, setValues] = useState({});
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const navigate = useNavigate();

  const handleChangeValues = (value) => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));

    // Limpar estados de erro
    setIsEmailInvalid(false);
    setIsEmailEmpty(false);

    // Verificar e exibir mensagem de erro se o email for inválido
    if (!validateEmail(value.target.value)) {
      setIsEmailInvalid(true);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const clearCampos = () => {
    document.getElementById('Email').value = '';
  };

  const handleClickButton = () => {
    if (isEmailEmpty) {
      Swal.fire({
        icon: 'error',
        title: 'Atenção',
        text: 'O campo deve ser preenchido',
        confirmButtonColor: '#E76100',
        showConfirmButton: false,
        iconColor: '#E76100',
        timer: 2000,
        timerProgressBar: true,
        showCloseButton: true,
      });
      return;
    }

    if (isEmailInvalid) {
      Swal.fire({
        icon: 'error',
        title: 'Atenção',
        text: 'Preencha um email válido',
        confirmButtonColor: '#E76100',
        showConfirmButton: false,
        iconColor: '#E76100',
        timer: 2000,
        timerProgressBar: true,
        showCloseButton: true,
      });
      return;
    }

    axios.post("http://localhost:3001/esquecer", {
      email: values.email
    }).then(() => {
      clearCampos();
      navigate('/');
    });
  };

  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <div className={Style.esquecer_container}>
        <LogoEsquecer />

        <div className={Style.esquecer_align_field}>
          <span>
            <Link to="/" className="btn">
              <i className="bx bx-arrow-back"></i>
            </Link>
            <p className={Style.esquecer_p}>
              Esqueci minha senha
            </p>
          </span>

          <div className={Style.esquecer_login_form}>
            <div className={Style.esquecer_esquecer_htm}>
              <a>Para redefinir sua senha informe o email cadastrado<br /> e enviaremos um código para alteração</a>
              <div className={Style.esquecer_group}>
                <input
                  placeholder="E-mail"
                  id="Email"
                  type="email"
                  name="email"
                  className={`${Style.esquecer_input} ${isEmailInvalid ? Style.error : ''}`}
                  onChange={handleChangeValues}
                  onBlur={() => setIsEmailEmpty(document.getElementById('Email').value === '')}
                />
                {isEmailInvalid && !isEmailEmpty && <p className={Style.error_message}>Preencha um email válido</p>}
              </div>

            </div>
            <div className={Style.esquecer_group}>
              <button type="button" className={Style.esquecer_button} onClick={handleClickButton}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
      <CirculosEsquecer />
      <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    </>
  );
}