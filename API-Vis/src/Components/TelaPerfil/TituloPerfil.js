import Style from './TituloPerfil.module.css'

function NavInicio() {
    return(
        <div className={Style.tituloperfil_container}>
            <div className={Style.tituloperfil_align_field}>                
                <p className={Style.tituloperfil_p}>Meu Perfil</p>
            </div>
        </div>
    )
}

export default NavInicio;