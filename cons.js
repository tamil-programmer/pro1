const mysql = require('mysql');
var cons = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : "just"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


  export default cons;
