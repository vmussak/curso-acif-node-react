import axios from 'axios';

const PRODUTOS = '_PRODUTOS';

const http = axios.create({
    baseURL : 'http://localhost:4000'
})

export function ErroValidacao(errors){
    this.errors = errors;
}

export default class ProdutoService {

    validar = (produto) => {
        const errors = []

        if(!produto.nome){
            errors.push('O campo Nome é obrigatório.')
        }

        if(!produto.sku){
            errors.push('O campo SKU é obrigatório.')
        }

        if( !produto.preco || produto.preco <= 0){
            errors.push('O campo Preço deve ter um valor maior que zero(0).')
        }

        if(!produto.fornecedor){
            errors.push('O campo Fornecedor é obrigatório.')
        }

        if(errors.length > 0){
            throw new ErroValidacao(errors)
        }
    }

    obterProdutos = async () => {
        let prods = await http.get('/tipos-de-cliente', {
            //headers: {'x-tenant-id' : localStorage.getItem('email_usuario_logado')}
        });

        console.log(prods.data.content);

        return prods.data.content;
    }

    obterIndex = (sku) => {
        let index = null;
        this.obterProdutos().forEach( (produto, i) => {
            if(produto.sku === sku ){
                index = i;
            }
        })
        return index;
    }

    deletar = (sku) => {
        const index = this.obterIndex(sku)
        if(index !== null){
            const produtos = this.obterProdutos()
            produtos.splice(index, 1)
            localStorage.setItem(PRODUTOS, JSON.stringify(produtos)  )
            return produtos
        }
    }

    salvar = (produto) => {
        this.validar(produto)

        let produtos = localStorage.getItem(PRODUTOS)

        if(!produtos){
            produtos = []
        }else{
            produtos = JSON.parse(produtos)
        }

        const index = this.obterIndex(produto.sku)
        if(index === null){
            produtos.push(produto);  
        }else{
            produtos[index] = produto;
        }        

        localStorage.setItem(PRODUTOS, JSON.stringify(produtos)  )
    }
}