import "../../Styles/Tabela.css"

function Tabela({users}) {

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
                                            <td>
                                                <a href="/"><i className="fa fa-edit"></i></a>
                                            </td>

                                            <td className="d-flex align-items-center">  
                                                <div className="pl-3 email">
                                                    <span >{item.email}</span> 
                                                    <span>Adicionado: {item.createdat}</span> 
                                                </div>
                                            </td>

                                            <td>
                                                <a href="/edicao" > {item.name_user} </a>
                                            </td>

                                            <td className="status">
                                                <span className="active">{item.status_user}</span>
                                            </td>

                                            <td>
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
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