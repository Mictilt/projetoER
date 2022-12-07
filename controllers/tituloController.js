const TituloModel = require('../models/titulo');

exports.insert = (req, res) => {
    TituloModel.createTitulo(req.body, (doc, err) => {
        if(!err) res.redirect("/titulo");
        else res.redirect("/titulo/create");
    });
};

exports.listTitulo = (req, res) => {
    TituloModel.tituloList((docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        if(!err) res.status(200).render('titulo',{isAuthenticated,titulo:docs,num});
        else res.status(500).send({message: err.message});
    });
};


exports.listTituloPool = (req, res) => {
    TituloModel.tituloList((docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        if(!err) res.status(200).render('titulopool',{isAuthenticated,titulo:docs,num});
        else res.status(500).send({message: err.message});
    });
};

exports.getById = (req, res) => {
    TituloModel.tituloFindById(req.params.id, (doc, err) => {
        const isAuthenticated = !!req.user;
        const user = req.user;
        if(!err) res.status(200).render('tituloedit',{isAuthenticated,titulo:doc,user});
        else res.status(500).send({message: err.message});
    });
};

exports.patchById = (req, res) => {
    TituloModel.patchTitulo(req.params.id, req.body, (doc, err) => {
        if(!err) res.status(200).redirect("/titulo/pool");
        else res.status(500).send({message: err.message});
    });
};

exports.removeById = (req, res) => {

    TituloModel.tituloRemoveById(req.params.id, (err) => {
        if(!err) res.status(204).redirect("/titulo/pool");
        else res.status(500).send({message: err.message});
    });

};
