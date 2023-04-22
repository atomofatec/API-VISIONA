import Circulos from '../Components/Circulos';
import Logo from '../Components/Logo';
import Style from '../Styles/Cadastro.module.css';
import { Link } from 'react-router-dom'
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        if(document.getElementById('check1').value === ''){
          isVazio = true
          return isVazio
        }
        if(document.getElementById('check2').value === ''){
          isVazio = true
          return isVazio
        }
        if(document.getElementById('check3').value === ''){
          isVazio = true
          return isVazio
        }
        if(document.getElementById('check4').value === ''){
          isVazio = true
          return isVazio
        }
        if(document.getElementById('check5').value === ''){
          isVazio = true
          return isVazio
        }
    }

    const clearCampos = ()=>{
        document.getElementById('check1').value = ''
        document.getElementById('check2').value = ''
        document.getElementById('check3').value = ''
        document.getElementById('check4').value = ''
        document.getElementById('check5').value = ''
    }

    const handleClickButton = () =>{
      
        if (!checkVazio()){
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
            alert(response.data.msg);
            clearCampos();
            navigate('/')
  
        });}
        else {
            alert("Todos os campos devem ser preenchidos.")
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
                        <div className={Style.cadastro_cadastro_htm}>   
                            <div className={Style.cadastro_group}>
                                <input placeholder="Nome"
                                    id="check1" 
                                    type="nome"
                                    name='nome'
                                    className={Style.cadastro_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.cadastro_group}>
                                <input placeholder="CPF"
                                    id="check2" 
                                    type="cpf"
                                    name='cpf'
                                    className={Style.cadastro_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.cadastro_group}>
                                <input placeholder="E-mail" 
                                    id="check3" 
                                    type="email"
                                    name='email' 
                                    className={Style.cadastro_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.cadastro_group}>
                                <input placeholder="Senha"
                                    id="check4" 
                                    type="password" 
                                    name='password'
                                    className={Style.cadastro_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.cadastro_group}>
                                <input placeholder="Confirmar Senha" 
                                    id="check5" 
                                    type="password"
                                    name='password'
                                    className={Style.cadastro_input}
                                    onChange={handleChangeValues} />
                            </div>
                        </div>
                            <div className={Style.cadastro_group}> 
                                <button type="button" 
                                        className={Style.cadastro_button} onClick={()=>handleClickButton()}>
                                             Cadastrar</button>
                            </div>
                    </div>
                </div>
            </div>
            <Circulos />
        </html>
    )
}