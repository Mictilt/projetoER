const PesquisaModel = require('../models/carreira');
const HorarioModel = require('../models/horario');

exports.listPesquisaFrequencia = (req, res) => {
    PesquisaModel.carreiraList((docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        const par = req.params.id;        
        if(!err) res.status(200).render('pesquisafrequencia',{isAuthenticated,carreira:docs,par,num});
        else res.status(500).send({message: err.message});
    });
};

exports.listPesquisaHorarios = (req, res) => {
    HorarioModel.findHorarioCarreriaID(req.body.Carreira,(docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        if (docs[0] == null){
            res.status(200).redirect('/pesquisa/0')
        }else{
            if(!err) res.status(200).render('horariofrequencia',{isAuthenticated,horario:docs,num});
        else res.status(500).send({message: err.message});
        }; 
        
    });
};

