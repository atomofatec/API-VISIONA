import Circulos from '../Components/Circulos';
import Logo from '../Components/Logo';
import Style from '../Styles/Cadastro.module.css';
import { Link } from 'react-router-dom'
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export function Cadastro() {
    const [values, setValues] = useState();
    const navigate = useNavigate();
    const handleChangeValues = (value)=>{
      setValues(prevValue=>({
        ...prevValue,
        [value.target.name]: value.target.value,
      }))
    };

    const checkVazio = () => {
        let isVazio = false
        if(document.getElementById('Nome').value === ''){
          isVazio = true
          return isVazio
        }
        if(document.getElementById('CPF').value === ''){
          isVazio = true
          return isVazio
        }
        if(document.getElementById('Email').value === ''){
          isVazio = true
          return isVazio
        }
        if(document.getElementById('Senha').value === ''){
          isVazio = true
          return isVazio
        }
        if(document.getElementById('CSenha').value === ''){
          isVazio = true
          return isVazio
        }
    }

    const clearCampos = ()=>{
        document.getElementById('Nome').value = ''
        document.getElementById('CPF').value = ''
        document.getElementById('Email').value = ''
        document.getElementById('Senha').value = ''
        document.getElementById('CSenha').value = ''
    }

    const handleClickButton = () =>{
      
        if (!checkVazio()){
            if(document.getElementById('Senha').value === document.getElementById('CSenha').value) {
                const createdat = new Date().toLocaleString();
                const updatedat = new Date().toLocaleString();
                axios.post("http://localhost:3001/cadastro", {
                    name_user: values.nome,
                    email: values.email,
                    password_user: values.password,
                    cpf_user: values.cpf,
                    createdat: createdat,
                    updatedat: updatedat
                }).then((response)=>{
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
                        })
                        clearCampos();
                        navigate('/')
                    })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Atenção',
                    text: 'A senha e a sua confirmação devem ser iguais',
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

    return(
        <html>
            <div className={Style.cadastro_container}>
                <Logo />
                <div className={Style.cadastro_align_field}>
                    <Link to='/'>
                        <input id="item-1" type="radio" name="item" className={Style.cadastro_login} />
                        <label for="item-1" className={Style.cadastro_item}>Login</label>
                    </ Link>
                    <input id="item-2" type="radio" name="item" className={Style.cadastro_cadastro} checked />
                    <label for="item-2" className={Style.cadastro_item}>Cadastro</label>
                    <div className={Style.cadastro_login_form}>
                        <div className={Style.cadastro_adicionar_htm}>   
                            <div className={Style.cadastro_group}>
                                <input placeholder="Nome"
                                    id="Nome" 
                                    type="nome"
                                    name='nome'
                                    className={Style.cadastro_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.cadastro_group}>
                                <input placeholder="E-mail" 
                                    id="Email" 
                                    type="email"
                                    name='email' 
                                    className={Style.cadastro_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.cadastro_group}>
                                <input placeholder="CPF"
                                    id="CPF" 
                                    type="cpf"
                                    name='cpf'
                                    className={Style.cadastro_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.cadastro_group}>
                                <input placeholder="Senha"
                                    id="Senha" 
                                    type="password" 
                                    name='password'
                                    className={Style.cadastro_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.cadastro_group}>
                                <input placeholder="Confirmar Senha" 
                                    id="CSenha" 
                                    type="password"
                                    name='password'
                                    className={Style.cadastro_input}
                                    onChange={handleChangeValues} />
                            </div>
                        </div>
                            <div className={Style.cadastro_group}> 
                                <button type="button" className={Style.cadastro_button} onClick={()=>handleClickButton()}>
                                    Cadastrar
                                </button>
                            </div>
                    </div>
                </div>
            </div>
            <Circulos />
        </html>
    )
}