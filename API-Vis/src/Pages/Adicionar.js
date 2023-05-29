import CirculosPerfil from '../Components/CirculosPerfil';
import Logo from '../Components/Logo';
import TogglePerfil from '../Components/TogglePerfil';
import Style from '../Styles/Adicionar.module.css';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

export function Adicionar() {
  const [perfil, setPerfil] = useState('Comum');
  const [values, setValues] = useState({
    nome: '',
    email: '',
    cpf: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChangeValues = (event) => {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const validateNome = () => {
    const nomeRegex = /^[A-Za-z]{3,}$/;
    if (values.nome.trim() === '') {
    } else if (!nomeRegex.test(values.nome)) {
      return 'Preencha um nome válido';
    }
    return '';
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (values.email.trim() === '') {
    } else if (!emailRegex.test(values.email)) {
      return 'Preencha um e-mail válido';
    }
    return '';
  };

  const validateCPF = () => {
    const cpfRegex = /^\d{11}$/;
    if (values.cpf.trim() === '') {
    } else if (!cpfRegex.test(values.cpf)) {
      return 'Preencha um CPF válido';
    }
    return '';
  };

  const formatCPF = (value) => {
    // Remova todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');

    // Aplicar máscara de CPF
    const cpf = numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return cpf;
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{11,}$/;
    if (values.password.trim() === '') {
    } else if (!passwordRegex.test(values.password)) {
      return 'deve conter no mínimo 11 caracteres. Deve conter letras maiúsculas e minúsculas, números e caractere especial.';
    }
    return '';
  };

  const validateConfirmPassword = () => {
    if (values.confirmPassword.trim() === '') {
    } else if (values.password !== values.confirmPassword) {
      return 'As senhas não coincidem';
    }
    return '';
  };

  const clearCampos = () => {
    setValues({
      nome: '',
      email: '',
      cpf: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleClickButton = () => {
    const nomeError = validateNome();
    const emailError = validateEmail();
    const cpfError = validateCPF();
    const passwordError = validatePassword();
    const confirmPasswordError = validateConfirmPassword();

    if (nomeError || emailError || cpfError || passwordError || confirmPasswordError) {
      Swal.fire({
        icon: 'error',
        title: 'Atenção',
        html: `${nomeError ? `${nomeError}<br>` : ''}
               ${emailError ? `${emailError}<br>` : ''}
               ${cpfError ? `${cpfError}<br>` : ''}
               ${passwordError ? `${passwordError}<br>` : ''}
               ${confirmPasswordError ? confirmPasswordError : ''}`,
        confirmButtonColor: '#E76100',
        showConfirmButton: false,
        iconColor: '#E76100',
        timer: 2000,
        timerProgressBar: true,
        showCloseButton: true
      });
      return;
    }

    const createdat = new Date().toLocaleString();
    const updatedat = new Date().toLocaleString();
    axios.post("http://localhost:3001/adicionar", {
      name_user: values.nome,
      email: values.email,
      password_user: values.password,
      perfil: perfil,
      cpf_user: values.cpf,
      createdat: createdat,
      updatedat: updatedat
    }).then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Cadastro realizado',
        confirmButtonColor: '#E76100',
        showConfirmButton: false,
        iconColor: '#E76100',
        timer: 2000,
        timerProgressBar: true,
        showCloseButton: true,
      });
      clearCampos();
      navigate('/tabela-users');
    });
  };

  return (
    <html>
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className={Style.adicionar_container}>
          <Logo />

          <div className={Style.adicionar_align_field}>
            <span>
              <Link to="/tabela-users" className="btn">
                <i className="bx bx-arrow-back"></i>
              </Link>
              <p className={Style.adicionar_p}>Adicionar Usuário</p>
            </span>
            <div className={Style.adicionar_login_form}>
              <div className={Style.adicionar_adicionar_htm}>
                <div className={Style.adicionar_group}>
                  <input
                    placeholder="Nome"
                    id="Nome"
                    type="nome"
                    name='nome'
                    className={Style.adicionar_input}
                    value={values.nome}
                    onChange={handleChangeValues}
                  />
                  {validateNome() && <p className={Style.error_message}>{validateNome()}</p>}
                </div>
                <div className={Style.adicionar_group}>
                  <input
                    placeholder="E-mail"
                    id="Email"
                    type="email"
                    name="email"
                    className={Style.adicionar_input}
                    value={values.email}
                    onChange={handleChangeValues}
                  />
                  {validateEmail() && <p className={Style.error_message}>{validateEmail()}</p>}
                </div>
                <div className={Style.adicionar_group}>
                  <input
                    placeholder="CPF"
                    id="CPF"
                    type="text"
                    name="cpf"
                    className={Style.adicionar_input}
                    value={formatCPF(values.cpf)} // mascara CPF
                    onChange={handleChangeValues}
                  />
                  {validateCPF() && <p className={Style.error_message}>{validateCPF()}</p>}
                </div>
                <div className={Style.adicionar_group}>
                  <input
                    placeholder="Senha"
                    id="Senha"
                    type="password"
                    name="password"
                    className={Style.adicionar_input}
                    value={values.password}
                    onChange={handleChangeValues}
                  />
                  {validatePassword() && <p className={Style.error_message}>{validatePassword()}</p>}
                </div>
                <div className={Style.adicionar_group}>
                  <input
                    placeholder="Confirmar Senha"
                    id="CSenha"
                    type="password"
                    name="confirmPassword"
                    className={Style.adicionar_input}
                    value={values.confirmPassword}
                    onChange={handleChangeValues}
                  />
                  {validateConfirmPassword() && <p className={Style.error_message}>{validateConfirmPassword()}</p>}
                </div>
                <div className={Style.adicionar_toggle_container}>
                      <TogglePerfil perfil={perfil} onToggle={setPerfil} />
                      <p className={`${Style.adicionar_toggle_text} ${perfil === 'Admin' ? Style.admin : Style.comum}`}>{perfil}</p>
                </div>
                <div className={Style.adicionar_group}>
                  <button type="button" className={Style.adicionar_button} onClick={() => handleClickButton()}>
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CirculosPerfil />
      </body>
    </html>
  );
}