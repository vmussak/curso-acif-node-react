import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:4000'
});

export function ValidadorDeErros(erros) {
    this.erros = erros;
}

export default class TipoService {
    validar = (tipo) => {
        const erros = [];

        if(!tipo.nome){
            erros.push('O campo "Nome" é obrigatório');
        }

        if(erros.length) {
            throw new ValidadorDeErros(erros);
        }
    }

    inserir = async (tipo) => {
        this.validar(tipo);

        await http.post('/tipos-de-cliente', tipo);
    }

    buscar = async () => {
        let tipos = await http.get('/tipos-de-cliente');

        return tipos.data.content;
    }
}