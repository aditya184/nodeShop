const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customers');
const Validate = require('../middelware/validateFields');
const validateToken =  require('../middelware/validateToken');

// router.post('/login', CustomerController.login);

router.post('/register',Validate.validateCheckmobile, CustomerController.addCustomer );

router.get('/getCustomers', CustomerController.getUser );

// router.put('/updateUser', Validate.validateCheckmobile, validateToken.validateUser, CustomerController.editUser );

router.delete('/delete', CustomerController.deleteUser );

module.exports = router;