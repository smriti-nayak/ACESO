//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const app = express();
//const encrypt=require("mongoose-encryption");
const md5= require("md5");
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser: true, useUnifiedTopology: true});

const userSchema=new mongoose.Schema({
  email:String,
  password: String
});

secret=process.env.SECRET;
//userSchema.plugin(encrypt, {secret:secret, encryptedFields: ['password']});

const User= new mongoose.model("User",userSchema);
app.get("/",function(req,res){
  res.render("index");
});
app.get("/register",function(req,res){
  res.render("register");
});

app.post("/register",function(req,res){
  const newUser=new User({
    email:req.body.username,
    password: md5(req.body.password)
  });
  newUser.save(function(err){
    if(err)
    console.log(err);
    else
    res.render("choice");
  });
});

app.get("/login",function(req,res){
  res.render("login");
});


app.post("/login",function(req,res){
  const username=req.body.username;
  const password=md5(req.body.password);


User.findOne({email:username},function(err,foundUser){
  if(err)
  console.log(err);
  else{
    if(foundUser){
      if(foundUser.password===password){
        res.render("choice");
        }
        else{
          res.render("error");
        }
    }
  }
})
});


app.get("/biodata",function(req,res){
  res.render("biodata");
});

app.get("/medicalStore",function(req,res){
  res.render("medicalStore");
});
app.get("/user",function(req,res){
  res.render("user");
});
app.get("/Hospitalgate",function(req,res){
  res.render("Hospitalgate");
});
app.get("/hospital",function(req,res){
  res.render("hospital");
});
app.get("/medicalGate",function(req,res){
  res.render("medicalGate");
});
app.get("/medicalDashboard",function(req,res){
  res.render("medicalDashboard");
});

app.get("/hospitalDashboard",function(req,res){
  res.render("hospitalDashboard");
});
app.get("/choice",function(req,res){
  res.render("choice");
});
app.get("/finalmap",function(req,res){
  res.render("finalmap");
});
app.listen(3000,function(req,res){
  console.log("Server Started Successfully");
})
//jshint esversion:6
