const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');
const Menu = require('../models/index');

// RESTFULL => GET, POST, PUT, PATCH, DELETE
// Modelo = Una representacion de datos, que representa una entidad del mundo real
function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    Menu.paginate({},{page:page, limit:3}).then(objs => res.status(200).json({
        message: res.__('ok'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('bad'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id= req.params.id;
    Menu.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.menuIndex'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.menuIndex'),
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
            let menu = new Menu({
                _date:date,
                _name:name,
            });

            menu.save().then(obj => res.status(200).json({
                message: res.__('ok.menuCreate'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.menuCreate'),
                obj:ex
            }));
        })
    });
}



function replace(req, res, next) {
    const id = req.params.id;
    const date = req.body.date ? req.body.date: "";
    const name = req.body.name ? req.body.name: "";

    let menu = new Object({
        _date:date,
        _name:name,
    });

    Menu.findOneAndUpdate({"_id":id}, menu).then(obj => res.status(200).json({
        message: res.__('ok.menuReplace'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.menuReplace'),
        obj: ex
    }));
}

function edit(req, res, next) {
    const date = req.body.date;
    const name = req.body.name;

    let menu = new Object();

    if(date){
        menu._date = date;
    }

    if(name){
        menu._name = name;
    }

    Menu.findOneAndUpdate({"_id":id}, menu).then(obj => res.status(200).json({
        message: res.__('ok.menuEdit'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.menuEdit'),
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Menu.remove({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.menuDestroy'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.menuDestroy'),
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
