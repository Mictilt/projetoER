var express = require('express');
var userController = require('../controllers/userController');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

const router = express.Router();
//Página de utilizador
router.get('/', jsonParser, function (req, res) {
    userController.userGetById(req,res);
});

router.post('/:id',jsonParser, function (req,res){
    userController.userPatchById(req, res);
});


//Let's expose these routes
module.exports = router;