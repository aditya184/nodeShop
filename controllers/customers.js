const customerModel = require('../models/customers');
const moment = require('moment');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

module.exports.addCustomer = (req,res) => {
    try{
        var userObj = new customerModel();
        userObj.f_name           = req.body.f_name;
        userObj.l_name           = req.body.l_name;
        userObj.address           = req.body.address;
        userObj.mob_no           = req.body.mob_no;
        userObj.email           = req.body.email;
        userObj.pincode           = req.body.pincode;
        userObj.password           = req.body.password;
        userObj.status           = 'Active';
        userObj.deleted           = false;


        userObj.save((err,success) => {
            // console.log(err)
            if(err) return res.json({type:false, message : 'Internal Server Error'});
            if(success){
                return res.status(200).json({type:true , message: 'Customer added successfully'});
            }
        })
    }
    catch(e){
        console.log(e);
    }
}

// module.exports.login = (req, res, next) => {
//     // console.log('headers:',req.headers)
//     // console.log('Password:',req.headers['password'])
//     customerModel.findOne({email:req.headers['email']}, function(err,userInfo){
//         console.log(userInfo)
     
//     if (err) {
//         next(err);
//     } 
//     else
//     {
//     if(bcrypt.compareSync(req.headers['password'], userInfo.password)) 
//     {  
//         //console.log(req.app.get('secretKey'));
//         const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
//         var obj = new customerModel();
//     //  obj.Id = userInfo._id
//      obj.userId = userInfo.userId
//      obj.name = userInfo.name
//      obj.address = userInfo.address
//      obj.mobile = userInfo.mobile   
//      obj.email = userInfo.email
//     //  delete obj.Id;
//         // res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
//         res.json({data:{user:obj ,type:'true', token:token}});
//     }
//     else
//     {
//         res.json({status:"error", message: "Invalid email/password!!!", data:null});
//     }
//     }
//     });
//    }  

module.exports.getUser = async(req,res)=>{
    try{
		customerModel.aggregate([
			{	
				$project : {
					cust_id : {$toLower : "$cust_id"},f_name : 1,l_name : 1,address : 1 ,mob_no : 1,email : 1,pincode: 1,created_at : 1
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

// module.exports.editUser = async(req,res)=>{

//     try{
//         var userId = req.body.userId;

//         var userObj = {}
//         userObj.name = req.body.name;
//         // userObj.age = req.body.age;
//         userObj.address = req.body.address;
//         userObj.mobile = req.body.mobile;
//         userObj.email = req.body.email;

//         customerModel.findOneAndUpdate({userId:userId},{$set:userObj},{new :true},(err,data) => {
//             // console.log(data)
//             if(err) return res.status(400).json({type:false, message :err.message});
//             if(!data) return res.status(400).json({type:false,message:'User not found'});
//             if(data) return res.status(200).json({type:true,message:"User Updated successfully."})
//         })
// 	}
// 	catch(e){
// 		console.log(e);
//     }

// }

module.exports.deleteUser = async(req,res)=>{

    try{
        var cust_id = req.body.cust_id;
        customerModel.find({cust_id:cust_id},(err,data)=>{
            if(err) return res.json({type:false, message : 'Internal Server Error'});
            if(data){
                console.log(data,res)
                var obj = new customerModel();
                obj.status = 'inActive'
                obj.deleted = true
                return res.status(200).json({type:true,message:"Customer Deleted successfully."})
            }
        })
        // customerModel.findOneAndRemove({userId:userId},(err,data)=>{
        //     if(err) return res.json({type:false, message : 'Internal Server Error'});
        //     if(data){return res.status(200).json({type:true});}
        // })
	}
	catch(e){
		console.log(e);
    }

}