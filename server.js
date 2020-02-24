const dotenv = require('dotenv').config({path: '.env'});
const express = require('express');
const bodyParser = require('body-parser');
const port =  process.env.PORT || 8080;
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const app = express();

const validator = require('express-validator');
const autoIncrement = require('mongoose-auto-increment');


app.use(cors())

//for jwt token
const logger = require('morgan');
app.use(logger('dev'));
var jwt = require('jsonwebtoken');

app.set('secretKey', 'nodeRestApi'); // jwt secret token


mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser : true}).then((res) => {
    if(res) console.log('Mongoose Connection initiated...')
}).catch((err)=>{
    if(err) console.log('Error while connecting to database...')
})
mongoose.Promise = global.Promise;
autoIncrement.initialize(mongoose.connection);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(validator());

const customerRoutes = require('./routes/customers');
app.use(process.env.API_INITIALS + '/customers', customerRoutes);


const productRoutes = require('./routes/products');
app.use(process.env.API_INITIALS + '/products', productRoutes);


app.use('*',(req,res)=>{ res.status(404).json({message:'Invalid Request'})})

var server;
server = http.createServer(app);
server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
});