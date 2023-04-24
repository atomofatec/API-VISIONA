import LogoPNG from '../Imgs/Logo_Visiona.png';
import Style from '../Styles/Logo.module.css';

function Logo() {
    return (
        <div className={Style.logo_container}>
            <img src={LogoPNG} alt='logo'/>
        </div>
    );
}

export default Logo;
