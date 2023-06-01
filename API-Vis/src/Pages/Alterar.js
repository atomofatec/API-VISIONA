import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import CirculosAlterar from '../Components/CirculosAlterar';
import LogoAlterar from '../Components/LogoAlterar';
import Style from '../Styles/Alterar.module.css';

export function Alterar() {
  const [values, setValues] = useState({
    password: '',
    newpassword: ''
  });

  const navigate = useNavigate();

  const handleChangeValues = (event) => {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const validateNewPassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{11,}$/;
    if (values.newpassword.trim() === '') {
    } else if (!passwordRegex.test(values.newpassword)) {
      return 'A senha deve conter no mínimo 11 caracteres. Deve conter letras maiúsculas e minúsculas, números e um caractere especial.';
    }
    return '';
  };

  const checkVazio = () => {
    if (values.password.trim() === '' || values.newpassword.trim() === '') {
      return true;
    }
    return false;
  }

  const clearCampos = () => {
    setValues({
      password: '',
      newpassword: ''
    });
  };

  const handleClickButton = () => {
    const senhaUser = localStorage.getItem('senha');
    const updatedat = new Date().toLocaleString();

    if (!checkVazio()) {
      if (values.password === senhaUser) {
        const newPasswordError = validateNewPassword();
        if (newPasswordError === '') {
          if (values.newpassword !== senhaUser) {
            axios.post("http://localhost:3001/alterar-senha", {
              id_user: localStorage.getItem('user'),
              password_user: values.newpassword,
              updatedat: updatedat
            }).then((response) => {
              if (response.data.msg === 'Senha alterada') {
                localStorage.setItem('senha', values.newpassword)
                Swal.fire({
                  icon: 'success',
                  title: 'Sucesso',
                  text: 'Senha alterada',
                  confirmButtonColor: '#E76100',
                  showConfirmButton: false,
                  iconColor: '#E76100',
                  timer: 2000,
                  timerProgressBar: true,
                  showCloseButton: true,
                })
                clearCampos()
                navigate('/perfil');
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Atenção',
                  text: 'Não foi possível alterar a senha',
                  confirmButtonColor: '#E76100',
                  showConfirmButton: false,
                  iconColor: '#E76100',
                  timer: 2000,
                  timerProgressBar: true,
                  showCloseButton: true,
                })
              }
            })
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Atenção',
              text: 'A nova senha não pode ser igual à antiga',
              confirmButtonColor: '#E76100',
              showConfirmButton: false,
              iconColor: '#E76100',
              timer: 2000,
              timerProgressBar: true,
              showCloseButton: true,
            })
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Atenção',
            text: newPasswordError,
            confirmButtonColor: '#E76100',
            showConfirmButton: false,
            iconColor: '#E76100',
            timer: 2000,
            timerProgressBar: true,
            showCloseButton: true,
          })
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Atenção',
          text: 'Senha incorreta',
          confirmButtonColor: '#E76100',
          showConfirmButton: false,
          iconColor: '#E76100',
          timer: 2000,
          timerProgressBar: true,
          showCloseButton: true,
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Atenção',
        text: 'Todos os campos devem ser preenchidos',
        confirmButtonColor: '#E76100',
        showConfirmButton: false,
        iconColor: '#E76100',
        timer: 2000,
        timerProgressBar: true,
        showCloseButton: true,
      })
    }
  }

  const btnClickBack = () => {
    navigate('/perfil')
  }

  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <LogoAlterar />

      <div className={Style.alterar_center}>
        <div className={Style.alterar_align_field}>
          <span>
            <p className={Style.alterar_seta}>
              <i className="bx bx-arrow-back" onClick={() => btnClickBack()}></i>
            </p>
            <p className={Style.alterar_p}>
              Alterar minha senha
            </p>
          </span>

          <div className={Style.alterar_login_form}>
            <div className={Style.alterar_alterar_htm}>
              <p>Para redefinir sua senha, informe a senha atual<br /> e a nova senha para a alteração.</p>
              <div className={Style.alterar_group}>
                <input
                  placeholder="Senha"
                  id="password"
                  type="password"
                  name='password'
                  className={Style.alterar_input}
                  value={values.password}
                  onChange={handleChangeValues}
                />
              </div>
              <div className={Style.alterar_group}>
                <input
                  placeholder="Nova senha"
                  id="newpassword"
                  type="password"
                  name='newpassword'
                  className={Style.alterar_input}
                  value={values.newpassword}
                  onChange={handleChangeValues}
                />
                {validateNewPassword() && <p className={Style.error_message}>{validateNewPassword()}</p>}
              </div>
            </div>
            <div className={Style.alterar_group}>
              <button type="button" className={Style.alterar_button} onClick={handleClickButton}>
                Alterar
              </button>
            </div>
          </div>
        </div>
      </div>
      <CirculosAlterar />
      <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    </>
  );
}