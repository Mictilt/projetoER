const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const fetch = require('node-fetch');
//Our user schema
const paragemSchema = new mongoose.Schema({
    localizacao: String,
    imagem: Number
});

//Create the actual model
const Paragem = mongoose.model('Paragens', paragemSchema);

exports.paragemFindById = (id, cb) => {
    Paragem.findById(id, {  _id:1, localizacao:1, imagem:1})
        .exec()
        .then(doc => cb(doc))
        .catch(err => cb(null, err));
};

exports.createParagem = (paragemData, cb) => {

    const paragem = new Paragem(paragemData);

    //Equivalently as the previous lines, mongoose allows the .then .catch mechanism instead of the callbacks (very similar to JS promises)
    paragem.save()
        .then(doc => cb(doc))
        .catch(err => cb(null, err)); //In this case the callback signature should be changed to include the err parameter
};

exports.paragemList = (cb) => {

    Paragem.find({ }, { _id:1, localizacao:1, imagem:1})
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

exports.patchParagem = (id, paragemData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    Paragem.findOneAndUpdate({_id: id}, paragemData, {new:false, overwrite:false, projection: { _id:0, localizacao:1, imagem:1}})
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.paragemRemoveById = (paragemId, cb) => {

    Paragem.deleteMany({ _id: paragemId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));

};

exports.paragemName = function () {
    return this.modelName;
}



exports.paragemModel = function () {
    return mongoose.model('Paragens', paragemSchema);
}
