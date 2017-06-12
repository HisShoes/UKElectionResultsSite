//external requires
var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose");

//my requires
var Router          = require("./routes/electionRouter");

//init database, not always required
//var seedDB = require("./seed.js");
//seedDB();

//app setup;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/political_app");
app.use(express.static(__dirname + "/public"));

//pass the app into the router
Router(app);

//server start//
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Politics Server Started');
});

