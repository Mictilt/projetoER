var express = require('express');
var reservaController = require('../controllers/reservaController');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

const router = express.Router();
//Página de utilizador
router.get('/', jsonParser, function (req, res) {
    reservaController.listReserva(req,res);
});

router.get('/criar', jsonParser, function (req, res) {
    reservaController.reservaGetByIdCriar(req,res);
});

router.post('/criar', jsonParser, function (req, res) {
    reservaController.insertReserva(req,res);
});

router.get('/comentario/:id',jsonParser, function (req,res){
    reservaController.reservaGetByIdComentario(req, res);
});

router.post('/comentario/:id',jsonParser, function (req,res){
    reservaController.patchReservaComentario(req, res);
});

router.get('/classificacao/:id',jsonParser, function (req,res){
    reservaController.reservaGetByIdClassificacao(req, res);
});

router.post('/classificacao/:id',jsonParser, function (req,res){
    reservaController.patchReservaClassificacao(req, res);
});

router.get('/editar/:id',jsonParser, function (req,res){
    reservaController.reservaGetByIdEditar(req, res);
});

router.post('/editar/:id',jsonParser, function (req,res){
    reservaController.patchReservaEditar(req, res);
});

router.post('/apagar/:id',jsonParser, function (req,res){
    reservaController.removeById(req, res);
});



//Let's expose these routes
module.exports = router;