import { Link, useNavigate } from 'react-router-dom';
import CirculosPerfil from '../Components/CirculosPerfil';
import Logo from '../Components/Logo';
import Style from '../Styles/TelaPerfil.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Perfil() {

    var id_user = localStorage.getItem('user')

    useEffect(() => {
        axios.post('http://localhost:3001/editar', {
            id_user: id_user
        }).then((response) => {
            console.log(response);
            document.getElementById('nome').value = response.data.name_user
            document.getElementById('email').value = response.data.email
            document.getElementById('cpf').value = response.data.cpf_user
            document.getElementById('cpf').disabled = true
            document.getElementById('cpf').style.background = '#d0cece'

            const nomeUserData = response.data.name_user
            const emailUserData = response.data.email
            const cpfUserData = response.data.cpf_user

            console.log(nomeUserData);
            const dataUser = {nomeData:nomeUserData, emailData:emailUserData, cpfData:cpfUserData}
            localStorage.setItem('userData', JSON.stringify(dataUser))
            console.log(cpfUserData);
        }).then(function(){

        })
    }, []);

    const [values, setValues] = useState();
    const navigate = useNavigate();
    const handleChangeValues = (value) => {
        document.getElementById('btnCadastro').disabled = true

        setValues(prevValue => ({
            ...prevValue, [value.target.name]: value.target.value,
        }))
    }

/*    function dataIgual() {
        const dataUserJson = localStorage.getItem('userData')
        const dataUser = (dataUserJson);
        const dataNome = dataUser.nomeData
        const dataEmail = dataUser.emailData
        const dataCpf = dataUser.cpfData
        console.log(dataNome);
        console.log(dataEmail);
        console.log(dataCpf);
        if(document.getElementById('nome').value !== dataNome || document.getElementById('email') !== dataEmail || document.getElementById('cpf') !== dataCpf){
            return false
        }
        return true
} */

    return(
        <html>
            <div className={Style.perfiluser_container}>
                <Logo />
                <div className={Style.perfiluser_align_field}>
                    <p className={Style.perfiluser_p}>Meu Perfil</p>
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
                                <button type="button" className={Style.perfiluser_button}>
                                    Salvar
                                </button>
                            </Link>
                            </div>
                    </div>
                </div>
            </div>
            <CirculosPerfil />
        </html>
    )
}

export default Perfil;