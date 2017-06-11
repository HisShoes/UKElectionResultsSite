//external requires
var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose");

//my requires
var Election        = require("./models/elections");

//init database, not always required
var seedDB = require("./seed.js");
seedDB();

//app setup;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/political_app");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/stats", function(req, res) {
    Election.find({}, function(err, elections){
        if(err) {
            console.log(err);
            res.redirect("/");
        } else {
            //create a list of indices to represent the order the tabs will show
            var indices = getElectionTabOrder(elections);
            res.render("stats", {elections: elections, indices: indices});   
        }
    })
});

//server start//
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Politics Server Started');
});


function getElectionTabOrder(elections) {
    var indices = [];
    var append = false;
    for(var i = elections.length; i > 0; i--)
    {
        if(append){
            indices.push(i);
        } else {
            indices.unshift(i);
        }
        append = !append;
    }
    return indices;
}