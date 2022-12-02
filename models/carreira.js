const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const fetch = require('node-fetch');
//Our user schema
const carreiraSchema = new mongoose.Schema({
    nome:String
});

//Create the actual model
const Carreira = mongoose.model('Carreiras', carreiraSchema);

exports.carreiraFindById = (id, cb) => {
    Carreira.findById(id, {  _id:1, nome:1})
        .exec()
        .then(doc => cb(doc))
        .catch(err => cb(null, err));
};

exports.createCarreira = (carreiraData, cb) => {

    const carreira = new Carreira(carreiraData);

    //Equivalently as the previous lines, mongoose allows the .then .catch mechanism instead of the callbacks (very similar to JS promises)
    carreira.save()
        .then(doc => cb(doc))
        .catch(err => cb(null, err)); //In this case the callback signature should be changed to include the err parameter
};

exports.carreiraList = (cb) => {

    Carreira.find({ }, { _id:1, nome:1})
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

exports.patchCarreira = (id, carreiraData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    Carreira.findOneAndUpdate({_id: id}, carreiraData, {new:true, overwrite:true, projection: { _id:0, nome:1}})
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.frequenciaRemoveById = (carreiraId, cb) => {

    Carreira.deleteMany({ _id: carreiraId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));

};

exports.carreiraName = function () {
    return this.modelName;
}



exports.carreiraModel = function () {
    return mongoose.model('Carreiras', carreiraSchema);
}
