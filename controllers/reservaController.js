const reservaModel = require('../models/reserva');
const UserModel = require('../models/user');

exports.insertReserva = (req, res) => {
    reservaModel.createReserva(req.body, (doc, err) => {
        if(!err) res.redirect("/reserva");
        else res.redirect("/reserva/criar");
    });
};

/*exports.listTicket = (req,res) => {
    ticketModel.ticketList((docs,err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        if (!err) res.status(200).render('tickets',{isAuthenticated, tickets:docs,num});
        else res.status(500).send({message: err.message});
    });
};*/

exports.reservaGetById = (req, res) => {
    const user = req.user;
    UserModel.userFindById(req.user.id,(udocs,err) => {
        if (err) res.status(500).send({message: err.message});
        reservaModel.reservaFindById(udocs._id, (doc, err) => {
            const isAuthenticated = !!req.user;
            if(!err) res.status(200).render('Reserva',{isAuthenticated,reservas:doc,user, udocs});
            else res.status(500).send({message: err.message});
        });
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
                if(!err) res.status(200).render('ReservaCriar',{isAuthenticated,reservas:doc,user, udocs});
                else res.status(500).send({message: err.message});
            });
        });
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

