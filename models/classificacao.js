const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const fetch = require('node-fetch');
//Our user schema
const classificaoSchema = new mongoose.Schema({
    nivel: Number
});

//Create the actual model
const Classificacao = mongoose.model('Classificacoes', classificaoSchema);

exports.classificaoFindById = (id, cb) => {
    Classificacao.findById(id, {  _id:1, nivel:1})
        .exec()
        .then(doc => cb(doc))
        .catch(err => cb(null, err));
};

exports.createClassificao = (classificaoData, cb) => {

    const classificacao = new Classificacao(classificaoData);

    //Equivalently as the previous lines, mongoose allows the .then .catch mechanism instead of the callbacks (very similar to JS promises)
    classificacao.save()
        .then(doc => cb(doc))
        .catch(err => cb(null, err)); //In this case the callback signature should be changed to include the err parameter
};

exports.classificacaoList = (cb) => {

    Classificacao.find({ }, { _id:1, nivel:1})
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

exports.patchClassificao = (id, classificaoData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    Classificacao.findOneAndUpdate({_id: id}, classificaoData, {new:true, overwrite:true, projection: {  _id:0, nivel:1}})
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.classificacaoRemoveById = (classificaoId, cb) => {

    Classificacao.deleteMany({ _id: classificaoId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));

};

exports.classificaoName = function () {
    return this.modelName;
}



exports.classificaoModel = function () {
    return mongoose.model('Classificacoes', classificaoSchema);
}
