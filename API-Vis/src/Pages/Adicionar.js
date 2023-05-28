import CirculosPerfil from '../Components/CirculosPerfil';
import Logo from '../Components/Logo';
import TogglePerfil from '../Components/TogglePerfil';
import Style from '../Styles/Adicionar.module.css';
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export function Adicionar() {
    const [perfil, setPerfil] = useState('Comum');
    const [values, setValues] = useState();
    const navigate = useNavigate();

    const handleChangeValues = (value) => {
        setValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    };

    const checkVazio = () => {
        let isVazio = false
        if (document.getElementById('Nome').value === '') {
            isVazio = true
            return isVazio
        }
        if (document.getElementById('CPF').value === '') {
            isVazio = true
            return isVazio
        }
        if (document.getElementById('Email').value === '') {
            isVazio = true
            return isVazio
        }
        if (document.getElementById('Senha').value === '') {
            isVazio = true
            return isVazio
        }
        if (document.getElementById('CSenha').value === '') {
            isVazio = true
            return isVazio
        }
    }

    const clearCampos = () => {
        document.getElementById('Nome').value = ''
        document.getElementById('CPF').value = ''
        document.getElementById('Email').value = ''
        document.getElementById('Senha').value = ''
        document.getElementById('CSenha').value = ''
    }

    const handleClickButton = () => {
        if (!checkVazio()) {
            if (document.getElementById('Senha').value === document.getElementById('CSenha').value) {
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
                        text: 'Usuário adicionado',
                        confirmButtonColor: '#E76100',
                        showConfirmButton: false,
                        iconColor: '#E76100',
                        timer: 2000,
                        timerProgressBar: true,
                        showCloseButton: true,
                    })
                    clearCampos();
                    navigate('/tabela-users')
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Atenção',
                    text: 'As senhas devem ser iguais',
                    confirmButtonColor: '#E76100',
                    showConfirmButton: false,
                    iconColor: '#E76100',
                    timer: 2000,
                    timerProgressBar: true,
                    showCloseButton: true
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

    return (
        <>
            <link
                href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                rel="stylesheet"
            />

            <div className={Style.adicionar_container}>
                <Logo />

                <div className={Style.adicionar_align_field}>
                    <span>
                        <Link to="/tabela-users" className="btn">
                            <i className="bx bx-arrow-back"></i>
                        </Link>
                        <p className={Style.adicionar_p}>
                            Adicionar Usuário
                        </p>
                    </span>
                    <div className={Style.adicionar_login_form}>
                        <div className={Style.adicionar_adicionar_htm}>
                            <div className={Style.adicionar_group}>
                                <input placeholder="Nome"
                                    id="Nome"
                                    type="nome"
                                    name='nome'
                                    className={Style.adicionar_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.adicionar_group}>
                                <input placeholder="E-mail"
                                    id="Email"
                                    type="email"
                                    name='email'
                                    className={Style.adicionar_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.adicionar_group}>
                                <input placeholder="CPF"
                                    id="CPF"
                                    type="cpf"
                                    name='cpf'
                                    className={Style.adicionar_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.adicionar_group}>
                                <input placeholder="Senha"
                                    id="Senha"
                                    type="password"
                                    name='password'
                                    className={Style.adicionar_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.adicionar_group}>
                                <input placeholder="Confirmar Senha"
                                    id="CSenha"
                                    type="password"
                                    name='password'
                                    className={Style.adicionar_input}
                                    onChange={handleChangeValues} />
                            </div>
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
            <CirculosPerfil />
        </>
    );
}