const reservaModel = require('../models/reserva');

exports.insert = (req, res) => {
    ticketModel.createTicket(req.body, (doc, err) => {
        if(!err) res.redirect("/tickets");
        else res.redirect("/criarTicket");
    });
};

exports.listTicket = (req,res) => {
    ticketModel.ticketList((docs,err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        if (!err) res.status(200).render('tickets',{isAuthenticated, tickets:docs,num});
        else res.status(500).send({message: err.message});
    });
};

exports.reservaGetById = (req, res) => {
    reservaModel.reservaFindById(req.params.id, (doc, err) => {
        const isAuthenticated = !!req.user;
        const user = req.user;
        if(!err) res.status(200).render('Reserva',{isAuthenticated,reservas:doc,user});
        else res.status(500).send({message: err.message});
    });
};

exports.TicketpatchById = (req, res) => {
    ticketModel.patchTicket(req.params.id, req.body, (doc, err) => {
        if(!err) res.status(200).redirect("/tickets");
        else res.status(500).send({message: err.message});
    });
};

exports.patchTicketState = (req, res) => {
    ticketModel.patchTicketState(req.params.id, req.body, (doc, err) => {
        if(!err) res.status(200).redirect("/tickets");
        else res.status(500).send({message: err.message});
    });
};

exports.ticketAgente = (req, res) => {
    ticketModel.ticketListAgent((docs,err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        const user = req.user;
        if (!err) res.status(200).render('poolTicket',{isAuthenticated, tickets:docs,num, user: user});
        else res.status(500).send({message: err.message});
    });
}

