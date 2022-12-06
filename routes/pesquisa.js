var express = require('express');
var pesquisaController = require('../controllers/pesquisaController');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const router = express.Router();
//Página de Carreira
router.get('/', jsonParser, function (req, res) {
    pesquisaController.listPesquisaFrequencia(req,res);
});


//Let's expose these routes
module.exports = router;