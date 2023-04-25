import Circulos from '../Components/Circulos';
import Logo from '../Components/Logo';
import Style from '../Styles/Edicao.module.css';
import { Link } from 'react-router-dom'
import Style2 from '../Components/TelaPerfil/TituloPerfil.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Edicao() {

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

        document.getElementById('check1').value = tabelaData.tabelaNome;
        document.getElementById('check2').value = tabelaData.tabelaEmail;
    }, []);

    const handleClickButton = () => {
        const tabelaDataJson = localStorage.getItem('tabelaUsers');
        const tabelaData = JSON.parse(tabelaDataJson);
        const updatedat = new Date().toLocaleString();
        axios.post("http://localhost:3001/confirmar-editar", {
            name_user: document.getElementById("check1").value,
            email: document.getElementById("check2").value,
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
            <div className={Style.edicao_container}>
                <Logo />
                <div className={Style.edicao_align_field}>
                    <p className={Style2.tituloperfil_p}>Editar Usuário</p>
                    <div className={Style.edicao_login_form}>
                        <div className={Style.edicao_cadastro_htm}>   
                            <div className={Style.edicao_group}>
                                <input placeholder="Nome"
                                    id="check1" 
                                    type="nome"
                                    name='nome'
                                    onChange={handleChangeValues}
                                    className={Style.edicao_input}
                                    />
                            </div>
                            <div className={Style.edicao_group}>
                                <input placeholder="E-mail" 
                                    id="check2" 
                                    type="email"
                                    name='email'
                                    onChange={handleChangeValues}
                                    className={Style.edicao_input}
                                    />
                            </div>
                        </div>
                        <Link to='/tabela-users'>
                            <div className={Style.edicao_group}> 
                                <button type="button" id='btnCadastro'
                                        className={Style.edicao_button} onClick={() => handleClickButton()}>Editar
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