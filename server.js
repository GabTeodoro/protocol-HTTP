const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let contador = 2;
const porta = 3000;
app.set('port', porta);

app.get('/teste', (req, res, next) => {
res.send("Olá");
});

const server = http.createServer(app);
server.listen(3000);

/*
C => CREATE (Insert) - Post
R => READ (Select) - Get 
U => UPDATE - Put
D => DELETE - Delete
*/

const clientes = [
{

    id: 1,
    nome: 'Gabriel Teodoro',
    email: 'gabriel@mail.com'

},
{

    id: 2,
    nome: 'João',
    email: 'joao@mail.com'

}
]

// READ
app.get('/clientes', (req, res, next) => {
    res.json(clientes);
});

// CREATE
app.post('/clientes', (req, res, next) => {

    const cliente = req.body;
    clientes.push({id: contador += 1, nome: cliente.nome, email: cliente.email});
    console.log(clientes);
    res.status(201).json(clientes);

});

// UPDATE
app.put('/clientes', (req, res, next) => {

    const novo = req.body;
    clientes.forEach((cliente) => {

        if(cliente.id === novo.id){

            cliente.nome = novo.nome;
            cliente.email = novo.email;
        }
    });

    console.log(clientes);
    res.status(200).json(clientes);
});

// DELETE
app.delete('/clientes/:id', (req, res, next) => {

    const idApagar = req.params.id;
    clientes.forEach((cliente, index) => {

        if(cliente.id == idApagar){

            clientes.splice(index, 1);
        }
    });

    console.log(clientes);
    res.status(200).json(clientes);
});

// READ com parâmetro
app.delete('/clientes/:id', (req, res, next) => {

    const idConsultar = req.params.id;
    retorno = 'id' + idConsultar + ' Não encontrado';
    clientes.forEach((cliente) => {

        if(cliente.id == idConsultar){

            retorno = cliente;
        }
    });

    console.log(retorno);
    res.status(200).json(retorno);
});