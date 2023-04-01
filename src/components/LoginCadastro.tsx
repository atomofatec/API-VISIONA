import { Link } from "react-router-dom";
import Style from './login.module.css'

function LoginCadastro() {
    return( 
        <div>    
            <div className={Style.align_field}>
                <label>
                <Link to='/'>
                    <input id="item_1" type="radio" name="item" className={Style.login} defaultChecked />
                </Link>
                <span className={Style.item}>Login</span>
                </label>
                <label>
                <Link to='/cadastro'>
                    <input id="item_2" type="radio" name="item" className={Style.cadastro} />
                </Link>
                <span className={Style.item}>Cadastro</span>
                </label>
            </div>
        </div>   
    )
}

export default LoginCadastro;

