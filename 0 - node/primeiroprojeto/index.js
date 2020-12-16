const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/cliente', (req, res) => {
    const cliente = req.body;
    cliente.ok = true;
    return res.status(200).json(cliente);
})

app.get('/', (req, res) => {
    res.status(200).json({
        id: 10,
        nome: 'Meu nome'
    })
})

app.get('/cliente/:id', (req, res) => {
    const id = req.params.id;

    res.status(200).json({
        id: id,
        nome: `Cliente ${id}`
    })
})

app.get('/cliente', (req, res) => {
    const {ativo, sexo} = req.query;

    // const ativo = req.query.ativo;
    // const sexo = req.query.sexo;

    res.status(200).json({
        ativo: ativo,
        nome: `Cliente ativo`,
        sexo: sexo
    })
})

app.listen(3700, () => {
    console.log('API rodando na porta ' + 3700)
});