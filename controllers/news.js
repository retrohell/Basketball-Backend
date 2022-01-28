const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');
const News = require('../models/news');

// RESTFULL => GET, POST, PUT, PATCH, DELETE
// Modelo = Una representacion de datos, que representa una entidad del mundo real
function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    News.paginate({},{page:page, limit:3}).then(objs => res.status(200).json({
        message: res.__('ok.newsList'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('bad.newsList'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id= req.params.id;
    News.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.newsIndex'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.newsIndex'),
        obj: ex
    }));
}

function create(req, res, next) {
    const date = req.body.date;
    const name = req.body.name;

    async.parallel({
        salt:(callback)=>{
            bcrypt.genSalt(10, callback);
        }
    }, (err, result) => {
        bcrypt.hash(password, result.salt, (err, hash)=>{
            let news = new News({
                _date:date,
                _name:name,
            });

            news.save().then(obj => res.status(200).json({
                message: res.__('ok.newsCreate'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.newsCreate'),
                obj:ex
            }));
        })
    });
}



function replace(req, res, next) {
    const id = req.params.id;
    const date = req.body.date ? req.body.date: "";
    const name = req.body.name ? req.body.name: "";

    let news = new Object({
        _date:date,
        _name:name,
    });

    News.findOneAndUpdate({"_id":id}, news).then(obj => res.status(200).json({
        message: res.__('ok.newsReplace'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.newsReplace'),
        obj: ex
    }));
}

function edit(req, res, next) {
    const date = req.body.date;
    const name = req.body.name;

    let news = new Object();

    if(date){
        news._date = date;
    }

    if(name){
        news._name = name;
    }

    News.findOneAndUpdate({"_id":id}, news).then(obj => res.status(200).json({
        message: res.__('ok.newsEdit'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.newsEdit'),
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    News.remove({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.newsDestroy'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.newsDestroy'),
        obj: ex
    }));
}

module.exports = {
    list,
    index,
    create,
    replace,
    edit,
    destroy
}
