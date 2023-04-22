import "../../Styles/Tabela.css"

function Tabela() {

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
                                    <tr>
                                        <td>
                                            <a href="/"><i className="fa fa-edit"></i></a>
                                        </td>

                                        <td className="d-flex align-items-center">  
                                            <div className="pl-3 email">
                                                <span></span> 
                                                <span>Adicionado: </span> 
                                            </div>
                                        </td>

                                        <td></td>

                                        <td className="status">
                                            <span className="active"></span>
                                        </td>

                                        <td>
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true"><i className="fa fa-close"></i></span>
                                            </button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <a href="/"><i className="fa fa-edit"></i></a>
                                        </td>

                                        <td className="d-flex align-items-center">
                                            <div className="pl-3 email">
                                                <span></span> 
                                                <span>Adicionado: </span> 
                                            </div>
                                        </td>

                                        <td></td>

                                        <td className="status">
                                            <span className="disabled"></span>
                                        </td>

                                        <td>
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true"><i className="fa fa-close"></i></span>
                                            </button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td><a href="/"><i className="fa fa-edit"></i></a></td>

                                        <td className="d-flex align-items-center">
                                            <div className="pl-3 email">
                                                <span></span> 
                                                <span>Adicionado: </span> 
                                            </div>
                                        </td>

                                        <td></td>

                                        <td className="status">
                                            <span className="active"></span>
                                        </td>

                                        <td>
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true"><i className="fa fa-close"></i></span>
                                            </button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td><a href="/"><i className="fa fa-edit"></i></a></td>

                                        <td className="d-flex align-items-center">
                                            <div className="pl-3 email">
                                                <span></span> 
                                                <span>Adicionado: </span> 
                                            </div>
                                        </td>

                                        <td></td>

                                        <td className="status">
                                            <span className="active"></span>
                                        </td>

                                        <td>
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true"><i className="fa fa-close"></i></span>
                                            </button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td><a href="/"><i className="fa fa-edit"></i></a></td>
                                        
                                        <td className="d-flex align-items-center border-bottom-0">
                                            <div className="pl-3 email">
                                                <span></span> 
                                                <span>Adicionado: </span> 
                                            </div>
                                        </td>

                                        <td className="border-bottom-0"></td>

                                        <td className="status border-bottom-0">
                                            <span className="disabled"></span>
                                        </td>

                                        <td className="border-bottom-0">
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true"><i className="fa fa-close"></i></span>
                                            </button>
                                        </td>
                                    </tr>
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