var Controller = require("../controllers/electionController");


module.exports = function(app) {

    //webpage routes
    app.get("/", Controller.Index);
    
    app.route("/stats").get(Controller.showElectionStats);
    
    app.route("/api").get(Controller.showAPIDetails);
    
    //api routes
    app.route("/elections/:requestString").get(Controller.getElectionData);
};