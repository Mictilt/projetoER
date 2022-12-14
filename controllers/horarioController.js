const HorarioModel = require('../models/horario');
const FrequenciaModel = require('../models/frequencia');
const CarreiraModel = require('../models/carreira');
const ObjectId = require('mongodb').ObjectId;



exports.insert = (req, res) => {
    // CarreiraModel.carreiraFindOne(req.Carreira,(cdocs,err) =>{
    //     if (err) res.status(500).send({message: err.message});     
    //     FrequenciaModel.frequenciaFindOne(req.Frequencia,(fdocs,err) =>{
    //         if (err) res.status(500).send({message: err.message});                        
    HorarioModel.findHorarioCarreriaID(req.body.Carreira, (hcdoc, err) => {
        console.log("---------\n" + hcdoc + "\n-------\n");
        console.log("********\n" + req.body.Carreira + "\n********\n");
        console.log("valor hcdoc\n" + hcdoc+"\n---------");
        if(hcdoc[0] == null){
            HorarioModel.createHorario(req.body, (doc, err) => {
                if (!err) { res.redirect("/horario"); }
                else { res.redirect("/horario/create"); }
        
        //console.log("true");
        //res.redirect("/horario");
        // if (hcdoc?.lenght ?? false) {
        //HorarioModel.findHorarioFrequenciaID(req.body.Frequencia, (hfdoc, err) => {
        //         if (hfdoc ?? false) {

        //             res.redirect("/horario");
        //         } else {
        //             HorarioModel.updateHorarioFrequencia(hcdoc[0]._id, req.body, (hdoc, err) => {
        //                 if (!err) { res.redirect("/horario"); }
        //                 else { res.redirect("/horario/create"); }
        //             });
        //         }

        //     })
        // }
        // else {
        //     HorarioModel.createHorario(req.body, (doc, err) => {
        //         if (!err) { res.redirect("/horario"); }
        //         else { res.redirect("/horario/create"); }
        //     });

        // };
    });
    }
    else{
        HorarioModel.findHorarioFrequenciaID(req.body.Frequencia,req.body.Carreira, (hfdoc, err) => {
            if(hfdoc[0] == null){  
                console.log("true")
                console.log("---------\n" + hcdoc[0]._id + "\n-------\n");
                HorarioModel.updateHorarioFrequencia(hcdoc[0]._id, req.body, (hdoc, err) => {
                    if (!err)  res.redirect("/horario"); 
                        else  res.redirect("/horario/create"); 
                });
        }
        else{
            
            console.log("\nfalse")
            console.log("---------\n" + hcdoc[0]._id + "\n-------\n");
            res.redirect("/horario");
        }

    });
    }
    });
};






exports.listHorario = (req, res) => {
    HorarioModel.horarioList((docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0;

        if (!err) res.status(200).render('horario', { isAuthenticated, horario: docs, num });
        else res.status(500).send({ message: err.message });
    });

};

exports.listCreateHorario = (req, res) => {
    const user = req.user;
    const isAuthenticated = !!req.user;
    const num = 0;
    FrequenciaModel.frequenciaList((fdocs, err) => {
        if (err) res.status(500).send({ message: err.message });
        CarreiraModel.carreiraList((cdocs, err) => {
            if (!err) res.status(200).render('horariocreate', { isAuthenticated, frequencia: fdocs, carreira: cdocs, user, num });
            else res.status(500).send({ message: err.message });
        });

    });
};

exports.newlistCreateHorario = (req, res) => {
    const user = req.user;
    const isAuthenticated = !!req.user;
    const num = 0;
    FrequenciaModel.frequenciaList((fdocs, err) => {
        if (err) res.status(500).send({ message: err.message });
        CarreiraModel.carreiraList((cdocs, err) => {
            if (!err) res.status(200).render('newhorariocreate', { isAuthenticated, frequencia: fdocs, carreira: cdocs, user, num });
            else res.status(500).send({ message: err.message });
        });

    });
};

exports.listHorarioPool = (req, res) => {
    HorarioModel.horarioList((docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        if (!err) res.status(200).render('horariopool', { isAuthenticated, horario: docs, num });
        else res.status(500).send({ message: err.message });
    });
};

exports.getById = (req, res) => {
    HorarioModel.horarioFindById(req.params.id, (doc, err) => {
        const isAuthenticated = !!req.user;
        const user = req.user;
        if (!err) res.status(200).render('horarioedit', { isAuthenticated, horario: doc, user });
        else res.status(500).send({ message: err.message });
    });
};

exports.patchById = (req, res) => {
    HorarioModel.patchHorario(req.params.id, req.body, (doc, err) => {
        if (!err) res.status(200).redirect("/horario/pool");
        else res.status(500).send({ message: err.message });
    });
};

exports.removeById = (req, res) => {

    HorarioModel.horarioRemoveById(req.params.id, (err) => {
        if (!err) res.status(204).redirect("/horario/pool");
        else res.status(500).send({ message: err.message });
    });

};
