import { Link } from "react-router-dom";
import Style from './login.module.css'

function BotaoCadastro() {
    return(
        
        <div className={Style.login_form}>
                    <div className={Style.login_htm}>
                        <Link to='/'>
                            <div className={Style.group}>
                                <input type="submit" className={Style.button} value="Cadastrar" />
                            </div>
                        </Link>
                    </div>
                </div>
    )
}

export default BotaoCadastro;