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
                          user: 'grupo12a.er@gmail.com',
                          pass: 'pass123#'
                        }
                      });
                      var Motorista = unodoc.Motorista.username;
                      var email = req.user.email;
                      var Origem = unodoc.Origem.nome;
                      var lotacao = unodoc.Veiculo.lotacao;
                      var tipo = unodoc.Veiculo.tipo;
                      if(unodoc.Veiculo.climatizacao == true){
                            var climatizacao = "Sim";
                        }
                        else{
                            var climatizacao = "Não";
                        }
                        var Data = unodoc.datetime.toLocaleString()
                        if(unodoc.acompanhante == true){
                            var acompanhante = "Sim";
                        }
                        else{
                            var acompanhante = "Não";
                        }
                        if(unodoc.mobilidadeReduzida == true){
                            var mobilidadeReduzida = "Sim";
                        }
                        else{
                            var mobilidadeReduzida = "Não";
                        }
                      var mailOptions = {
                        from: 'grupo12a.er@gmail.com',
                        to: email,
                        subject: 'Notificação da Reserva feita',
                        text: 'A informação da reserva feita foi:'+'\n'+'Motorista: '+ Motorista+ '\n'+'Origem: '+Origem+'\n'+'Veículo utilizado com Lotação de: '+ lotacao + 
                        ', Tipo: '+ tipo + ', Possibilidade na Alteração da Climatização: '+ climatizacao +'\n'+'Data e Hora de Marcação:'+ Data
                        +'\n'+'Acompanhante: ' + acompanhante +'\n'+'Mobilidade Reduzida: ' + mobilidadeReduzida
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

