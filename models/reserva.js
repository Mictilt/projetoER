const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');
const fetch = require('node-fetch');
const User = require("../models/user");
const Carreira = require("./carreira");
const Veiculo = require("./veiculo");
//Our user schema
const reservaSchema = new mongoose.Schema({
    User: 
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    Motorista:
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    Origem:
        {
            type: Schema.Types.ObjectId,
            ref: 'Carreira'
        },
    Veiculo:
        {
            type: Schema.Types.ObjectId,
            ref: 'Veiculo'
        },
    comentario: String,
    classificacao: Number,
    datetime: Date,
    acompanhante: Boolean,
    mobilidadeReduzida: Boolean,
});

//Create the actual model
const Reserva = mongoose.model('Reservas', reservaSchema);

exports.reservaFindById = (id, cb) => {
    Reserva.findById(id, {  _id:1, User:1, Motorista:1, Origem:1,Veiculo:1, comentario:1, classificacao:1, datetime:1, acompanhante:1, mobilidadeReduzida:1})
        .populate({ path: 'User', model: User.userModel() })
        .populate({ path: 'Motorista', model: User.userModel() })
        .populate({ path: 'Origem', model: Carreira.carreiraModel() })
        .populate({ path: 'Veiculo', model: Veiculo.veiculoModel() })
        .exec()
        .then(doc => cb(doc))
        .catch(err => cb(null, err));
};

exports.createReserva = (reservaData, cb) => {

    const reserva = new Reserva(reservaData);
    
    //Equivalently as the previous lines, mongoose allows the .then .catch mechanism instead of the callbacks (very similar to JS promises)
    reserva.save()
        .then(doc => cb(doc))
        .catch(err => cb(null, err)); //In this case the callback signature should be changed to include the err parameter
};

exports.reservaList = (cb) => {

    Reserva.find({ }, { _id:1, User:1, Motorista:1, Origem:1,Veiculo:1, comentario:1, classificacao:1, datetime:1, acompanhante:1, mobilidadeReduzida:1})
        .populate({ path: 'User', model: User.userModel() })
        .populate({ path: 'Motorista', model: User.userModel() })
        .populate({ path: 'Origem', model: Carreira.carreiraModel() })
        .populate({ path: 'Veiculo', model: Veiculo.veiculoModel() })
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

exports.patchComentarioReserva = (id, reservaData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    Reserva.findOneAndUpdate({_id: id}, reservaData, {new:false, overwrite:false, projection: { _id:0, User:0, Motorista:0, Origem:0,Veiculo:0, comentario:1, classificacao:0, datetime:0, acompanhante:0, mobilidadeReduzida:0}})
        .populate({ path: 'User', model: User.userModel() })
        .populate({ path: 'Motorista', model: User.userModel() })
        .populate({ path: 'Origem', model: Carreira.carreiraModel() })
        .populate({ path: 'Veiculo', model: Veiculo.veiculoModel() })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.patchClassificacaoReserva = (id, reservaData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    Reserva.findOneAndUpdate({_id: id}, reservaData, {new:false, overwrite:false, projection: { _id:0, User:0, Motorista:0, Origem:0, Veiculo:0, comentario:0, classificacao:1, datetime:0, acompanhante:0, mobilidadeReduzida:0}})
        .populate({ path: 'User', model: User.userModel() })
        .populate({ path: 'Motorista', model: User.userModel() })
        .populate({ path: 'Origem', model: Carreira.carreiraModel() })
        .populate({ path: 'Veiculo', model: Veiculo.veiculoModel() })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.patchDataReserva = (id, reservaData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    Reserva.findOneAndUpdate({_id: id}, reservaData, {new:false, overwrite:false, projection: { _id:0, User:0, Motorista:0, Origem:0, Veiculo:0, comentario:0, classificacao:0, datetime:1, acompanhante:0, mobilidadeReduzida:0}})
        .populate({ path: 'User', model: User.userModel() })
        .populate({ path: 'Motorista', model: User.userModel() })
        .populate({ path: 'Origem', model: Carreira.carreiraModel() })
        .populate({ path: 'Veiculo', model: Veiculo.veiculoModel() })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.reservaRemoveById = (reservaId, cb) => {

    Reserva.deleteMany({ _id: reservaId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));

};

exports.reservaName = function () {
    return this.modelName;
}



exports.reservaModel = function () {
    return mongoose.model('Reservas', reservaSchema);
}
