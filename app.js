//external requires
var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose");

//my requires
var Party        = require("./models/parties");

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
    Party.find({}, function(err, parties){
        if(err) {
            console.log(err);
            res.redirecct("/");
        } else {
            res.render("stats", {parties: parties});   
        }
    })
});

//server start//
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Politics Server Started');
});
