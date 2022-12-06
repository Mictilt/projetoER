const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const fetch = require('node-fetch');
const Carreira = require("../models/carreira");
const Frequencia = require("./frequencia");
//Our faq schema
const horarioSchema = new mongoose.Schema({
    Carreira: {
        type: Schema.Types.ObjectId,
        ref: 'Carreira'
    },
    Frequencia: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Frequencia'
        }
    ],
});

//Create the actual model
const Horario = mongoose.model('Horarios', horarioSchema);

exports.horarioFindById = (id, cb) => {
        FAQ.findById(id, {  _id:1, Carreira:1,Frequencia:1})
        .populate({ path: 'Carreira', model: Carreira })
        .populate({ path: 'Frequencia', model: Frequencia })
        .exec()
        .then(doc => cb(doc))
        .catch(err => cb(null,err));
};


exports.createHorario = (horarioData, cb) => {
    const horario = new Horario(horarioData);

    //Equivalently as the previous lines, mongoose allows the .then .catch mechanism instead of the callbacks (very similar to JS promises)
    horario.save()
        .then(doc => cb(doc))
        .catch(err => cb(null, err)); //In this case the callback signature should be changed to include the err parameter
};

exports.horarioList = (cb) => {

    Horario.find({ }, { _id:1, Carreira:1,Frequencia:1})
        .populate({ path: 'Carreira', model: Carreira.carreiraModel() })
        .populate({ path: 'Frequencia', model: Frequencia.frequenciaModel() })
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};
exports.findHorarioCarreriaID = (id,cb) => {
    //console.log("valor do id models horario"+id+"\n");
    Horario.find({Carreira: id }, { _id:1, Carreira:1,Frequencia:1})
        .populate({ path: 'Carreira', model: Carreira.carreiraModel() })
        .populate({ path: 'Frequencia', model: Frequencia.frequenciaModel() })
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

exports.findHorarioFrequenciaID = (id,idC,cb) => {
    console.log("valor do id models horario"+id+"\n");
    Horario.find({Frequencia: id, Carreira: idC }, { _id:1, Carreira:1,Frequencia:1})
        .populate({ path: 'Carreira', model: Carreira.carreiraModel() })
        .populate({ path: 'Frequencia', model: Frequencia.frequenciaModel() })
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

    //updateHorarioFrequencia

exports.updateHorarioFrequencia = (id, horarioData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    console.log("\n**********\n "+id+"\n*********\n")
    console.log("\n**********\n "+horarioData.Frequencia+"\n*********\n")
    Horario.findByIdAndUpdate({_id: id}, {$push: {Frequencia:horarioData.Frequencia}}, {new:true, overwrite:true, projection: {    _id:0, Carreira:1,Frequencia:1}})
        .populate({ path: 'Carreira', model: Carreira.carreiraModel() })
        .populate({ path: 'Frequencia', model: Frequencia.frequenciaModel() })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};


exports.patchHorario = (id, horarioData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    Horario.findOneAndUpdate({_id: id}, horarioData, {new:true, overwrite:true, projection: {    _id:0, Carreira:1,Frequencia:1}})
        .populate({ path: 'Carreira', model: Carreira.carreiraModel() })
        .populate({ path: 'Frequencia', model: Frequencia.frequenciaModel() })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.horarioRemoveById = (horarioId, cb) => {

    Horario.deleteMany({ _id: horarioId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));

};

exports.horarioName = function () {
    return this.modelName;
}

exports.horarioModel = function () {
    return mongoose.model('Horarios', horarioSchema);
}