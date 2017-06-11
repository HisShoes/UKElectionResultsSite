//requires
var mongoose = require("mongoose");

//schema 
var electionSchema = new mongoose.Schema({
   year: String,
   topParties: [{
            leader: String,
            name: String,
            color: String,
            seats: Number,
            representation: {type: Number, get: percentage}
        }    
   ]
});


function percentage(value) {
   return value/10 + "%";
}


//create and expose the model
var Election = mongoose.model("Election", electionSchema);
module.exports = Election;