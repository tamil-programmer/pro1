const express = require('express');
// const cons = require('./cons');
const path = require('path');

const port = 7000;
const app = express();

app.use(express.static(path.join(__dirname,"/public/")));
app.set("views",path.join(__dirname,"/views/"))
app.set("view engine","hbs")


const mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : "just"
  });
  
  con.connect(function(err) {
    
    if (err) throw err;
    console.log("Connected!");
  });











app.get("/",(req,res)=>{
    
    res.render('index');
})


app.listen(7000,()=>{
    console.log(`Running on port ${port}`);
})