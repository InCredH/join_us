var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',      // your root username
    password : 'password',    
    database : 'onetask',   // the name of your db
    multipleStatements: true
});

app.get("/", function(req, res) {
    // res.send("You've reached the home page !");
    //Finding the count of users in DB
    // var q = "select count(*) as count from information";
    // connection.query(q, function(err, results) {
    //     if(err) throw err;
    //     console.log(results);
    //     var count = results[0].count;
    //     // res.send("We have " + count + " users in our DB");
    //     res.render("home", {data:count});
    // });
    res.render("home");
    
});

app.post("/register", function(req,res) {
    var person = {  
        email : req.body.email
    }
    try{
        connection.query("insert into information set ?", person, function(err,result) {
            if(err) throw err;
            res.redirect("/");
        });
    } catch{
        throw err;
    }
    
});

app.post("/sregister", function(req,res) {
    var person = {
        Firstname : req.body.first_name,
        Lastname : req.body.last_name,
        Age : req.body.age,
        Gender : req.body.gender,
        Address1 : req.body.address,
        PhoneNo : req.body.phone,
        pincode : req.body.pin_code,
        skill : req.body.skill
    }
    try {
        connection.query("insert into servicemen set ?", person, function(err, result) {
            if(err) throw err;
            res.redirect("/");
        });
    } catch{
        throw err;
    }
    
});

app.post("/cregister", function(req,res) {
    console.log(req);
    var person = {
        Firstname : req.body.first_name,
        Lastname : req.body.last_name,
        Age : req.body.age,
        Gender : req.body.gender,
        Address1 : req.body.address,
        PhoneNo : req.body.phone,
        pincode : req.body.pin_code  

    }
    connection.query("insert into client set ?", person, function(err, result) {
        connection.on('error', function(err) {
            console.log("[mysql error]",err);
        });
        if(err) {
            console.log(err);
            throw err;
        }
        res.redirect("/");
    }) 
});



app.post("/login", function(req,res) {
    res.render("login");
});

app.post("/signupc", function(req, res) {
    res.render("signupc.ejs");
});

app.post("/signups", function(req, res) {
    res.render("signups");
});

app.get("/joke", function(req, res) {
    var joke = "This is a joke... Now cmon laugh!!!";
    res.send(joke);
});

app.get("/random_num", function(req,res) {
    var num = Math.floor(Math.random() * 10) + 1;
    res.send("Your lucky number is " + num);
});

app.listen(8080,function(){
    console.log("Server running on 8080!!!");
});