import Style from './CamposPerfil.module.css'

function CamposPerfil() {
    return(
        <div className={Style.camposperfil_container}>
            <div className={Style.camposperfil_align_field}>
                <div className={Style.camposperfil_perfil_form}>
                    <div className={Style.camposperfil_perfil_htm}>   
                        <span>
                            <div className={Style.camposperfil_group}>
                                <input placeholder="Nome" id="nome" type="text" className={Style.camposperfil_input} />
                            </div>
                    
                            <div className={Style.camposperfil_group}>
                                <input placeholder="E-mail" id="nome" type="text" className={Style.camposperfil_input} />
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CamposPerfil;