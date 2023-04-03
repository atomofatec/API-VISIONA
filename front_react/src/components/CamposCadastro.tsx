import Style from './login.module.css'

function CamposLogin() {
    return(
        <div className={Style.login_form}>
                <div className={Style.login_htm}>
                    <div className={Style.group}>
                        <input placeholder="Nome" id="nome" type="text" className={Style.input} name="nome" />
                    </div>
                    <div className={Style.group}>
                        <input placeholder="E-mail" id="email" type="text" className={Style.input} name="email" />
                    </div>
                    <div className={Style.group}>
                        <input placeholder="Senha" id="senha" type="password" className={Style.input} data-type="senha" name="senha" />
                    </div>
                    <div className={Style.group}>
                        <input placeholder="Confirmar Senha" id="confirmarSenha" type="password" className={Style.input} data-type="senha" name="confirmarSenha" />
                    </div>
                </div>
            </div>
    )
}

export default CamposLogin;
 