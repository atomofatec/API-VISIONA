import LogoPNG from '../img/Logo_Visiona.png'
import Style from './login.module.css'

function Logo() {
    return(
        <div className={Style.container}>
        <img src={LogoPNG} alt='logo'/>
        </div>
    )
}

export default Logo;