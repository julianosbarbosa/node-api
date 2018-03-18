
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var pessoas = [
{
    id: 1,
    name: 'Paulo'
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
    var productName = req.body.name;
    currentId++;

    pessoas.push({
        id: currentId,
        name: productName
    });

    res.send('Successfully created product!');
});

app.put('/pessoas/:id', function(req, res) {
    var id = req.params.id;
    var newName = req.body.newName;

    var found = false;

    pessoas.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            product.name = newName;
        }
    });

    res.send('Succesfully updated product!');
});

app.delete('/pessoas/:id', function(req, res) {
    var id = req.params.id;

    var found = false;

    pessoas.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            pessoas.splice(index, 1);
        }
    });

    res.send('Successfully deleted product!');
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
