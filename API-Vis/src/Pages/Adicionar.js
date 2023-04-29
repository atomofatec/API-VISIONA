import Circulos from '../Components/Circulos';
import Logo from '../Components/Logo';
import Style from '../Styles/Edicao.module.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Adicionar() {
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
          const createdat = new Date().toLocaleString();
          const updatedat = new Date().toLocaleString();
          axios.post("http://localhost:3001/adicionar", {
            name_user: values.nome,
            email: values.email,
            password_user: values.password,
            cpf_user: values.cpf,
            createdat: createdat,
            updatedat: updatedat
        }).then((response)=>{
            alert(response.data.msg);
            clearCampos();
            navigate('/tabela-users')
  
        });}
        else {
            alert("Todos os campos devem ser preenchidos.")
        }
    }
    
    return(
        <html>
            <div className={Style.edicao_container}>
                <Logo />
                <div className={Style.edicao_align_field}>
                    <p className={Style.edicao_p}>Adicionar Usuário</p>
                    <div className={Style.edicao_login_form}>
                        <div className={Style.edicao_cadastro_htm}>   
                            <div className={Style.edicao_group}>
                                <input placeholder="Nome"
                                    id="Nome" 
                                    type="nome"
                                    name='nome'
                                    onChange={handleChangeValues}
                                    className={Style.edicao_input}
                                    />
                            </div>
                            <div className={Style.edicao_group}>
                                <input placeholder="E-mail" 
                                    id="Email" 
                                    type="email"
                                    name='email'
                                    onChange={handleChangeValues}
                                    className={Style.edicao_input}
                                    />
                            </div>
                            <div className={Style.edicao_group}>
                                <input placeholder="CPF" 
                                    id="CPF" 
                                    type="cpf"
                                    name='cpf'
                                    onChange={handleChangeValues}
                                    className={Style.edicao_input}
                                    />
                            </div>
                            <div className={Style.edicao_group}>
                                <input placeholder="Senha" 
                                    id="Senha" 
                                    type="password"
                                    name='password'
                                    onChange={handleChangeValues}
                                    className={Style.edicao_input}
                                    />
                            </div>
                            <div className={Style.edicao_group}>
                                <input placeholder="Confirmar Senha" 
                                    id="CSenha" 
                                    type="password"
                                    name='password'
                                    onChange={handleChangeValues}
                                    className={Style.edicao_input}
                                    />
                            </div>
                        </div>
                            <div className={Style.edicao_group}> 
                                <button type="button" id='btnCadastro'
                                        className={Style.edicao_button} onClick={() => handleClickButton()}>Adicionar
                                </button>
                            </div>
                    </div>
                </div>
            </div>
            <Circulos />
        </html>
    )
}