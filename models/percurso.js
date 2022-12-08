const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const fetch = require('node-fetch');
const Paragem = require('./paragem')
//Our user schema
const percursoSchema = new mongoose.Schema({
    Paragem:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Paragem'
        }
    ],
});

//Create the actual model
const Percurso = mongoose.model('Percursos', percursoSchema);

exports.percursoFindById = (id, cb) => {
    Percurso.findById(id, {  _id:1, Paragem:1})
        .populate({ path: 'Paragem', model: Paragem})
        .exec()
        .then(doc => cb(doc))
        .catch(err => cb(null, err));
};

exports.createPercurso = (percursoData, cb) => {

    const percurso = new Percurso(percursoData);

    //Equivalently as the previous lines, mongoose allows the .then .catch mechanism instead of the callbacks (very similar to JS promises)
    percurso.save()
        .then(doc => cb(doc))
        .catch(err => cb(null, err)); //In this case the callback signature should be changed to include the err parameter
};

exports.percursoList = (cb) => {

    Percurso.find({ }, { _id:1, Paragem:1})
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

exports.patchPercurso = (id, percursoData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    Percurso.findOneAndUpdate({_id: id}, percursoData, {new:false, overwrite:false, projection: { _id:0, Percurso:1}})
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.percursoRemoveById = (percursoId, cb) => {

    Percurso.deleteMany({ _id: percursoId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));

};

exports.percursoName = function () {
    return this.modelName;
}



exports.percursoModel = function () {
    return mongoose.model('Percursos', percursoSchema);
}
