const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const fetch = require('node-fetch');
const User = require("../models/user");
//Our user schema
const tituloSchema = new mongoose.Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    nome:String,
    tipo:String,
    quantidade:Number,
    estado:Boolean
});

//Create the actual model
const Titulo = mongoose.model('Titulos', tituloSchema);

exports.tituloFindById = (id, cb) => {
    Titulo.findById(id, {  _id:1,User:1, nome:1,tipo:1,quantidade:1,estado:1})
        .populate({ path: 'User', model: User.userModel() })
        .exec()
        .then(doc => cb(doc))
        .catch(err => cb(null, err));
};

exports.createTitulo = (tituloData, cb) => {

    const titulo = new Titulo(tituloData);

    //Equivalently as the previous lines, mongoose allows the .then .catch mechanism instead of the callbacks (very similar to JS promises)
    titulo.save()
        .then(doc => cb(doc))
        .catch(err => cb(null, err)); //In this case the callback signature should be changed to include the err parameter
};

exports.tituloList = (cb) => {

    Titulo.find({ }, { _id:1, User:1, nome:1,tipo:1,quantidade:1,estado:1})
        .populate({ path: 'User', model: User.userModel() })
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

exports.tituloFindOne = (id, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    Titulo.findOne({_id: id})
        .populate({ path: 'User', model: User.userModel() })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.patchTitulo = (id, tituloData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    Titulo.findOneAndUpdate({_id: id}, tituloData, {new:false, overwrite:false, projection: { _id:0, User:0, nome:0,tipo:0,quantidade:0,estado:1}})
        .populate({ path: 'User', model: User.userModel() })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};
        
exports.tituloRemoveById = (tituloId, cb) => {

    Titulo.deleteMany({ _id: tituloId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));

};

exports.tituloName = function () {
    return this.modelName;
}



exports.tituloModel = function () {
    return mongoose.model('Titulos', tituloSchema);
}
