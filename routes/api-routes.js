var db = require("../models");

module.exports = function(app) {

    // GET route for getting all of the posts
    app.get("/api/sample", function(req, res) {
        console.log(db.sample);
        console.log("HI");
        
      db.sample.findAll({}).then(function(data) {
        res.json(data);
      }).catch(function(err) {
          res.json(err);
      });
    });
  };
  