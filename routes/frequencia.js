var express = require('express');
var frequenciaController = require('../controllers/frequenciaController');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const router = express.Router();
//Página de Frequencia
router.get('/', jsonParser, function (req, res) {
    frequenciaController.listFrequencia(req,res);
});

router.get('/pool', jsonParser, function (req, res) {
    frequenciaController.listFrequenciaPool(req,res);

});

router.get('/create', function (req, res) {
    const isAuthenticated = !!req.user;
    const user = req.user;
    res.render('frequenciacreate', {isAuthenticated,user,res});
});

router.post('/create', jsonParser, function (req, res) {
    //create frequencia
    frequenciaController.insert(req, res);
});

router.get('/create', function (req, res) {
    const isAuthenticated = !!req.user;
    const user = req.user;
    res.render('frequenciacreate', {isAuthenticated,user,res});
});
router.get('/edit/:id', jsonParser, function (req, res) {
    frequenciaController.getById(req, res)
});

router.post('/edit/:id', jsonParser, function (req, res) {
    frequenciaController.patchById(req, res)
});

router.post('/delete/:id', jsonParser, function (req, res) {
    frequenciaController.removeById(req, res)
});

//Let's expose these routes
module.exports = router;