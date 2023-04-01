import { Link } from "react-router-dom";
import UserPNG from "../img/usuario.png"
import './tabela.css'

function Perfil() {
    return(
        <div>
            <div className='user-profile'>
                <div>
                    <Link to='/'>
                    <a href="/">Usuário</a>
                    </Link>
                </div>
                    <Link to='/'>
                        <a href="/"><img src={UserPNG} alt="Ícone de Perfil" /></a>
                    </Link>
                            
            </div>
        </div>
    )
}

export default Perfil;