import CirculosAlterar from '../Components/CirculosAlterar';
import LogoAlterar from '../Components/LogoAlterar';
import Style from '../Styles/Alterar.module.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';


export function AlterarSenha() {
    const { token } = useParams();
    const [values, setValues] = useState();
    const navigate = useNavigate();
    console.log(values)

    let email_teste = ''
    useEffect(() => {
        axios.post('http://localhost:3001/validartoken', { token })
            .then(resp => {
                if (resp.data.error) {
                    return navigate('/')
                }
                email_teste = resp.data.email
                console.log(resp)
            });
    }, []);

    const handleChangeValues = (value) => {
        // setValues(prevValue => ({
        //     ...prevValue,
        //     [value.target.name]: value.target.value,
        // }))
    };

    const checkVazio = () => !document.getElementById('newpassword').value.length;

    const fireMessage = (type, title, text) => {
        Swal.fire({
            icon: type,
            title: title,
            text: text,
            confirmButtonColor: '#E76100',
            showConfirmButton: false,
            iconColor: '#E76100',
            timer: 2000,
            timerProgressBar: true,
            showCloseButton: true,
        })
    };

    const handleClickButton = () => {
        if (checkVazio()) {
            return fireMessage('error', 'Atenção', 'Todos os campos devem ser preenchidos');
        }

        console.log(email_teste)
        if (document.getElementById('newpassword').value === document.getElementById('confirmpassword').value) {
            axios.post("http://localhost:3001/alterar-senha", {
                email: email_teste,
                password_user: document.getElementById('newpassword').value,
                updatedat: new Date().toLocaleString()
            })
                .then((response) => {
                    if (response.data.msg === 'Senha alterada') {
                        return navigate('/');
                    } else {
                        fireMessage('error', 'Atenção', 'Não foi possível alterar a senha');
                    }
                })
        } else {
            return fireMessage('error', 'Atenção', 'As senhas devem ser iguais')
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
                            <p className={Style.alterar_centralizar}>Redefina a sua senha</p>
                            <div className={Style.alterar_group}>
                                <input placeholder="Nova senha"
                                    id="newpassword"
                                    type="password"
                                    name='password'
                                    className={Style.alterar_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.alterar_group}>
                                <input placeholder="Confirmar senha"
                                    id="confirmpassword"
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