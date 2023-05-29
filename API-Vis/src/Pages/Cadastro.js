import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Circulos from '../Components/Circulos';
import Logo from '../Components/Logo';
import Style from '../Styles/Cadastro.module.css';
import { Link } from 'react-router-dom';

export function Cadastro() {
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
      return 'deve conterno mínimo 11 caracteres. Deve conter letras maiúsculas e minúsculas, números e caractere especial.';
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
    axios.post("http://localhost:3001/cadastro", {
      name_user: values.nome,
      email: values.email,
      password_user: values.password,
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
      navigate('/');
    });
  };

  return (
    <html>
      <div className={Style.cadastro_container}>
        <Logo />
        <div className={Style.cadastro_align_field}>
          <Link to='/'>
            <input id="item-1" type="radio" name="item" className={Style.cadastro_login} />
            <label htmlFor="item-1" className={Style.cadastro_item}>Login</label>
          </Link>
          <input id="item-2" type="radio" name="item" className={Style.cadastro_cadastro} checked />
          <label htmlFor="item-2" className={Style.cadastro_item}>Cadastro</label>
          <div className={Style.cadastro_login_form}>
            <div className={Style.cadastro_adicionar_htm}>
              <div className={Style.cadastro_group}>
                <input
                  placeholder="Nome"
                  id="Nome"
                  type="nome"
                  name="nome"
                  className={Style.cadastro_input}
                  value={values.nome}
                  onChange={handleChangeValues}
                />
                {validateNome() && <p className={Style.error_message}>{validateNome()}</p>}
              </div>
              <div className={Style.cadastro_group}>
                <input
                  placeholder="E-mail"
                  id="Email"
                  type="email"
                  name="email"
                  className={Style.cadastro_input}
                  value={values.email}
                  onChange={handleChangeValues}
                />
                {validateEmail() && <p className={Style.error_message}>{validateEmail()}</p>}
              </div>
              <div className={Style.cadastro_group}>
                <input
                  placeholder="CPF"
                  id="CPF"
                  type="text"
                  name="cpf"
                  className={Style.cadastro_input}
                  value={formatCPF(values.cpf)} // mascara CPF 
                  onChange={handleChangeValues}
                />
                {validateCPF() && <p className={Style.error_message}>{validateCPF()}</p>}
              </div>
              <div className={Style.cadastro_group}>
                <input
                  placeholder="Senha"
                  id="Senha"
                  type="password"
                  name="password"
                  className={Style.cadastro_input}
                  value={values.password}
                  onChange={handleChangeValues}
                />
                {validatePassword() && <p className={Style.error_message}>{validatePassword()}</p>}
              </div>
              <div className={Style.cadastro_group}>
                <input
                  placeholder="Confirmar Senha"
                  id="CSenha"
                  type="password"
                  name="confirmPassword"
                  className={Style.cadastro_input}
                  value={values.confirmPassword}
                  onChange={handleChangeValues}
                />
                {validateConfirmPassword() && <p className={Style.error_message}>{validateConfirmPassword()}</p>}
              </div>
            </div>
            <div className={Style.cadastro_group}>
              <button type="button" className={Style.cadastro_button} onClick={handleClickButton}>
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Circulos />
    </html>
  );
}