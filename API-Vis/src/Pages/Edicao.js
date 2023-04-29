import CirculosPerfil from '../Components/CirculosPerfil';
import Logo from '../Components/Logo';
import Style from '../Styles/Edicao.module.css';
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
            <div className={Style.edicao_container}>
                <Logo />
                <div className={Style.edicao_align_field}>
                    <p className={Style.edicao_p}>Editar Usuário</p>
                    <div className={Style.edicao_login_form}>
                        <div className={Style.edicao_adicionar_htm}>   
                            <div className={Style.edicao_group}>
                                <input placeholder="Nome"
                                    id="nome" 
                                    type="nome" 
                                    name='nome'
                                    className={Style.edicao_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.edicao_group}>
                                <input placeholder="E-mail" 
                                    id="email" 
                                    type="email"
                                    name='email' 
                                    className={Style.edicao_input}
                                    onChange={handleChangeValues} />
                            </div>                      
                        </div>
                            <div className={Style.edicao_group}> 
                                <button type="button" className={Style.edicao_button} onClick={()=>handleClickButton()}>
                                    Editar
                                </button>
                            </div>
                    </div>
                </div>
            </div>
            <CirculosPerfil />
        </html>
    )
}