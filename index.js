const http=require('http');
const express=require('express');
const path=require("path")
const bodyparser=require('body-parser');
const { urlencoded } = require('body-parser');
const app=express();


app.use(express.urlencoded())

const mongoose=require('mongoose');
const { StringDecoder } = require('string_decoder');
const { stringify } = require('querystring');
mongoose.connect('mongodb://localhost:27017/pk', { useNewUrlParser: true, useUnifiedTopology: true })

const db=mongoose.connection;


const port=80;
const hostname='127.0.0.1';


const pankaj=new mongoose.Schema({
    
    name:String,
    email:String,
    text:String
    
    
});

const portfolio=mongoose.model('sweet',pankaj);



app.post("/myPortfolio",(req,res)=>{

    var myData=new portfolio(req.body);
    myData.save().then(()=>{
        res.send("The form has been submitted successfully!")
    }).catch(()=>{
        res.status(200).send("Form has not submitted")
    })
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'myPortfolio.html'))
});


app.listen(port,(req,res)=>{

    console.log(`The server  is running at http://${hostname}:${port}/`)

});

