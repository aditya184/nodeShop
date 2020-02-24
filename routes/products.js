const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products');


router.post('/addProduct', ProductController.addProduct );

router.get('/getProducts', ProductController.getProducts );

// router.put('/updateProduct', ProductController.editProduct );

// router.delete('/deleteProduct', ProductController.deleteProduct );

module.exports = router;