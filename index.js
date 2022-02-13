const http= require('http');
const https= require('https');
const express = require('express');
const mongoose = require('mongoose');
const  FlipkartSchema = require('./flipkartSchema');
const  SnapdealSchema = require('./snapdealSchema');
const  AmazonSchemas = require('./amazonschema');
const router = express.Router();
var port = process.env.PORT || 3000;

const {amazon} = require('./amazonScrapper');

const app = express();


const DB = async()=>{
    await mongoose.connect('mongodb+srv://Yuvaraj:Admin123@cluster0.lpdgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;
}
DB();

app.get('/', (req, res) => res.send('working fine with Express'));


router.get('/product',function(req,res,next){
    
    AmazonSchemas.find({}).then(function(Amazon){
        res.send(Amazon);
    }).catch(next);
});

app.use(function(err,req,res,next){
    res.status(422).send({error: err.message});
});


const start=()=>{
  console.log('Amazon Scrapping is running');
  amazon();
}

const server = http.createServer(app);

server.listen(port,()=>{
  console.log("server is running at "+port);
  start();
})







module.exports = router;