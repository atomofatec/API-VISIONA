import CirculosPerfil from '../Components/CirculosPerfil';
import Logo from '../Components/Logo';
import Style from '../Styles/Edicao.module.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import Toggle from '../Components/Toggle';

export function Edicao() {
    const [values, setValues] = useState();
    const [status, setStatus] = useState('');
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
    console.log(values)

    const handleToggle = () => {
        const newToggleValue = !toggle;
        setToggle(newToggleValue);
        const newStatus = newToggleValue ? 'Inativo' : 'Ativo';
        setStatus(newStatus);
    };

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    };

    useEffect(() => {
        const tabelaDataJson = localStorage.getItem('tabelaUsers');
        const tabelaData = JSON.parse(tabelaDataJson);
        console.log(tabelaData);

        document.getElementById('nome').value = tabelaData.tabelaNome;
        document.getElementById('email').value = tabelaData.tabelaEmail;

        setStatus(tabelaData.tabelaStatus);
        setToggle(tabelaData.tabelaStatus === 'Inativo');
    }, []);

    const validateNome = () => {
        const nomeRegex = /^[A-Za-z]{3,}$/;
        if (!values || !values.nome) {
        } else if (!nomeRegex.test(values.nome)) {
          return 'Preencha um nome válido';
        }
        return '';
      };
    
      const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!values || !values.email) {
        } else if (!emailRegex.test(values.email)) {
          return 'Preencha um e-mail válido';
        }
        return '';
      };

    const handleClickButton = () => {
        const tabelaDataJson = localStorage.getItem('tabelaUsers');
        const tabelaData = JSON.parse(tabelaDataJson);
        const updatedat = new Date().toLocaleString();
        const newStatus = toggle ? 'Inativo' : 'Ativo';
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
        
        setStatus(newStatus);
        axios.post('http://localhost:3001/editar-perfil', {
                name_user: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                id_user: tabelaData.tabelaId,
                updatedat: updatedat,
                status_user: newStatus,
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
                    navigate('/tabela-users');
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
    }

            return (
                <>
                <link
                    href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                    rel="stylesheet"
                />
                <div className={Style.edicao_container}>
                    <Logo />

                    <div className={Style.edicao_align_field}>
                    <span>
                        <Link to="/tabela-users" className="btn">
                        <i className="bx bx-arrow-back"></i>
                        </Link>
                        <p className={Style.edicao_p}>
                        Editar Usuário
                        </p>
                    </span>
                    <div className={Style.edicao_login_form}>
                        <div className={Style.edicao_adicionar_htm}>
                            <div className={Style.edicao_group}>
                                <input
                                placeholder="Nome"
                                id="nome"
                                type="nome"
                                name='nome'
                                className={Style.edicao_input}
                                onChange={handleChangeValues} />
                                {values && values.nome && validateNome() && (
                                <p className={Style.error_message}>{validateNome()}</p>
                                )}
                            </div>
                            <div className={Style.edicao_group}>
                                <input
                                placeholder="E-mail"
                                id="email"
                                type="email"
                                name='email'
                                className={Style.edicao_input}
                                onChange={handleChangeValues} />
                                {values && values.email && validateEmail() && (
                                <p className={Style.error_message}>{validateEmail()}</p>
                                )}
                            </div>
                        </div>
                        <div className={Style.edicao_toggle_container}>
                            <Toggle status={status} onToggle={handleToggle} />
                            <p className={`${Style.edicao_toggle_text} ${status === 'Inativo' ? Style.inativo : Style.ativo}`}>{status}</p>
                        </div>
                        <div className={Style.edicao_group}>
                            <button type="button" className={Style.edicao_button} onClick={() => handleClickButton()}>
                                Editar
                            </button>
                        </div>
                    </div>
                </div>             
            </div>
            <CirculosPerfil />
        </>
    );
}