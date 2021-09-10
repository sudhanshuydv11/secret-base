const express=require('express');
const app=express();
const path=require("path");
const mongoose=require("mongoose");



app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname +"/public"));

mongoose.connect('mongodb://127.0.0.1:27017/S_base',{
useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology: true});
var log;

const schema= new mongoose.Schema({
    head: String,
    username:String,
    password:String
    });
const schema2=new mongoose.Schema({
    username:String,
    password:String
});
const yo= mongoose.model("User",schema2);


app.set('view engine','ejs');
function fn(t){


}

app.get('/login',function(req,res){
    res.render("login");
});
app.get('/register',function(req,res){
    res.render("register");
});
app.get('/', function(req,res)
{ 
    
res.render('home');
});
app.get('/submit',function(req,res){
    res.render('submit');

});

app.post('/login',function(req,res){

    yo.find({username:req.body.un,password:req.body.pss},function(err,temp){
        if(!temp.length)res.send("password and username do not match");

    else{
        log=req.body.un;
        var mod= mongoose.model(log,schema);
        mod.find({},function(err,item){
            res.render("secrets",{item:item});
        
        });
}
    });
     
     

});
app.post('/register',function(req,res)
{
    yo.find({username:req.body.un},function(err,temp){
        if(temp.length)res.send("Username already exists");
        else{
    if(req.body.pss!=req.body.cpss)
    {
        res.send("passwords do not match");
    }
    else{
    var id2=new yo({
     username:req.body.un,
     password:req.body.pss   
    });
    id2.save();
    res.redirect("/");
}
}
});
});
app.post('/submit',function(req,res){
    var mod2= mongoose.model(log,schema);
var temp = new mod2({
    head:req.body.head,
    username:req.body.un,
    password:req.body.pss
});
temp.save();
res.redirect("/login");
});

app.listen(3000,function(){
    console.log("server started Port:3000");
});