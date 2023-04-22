import LogoPNG from '../../img/Logo_Visiona.png'
import Style from "./Logo.module.css"

function Logo() {
    return(
        <div className={Style.logo_container}>
            <img src={LogoPNG} alt='logo'/>
        </div>
    )
}

export default Logo;