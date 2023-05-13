import "../../Styles/Tabela.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
                                                <span className="active">{item.status_user}</span>
                                            </td>

                                            <td>
                                                <div className="button" onClick={() => {editUser(item);}}>
                                                    <Link to="/edicao">
                                                        <i className="bx bxs-edit-alt"></i>
                                                    </Link>
                                                </div>
                                                <div className="button">
                                                    <Link to="#">
                                                        <i className="bx bx-x"></i>
                                                    </Link>
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