const reservaModel = require('../models/reserva');
const UserModel = require('../models/user');

exports.insertReserva = (req, res) => {
    reservaModel.createReserva(req.body, (doc, err) => {
        console.log(req.body);
        if(!err) res.redirect("/reserva");
        else res.redirect("/reserva/criar");
    });
};

exports.listReserva = (req,res) => {
    reservaModel.reservaList((docs,err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        const user = req.user;
        console.log(typeof (docs[0].datetime));
        if (!err) res.status(200).render('Reserva',{isAuthenticated, reservas:docs,num,user});
        else res.status(500).send({message: err.message});
    });
};

exports.reservaGetByIdComentario = (req, res) => {
    const user = req.user;
    reservaModel.reservaFindById(req.params.id, (doc, err) => {
        const isAuthenticated = !!req.user;
        if(!err) res.status(200).render('ReservaComentario',{isAuthenticated,reserva:doc,user});
        else res.status(500).send({message: err.message});
    });
};

exports.reservaGetByIdEditar = (req, res) => {
    const user = req.user;
    reservaModel.reservaFindById(req.params.id, (doc, err) => {
        const isAuthenticated = !!req.user;
        if(!err) res.status(200).render('Reservaeditar',{isAuthenticated,reserva:doc,user});
        else res.status(500).send({message: err.message});
    });
};

exports.reservaGetByIdClassificacao = (req, res) => {
    const user = req.user;
    reservaModel.reservaFindById(req.params.id, (doc, err) => {
        const isAuthenticated = !!req.user;
        if(!err) res.status(200).render('ReservaClassificacao',{isAuthenticated,reserva:doc,user});
        else res.status(500).send({message: err.message});
    });
};

exports.reservaGetByIdCriar = (req, res) => {
    const user = req.user;
    UserModel.userFindById(req.user.id,(udoc,err) => {
        if (err) res.status(500).send({message: err.message});
        UserModel.userList((udocs,err) => {
            if (err) res.status(500).send({message: err.message});
            reservaModel.reservaFindById(udoc._id, (doc, err) => {
                const isAuthenticated = !!req.user;
                if(!err) res.status(200).render('ReservaCriar',{isAuthenticated,reserva:doc,user, udocs});
                else res.status(500).send({message: err.message});
            });
        });
    });
};

exports.patchReservaComentario = (req, res) => {
    reservaModel.patchComentarioReserva(req.params.id, req.body, (doc, err) => {
        if(!err) res.status(200).redirect("/reserva");
        else res.status(500).send({message: err.message});
    });
};

exports.patchReservaClassificacao = (req, res) => {
    reservaModel.patchClassificacaoReserva(req.params.id, req.body, (doc, err) => {
        if(!err) res.status(200).redirect("/reserva");
        else res.status(500).send({message: err.message});
    });
};

exports.patchReservaEditar = (req, res) => {
    reservaModel.patchDataReserva(req.params.id, req.body, (doc, err) => {
        if(!err) res.status(200).redirect("/reserva");
        else res.status(500).send({message: err.message});
    });
};

exports.removeById = (req, res) => {

    reservaModel.reservaRemoveById(req.params.id, (err) => {
        if(!err) res.status(204).redirect("/reserva");
        else res.status(500).send({message: err.message});
    });

};
