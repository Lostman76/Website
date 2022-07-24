const express =require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static(__dirname + '/public'));



mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error',()=> console.log("Error in connecting to database"));
db.once('open', ()=> console.log("Connected to the database"));

app.get("/contact.html", function(req,res){
    res.sendFile(__dirname+"/contact.html")
})
app.get("/index.html", function(req,res){
    res.sendFile(__dirname+"/index.html")
})
app.get("/cheatsheets.html", function(req,res){
    res.sendFile(__dirname+"/cheatsheets.html")
})
app.get("/About.html", function(req,res){
    res.sendFile(__dirname+"/About.html")
})
app.get("/Finance.html", function(req,res){
    res.sendFile(__dirname+"/Finance.html")
})
app.get("/Resources.html", function(req,res){
    res.sendFile(__dirname+"/Resources.html")
})
app.get("/search.html", function(req,res){
    res.sendFile(__dirname+"/search.html")
})
app.get("/video1.mp4", function(req,res){
    res.sendFile(__dirname+"/video1.mp4")
})
app.get("/typed.js", function(req,res){
    res.sendFile(__dirname+"/typed.js")
})


app.post("/submit", (req,res)=>{
    var name =req.body.name;
    var mail = req.body.mail;
    var number = req.body.number;
    var helpyou = req.body.helpyou;

    var data = {
        "name": name,
        "mail": mail,
        "number": number,
        "helpyou": helpyou
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
         console.log("Record inserted");
    });
    return res.redirect('contact.html')
})



app.listen(80, function(){
    console.log("Server is running on 80");
})