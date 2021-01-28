import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './views/home';
import CadastroTipo from './views/tipo/cadastro';
import ConsultaTipo from './views/tipo/consulta';

export default () => {
    return (
        <Switch>
            <Route exact path="/cadastro-tipo-de-cliente" component={CadastroTipo} />
            <Route exact path="/consulta-tipo-de-cliente" component={ConsultaTipo} />
            <Route exact path="/" component={Home} />
        </Switch>
    );
}