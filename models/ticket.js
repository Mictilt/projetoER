const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const fetch = require('node-fetch');
const User = require("../models/user");
const ticketSchema = new mongoose.Schema({
    title: String,
    description : String,
    email : String,
    state : Boolean, //false is open, true is close
    answers : [String],
    User: 
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ,
});

const Ticket =  mongoose.model('Tickets', ticketSchema);

exports.TicketFindById = (id, cb) => {
    Ticket.findById(id, {  _id:1, title:1, description:1, email:1, state:1, answers:1, User:1})
        .populate({ path: 'User', model: User.userModel() })
        .exec()
        .then((doc) => cb(doc))
        .catch(err => cb(err));
};


exports.createTicket = (ticketData, cb) => {

    if (ticketData.User == "") ticketData.User =null;
    const ticket = new Ticket(ticketData);
    //Equivalently as the previous lines, mongoose allows the .then .catch mechanism instead of the callbacks (very similar to JS promises)
    ticket.save()
        .then(doc => cb(doc))
        .catch(err => cb(null, err)); //In this case the callback signature should be changed to include the err parameter
};

exports.ticketList = (cb) => {

    Ticket.find({ }, { _id:1, title:1, description:1, email:1, state:1, answers:1, User:1})
        .populate({path: 'User', model: User.userModel() })
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

exports.patchTicket = (id, ticketData, cb) => {
    Ticket.findByIdAndUpdate(id, {$push: {answers : [ticketData.answers]}})
        .populate({ path: 'User', model: User.userModel() })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.patchTicketState = (id, ticketData, cb) => {
    Ticket.findOneAndUpdate({_id: id}, ticketData, {new:false , overwrite:false, projection: {_id:0, title:0, description:0, email:0, state:1, answers:0, User:0}})
        .populate({ path: 'User', model: User.userModel() })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.ticketModel = function() {
    return mongoose.model('tickets', ticketSchema);
};

exports.ticketListAgent = (cb) => {

    Ticket.find({ }, { _id:1, title:1, description:1, email:1, state:1, answers:1, User:1})
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};


