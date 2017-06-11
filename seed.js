//Initial set up of uk political party data

//external requires
var mongoose = require("mongoose");

//my requires
var Election = require("./models/elections");

//store party data in an array
var data = [
{
    year: 2010,
    topParties: 
    [{
        name: "Conservative",
        leader: "David Cameron",
        color: "blue",
        seats: 306,
        representation: 471
    },
    {
        name: "Labour",
        leader: "Gordon Brown",
        color: "red",
        seats: 258,
        representation: 397
    },
    {
        name: "Lib Dem",
        leader: "Nick Clegg",
        color: "orange",
        seats: 57,
        representation: 87
    },
    {
        name: "DUP",
        leader: "Peter Robinson",
        color: "green",
        seats: 8,
        representation: 12
    },
    {
        name: "Other",
        color: "inverted",
        seats: 21,
        representation: 54
    }]
    
},
{
    year: 2015,
    topParties: 
    [{
        leader: "David Cameron",
        name: "Conservative",
        color: "blue",
        seats: 331,
        representation: 509
    },
    {
        name: "Labour",
        color: "red",
        leader: "Ed Miliband",
        seats: 232,
        representation: 356
    },
    {
        name: "SNP",
        color: "yellow",
        leader: "Nicola Sturgeon",
        seats: 56,
        representation: 86
    },
    {
        name: "Lib Dem",
        color: "orange",
        leader: "Nick Clegg",
        seats: 8,
        representation: 12
    },
    {
        name: "Other",
        color: "inverted",
        seats: 23,
        representation: 35
    }]
    
},
{
    year: 2017,
    topParties: 
    [{
        leader: "Theresa May",
        name: "Conservative",
        color: "blue",
        seats: 318,
        representation: 489
    },
    {
        name: "Labour",
        color: "red",
        leader: "Jeremy Corbyn",
        seats: 261,
        representation: 401
    },
    {
        name: "SNP",
        color: "yellow",
        leader: "Nicola Sturgeon",
        seats: 35,
        representation: 53
    },
    {
        name: "Lib Dem",
        color: "orange",
        leader: "Tim Farron",
        seats: 12,
        representation: 18
    },
    {
        name: "Other",
        color: "inverted",
        seats: 24,
        representation: 36
    }]
}];

//create function that can be exposed to intialize data set
function seedDB() {
    Election.remove({}, function(err){
        if(err) {
            console.log("failed to clear party data");
        } else {
            console.log("dropped party data");
            initPartyData();
        }
    });
}

function initPartyData() {
    data.forEach(addElection);
}

function addElection(element) {
    Election.create(element, function(err) {
       if(err) {
           console.log("failed to create election data");
       } else {
           console.log("created " + element.year + " election");
       }
    });
}

module.exports = seedDB; 