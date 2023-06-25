const express = require("express");
// const cons = require('./cons');
const path = require("path");
const bodyparser = require("body-parser");

const port = 7000;
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public/")));
app.set("views", path.join(__dirname, "/views/"));
app.set("view engine", "hbs");

const mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "just",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/attendance", (req, res) => {
  res.render("attendance");
});

// !AUTH

app.post("/auth/login", (req, res) => {
  var id = req.body.id;
  var pwd = req.body.pwd;

  con.query(
    `select * from teacherdb where teacherLoginId='${id}' and teacherPwd='${pwd}';`,
    function (err, result) {
      if (err) {
        res.send("index", { mess: "FAiled to login" });
      } else {
        if (result.length == 1) {
          con.query("select * from studentdb", function (err1, result2) {
            if (err1) {
              console.log(`error`);
            } else {
              console.log(result2);
               return res.render('attendance',{data:result2});
            }
          });
        } else {
          return res.render("index", { mess: "FAiled to login" });
        }
      }
    }
  );
});






app.post("/auth/attendance",(req,res)=>{
  con.query("select * from studentdb", function (err1, result2){
    // for (let i = 0; i < result2.length; i++) {
  
    var d = ["a1","a2","a3"];
    console.log("----------------------------------");

      var val = req.body;

      for (let i = 0; i < result2.length; i++) {
    // console.log(val[d[i]]);
    console.log(result2);
    if(val[d[i]]==1){
      
        con.query(`insert into attendance(sid,tid,timey,presenty) value(${result2[i]['sid']},7,current_timestamp,${val[d[i]]})`,function(err,res3){

if(err) throw err;
console.log(res3);

        })
      }
      else{

        con.query(`insert into attendance(sid,tid,timey,presenty) value(${result2[i]['sid']},7,current_timestamp,0)`,function(err,res3){

        })


      }
        
      }
    // console.log(val);
    
      
    // }
    



  })

 
res.send('done');

})
















app.listen(7000, () => {
  console.log(`Running on port ${port}`);
});
