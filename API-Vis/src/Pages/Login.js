import Circulos from '../Components/Circulos';
import Logo from '../Components/Logo';
import Style from '../Styles/Login.module.css';
import { Link } from 'react-router-dom'
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


export function Login() {

    useEffect(() => {
        localStorage.clear()
    })

    const[values, setValues] = useState();
    const navigate = useNavigate();

    const handleChangeValues = (value) => {
        setValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    };

    const checkVazio = () => {
        let isVazio = false
        if(document.getElementById('Email').value === ''){
            isVazio = true
            return isVazio
        }
        if(document.getElementById('Senha').value === ''){
            isVazio = true
            return isVazio
        }
    }

    const handleClickButton = () => {
        if(!checkVazio()){
            axios.post("http://localhost:3001/", {
                email: values.email,
                password_user: values.password,
            }).then((response) => {
                console.log(response.data);
                if(response.data.msg === "Usuário logado") {
                    localStorage.setItem('user', response.data.id_user)
                    localStorage.setItem('perfil', response.data.perfil)
                    localStorage.setItem('status', response.data.status_user)
                    if(response.data.status_user === "Ativo"){
                        if(response.data.perfil === "Admin") {
                            navigate('/tabela-users')
                        } else {
                            navigate('/perfil')
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Atenção',
                            text: 'Não foi possível entrar',
                            confirmButtonColor: '#E76100',
                            showConfirmButton: false,
                            iconColor: '#E76100',
                            timer: 2000,
                            timerProgressBar: true,
                            showCloseButton: true,
                          })
                    }
                }
                if(response.data.msg === "Usuário não cadastrado/Informações estão incorretas") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Atenção',
                        text: 'Usuário não cadastrado/Informações estão incorretas',
                        confirmButtonColor: '#E76100',
                        showConfirmButton: false,
                        iconColor: '#E76100',
                        timer: 2000,
                        timerProgressBar: true,
                        showCloseButton: true,
                      })
                }
            });
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

    return(
        <html>
            <div className={Style.login_container}>
                <Logo />
                <div className={Style.login_align_field}>
                    <input id="item-1" type="radio" name="item" className={Style.login_login} checked />
                    <label for="item-1" className={Style.login_item}>Login</label>
                    <Link to='/cadastro'>
                        <input id="item-2" type="radio" name="item" className={Style.login_cadastro}  />
                        <label for="item-2" className={Style.login_item}>Cadastro</label>
                    </ Link>
                    <div className={Style.login_login_form}>
                        <div className={Style.login_adicionar_htm}>   
                            <div className={Style.login_group}>
                                <input placeholder="E-mail" 
                                    id="Email" 
                                    type="email"
                                    name='email' 
                                    className={Style.login_input}
                                    onChange={handleChangeValues} />
                            </div>                      
                            <div className={Style.login_group}>
                                <input placeholder="Senha"
                                    id="Senha" 
                                    type="password" 
                                    name='password'
                                    className={Style.login_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.footer}>
                                <Link to='/Esquecer'>
                                    <p>Esqueceu a senha?</p>
                                </ Link>
                            </div>
                        </div>
                            <div className={Style.login_group}> 
                                <button type="button" className={Style.login_button} onClick={()=>handleClickButton()}>
                                    Entrar
                                </button>
                            </div>
                    </div>
                </div>
            </div>
            <Circulos />
        </html>
    )
}