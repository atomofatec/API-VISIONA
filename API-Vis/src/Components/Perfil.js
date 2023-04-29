import { Link } from "react-router-dom";
import UserPNG from "../Imgs/usuario.png"
import Style from "../Styles/Perfil.module.css"

function Perfil() {
    return(
        <div className={Style.perfil_user_profile}>
            <div>
                <Link to='/perfil'>
                    <a href="/perfil"><img src={UserPNG} alt="Ícone de Perfil" /></a>
                </Link>                        
            </div>
        </div>
    )
}

export default Perfil;