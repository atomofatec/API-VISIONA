import { Link, useNavigate } from 'react-router-dom';
import CirculosPerfil from '../Components/CirculosPerfil';
import Logo from '../Components/Logo';
import Style from '../Styles/TelaPerfil.module.css';
import axios from 'axios'
import { React, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Perfil() {

    var id_user = localStorage.getItem('user')
    useEffect(()=>{
        axios.post("http://localhost:3001/editar",{
            id_user: id_user
        }).then((response)=>{
            console.log(response);
            document.getElementById('nome').value = response.data.name_user
            document.getElementById('email').value = response.data.email
            document.getElementById('cpf').value = response.data.cpf_user
            document.getElementById('cpf').disabled = true
            document.getElementById('cpf').style.background = '#d0cece'

            const nomeUserData = response.data.name_user;
            const emailUserData = response.data.email;
            const cpfUserData = response.data.cpf_user;

            console.log(nomeUserData);
            const dataUser = {nomeData: nomeUserData, emailData: emailUserData, cpfData: cpfUserData}
            localStorage.setItem('userData', JSON.stringify(dataUser))
            console.log(emailUserData);
        })
    }, []);

    const [values, setValues] = useState();
    const navigate = useNavigate();
    const handleChangeValues = (value) => {
        setValues(prevValue => ({
            ...prevValue, [value.target.name]: value.target.value,
        }))
    };

    const handleClickButton = () => {
        const updatedat = new Date().toLocaleString();
        //const idUser = id_user
        axios.post("http://localhost:3001/editar-perfil", {
            name_user: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            id_user: id_user,
            updatedat: updatedat
        }).then((response) => {
            if(response.data.msg === 'Usuário atualizado!'){
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'Alteração realizada',
                    confirmButtonColor: '#E76100',
                    showConfirmButton: false,
                    iconColor: '#E76100',
                    timer: 2000,
                    timerProgressBar: true,
                    showCloseButton: true,
                  })
                navigate('/tabela-users')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Atenção',
                    text: 'Não foi possível editar o usuário',
                    confirmButtonColor: '#E76100',
                    showConfirmButton: false,
                    iconColor: '#E76100',
                    timer: 2000,
                    timerProgressBar: true,
                    showCloseButton: true,
                  })
            }
        });
    }

    return(
        <>
        <link
            href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
            rel="stylesheet"
        />
            <div className={Style.perfiluser_container}>
                <Logo />
                
                <div className={Style.perfiluser_align_field}>
                    <span>
                        <Link to="/tabela-users" className="btn">
                        <i className="bx bx-arrow-back"></i>
                        </Link>
                        <p className={Style.perfiluser_p}>
                            Meu Perfil
                        </p>
                    </span>
                    <div className={Style.perfiluser_login_form}>
                        <div className={Style.perfiluser_adicionar_htm}>   
                            <div className={Style.perfiluser_group}>
                                <input placeholder="Nome"
                                    id="nome" 
                                    type="nome" 
                                    name='nome'
                                    className={Style.perfiluser_input}
                                    onChange={handleChangeValues}/>
                            </div>
                            <div className={Style.perfiluser_group}>
                                <input placeholder="E-mail" 
                                    id="email" 
                                    type="email"
                                    name='email' 
                                    className={Style.perfiluser_input}
                                    onChange={handleChangeValues}/>
                            </div>                      
                            <div className={Style.perfiluser_group}>
                                <input placeholder="CPF" 
                                    id="cpf" 
                                    type="cpf"
                                    name='cpf' 
                                    className={Style.perfiluser_input}
                                    onChange={handleChangeValues}/>
                            </div>                      
                        </div>
                            <div className={Style.perfiluser_group}> 
                            <Link to='/tabela-users'>
                                <button 
                                    type="button" 
                                    id='btnEditar' 
                                    className={Style.perfiluser_button}
                                    onClick={() => handleClickButton()}>
                                    Salvar
                                </button>
                            </Link>
                            </div>
                    </div>
                </div>
            </div>
            <CirculosPerfil />
        </>
    );
}

export default Perfil;