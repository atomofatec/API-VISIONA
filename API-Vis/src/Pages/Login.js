import Circulos from '../Components/Circulos';
import Logo from '../Components/Logo';
import Style from '../Styles/Login.module.css';
import { Link } from 'react-router-dom'
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {

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
                if(response.data.msg === "Usuário logado") {
                    alert(response.data.msg);
                    navigate('/tabela-users')
                }
                if(response.data.msg === "Usuário não cadastrado/Informações estão incorretas") {
                    alert(response.data.msg)
                }
            });
        } else {
            alert("Todos os campos devem ser preenchidos.")
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