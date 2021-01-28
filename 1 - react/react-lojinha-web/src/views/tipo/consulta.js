import React from 'react';

import TipoService from '../../app/tipoService';

class CadastroTipo extends React.Component {

    state = {
        tipos: []
    }

    constructor() {
        super();
        this.service = new TipoService();
    }

    async componentDidMount() {
        const tipos = await this.service.buscar();
        this.setState({tipos});
    }
    

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Consulta de Tipos de Clientes
                </div>
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tipos.map(tipo => {
                                    return (
                                        <tr key={tipo.id}>
                                            <td>#{tipo.id}</td>
                                            <td>{tipo.nome}</td>
                                        </tr>

                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default CadastroTipo;