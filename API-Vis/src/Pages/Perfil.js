import { Link } from 'react-router-dom';
import CirculosPerfil from '../Components/CirculosPerfil';
import Logo from '../Components/Logo';
import Style from '../Styles/TelaPerfil.module.css';

function Perfil() {

    return(
        <html>
            <div className={Style.perfiluser_container}>
                <Logo />
                <div className={Style.perfiluser_align_field}>
                    <p className={Style.perfiluser_p}>Meu Perfil</p>
                    <div className={Style.perfiluser_login_form}>
                        <div className={Style.perfiluser_adicionar_htm}>   
                            <div className={Style.perfiluser_group}>
                                <input placeholder="Nome"
                                    id="nome" 
                                    type="nome" 
                                    name='nome'
                                    className={Style.perfiluser_input}/>
                            </div>
                            <div className={Style.perfiluser_group}>
                                <input placeholder="E-mail" 
                                    id="email" 
                                    type="email"
                                    name='email' 
                                    className={Style.perfiluser_input}/>
                            </div>                      
                            <div className={Style.perfiluser_group}>
                                <input placeholder="CPF" 
                                    id="cpf" 
                                    type="cpf"
                                    name='cpf' 
                                    className={Style.perfiluser_input}/>
                            </div>                      
                        </div>
                            <div className={Style.perfiluser_group}> 
                            <Link to='/tabela-users'>
                                <button type="button" className={Style.perfiluser_button}>
                                    Salvar
                                </button>
                            </Link>
                            </div>
                    </div>
                </div>
            </div>
            <CirculosPerfil />
        </html>
    )
}

export default Perfil;