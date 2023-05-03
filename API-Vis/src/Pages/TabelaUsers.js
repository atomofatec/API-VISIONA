import Tabela from "../Components/TabelaUsers/Tabela"
import Logo from "../Components/Logo";
import Perfil from "../Components/Perfil";
import Rodape from "../Components/Rodape";
import Style from "../Styles/TabelaUsers.module.css"
import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

export function TabelaUsers() {
    const [users, setUsers] = useState([])
    const getUsers = async () => {
    try{
      const res = await Axios.get("http://localhost:3001/mostrarTabela");
      console.log(res.data)
      setUsers(res.data)
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getUsers();
  }, [setUsers]);

    return (
        <html>
            <div className={Style.estrutura_corpo}>
                <div className={Style.estrutura_cabecalho}>
                    <Logo />
                    <div className={Style.tabela_user_profile}>
                        <Perfil />
                    </div>
                </div>
                <Tabela users = {users}/>
                <div className={Style.estrutura_rodape}>
                    <Rodape />
                </div>
            </div>
        </html>
    );
  }