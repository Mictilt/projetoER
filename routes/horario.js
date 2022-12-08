var express = require('express');
var horarioController = require('../controllers/horarioController');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const router = express.Router();
//Página de Horário
router.get('/', jsonParser, function (req, res) {
    horarioController.listHorario(req,res);
});

router.get('/pool', jsonParser, function (req, res) {
    horarioController.listHorarioPool(req,res);

});

router.get('/create', function (req, res) {
    horarioController.listCreateHorario(req,res);
});

router.post('/create', jsonParser, function (req, res) {
    //create horario
    horarioController.insert(req, res);
});

router.get('/create', function (req, res) {
    const isAuthenticated = !!req.user;
    const user = req.user;
    res.render('horariocreate', {isAuthenticated,user,res});
});
router.get('/edit/:id', jsonParser, function (req, res) {
    horarioController.getById(req, res)
});

router.post('/edit/:id', jsonParser, function (req, res) {
    horarioController.patchById(req, res)
});

router.post('/delete/:id', jsonParser, function (req, res) {
    horarioController.removeById(req, res)
});

//Let's expose these routes
module.exports = router;