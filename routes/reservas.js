var express = require('express');
var reservaController = require('../controllers/reservaController');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

const router = express.Router();
//Página de utilizador
router.get('/', jsonParser, function (req, res) {
    reservaController.reservaGetById(req,res);
});

router.get('/criar', jsonParser, function (req, res) {
    reservaController.reservaGetByIdCriar(req,res);
});

router.post('/criar', jsonParser, function (req, res) {
    reservaController.insertReserva(req,res);
});

router.post('/:id',jsonParser, function (req,res){
    reservaController.userPatchById(req, res);
});



//Let's expose these routes
module.exports = router;