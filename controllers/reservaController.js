const reservaModel = require('../models/reserva');
const UserModel = require('../models/user');
const carreiraModel = require("../models/carreira");
const veiculoModel = require("../models/veiculo");
var nodemailer = require('nodemailer');
exports.insertReserva = (req, res) => {
    const user = req.user;
    reservaModel.createReserva(req.body, (doc, err) => {
        if (err) res.status(500).send({message: err.message});
            UserModel.userFindById(doc._id,(udoc,err) => {
                if (err) res.status(500).send({message: err.message});
                reservaModel.reservaFindById(doc.id, (unodoc, err) => {
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'jvmiguelv@gmail.com',
                          pass: 'zcwhlgqzfuviujvo'
                        }
                      });
                      
                      var mailOptions = {
                        from: 'jvmiguelv@gmail.com',
                        to: 'jvmiguelito235@gmail.com',
                        subject: 'Notificação da Reserva feita',
                        text: 'Motorista:'+ unodoc.Motorista.username+ '\n'+'Origem:'+unodoc.Carreira.nome+'\n'+'Veículo utilizado:'+unodoc.Veiculo,
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                const isAuthenticated = !!req.user;
                if (!err) res.status(200).render('reservaNotificacao',{isAuthenticated, reserva:unodoc,user});
                else res.redirect("/reserva/criar");
                });
            });
    });
};

exports.insertVeiculo = (req, res) => {
    veiculoModel.createVeiculo(req.body, (doc, err) => {
        if(!err) res.status(201).send({id: doc._id});
        else res.status(500).send({message: err.message});
    });
};

exports.confirmaReserva = (req, res) => { 
    if (!err) res.status(200).redirect("/reserva");
     else res.redirect("/reserva/notificar");
};

exports.listReserva = (req,res) => {
    reservaModel.reservaList((docs,err) => {
        if (err) res.status(500).send({message: err.message});
        const isAuthenticated = !!req.user;
        const num = 0;
        const user = req.user;
        UserModel.userFindById(req.user.id,(udoc,err) => {
            
            if (!err) res.status(200).render('Reserva',{isAuthenticated, reservas:docs,num,user,udoc});
            else res.status(500).send({message: err.message});
        });
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
        veiculoModel.veiculoList((vdocs,err) => {
            if (err) res.status(500).send({message: err.message});
            UserModel.userList((udocs,err) => {
                if (err) res.status(500).send({message: err.message});
                carreiraModel.carreiraList((cdocs,err) => {
                    if (err) res.status(500).send({message: err.message});
                    reservaModel.reservaFindById(udoc._id, (doc, err) => {
                        const isAuthenticated = !!req.user;
                        if(!err) res.status(200).render('ReservaCriar',{isAuthenticated,reserva:doc,user, udocs,carreiras:cdocs,veiculos:vdocs});
                        else res.status(500).send({message: err.message});
                    });
                });
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

