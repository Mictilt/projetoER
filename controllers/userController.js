const UserModel = require('../models/user');
const ticketModel = require ('../models/ticket');
const faqModel = require ('../models/faq');
const numAgente = require('../server');
const {userModel} = require("../models/user");

exports.insert = (req, res) => {
    UserModel.createUser(req.body, (err) => {
        if(!err) res.status(201);
        else res.status(500).send({message: err.message});
    });
};

exports.list = (req, res) => {
    UserModel.list((docs) => {
        return res.status(200).send(docs);
    });
};

exports.userGetById = (req, res) => {
        const user = req.user;
    UserModel.userFindById(req.user.id,(udocs,err) => {
        if (err) res.status(500).send({message: err.message});
        faqModel.faqList((fdocs,err) =>{
            if (err) res.status(500).send({message: err.message});
            ticketModel.ticketList((docs,err) => {
                if(!err) res.status(201).render('utilizador', {udocs,fdocs,tickets : docs, user : user});
                else res.status(500).send({message: err.message});
            });
        });
    });
};

exports.userListAtend = (req, res) => {
    UserModel.list((doc,err) => {
        const User = req.user;
        const isAuthenticated = !!req.user;
        const numAgentes = numAgente.numAgente();
        if(!err) res.status(201).render('atendimento', {isAuthenticated,user:doc, User, numAgentes});
        else res.status(500).send({message: err.message});
    });
};


exports.getUser = (req,res) => {
    UserModel.list((docs) => {
        const isAuthenticated = !!req.user;
        res.render('criarTicket', {isAuthenticated , users : docs});
    });
};

exports.userPatchById = (req, res) => {
    UserModel.patchUser(req.params.id, req.body, (doc, err) => {
        if(!err) res.status(200).redirect("/user");
        else res.status(500).send({message: err.message});
    });
};


exports.userPatchByIdPass = (req, res) => {
    console.log("*******************");
    console.log(req.params.id);
    console.log("*******************");
    console.log(req.body.password[0]);
    console.log("*******************");
    UserModel.patchUser(req.params.id,req.body, (doc, err) => {
        if(!err) res.status(200).redirect("/user");
        else res.status(500).send({message: err.message});
    });
};
