const mongoose = require('./mongooseConfigs').mongoose;
const Schema = mongoose.Schema;
const fetch = require('node-fetch');
const User = require("../models/user");
//Our faq schema
const faqSchema = new mongoose.Schema({
    question: String,
    answer: String,
    topic: String,
    pinned : Boolean,
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    Tickets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ],
});

//Create the actual model
const FAQ = mongoose.model('FAQs', faqSchema);

exports.faqFindById = (id, cb) => {
                FAQ.findById(id, {  _id:1, question:1, answer:1, topic:1, pinned:1, User:1, Tickets:1})
                    .populate({ path: 'User', model: User.userModel() })
                    .populate({ path: 'Tickets', model: FAQ })
        .exec()
        .then(doc => cb(doc))
        .catch(err => cb(null,err));
};

exports.createFaq = (faqData, cb) => {
    const faq = new FAQ(faqData);

    //Equivalently as the previous lines, mongoose allows the .then .catch mechanism instead of the callbacks (very similar to JS promises)
    faq.save()
        .then(doc => cb(doc))
        .catch(err => cb(null, err)); //In this case the callback signature should be changed to include the err parameter
};

exports.faqList = (cb) => {

    FAQ.find({ }, {   _id:1, question:1, answer:1, topic:1, pinned:1, User:1, Tickets:1})
        .populate({path: 'User', model:User.userModel()})
        .populate({ path: 'Tickets', model: FAQ })
        .exec()
        .then((docs) => cb(docs))
        .catch(err => cb(err));
};

exports.patchFaq = (id, faqData, cb) => {

    //status code 204 should be returned if we don't want to send back the updated model
    FAQ.findOneAndUpdate({_id: id}, faqData, {new:true, overwrite:true, projection: {    _id:0, question:1, answer:1, topic:1, pinned:1, User:1, Tickets:1}})
        .populate({ path: 'User', model: User.userModel() })
        .populate({ path: 'Tickets', model: FAQ })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));
};

exports.faqRemoveById = (faqId, cb) => {

    FAQ.deleteMany({ _id: faqId })
        .exec()
        .then(() => cb())
        .catch(err => cb(err));

};

exports.faqName = function () {
    return this.modelName;
}

exports.faqModel = function () {
    return mongoose.model('FAQs', faqSchema);
}