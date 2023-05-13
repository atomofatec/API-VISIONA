import "../../Styles/Tabela.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Tabela({users}) {

    const navigate = useNavigate();

    async function editUser(item) {
        
        const tabelaNome = item.name_user;
        const tabelaEmail = item.email;
        const tabelaId = item.id_user;
        const tabelaStatus = item.status_user;
        const tabelaData = {
            tabelaNome: tabelaNome,
            tabelaEmail: tabelaEmail,
            tabelaId: tabelaId,
            tabelaStatus: tabelaStatus
        };
        console.log(tabelaData);
        localStorage.setItem("tabelaUsers", JSON.stringify(tabelaData));
        navigate('/edicao');
    }

    const handleDelete = async (tabelaId) => {
        const confirmDelete = window.confirm("Deseja realmente excluir o usuário?");
      
        if (confirmDelete) {
            axios.delete(`http://localhost:3001/usuarios/${tabelaId}`);
            alert("Usuário excluído com sucesso!");
        } else {
            alert("Não foi possível excluir o usuário");
        }
    }
    
return (

    <>
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />

    <article className="principal">
        <div className="row justify-content-center">
			<div className="col-md-6 text-center mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-wrap">
                            <table className="table table-responsive-xl">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Nome</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                            
                                <tbody>
                                    {users.map((item, i) => (
                                        <tr key = {i}>

                                            <td className="d-flex align-items-center">  
                                                <div className="pl-3 email">
                                                    <span >{item.email}</span> 
                                                    <span>Adicionado: {item.createdat}</span> 
                                                </div>
                                            </td>

                                            <td>
                                                <span> {item.name_user} </span>
                                            </td>

                                            <td className="status">
                                                <span className={item.status_user === 'Ativo' ? 'active' : 'disabled'}>{item.status_user}</span>
                                            </td>

                                            <td>
                                                <div className="button" onClick={() => {editUser(item);}}>
                                                    <Link to="/edicao">
                                                        <i className="bx bxs-edit-alt"></i>
                                                    </Link>
                                                </div>
                                                <div className="button" onClick={() => handleDelete(item.id_user)}>
                                                    <a href='#' className="bx bx-x"></a>
                                                </div>
                                            </td>
                                        </tr>
                                        ))}
                                </tbody>
                            </table>
                            <Link to="/adicionar" className="btn">
                                <i className="bx bxs-user-plus"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
    </>
    );
}
                
export default Tabela;                          