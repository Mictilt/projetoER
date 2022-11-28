var express = require('express');
var faqController = require('../controllers/faqController');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const router = express.Router();
//Página de FAQ
router.get('/', jsonParser, function (req, res) {
    faqController.listFaq(req,res);
});

router.get('/pool', jsonParser, function (req, res) {
    faqController.listFaqPool(req,res);

});

router.get('/create', function (req, res) {
    const isAuthenticated = !!req.user;
    const user = req.user;
    res.render('faqcreate', {isAuthenticated,user,res});
});

router.post('/create', jsonParser, function (req, res) {
    //create faq
    faqController.insert(req, res);
});

router.get('/create', function (req, res) {
    const isAuthenticated = !!req.user;
    const user = req.user;
    res.render('faqcreate', {isAuthenticated,user,res});
});
router.get('/edit/:id', jsonParser, function (req, res) {
    faqController.getById(req, res)
});

router.post('/edit/:id', jsonParser, function (req, res) {
    faqController.patchById(req, res)
});

router.post('/delete/:id', jsonParser, function (req, res) {
    faqController.removeById(req, res)
});

//Let's expose these routes
module.exports = router;