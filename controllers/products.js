const productModel = require('../models/products');
const moment = require('moment');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

module.exports.addProduct = (req,res) => {
    try{
        var productObj = new productModel();
        productObj.product_name           = req.body.product_name;
        productObj.product_description           = req.body.product_description;
        productObj.prize           = req.body.prize;
        productObj.stock           = req.body.stock;
        productObj.status           = 'Active';
        productObj.deleted           = false;


        productObj.save((err,success) => {
            // console.log(err)
            if(err) return res.json({type:false, message : 'Internal Server Error'});
            if(success){
                return res.status(200).json({type:true , message: 'Product added successfully'});
            }
        })
    }
    catch(e){
        console.log(e);
    }
}

module.exports.getProducts = async(req,res)=>{
    try{
		productModel.aggregate([
			{	
				$project : {
					prod_id : {$toLower : "$prod_id"},product_name : 1,product_description : 1,prize : 1 ,stock : 1,created_at : 1
				}
            },
            {$sort : { created_at : -1 }},
		])
		.exec((err, resp) => {
            return res.status(200).json({type:true, ArrayOfResponse : resp})
        });
	}
	catch(e){
		console.log(e);
    }

}