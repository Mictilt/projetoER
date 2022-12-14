const FrequenciaModel = require('../models/frequencia');

exports.insert = (req, res) => {
    FrequenciaModel.createFrequencia(req.body, (doc, err) => {
        if(!err) res.redirect("/horario/newcreate");
        else res.redirect("/frequencia/create");
    });
};

exports.listFrequencia = (req, res) => {
    FrequenciaModel.frequenciaList((docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        if(!err) res.status(200).render('frequencia',{isAuthenticated,frequencia:docs,num});
        else res.status(500).send({message: err.message});
    });
};

exports.listFrequenciaPool = (req, res) => {
    FrequenciaModel.frequenciaList((docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        if(!err) res.status(200).render('frequenciapool',{isAuthenticated,frequencia:docs,num});
        else res.status(500).send({message: err.message});
    });
};

exports.getById = (req, res) => {
    FrequenciaModel.frequenciaFindById(req.params.id, (doc, err) => {
        const isAuthenticated = !!req.user;
        const user = req.user;
        if(!err) res.status(200).render('frequenciaedit',{isAuthenticated,frequencia:doc,user});
        else res.status(500).send({message: err.message});
    });
};

exports.patchById = (req, res) => {
    FrequenciaModel.patchFrequencia(req.params.id, req.body, (doc, err) => {
        if(!err) res.status(200).redirect("/frequencia/pool");
        else res.status(500).send({message: err.message});
    });
};

exports.removeById = (req, res) => {

    FrequenciaModel.frequenciaRemoveById(req.params.id, (err) => {
        if(!err) res.status(204).redirect("/frequencia/pool");
        else res.status(500).send({message: err.message});
    });

};