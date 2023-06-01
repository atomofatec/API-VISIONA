import { Grafico } from "../Components/Grafico";
import { GraficoAdm } from "../Components/GraficoAdm";
import Logo from "../Components/Logo"
import PerfilDashboard from "../Components/PerfilDashboard";
import Rodape from "../Components/Rodape"
import Style from "../Styles/Dashboard.module.css"

export function Dashboard() {

    return (
        <>
            <div className={Style.dashboard_corpo}>
                <div className={Style.dashboard_cabecalho}>
                    <Logo />
                    <div className={Style.dashboard_user_profile}>
                        <PerfilDashboard />
                    </div>
                </div>
                <div className={`${Style.dashboard_principal} ${Style.dashboard_graficos}`}>
                    <Grafico />
                    <GraficoAdm />
                </div>
                <div className={Style.dashboard_rodape}>
                    <Rodape />
                </div>
            </div>
        </>
    )
}