import Style from './login.module.css'

function CamposLogin() {
    return(
        <div className={Style.login_form}>
            <div className={Style.login_htm}>   
                <div className={Style.group}>
                    <span className={Style.group1}>
                    <input placeholder="E-mail" id="nome" type="text" className={Style.input}></input>
                <div className={Style.group}>
                    <input placeholder="Senha" id="password" type="password" className={Style.input} data-type="senha"></input>
                </div>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CamposLogin;
 