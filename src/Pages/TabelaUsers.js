import Tabela from "../Components/TabelaUsers/Tabela"
import Logo from "../Components/Logo";
import Perfil from "../Components/Perfil";
import Rodape from "../Components/Rodape";
import Style from "../Styles/TabelaUsers.module.css"

export function TabelaUsers() {
    return (
        <html>
            <div className={Style.estrutura_corpo}>
                <div className={Style.estrutura_cabecalho}>
                    <Logo />
                    <Perfil />
                </div>
                <Tabela />
                <div className={Style.estrutura_rodape}>
                    <Rodape />
                </div>
            </div>
        </html>
    );
  }