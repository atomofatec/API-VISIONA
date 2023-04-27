import Circulos from '../Components/Circulos';
import Logo from '../Components/Logo';
import Style from '../Styles/TelaPerfil.module.css';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Perfil() {

    const [values, setValues] = useState();
    const navigate = useNavigate();

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
          ...prevValue,
          [value.target.name]: value.target.value,
        }));
      };
    
    useEffect(() => {
        const tabelaDataJson = localStorage.getItem('tabelaUsers');
        const tabelaData = JSON.parse(tabelaDataJson);
        console.log(tabelaData);

        document.getElementById('nome').value = tabelaData.tabelaNome;
        document.getElementById('email').value = tabelaData.tabelaEmail;
    }, []);

    const handleClickButton = () => {
        const tabelaDataJson = localStorage.getItem('tabelaUsers');
        const tabelaData = JSON.parse(tabelaDataJson);
        const updatedat = new Date().toLocaleString();
        axios.post("http://localhost:3001/confirmar-editar", {
            name_user: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            id_user: tabelaData.tabelaId,
            updatedat: updatedat
        }).then((response) => {
            if(response.data.msg === "Usuário atualizado") {
                alert(response.data.msg);
                navigate('/tabela-users')
            }else{
                alert('Erro')
            }
        })
    }
    
    return(
        <html>
            <div className={Style.perfiluser_container}>
                <Logo />
                <div className={Style.perfiluser_align_field}>
                    <p className={Style.perfiluser_p}>Meu Perfil</p>
                    <div className={Style.perfiluser_login_form}>
                        <div className={Style.perfiluser_cadastro_htm}>   
                            <div className={Style.perfiluser_group}>
                                <input placeholder="Nome"
                                    id="nome" 
                                    type="nome"
                                    name='nome'
                                    onChange={handleChangeValues}
                                    className={Style.perfiluser_input}
                                    />
                            </div>
                            <div className={Style.perfiluser_group}>
                                <input placeholder="E-mail" 
                                    id="email" 
                                    type="email"
                                    name='email'
                                    onChange={handleChangeValues}
                                    className={Style.perfiluser_input}
                                    />
                            </div>
                            <div className={Style.perfiluser_group}>
                                <input placeholder="CPF"
                                    id="CPF" 
                                    type="cpf"
                                    name='cpf'
                                    className={Style.perfiluser_input}
                                    onChange={handleChangeValues} />
                            </div>
                        </div>
                        <Link to='/tabela-users'>
                            <div className={Style.perfiluser_group}> 
                                <button type="button" id='btnCadastro'
                                        className={Style.perfiluser_button} onClick={() => handleClickButton()}>Salvar
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Circulos />
        </html>
    )
}

export default Perfil;