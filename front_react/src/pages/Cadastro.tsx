import BotaoCadastro from '../components/BotaoCadastro';
import CamposCadastro from '../components/CamposCadastro';
import Circulos from '../components/Circulos';
import LoginCadastro from '../components/LoginCadastro';
import Logo from '../components/Logo';
import Style from '../components/login.module.css';

function Cadastro() {
    return(
        <body>

            <div className={Style.container}>
                <Logo />
                <LoginCadastro />           
                <CamposCadastro />
                <BotaoCadastro />
            </div>
            <Circulos />
        </body>
    )
}

export default Cadastro;