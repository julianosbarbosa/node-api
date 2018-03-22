var express = require('express');
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser');

app.use(cors())

var pessoas = [
{
    id: 1,
    name: 'Murillo'
},
{
    id: 2,
    name: 'Alexandre'
}
];

var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/pessoas', function(req, res) {
    res.send({ pessoas: pessoas });
});

app.post('/pessoas', function(req, res) {
    var pessoaName = req.body.name;
    currentId++;

    pessoas.push({
        id: currentId,
        name: pessoaName
    });

    res.send('A pessoa foi cadastrada!');
});

app.put('/pessoas/:id', function(req, res) {
    var id = req.params.id;
    var newName = req.body.newName;

    var found = false;

    pessoas.forEach(function(pessoa, index) {
        if (!found && pessoa.id === Number(id)) {
            pessoa.name = newName;
        }
    });

    res.send('A pessoa foi atualizada!');
});

app.delete('/pessoas/:id', function(req, res) {
    var id = req.params.id;

    var found = false;

    pessoas.forEach(function(pessoa, index) {
        if (!found && pessoa.id === Number(id)) {
            pessoas.splice(index, 1);
        }
    });

    res.send('A pessoa foi atualizada!');
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
