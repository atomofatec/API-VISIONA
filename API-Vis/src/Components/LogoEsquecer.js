import LogoPNG from '../Imgs/Logo_Visiona.png';
import Style from '../Styles/LogoEsquecer.module.css';
import { Link } from 'react-router-dom';

function LogoEsquecer() {
    return (
        <Link to='/'>
            <div className={Style.logo_container}>
                <img src={LogoPNG} alt='logo' />
            </div>
        </Link>
    );
}

export default LogoEsquecer;