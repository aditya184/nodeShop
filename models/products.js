const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamp = require('mongoose-timestamp');
const autoIncrement = require('mongoose-auto-increment');


const productSchema = new Schema({
    
    prod_id : {
        type : Number
    },
    product_name : {
        type : String
    },
    product_description : { 
        type : String
    },
    prize : {
        type : Number
    },
    stock : {
        type : Number
    },
    status : {
        type : String
    },
    deleted : {
        type : Boolean
    }
    
});


productSchema.plugin(timestamp,{ createdAt: 'created_at', updatedAt: 'updated_at'});

productSchema.plugin(autoIncrement.plugin, { model: 'products' , field: 'prod_id', startAt:1, incrementBy: 1 });

module.exports = mongoose.model('products',productSchema); 