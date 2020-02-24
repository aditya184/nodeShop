const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamp = require('mongoose-timestamp');
const autoIncrement = require('mongoose-auto-increment');

const bcrypt = require('bcrypt');
const saltRounds = 10;


const customerSchema = new Schema({
    
    cust_id : {
        type : Number
    },
    f_name : {
        type : String
    },
    l_name : { 
        type : String
    },
    address : {
        type : String
    },
    mob_no : {
        type : Number
    },
    email : {
        type : String
    },
    pincode : {
        type : Number
    },
    password : {
        type : String
    },
    status : {
        type : String
    },
    deleted : {
        type : Boolean
    }
    
});

customerSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
    });

customerSchema.plugin(timestamp,{ createdAt: 'created_at', updatedAt: 'updated_at'});

customerSchema.plugin(autoIncrement.plugin, { model: 'customers' , field: 'cust_id', startAt:1, incrementBy: 1 });

module.exports = mongoose.model('customers',customerSchema); 