var express = require('express');
var carreiraController = require('../controllers/carreiraController');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const router = express.Router();
//Página de Carreira
router.get('/', jsonParser, function (req, res) {
    carreiraController.listCarreira(req,res);
});

router.get('/pool', jsonParser, function (req, res) {
    carreiraController.listCarreiraPool(req,res);

});

router.get('/create', function (req, res) {
    const isAuthenticated = !!req.user;
    const user = req.user;
    res.render('carreiracreate', {isAuthenticated,user,res});
});

router.post('/create', jsonParser, function (req, res) {
    //create carreira
    carreiraController.insert(req, res);
});

router.get('/create', function (req, res) {
    const isAuthenticated = !!req.user;
    const user = req.user;
    res.render('carreiracreate', {isAuthenticated,user,res});
});
router.get('/edit/:id', jsonParser, function (req, res) {
    carreiraController.getById(req, res)
});

router.post('/edit/:id', jsonParser, function (req, res) {
    carreiraController.patchById(req, res)
});

router.post('/delete/:id', jsonParser, function (req, res) {
    carreiraController.removeById(req, res)
});

//Let's expose these routes
module.exports = router;