const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require ("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
mongoose.connect("mongodb://admin:123@postapi-shard-00-00.m5drb.mongodb.net:27017,postapi-shard-00-01.m5drb.mongodb.net:27017,postapi-shard-00-02.m5drb.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-gfmcyc-shard-0&authSource=admin&retryWrites=true&w=majority",
{
 useNewUrlParser: true,
 UseUnifiedTopology: true
})
//Create a Schema
const noteSchema = {
    title: String,
    content: String
   }
const Note = mongoose.model("Note", noteSchema);
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})
//app.post
app.post('/', function(req, res){
    let newNote = new Note({
    title: req.body.title,
    content: req.body.content
    });
    newNote.save();
    res.redirect('/');
   })
   app.listen(3000, function(){
    console.log("server is Running on 3000");
})