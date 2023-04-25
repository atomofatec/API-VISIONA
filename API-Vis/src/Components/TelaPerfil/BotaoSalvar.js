import { Link } from "react-router-dom";
import Style from './BotaoSalvar.module.css'

function BotaoSalvar() {
    return(
        <div className={Style.btnperfil_container}>
            <div className={Style.btnperfil_align_field}>
                <div className={Style.btnperfil_perfil_form}>
                    <div className={Style.btnperfil_perfil_htm}>
                        <Link to='/tabela-users'>
                            <div className={Style.btnperfil_group}> 
                                <input type="submit" className={Style.btnperfil_button} value="Salvar" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BotaoSalvar;