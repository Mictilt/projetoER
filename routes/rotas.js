var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const router = express.Router();
//Página de Titulo
router.get('/', jsonParser, function (req, res) {
    const isAuthenticated = !!req.user;
    const user = req.user;
    res.render('rota', {isAuthenticated,user,res});
});

//Let's expose these routes
module.exports = router;