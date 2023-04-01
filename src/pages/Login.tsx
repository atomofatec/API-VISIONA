import BotaoEntrar from '../components/BotaoEntrar';
import CamposLogin from '../components/CamposLogin';
import Circulos from '../components/Circulos';
import LoginCadastro from '../components/LoginCadastro';
import Logo from '../components/Logo';
import Style from '../components/login.module.css'


function Login() {
    return(
        <body>

            <div className={Style.container}>
                <Logo />
                <LoginCadastro />           
                <CamposLogin />
                <BotaoEntrar />
            </div>
            <Circulos />
        </body>

    )
}

export default Login;