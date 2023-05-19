import CirculosEsquecer from '../Components/CirculosEsquecer';
import LogoEsquecer from '../Components/LogoEsquecer';
import Style from '../Styles/Esquecer.module.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';


export function Esquecer() {
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
        if(document.getElementById('Email').value === ''){
          isVazio = true
          return isVazio
        }
    }

    const clearCampos = ()=>{
        document.getElementById('Email').value = ''
    }

    const handleClickButton = () =>{
      
        if (!checkVazio()){
          axios.post("http://localhost:3001/esquecer", {
            email: values.email
        }).then(()=>{
            clearCampos();
            navigate('/login')
  
        });}
        else {
            Swal.fire({
                icon: 'error',
                title: 'Atenção',
                text: 'O campo deve ser preenchido',
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
            <>
            <link
                href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                rel="stylesheet"
            />
            <div className={Style.esquecer_container}>
                <LogoEsquecer />
                
                <div className={Style.esquecer_align_field}>
                    <span>
                        <Link to="/" className="btn">
                        <i className="bx bx-arrow-back"></i>
                        </Link>
                        <p className={Style.esquecer_p}>
                            Esqueci minha senha
                        </p>
                    </span>

                    <div className={Style.esquecer_login_form}>
                        <div className={Style.esquecer_esquecer_htm}>   
                        <p>Para redefinir sua senha informe o email cadastrado<br/> e enviaremos um código para alteração</p> 
                            <div className={Style.esquecer_group}>
                                <input placeholder="E-mail" 
                                    id="Email" 
                                    type="email"
                                    name='email' 
                                    className={Style.esquecer_input}
                                    onChange={handleChangeValues} />
                            </div>
                            
                        </div>
                            <div className={Style.esquecer_group}> 
                                <button type="button" className={Style.esquecer_button} onClick={()=>handleClickButton()}>
                                    Enviar
                                </button>
                            </div>
                    </div>
                </div>
            </div>
            <CirculosEsquecer />
            <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
            </>
    );
}