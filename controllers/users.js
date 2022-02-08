const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');
const User = require('../models/user');


// RESTFULL => GET, POST, PUT, PATCH, DELETE
// Modelo = Una representacion de datos, que representa una entidad del mundo real
function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    User.paginate({},{page:page, limit:3}).then(objs => res.status(200).json({
        message: res.__('users.list.ok'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('users.list.bad'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id= req.params.id;
    User.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('users.index.ok'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('users.index.bad'),
        obj: ex
    }));
}

function create(req, res, next) {
    const fullName = req.body.name;
    const role = req.body.role;
    const birthday = req.body.birthday;
    const curp = req.body.curp;
    const rfc = req.body.rfc;
    const address = req.body.address;
    const skillList = req.body.skillList;
    const email = req.body.email;
    const password = req.body.password;

    async.parallel({
        salt:(callback)=>{
            bcrypt.genSalt(10, callback);
        }
    }, (err, result) => {
        bcrypt.hash(password, result.salt, (err, hash)=>{
            let user = new User({
                _fullName:fullName,
                _role:role,
                _birthday:birthday,
                _curp:curp,
                _rfc:rfc,
                _address:address,
                _skillList:skillList,
                _email:email,
                _password:hash,
                _salt:result.salt
            });

            user.save().then(obj => res.status(200).json({
                message: res.__('ok.usersCreate'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.usersCreate'),
                obj:ex
            }));
        })
    });
}



function replace(req, res, next) {
    const id = req.params.id;
    const fullName = req.body.fullName ? req.body.fullName: "";
    const role = req.body.role ? req.body.role: "";
    const curp = req.body.curp ? req.body.curp: "";
    const rfc = req.body.rfc ? req.body.rfc: "";
    const address = req.body.address ? req.body.address: "";
    const skillList = req.body.skillList ? req.body.skillList: "";
    const email = req.body.email ? req.body.email: "";
    const password = req.body.password ? req.body.password: "";

    let users = new Object({
        _fullName:fullName,
        _role:role,
        _birthday:birthday,
        _curp:curp,
        _rfc:rfc,
        _address:address,
        _skillList:skillList,
        _email:email,
        _password:password
    });

    Users.findOneAndUpdate({"_id":id}, users).then(obj => res.status(200).json({
        message: res.__('ok.usersReplace'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.usersReplace'),
        obj: ex
    }));
}

function edit(req, res, next) {
    const fullName = req.body.fullName;
    const role = req.body.role;
    const curp = req.body.curp;
    const rfc = req.body.rfc;
    const address = req.body.address;
    const skillList = req.body.skillList;
    const email = req.body.email;
    const password = req.body.password;

    let users = new Object();

    if(fullName){
        users._fullName = fullName;
    }

    if(role){
        users._role = role;
    }

    if(curp){
        users._curp = curp;
    }

    if(rfc){
        users._rfc = rfc;
    }

    if(address){
        users._address = address;
    }

    if(skillList){
        users._skillList = skillList;
    }

    if(email){
        users._email = email;
    }
    if(password){
        users._password = password;
    }

    Users.findOneAndUpdate({"_id":id}, users).then(obj => res.status(200).json({
        message: res.__('ok.usersEdit'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.usersEdit'),
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Users.remove({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.usersDestroy'),
        oj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.usersDestroy'),
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
