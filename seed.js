//Initial set up of uk political party data

//external requires
var mongoose = require("mongoose");

//my requires
var Party = require("./models/parties");

//store party data in an array
var data = [
    {
        name: "Conservative",
        color: "blue", 
        stats: [{
            leader: "Theresa May",
            year: "2017",
            seats: 318,
            representation: 4892
        }]
    },
    {
        name: "Labour",
        color: "red",
        stats: [{
            leader: "Jeremy Corbyn",
            year: "2017",
            seats: 261,
            representation: 4015
        }]
    },
    {
        name: "SNP",
        color: "yellow",
        stats: [{
            leader: "Nicola Sturgeon",
            year: "2017",
            seats: 35,
            representation: 538
        }]
    },
    {
        name: "Lib Dem",
        color: "orange",
        stats: [{
            leader: "Tim Farron",
            year: "2017",
            seats: 12,
            representation: 185
        }]
    },
    {
        name: "Other",
        color: "inverted",
        stats: [{
            year: "2017",
            seats: 24,
            representation: 369
        }]
    }
];

//create function that can be exposed to intialize data set
function seedDB() {
    Party.remove({}, function(err){
        if(err) {
            console.log("failed to clear party data");
        } else {
            console.log("dropped party data");
            initPartyData();
        }
    });
}

function initPartyData() {
    data.forEach(addParty);
}

function addParty(element) {
    Party.create(element, function(err) {
       if(err) {
           console.log("failed to create party data");
       } else {
           console.log("created " + element.name + " party");
       }
    });
}

module.exports = seedDB; 