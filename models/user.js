const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const fetch = require('node-fetch');
//Our user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    tipo: String, //1 habitante local, 2 visitante, 3 motorista, 4 admin
    password: String,
});

//Create the actual model
const User = mongoose.model('Users', userSchema);

exports.userFindById = (id, cb) => {
    User.findById(id, {  _id:1, username:1, email:1, tipo:1, password:1})
        .exec()
        .then(doc => cb(doc))
        .catch(err => cb(null, err));
};

exports.userFindByUsername = (username, cb) => {
    User.findOne({username: username},  { _id:1, username:1, email:1, tipo:1, password:1})    
        .exec()
        .then(doc => cb(doc))
        .catch(err => cb(null, err));
};

exports.createUser = (userData, cb) => {

    const user = new User(userData);

    //Equivalently as the previous lines, mongoose allows the .then .catch mechanism instead of the callbacks (very similar to JS promises)
    user.save()
        .then(doc => cb(doc))
        .catch(err => cb(null, err)); //In this case the callback signature should be changed to include the err parameter
};

exports.userList = (cb) => {

    User.find({ }, { _id:1, username:1, email:1, tipo:1, password:1})
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

exports.patchUser = (id, userData, cb) => {
    // console.log("--------------------");
    // console.log(userData.password);
    // console.log("--------------------");
    //status code 204 should be returned if we don't want to send back the updated model
    User.findOneAndUpdate({_id: id}, userData, {new:false, overwrite:false, projection: {  _id:0, username:0, email:0, tipo:0, password:1}})
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.patchUserTipo = (id, userData, cb) => {
    console.log("--------------------");
    console.log(id);
    console.log("--------------------");
    //status code 204 should be returned if we don't want to send back the updated model
    User.findOneAndUpdate({_id: id}, userData, {new:false, overwrite:false, projection: {  _id:0, username:0, email:0, tipo:1, password:0}})
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.removeById = (userId, cb) => {

    User.deleteMany({ _id: userId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));

};

exports.userName = function () {
    return this.modelName;
}



exports.userModel = function () {
    return mongoose.model('Users', userSchema);
}
