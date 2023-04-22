import Circulos from '../Components/Circulos';
import Logo from '../Components/Logo';
import Style from '../Styles/Edicao.module.css';
import { Link } from 'react-router-dom'
import Style2 from '../Components/TelaPerfil/TituloPerfil.module.css'

export function Edicao() {
    
    return(
        <html>
            <div className={Style.edicao_container}>
                <Logo />
                <div className={Style.edicao_align_field}>
                    <p className={Style2.tituloperfil_p}>Editar Usuário</p>
                    <div className={Style.edicao_login_form}>
                        <div className={Style.edicao_cadastro_htm}>   
                            <div className={Style.edicao_group}>
                                <input placeholder="Nome"
                                    id="check1" 
                                    type="nome"
                                    name='nome'
                                    className={Style.edicao_input}
                                    />
                            </div>
                            <div className={Style.edicao_group}>
                                <input placeholder="E-mail" 
                                    id="check2" 
                                    type="email"
                                    name='email' 
                                    className={Style.edicao_input}
                                    />
                            </div>
                            <div className={Style.edicao_group}>
                                <input placeholder="Senha"
                                    id="check3" 
                                    type="password" 
                                    name='password'
                                    className={Style.edicao_input}
                                    />
                            </div>
                            <div className={Style.edicao_group}>
                                <input placeholder="Confirmar Senha" 
                                    id="check4" 
                                    type="password"
                                    name='password'
                                    className={Style.edicao_input}
                                    />
                            </div>
                        </div>
                        <Link to='/tabela-users'>
                            <div className={Style.edicao_group}> 
                                <button type="button" 
                                        className={Style.edicao_button}>Editar
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Circulos />
        </html>
    )
}