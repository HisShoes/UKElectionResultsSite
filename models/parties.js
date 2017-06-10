//requires
var mongoose = require("mongoose");

//schema 
var partySchema = new mongoose.Schema({
   name: String,
   color: String,
   stats: [{
            leader: String,
            year: String,
            seats: Number,
            representation: {type: Number, get: percentage}
        }    
   ]
});


function percentage(value) {
   return value/100 + "%";
}


//create and expose the model
var Party = mongoose.model("Party", partySchema);
module.exports = Party;