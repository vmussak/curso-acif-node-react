import React from 'react';

import TipoService from '../../app/tipoService';

class CadastroTipo extends React.Component {

    constructor() {
        super();
        this.service = new TipoService();
    }

    ESTADO_INICIAL = {
        nome: '',
        sucesso: false,
        erros: []
    };

    state = this.ESTADO_INICIAL;

    onChange = (event) => {
        const valor = event.target.value;
        const nomeDoCampo = event.target.name;
        this.setState({[nomeDoCampo]: valor})
    }

    limpar = () => {
        this.setState(this.ESTADO_INICIAL);
    };

    salvar = async () => {
        try {
            await this.service.inserir(this.state);
            this.limpar();
            this.setState({sucesso: true})
        } catch (error) {
            const erros = error.erros;
            this.setState({erros: erros})
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Cadastro de Tipos de Clientes
                </div>
                <div className="card-body">

                    {this.state.sucesso && 
                        <div class="alert alert-dismissible alert-success">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Bem feito!</strong> Cadastro realizado com sucesso!.
                        </div>
                    }

                    {this.state.erros.length > 0 &&
                        this.state.erros.map(erro => {
                            return (
                                <div class="alert alert-dismissible alert-danger">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>Erro!</strong> {erro}
                                </div>
                            );
                        })
                    }

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input 
                                    name="nome" 
                                    type="text" 
                                    value={this.state.nome} 
                                    className="form-control"
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <button onClick={this.salvar} className="btn btn-success">Salvar</button>
                        </div>
                        <div className="col-md-1">
                            <button onClick={this.limpar} className="btn btn-primary">Limpar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CadastroTipo;