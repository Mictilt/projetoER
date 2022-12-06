const PesquisaModel = require('../models/carreira');
const HorarioModel = require('../models/horario');

exports.listPesquisaFrequencia = (req, res) => {
    PesquisaModel.carreiraList((docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        if(!err) res.status(200).render('pesquisafrequencia',{isAuthenticated,carreira:docs,num});
        else res.status(500).send({message: err.message});
    });
};

exports.listPesquisaHorarios = (req, res) => {
    HorarioModel.findHorarioCarreriaID(req.body.Carreira,(docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        if(!err) res.status(200).render('horariofrequencia',{isAuthenticated,horario:docs,num});
        else res.status(500).send({message: err.message});
    });
};



