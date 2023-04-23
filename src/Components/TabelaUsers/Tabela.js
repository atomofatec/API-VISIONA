import "../../Styles/Tabela.css"
import { useNavigate } from "react-router-dom";

function Tabela({users}) {

    const navigate = useNavigate();

    async function editUser(item) {
        const tabelaNome = item.name_user;
        const tabelaEmail = item.email;
        const tabelaId = item.id_user;
        const tabelaData = {
            tabelaNome: tabelaNome,
            tabelaEmail: tabelaEmail,
            tabelaId: tabelaId
        };
        console.log(tabelaData);
        localStorage.setItem("tabelaUsers", JSON.stringify(tabelaData));
        navigate('/edicao');
    }

return (
    <article className="principal">
        <div className="row justify-content-center">
			<div className="col-md-6 text-center mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-wrap">
                            <table className="table table-responsive-xl">
                                <thead>
                                    <tr>
                                        <th>Editar</th>
                                        <th>Email</th>
                                        <th>Nome</th>
                                        <th>Status</th>
                                        <th>Excluir</th>
                                    </tr>
                                </thead>
                            
                                <tbody>
                                    {users.map((item, i) => (
                                        <tr key = {i}>
                                            <td className="d-flex align-items-center">  
                                                <div className="pl-3 email">
                                                    <span >{item.id_user}</span>
                                                </div>
                                            </td>

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
                                                <span className="active">{item.status_user}</span>
                                            </td>

                                            <td>
                                                <button type="button" onClick={() => {editUser(item);}}>
                                                    <span aria-hidden="true"><i className="fa fa-close"></i></span>
                                                </button>
                                            </td>
                                        </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>

    );
};
                
export default Tabela;               