const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _fullName: String,
    _role: String,
    _birthday: Date,
    _curp: String,
    _rfc: String,
    _address: String,
    _skillList: Array,
    _email: String,
    _password: String,
    _salt: String
});

class User {
    constructor(fullName, role, birthday, curp, rfc, address, skillList, email, password, salt){
        this._fullName = fullName;
        this._role = role;
        this._birthday = birthday;
        this._curp = curp;
        this._rfc = rfc;
        this._address = address;
        this._skillList = skillList;
        this._email = email;
        this._password = password;
        this._salt = salt;
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(v){
        this._fullName = v;
    }

    get role() {
        return this._role;
    }

    set role(v){
        this._role = v;
    }

    get birthday() {
        return this._birthday;
    }

    set birthday(v){
        this._birthday = v;
    }

    get curp() {
        return this._curp;
    }

    set curp(v){
        this._curp = v;
    }

    get rfc() {
        return this._rfc;
    }

    set rfc(v){
        this._rfc = v;
    }

    get address() {
        return this._address;
    }

    set address(v){
        this._address = v;
    }

    get skillList() {
        return this._skillList;
    }

    set skillList(v){
        this._skillList = v;
    }

    get email() {
        return this._email;
    }

    set email(v){
        this._email = v;
    }

    get password() {
        return this._password;
    }

    set password(v){
        this._password = v;
    }

    get salt() {
        return this._salt;
    }

    set salt(v){
        this._salt = v;
    }

}

schema.loadClass(User);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', schema);
