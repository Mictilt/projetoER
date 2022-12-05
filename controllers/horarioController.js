const HorarioModel = require('../models/horario');
const FrequenciaModel = require('../models/frequencia');
const CarreiraModel = require('../models/carreira');


exports.insert = (req, res) => {
    HorarioModel.createHorario(req.body, (doc, err) => {
        if(!err) res.redirect("/horario");
        else res.redirect("/horario/create");
    });
};

exports.listHorario = (req, res) => {
    HorarioModel.horarioList((docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0; 
        
        if(!err) res.status(200).render('horario',{isAuthenticated,horario:docs,num});
        else res.status(500).send({message: err.message});
    });
};

exports.listCreateHorario = (req, res) => {
        const user = req.user;    
        const isAuthenticated = !!req.user;
        const num = 0;
        FrequenciaModel.frequenciaList((fdocs,err) =>{
            if (err) res.status(500).send({message: err.message});
            CarreiraModel.carreiraList((cdocs,err) =>{                
        if(!err) res.status(200).render('horariocreate',{isAuthenticated,frequencia:fdocs,carreira:cdocs,user,num});        
        else res.status(500).send({message: err.message});
        });
   
    });
};


exports.listCarreiraPool = (req, res) => {
    HorarioModel.horarioList((docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        if(!err) res.status(200).render('horariopool',{isAuthenticated,horario:docs,num});
        else res.status(500).send({message: err.message});
    });
};

exports.getById = (req, res) => {
    HorarioModel.horarioFindById(req.params.id, (doc, err) => {
        const isAuthenticated = !!req.user;
        const user = req.user;
        if(!err) res.status(200).render('horarioedit',{isAuthenticated,horario:doc,user});
        else res.status(500).send({message: err.message});
    });
};

exports.patchById = (req, res) => {
    HorarioModel.patchHorario(req.params.id, req.body, (doc, err) => {
        if(!err) res.status(200).redirect("/horario/pool");
        else res.status(500).send({message: err.message});
    });
};

exports.removeById = (req, res) => {

    HorarioModel.horarioRemoveById(req.params.id, (err) => {
        if(!err) res.status(204).redirect("/horario/pool");
        else res.status(500).send({message: err.message});
    });

};
