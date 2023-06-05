import React, { useEffect, useState } from 'react';
import { Grafico } from "../Components/Grafico";
import { GraficoAdm } from "../Components/GraficoAdm";
import Logo from "../Components/Logo"
import PerfilDashboard from "../Components/PerfilDashboard";
import Rodape from "../Components/Rodape"
import Style from "../Styles/Dashboard.module.css"
import axios from 'axios';
import CirculoTabela from '../Components/CirculoTabela';

export function Dashboard() {
  const [dados, setDados] = useState({ ativos: 0, inativos: 0 });

  useEffect(() => {
    axios.get('http://localhost:3001/usuarios/ativos-inativos')
      .then(response => {
        const { ativos, inativos } = response.data;
        setDados({ ativos: parseInt(ativos), inativos: parseInt(inativos) });
      })
      .catch(error => {
        console.log('Erro ao obter os dados do servidor', error);
      });
  }, []);

  const totalUsuarios = dados.ativos + dados.inativos;

  return (
    <>
    <CirculoTabela />
      <div className={Style.dashboard_corpo}>
        <div className={Style.dashboard_cabecalho}>
          <Logo />
          <div className={Style.dashboard_user_profile}>
            <PerfilDashboard />
          </div>
        </div>
        <div className={`${Style.dashboard_principal} ${Style.dashboard_graficos}`}>
          <Grafico />
          <div className={Style.totalUsuarios}>
            <div className={Style.totalUsuariosContainer}>
              Total de usuários: {totalUsuarios}
            </div>
          </div>
          <GraficoAdm />
        </div>
        <div className={Style.dashboard_rodape}>
          <Rodape />
        </div>
      </div>
    </>
  );
}
