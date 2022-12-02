const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const fetch = require('node-fetch');
const User = require("../models/user");
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
    Comentario:
        {
            type: Schema.Types.ObjectId,
            ref: 'Comentario'
        },
    Classificacao:
        {
            type: Schema.Types.ObjectId,
            ref: 'Classificacao'
        },
    data: String,
    hora: String,
    acompanhante: Boolean,
    mobilidadeReduzida: Boolean,
});

//Create the actual model
const Reserva = mongoose.model('Reservas', reservaSchema);

exports.reservaFindById = (id, cb) => {
    Reserva.findById(id, {  _id:1, User:1, Motorista:1, Comentario:1, Classificacao:1, data:1, hora:1, acompanhante:1, mobilidadeReduzida:1})
        .populate({ path: 'User', model: User.userModel() })
        .populate({ path: 'Comentario', model: Comentario })
        .populate({ path: 'Classificacao', model: Classificacao })
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

    Reserva.find({ }, { _id:1, User:1, Motorista:1, Comentario:1, Classificacao:1, data:1, hora:1, acompanhante:1, mobilidadeReduzida:1})
        .populate({ path: 'User', model: User.userModel() })
        .populate({ path: 'Comentario', model: Comentario.comentarioModel() })
        .populate({ path: 'Classificacao', model: Classificacao.classificacaoModel() })
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

/*exports.patchReserva = (id, reservaData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    Reserva.findOneAndUpdate({_id: id}, reservaData, {new:true, overwrite:true, projection: {  _id:0, username:0, password:0, email:0, FAQ:0, responses:1}})
        .populate({ path: 'User', model: User.userModel() })
        .populate({ path: 'Comentario', model: Comentario.comentarioModel() })
        .populate({ path: 'Classificacao', model: Classificacao.classificacaoModel() })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};*/

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
