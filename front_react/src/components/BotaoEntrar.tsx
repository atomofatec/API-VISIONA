import { Link } from "react-router-dom";
import Style from './login.module.css'

function BotaoEntrar() {
    return(
        
        <div className={Style.login_form}>
                    <div className={Style.login_htm}>
                        <Link to='/tabela-users'>
                            <div className={Style.group}>
                                <input type="submit" className={Style.button} value="Entrar" />
                            </div>
                        </Link>
                    </div>
                </div>
    )
}

export default BotaoEntrar;