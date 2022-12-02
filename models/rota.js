const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const fetch = require('node-fetch');
//Our user schema
const rotaSchema = new mongoose.Schema({
    nome: String,
    imagem: Number
});

//Create the actual model
const Rota = mongoose.model('Rotas', rotaSchema);

exports.rotaFindById = (id, cb) => {
    Rota.findById(id, {  _id:1, nome:1, imagem:1})
        .exec()
        .then(doc => cb(doc))
        .catch(err => cb(null, err));
};

exports.createRota = (rotaData, cb) => {

    const rota = new Rota(rotaData);

    //Equivalently as the previous lines, mongoose allows the .then .catch mechanism instead of the callbacks (very similar to JS promises)
    rota.save()
        .then(doc => cb(doc))
        .catch(err => cb(null, err)); //In this case the callback signature should be changed to include the err parameter
};

exports.rotaList = (cb) => {

    Rota.find({ }, { _id:1, nome:1, imagem:1})
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

exports.patchRota = (id, rotaData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    Rota.findOneAndUpdate({_id: id}, rotaData, {new:true, overwrite:true, projection: { _id:0, nome:1, imagem:1}})
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.rotaRemoveById = (rotaId, cb) => {

    Rota.deleteMany({ _id: rotaId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));

};

exports.rotaName = function () {
    return this.modelName;
}



exports.rotaModel = function () {
    return mongoose.model('Rotas', rotaSchema);
}
