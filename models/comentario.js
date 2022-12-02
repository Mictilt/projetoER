const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const fetch = require('node-fetch');
//Our user schema
const comentarioSchema = new mongoose.Schema({
    comentario: String
});

//Create the actual model
const Comentario = mongoose.model('Comentarios', comentarioSchema);

exports.comentarioFindById = (id, cb) => {
    Comentario.findById(id, {  _id:1, comentario:1})
        .exec()
        .then(doc => cb(doc))
        .catch(err => cb(null, err));
};

exports.createComentario = (comentarioData, cb) => {

    const comentario = new Comentario(comentarioData);

    //Equivalently as the previous lines, mongoose allows the .then .catch mechanism instead of the callbacks (very similar to JS promises)
    comentario.save()
        .then(doc => cb(doc))
        .catch(err => cb(null, err)); //In this case the callback signature should be changed to include the err parameter
};

exports.comentarioList = (cb) => {

    Comentario.find({ }, { _id:1, comentario:1})
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

exports.patchComentario = (id, comentarioData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    Comentario.findOneAndUpdate({_id: id}, comentarioData, {new:true, overwrite:true, projection: {  _id:0, comentario:1}})
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.comentarioRemoveById = (comentarioId, cb) => {

    Comentario.deleteMany({ _id: comentarioId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));

};

exports.comentarioName = function () {
    return this.modelName;
}



exports.comentarioModel = function () {
    return mongoose.model('Comentarios', comentarioSchema);
}
