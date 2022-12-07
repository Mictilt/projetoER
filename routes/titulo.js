var express = require('express');
var tituloController = require('../controllers/tituloController');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const router = express.Router();
//Página de Titulo
router.get('/', jsonParser, function (req, res) {
    tituloController.listTitulo(req,res);
});

router.get('/pool', jsonParser, function (req, res) {
    tituloController.listTituloPool(req,res);

});

router.get('/create', function (req, res) {
    const isAuthenticated = !!req.user;
    const user = req.user;
    res.render('titulocreate', {isAuthenticated,user,res});
});

router.post('/create', jsonParser, function (req, res) {
    //create titulo
    tituloController.insert(req, res);
});

router.get('/create', function (req, res) {
    const isAuthenticated = !!req.user;
    const user = req.user;
    res.render('titulocreate', {isAuthenticated,user,res});
});
router.get('/edit/:id', jsonParser, function (req, res) {
    tituloController.getById(req, res)
});

router.post('/edit/:id', jsonParser, function (req, res) {
    tituloController.patchById(req, res)
});

router.post('/delete/:id', jsonParser, function (req, res) {
    tituloController.removeById(req, res)
});

//Let's expose these routes
module.exports = router;