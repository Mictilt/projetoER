const CarreiraModel = require('../models/carreira');

exports.insert = (req, res) => {
    CarreiraModel.createCarreira(req.body, (doc, err) => {
        if(!err) res.redirect("/horario/newcreate");
        else res.redirect("/carreira/create");
    });
};

exports.listCarreira = (req, res) => {
    CarreiraModel.carreiraList((docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        if(!err) res.status(200).render('carreira',{isAuthenticated,carreira:docs,num});
        else res.status(500).send({message: err.message});
    });
};


exports.listCarreiraPool = (req, res) => {
    CarreiraModel.carreiraList((docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        if(!err) res.status(200).render('carreirapool',{isAuthenticated,carreira:docs,num});
        else res.status(500).send({message: err.message});
    });
};

exports.getById = (req, res) => {
    CarreiraModel.carreiraFindById(req.params.id, (doc, err) => {
        const isAuthenticated = !!req.user;
        const user = req.user;
        if(!err) res.status(200).render('carreiraedit',{isAuthenticated,carreira:doc,user});
        else res.status(500).send({message: err.message});
    });
};

exports.patchById = (req, res) => {
    CarreiraModel.patchCarreira(req.params.id, req.body, (doc, err) => {
        if(!err) res.status(200).redirect("/carreira/pool");
        else res.status(500).send({message: err.message});
    });
};

exports.removeById = (req, res) => {

    CarreiraModel.carreiraRemoveById(req.params.id, (err) => {
        if(!err) res.status(204).redirect("/carreira/pool");
        else res.status(500).send({message: err.message});
    });

};
