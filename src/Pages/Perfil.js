import BotaoSalvar from "../Components/TelaPerfil/BotaoSalvar";
import CamposPerfil from "../Components/TelaPerfil/CamposPerfil";
import Circulos from "../Components/TelaPerfil/Circulos";
import TituloPerfil from "../Components/TelaPerfil/TituloPerfil";
import Logo from "../Components/Logo";

function Perfil() {
    return (
        <body>
            <Logo />
            <TituloPerfil />
            <CamposPerfil />
            <BotaoSalvar />
            <Circulos />
        </body>      

    );
  }
  
  export default Perfil;