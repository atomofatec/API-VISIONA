import BotaoSalvar from "../Components/TelaPerfil/BotaoSalvar";
import CamposPerfil from "../Components/TelaPerfil/CamposPerfil";
import Circulos from "../Components/TelaPerfil/Circulos";
import TituloPerfil from "../Components/TelaPerfil/TituloPerfil";
import Logo from "../Components/Logo";
import Style from "../Components/TelaPerfil/CamposPerfil.module.css"
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

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

    return (
        <body>
            <Logo />
            <TituloPerfil />
            <div className={Style.camposperfil_container}>
                <div className={Style.camposperfil_align_field}>
                    <div className={Style.camposperfil_perfil_form}>
                        <div className={Style.camposperfil_perfil_htm}>   
                            <span>
                                <div className={Style.camposperfil_group}>
                                    <input placeholder="Nome" id="nome" type="text" className={Style.camposperfil_input} onChange={handleChangeValues} />
                                </div>
                        
                                <div className={Style.camposperfil_group}>
                                    <input placeholder="E-mail" id="email" type="text" className={Style.camposperfil_input} onChange={handleChangeValues} />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Circulos />
        </body>      

    );
  }
  
  export default Perfil;