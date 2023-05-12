import { Link } from 'react-router-dom';
import CirculosPerfil from '../Components/CirculosPerfil';
import Logo from '../Components/Logo';
import Style from '../Styles/TelaPerfil.module.css';

function Perfil() {

    return(
        <>
        <link
            href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
            rel="stylesheet"
        />
            <div className={Style.perfiluser_container}>
                <Logo />
                
                <div className={Style.perfiluser_align_field}>
                    <span>
                        <Link to="/tabela-users" className="btn">
                        <i className="bx bx-arrow-back"></i>
                        </Link>
                        <p className={Style.perfiluser_p}>
                            Meu Perfil
                        </p>
                    </span>

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
        </>
    );
}

export default Perfil;