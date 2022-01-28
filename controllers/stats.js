const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');
const Stats = require('../models/stats');

// RESTFULL => GET, POST, PUT, PATCH, DELETE
// Modelo = Una representacion de datos, que representa una entidad del mundo real
function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    Stats.paginate({},{page:page, limit:3}).then(objs => res.status(200).json({
        message: res.__('ok.statsList'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('bad.statsList'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id= req.params.id;
    Stats.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.statsIndex'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.statsIndex'),
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
            let stat = new Stats({
                _date:date,
                _name:name,
            });

            stat.save().then(obj => res.status(200).json({
                message: res.__('ok.statsCreate'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.statsCreate'),
                obj:ex
            }));
        })
    });
}



function replace(req, res, next) {
    const id = req.params.id;
    const date = req.body.date ? req.body.date: "";
    const name = req.body.name ? req.body.name: "";

    let stats = new Object({
        _date:date,
        _name:name,
    });

    Stats.findOneAndUpdate({"_id":id}, stats).then(obj => res.status(200).json({
        message: res.__('ok.statsReplace'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.statsReplace'),
        obj: ex
    }));
}

function edit(req, res, next) {
    const date = req.body.date;
    const name = req.body.name;

    let stats = new Object();

    if(date){
        stats._date = date;
    }

    if(name){
        stats._name = name;
    }

    Stats.findOneAndUpdate({"_id":id}, stats).then(obj => res.status(200).json({
        message: res.__('ok.statsEdit'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.statsEdit'),
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Stats.remove({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.statsDestroy'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.statsDestroy'),
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
