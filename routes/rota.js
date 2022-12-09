var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const router = express.Router();

router.get('/', function (req, res) {
    const isAuthenticated = !!req.user;
    const user = req.user;
    res.render('rota', {isAuthenticated,user,res});
});

module.exports = router;