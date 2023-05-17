import CirculosAlterar from '../Components/CirculosAlterar';
import LogoAlterar from '../Components/LogoAlterar';
import Style from '../Styles/Alterar.module.css';
import { Link } from 'react-router-dom';
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


export function Alterar() {
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
        if(document.getElementById('password').value === ''){
          isVazio = true
          return isVazio
        }
        if(document.getElementById('newpassword').value === ''){
          isVazio = true
          return isVazio
        }
    }

    const clearCampos = ()=>{
        document.getElementById('password').value = ''
        document.getElementById('newpassword').value = ''
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
                text: 'Os campos devem ser preenchidos',
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
           
                <LogoAlterar />
            
                <div className={Style.esquecer_center}>  
                    <div className={Style.esquecer_align_field}>
                        <span>
                            <p className={Style.esquecer_seta}>
                                <Link to="/" className="btn">
                                <i className="bx bx-arrow-back"></i>
                                </Link>
                            </p>
                            <p className={Style.esquecer_p}>
                                Alterar minha senha
                            </p>
                        </span>

                        <div className={Style.esquecer_login_form}>
                            <div className={Style.esquecer_esquecer_htm}>   
                            <a>Para redefinir sua senha informe o email cadastrado<br/> e enviaremos um código para alteração</a> 
                                <div className={Style.esquecer_group}>
                                    <input placeholder="Senha" 
                                        id="password" 
                                        type="password"
                                        name='password' 
                                        className={Style.esquecer_input}
                                        onChange={handleChangeValues} />
                                </div>
                                <div className={Style.esquecer_group}>
                                    <input placeholder="Nova senha" 
                                        id="newpassword" 
                                        type="password"
                                        name='password' 
                                        className={Style.esquecer_input}
                                        onChange={handleChangeValues} />
                                </div>
                                
                            </div>
                                <div className={Style.esquecer_group}> 
                                    <button type="button" className={Style.esquecer_button} onClick={()=>handleClickButton()}>
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