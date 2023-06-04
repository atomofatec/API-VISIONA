import { Link, useNavigate } from 'react-router-dom';
import CirculosPerfil from '../Components/CirculosPerfil';
import Logo from '../Components/Logo';
import Style from '../Styles/TelaPerfil.module.css';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export function Perfil() {
  var id_user = localStorage.getItem('user');
  const perfilUsuario = localStorage.getItem('perfil');
  
  const [values, setValues] = useState({
    nome: '',
    email: '',
  });
  
  const navigate = useNavigate();
  console.log(values);

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const validateNome = () => {
    const nomeRegex = /^(?=[^\s]{3,})[A-Za-zãõáóíéêôâ\s]{3,}$/;
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

  useEffect(() => {
    axios.post('http://localhost:3001/editar', {
      id_user: id_user,
    }).then((response) => {
      console.log(response);
      document.getElementById('nome').value = response.data.name_user;
      document.getElementById('email').value = response.data.email;
      document.getElementById('cpf').value = response.data.cpf_user;
      document.getElementById('cpf').disabled = true;
      document.getElementById('cpf').style.background = '#d0cece';

      const nomeUserData = response.data.name_user;
      const emailUserData = response.data.email;
      const cpfUserData = response.data.cpf_user;

      console.log(nomeUserData);
      const dataUser = { nomeData: nomeUserData, emailData: emailUserData, cpfData: cpfUserData };
      localStorage.setItem('userData', JSON.stringify(dataUser));
      console.log(emailUserData);
    });
  }, [id_user]);

  const handleClickButton = () => {
    const statusUsuario = localStorage.getItem('status');
    const updatedat = new Date().toLocaleString();

    const nomeError = validateNome();
    const emailError = validateEmail();

    if (nomeError || emailError) {
      Swal.fire({
        icon: 'error',
        title: 'Atenção',
        text: 'Por favor, corrija os erros no formulário',
        confirmButtonColor: '#E76100',
        iconColor: '#E76100',
        showCloseButton: true,
      });
      return;
    }

    axios.post('http://localhost:3001/editar-perfil', {
      name_user: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      id_user: id_user,
      updatedat: updatedat,
      status_user: statusUsuario,
    }).then((response) => {
      if (response.data.msg === 'Usuário atualizado') {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Alteração realizada',
          confirmButtonColor: '#E76100',
          showConfirmButton: false,
          iconColor: '#E76100',
          timer: 2000,
          timerProgressBar: true,
          showCloseButton: true,
        });
        if (perfilUsuario === 'Admin') {
          navigate('/tabela-users');
        } else if (perfilUsuario === 'Comum') {
          navigate('/perfil');
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Atenção',
          text: 'Não foi possível editar o usuário',
          confirmButtonColor: '#E76100',
          showConfirmButton: false,
          iconColor: '#E76100',
          timer: 2000,
          timerProgressBar: true,
          showCloseButton: true,
        });
      }
    });
  };

  const btnClickBack = () => {
    const perfilUsuario = localStorage.getItem('perfil');
    if (perfilUsuario === 'Admin') {
      navigate('/tabela-users');
    } else if (perfilUsuario === 'Comum') {
      navigate('/');
    }
  };

  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />

      <div className={Style.perfiluser_container}>
        <Logo />
        <div className={Style.perfiluser_align_field}>
          <span>
            <span className={Style.perfil_seta}>
              <i className="bx bx-arrow-back" onClick={() => btnClickBack()}></i>
            </span>
            <p className={Style.perfiluser_p}>Meu Perfil</p>
          </span>
          <div className={Style.perfiluser_login_form}>
            <div className={Style.perfiluser_adicionar_htm}>
              <div className={Style.perfiluser_group}>
                <input
                  placeholder="Nome"
                  id="nome"
                  type="nome"
                  name="nome"
                  className={Style.perfiluser_input}
                  value={values.nome}
                  onChange={handleChangeValues}
                />
                {validateNome() && <p className={Style.error_message}>{validateNome()}</p>}
              </div>
              <div className={Style.perfiluser_group}>
                <input
                  placeholder="E-mail"
                  id="email"
                  type="email"
                  name="email"
                  className={Style.perfiluser_input}
                  value={values.email}
                  onChange={handleChangeValues}
                />
                {validateEmail() && <p className={Style.error_message}>{validateEmail()}</p>}
              </div>
              <div className={Style.perfiluser_group}>
              <input
                  placeholder="CPF"
                  id="cpf"
                  type="cpf"
                  name="cpf"
                  className={Style.perfiluser_input}
                  value={values.cpf}
                  onChange={handleChangeValues}
                />
              </div>
              <div>
                <Link to="/alterar">
                  <p className={Style.alterar_texto}>Alterar a senha</p>
                </Link>
              </div>
            </div>
            <div className={Style.perfiluser_group}>
              <button
                type="button"
                id="btnEditar"
                className={Style.perfiluser_button}
                onClick={() => handleClickButton()}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
      <CirculosPerfil />
    </>
  );
}