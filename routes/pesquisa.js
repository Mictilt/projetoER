var express = require('express');
var pesquisaController = require('../controllers/pesquisaController');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const router = express.Router();
//Página de Carreira
router.get('/', jsonParser, function (req, res) {
    pesquisaController.listPesquisaFrequencia(req,res);
});

router.post('/frequencia', jsonParser, function (req, res) {
    //console.log("\nlista frequencias\n");
    //pesquisa horarios com carreira
    pesquisaController.listPesquisaHorarios(req,res);
});

router.get('/:id', jsonParser, function (req, res) {
    pesquisaController.erroPesquisa(req,res);
});



//Let's expose these routes
module.exports = router;