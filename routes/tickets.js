var express = require('express');
var ticketController = require('../controllers/ticketController');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var userController = require('../controllers/userController');

const router = express.Router();

router.get('/', function (req, res) {
    ticketController.listTicket(req,res);
});

router.get('/abrirTicket', function (req, res) {
    const isAuthenticated = !!req.user;
    res.render('abrirTicket', {isAuthenticated});

});

router.get('/poolTicket', function (req, res) {
    ticketController.ticketAgente(req,res);
});


router.get('/criarTicket', function (req,res) {
    userController.getUser(req, res);
});



router.get('/ticketsEspecifico/:id', jsonParser, function (req, res) {
    ticketController.TicketgetById(req, res);
});

router.post('/ticketsEspecifico/:id',jsonParser, function (req,res){
    ticketController.TicketpatchById(req, res);
});

router.post('/estadoTicket/:id',jsonParser, function (req,res){
    ticketController.patchTicketState(req, res);
});

router.post('/criarTicket', jsonParser, function (req, res) {
    ticketController.insert(req, res);
});

//Let's expose these routes
module.exports = router;