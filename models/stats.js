const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _date: String,
    _name: String,
});

class Stats {
    constructor(date, name){
        this._date = date;
        this._name = name;
    }

    get date() {
        return this._date;
    }

    set date(v){
        this._date = v;
    }
    get name() {
        return this._name;
    }

    set name(v){
        this._name = v;
    }


}

schema.loadClass(Stats);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Stats', schema);
