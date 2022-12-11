const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const fetch = require('node-fetch');
//Our user schema
const veiculoSchema = new mongoose.Schema({
    lotacao: Number,
    tipo: String,
    climatizacao: Boolean
});

//Create the actual model
const Veiculo = mongoose.model('Veiculos', veiculoSchema);

exports.veiculoFindById = (id, cb) => {
    Veiculo.findById(id, {  _id:1, lotacao:1, tipo:1, climatizacao:1})
        .exec()
        .then(doc => cb(doc))
        .catch(err => cb(null, err));
};

exports.createVeiculo = (veiculoData, cb) => {

    const veiculo = new Veiculo(veiculoData);

    //Equivalently as the previous lines, mongoose allows the .then .catch mechanism instead of the callbacks (very similar to JS promises)
    veiculo.save()
        .then(doc => cb(doc))
        .catch(err => cb(null, err)); //In this case the callback signature should be changed to include the err parameter
};

exports.veiculoList = (cb) => {

    Veiculo.find({ }, { _id:1, lotacao:1, tipo:1, climatizacao:1})
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

exports.patchVeiculo = (id, veiculoData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    Veiculo.findOneAndUpdate({_id: id}, veiculoData, {new:false, overwrite:false, projection: { _id:0, lotacao:1, tipo:1, climatizacao:1}})
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.veiculoRemoveById = (veiculoId, cb) => {

    Veiculo.deleteMany({ _id: veiculoId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));

};

exports.veiculoName = function () {
    return this.modelName;
}



exports.veiculoModel = function () {
    return mongoose.model('Veiculos', veiculoSchema);
}
