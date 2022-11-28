const FaqModel = require('../models/faq');

exports.insert = (req, res) => {
    FaqModel.createFaq(req.body, (doc, err) => {
        if(!err) res.redirect("/faq");
        else res.redirect("/faq/create");
    });
};

exports.listFaq = (req, res) => {
    FaqModel.faqList((docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        if(!err) res.status(200).render('faq',{isAuthenticated,faq:docs,num});
        else res.status(500).send({message: err.message});
    });
};

exports.listFaqPool = (req, res) => {
    FaqModel.faqList((docs, err) => {
        const isAuthenticated = !!req.user;
        const num = 0;
        if(!err) res.status(200).render('faqpool',{isAuthenticated,faq:docs,num});
        else res.status(500).send({message: err.message});
    });
};

exports.getById = (req, res) => {
    FaqModel.faqFindById(req.params.id, (doc, err) => {
        const isAuthenticated = !!req.user;
        const user = req.user;
        if(!err) res.status(200).render('faqedit',{isAuthenticated,faq:doc,user});
        else res.status(500).send({message: err.message});
    });
};

exports.patchById = (req, res) => {
    FaqModel.patchFaq(req.params.id, req.body, (doc, err) => {
        if(!err) res.status(200).redirect("/faq/pool");
        else res.status(500).send({message: err.message});
    });
};

exports.removeById = (req, res) => {

    FaqModel.faqRemoveById(req.params.id, (err) => {
        if(!err) res.status(204).redirect("/faq/pool");
        else res.status(500).send({message: err.message});
    });

};
