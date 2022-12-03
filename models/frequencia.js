const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');
const fetch = require('node-fetch');
//Our user schema
const frequenciaSchema = new mongoose.Schema({
    hora:[Number],
    minutos:[Number]
});

//Create the actual model
const Frequencia = mongoose.model('Frequencias', frequenciaSchema);

exports.frequenciaFindById = (id, cb) => {
    Frequencia.findById(id, {  _id:1, hora:1, minutos:1})
        .exec()
        .then(doc => cb(doc))
        .catch(err => cb(null, err));
};

exports.createFrequencia = (frequenciaData, cb) => {

    const frequencia = new Frequencia(frequenciaData);

    //Equivalently as the previous lines, mongoose allows the .then .catch mechanism instead of the callbacks (very similar to JS promises)
    frequencia.save()
        .then(doc => cb(doc))
        .catch(err => cb(null, err)); //In this case the callback signature should be changed to include the err parameter
};

exports.frequenciaList = (cb) => {

    Frequencia.find({ }, { _id:1, hora:1, minutos:1})
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

exports.patchFrequencia = (id, frequenciaData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    Frequencia.findOneAndUpdate({_id: id}, frequenciaData, {new:true, overwrite:true, projection: { _id:0, hora:1}})
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.frequenciaRemoveById = (frequenciaId, cb) => {

    Frequencia.deleteMany({ _id: frequenciaId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));

};

exports.frequenciaName = function () {
    return this.modelName;
}



exports.frequenciaModel = function () {
    return mongoose.model('Frequencias', frequenciaSchema);
}
