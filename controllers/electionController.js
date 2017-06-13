var Election = require("../models/elections")

//returns election data based on a request string passed in
exports.getElectionData = function (req, res) {
    var searchRequest = parseElectionRequest(req.params.requestString);
    Election.find(searchRequest,  { '_id': 0, 'topParties._id': 0, '__v':0}, function(err, elections){
       if(err) {
           res.send(err);
       } else {
           elections.forEach(setRepresentation);
           res.json(elections);
       }
    });
};

exports.showElectionStats = function (req, res) {
    Election.find({}, function(err, elections){
        if(err) {
            console.log(err);
            res.redirect("/");
        } else {
            //create a list of indices to represent the order the tabs will show
            var indices = getElectionTabOrder(elections);
            res.render("stats", {elections: elections, indices: indices});   
        }
    });
};
    
exports.showAPIDetails = function(req, res) {
    res.render("apiPage");
};

exports.Index = function(req, res) {
    res.render("index");
};


//functions only for this module
//convert the representation for each party in an election
function setRepresentation(election) {
    election.topParties.forEach(convertRepresentation);
};

//convert representation from a number (10*% rep) to a string (rep%)
function convertRepresentation(party) {
    this.representation = this.representation/10 + "%";
};


//mapping for the request parameters so that users don't need to pass in
//some ugly parameters
var paramMapping = {
    year: 'year',
    leader: 'topParties.leader',
    party: 'topParties.name'
};

//parse the request string
function parseElectionRequest(reqString) {
    reqString = reqString.replace(/[^a-zA-Z0-9=&\. ]/g, '');
    var reqObject = {};
    var listOfParams = reqString.split("&");
    
    listOfParams.forEach(function(param) {
       reqObject[paramMapping[param.split("=")[0]]] = param.split("=")[1];
    });
    
    return reqObject;
}

//order the elections for putting the latest election in the middle of the tabs
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
};