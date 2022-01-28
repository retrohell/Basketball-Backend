const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');
const Plays = require('../models/plays');

// RESTFULL => GET, POST, PUT, PATCH, DELETE
// Modelo = Una representacion de datos, que representa una entidad del mundo real
function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    Plays.paginate({},{page:page, limit:3}).then(objs => res.status(200).json({
        message: res.__('ok.playsList'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('bad.playsList'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id= req.params.id;
    Plays.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.playsIndex'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.playsIndex'),
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
            let play = new Plays({
                _date:date,
                _name:name,
            });

            play.save().then(obj => res.status(200).json({
                message: res.__('ok.playsCreate'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.playsCreate'),
                obj:ex
            }));
        })
    });
}



function replace(req, res, next) {
    const id = req.params.id;
    const date = req.body.date ? req.body.date: "";
    const name = req.body.name ? req.body.name: "";

    let plays = new Object({
        _date:date,
        _name:name,
    });

    Plays.findOneAndUpdate({"_id":id}, plays).then(obj => res.status(200).json({
        message: res.__('ok.playsReplace'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.playsReplace'),
        obj: ex
    }));
}

function edit(req, res, next) {
    const date = req.body.date;
    const name = req.body.name;

    let plays = new Object();

    if(date){
        plays._date = date;
    }

    if(name){
        plays._name = name;
    }

    Plays.findOneAndUpdate({"_id":id}, plays).then(obj => res.status(200).json({
        message: res.__('ok.playsEdit'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.playsEdit'),
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Plays.remove({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.playsDestroy'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.playsDestroy'),
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
