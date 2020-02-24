module.exports.validateCheckmobile = (req,res,next) => {
    console.log(req)
    req.checkBody('mob_no')
        .trim().isLength({min:1,max:undefined}).withMessage('Mobile Number is required')
        .matches(/^(0|\+?91)?[7-9][0-9]{9}$/).withMessage('Invalid Mobile Number');
    var errors = req.validationErrors();
    if(errors) {
        return res.status(400).json({type:false,errType:"validation",error:errors})
    }
    else {
        next();
    }
}

// module.exports.validateemailmobile = (req,res,next) => {
//     console.log(req)
//     req.checkBody('email')
//         .trim().isLength({min:1,max:undefined}).withMessage('Mobile Number is required')
//         .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).withMessage('Invalid Email Id');
//     var errors = req.validationErrors();
//     if(errors) {
//         return res.status(400).json({type:false,errType:"validation",error:errors})
//     }
//     else {
//         next();
//     }
// }

