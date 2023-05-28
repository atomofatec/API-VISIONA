import CirculosAlterar from '../Components/CirculosAlterar';
import LogoAlterar from '../Components/LogoAlterar';
import Style from '../Styles/Alterar.module.css';
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


export function Alterar() {
    var id_user = localStorage.getItem('user')
    const [values, setValues] = useState();
    const navigate = useNavigate();
    console.log(values)

    const handleChangeValues = (value) => {
        setValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    };

    const checkVazio = () => {
        let isVazio = false
        if (document.getElementById('password').value === '') {
            isVazio = true
            return isVazio
        }
        if (document.getElementById('newpassword').value === '') {
            isVazio = true
            return isVazio
        }
    }

    const clearCampos = () => {
        document.getElementById('password').value = ''
        document.getElementById('newpassword').value = ''
    }

    const handleClickButton = () => {
        const senhaUser = localStorage.getItem('senha');
        const updatedat = new Date().toLocaleString();
        if (!checkVazio()) {
            if (document.getElementById('password').value === senhaUser) {
                if (document.getElementById('newpassword').value !== senhaUser) {
                    axios.post("http://localhost:3001/alterar-senha", {
                        id_user: id_user,
                        password_user: document.getElementById('newpassword').value,
                        updatedat: updatedat
                    }).then((response) => {
                        if (response.data.msg === 'Senha alterada') {
                            localStorage.setItem('senha', document.getElementById('newpassword').value)
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
                        text: 'A nova senha não pode ser igual a antiga',
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
                            <p>Para redefinir sua senha informe a senha atual<br /> e a nova senha para a alteração.</p>
                            <div className={Style.alterar_group}>
                                <input placeholder="Senha"
                                    id="password"
                                    type="password"
                                    name='password'
                                    className={Style.alterar_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.alterar_group}>
                                <input placeholder="Nova senha"
                                    id="newpassword"
                                    type="password"
                                    name='password'
                                    className={Style.alterar_input}
                                    onChange={handleChangeValues} />
                            </div>

                        </div>
                        <div className={Style.alterar_group}>
                            <button type="button" className={Style.alterar_button} onClick={() => handleClickButton()}>
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