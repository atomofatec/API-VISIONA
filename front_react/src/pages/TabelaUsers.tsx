import Logo from "../components/Logo";
import Perfil from "../components/Perfil";
import Rodape from "../components/Rodape";
import Tabela from "../components/Tabela";
import '../components/tabela.css'

function TabelaUsers() {
    return(
        <body className="corpo">
            <header className="cabecalho">
            <Logo></Logo>
            <Perfil></Perfil>
            </header>
            <Tabela></Tabela>
            <Rodape></Rodape>
        </body>

    )
}

export default TabelaUsers;