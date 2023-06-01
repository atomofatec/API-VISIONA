import Tabela from "../Components/TabelaUsers/Tabela"
import Logo from "../Components/Logo";
import MenuPerfil from "../Components/MenuPerfil";
import Rodape from "../Components/Rodape";
import Style from "../Styles/TabelaUsers.module.css"
import React, { useEffect, useState } from 'react'
import Axios from 'axios';

export function TabelaUsers() {
  const [users, setUsers] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const onPageChange = (pageNumber) => {
    setPaginaAtual(pageNumber);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await Axios.get("http://localhost:3001/mostrarTabela");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  return (
    <html>
      <div className={Style.estrutura_corpo}>
        <div className={Style.estrutura_cabecalho}>
          <Logo />
          <div className={Style.tabela_user_profile}>
            <MenuPerfil />
          </div>
        </div>
        <Tabela users={users} paginaAtual={paginaAtual} onPageChange={onPageChange} />
        <div className={Style.estrutura_rodape}>
          <Rodape />
        </div>
      </div>
    </html>
  );
}