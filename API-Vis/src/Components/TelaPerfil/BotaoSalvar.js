import { Link } from "react-router-dom";
import Style from './BotaoSalvar.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";

function BotaoSalvar() {

    const [values, setValues] = useState();
    const navigate = useNavigate();
    
    const handleChangeValues = (value)=>{
      setValues(prevValue=>({
        ...prevValue,
        [value.target.name]: value.target.value,
      }))
    };

    const handleClickButton = () => {
        const tabelaDataJson = localStorage.getItem('tabelaUsers');
        const tabelaData = JSON.parse(tabelaDataJson);
        const updatedat = new Date().toLocaleString();
        axios.post("http://localhost:3001/atualizar-perfil", {
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
        <div className={Style.btnperfil_container}>
            <div className={Style.btnperfil_align_field}>
                <div className={Style.btnperfil_perfil_form}>
                    <div className={Style.btnperfil_perfil_htm}>
                        <Link to='/tabela-users'>
                            <div className={Style.btnperfil_group}> 
                                <input type="submit" className={Style.btnperfil_button} value="Salvar" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BotaoSalvar;