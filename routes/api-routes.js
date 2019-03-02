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
  
    // Get route for retrieving a single post
    app.get("/api/samples/:id", function(req, res) {
      // 2. Add a join here to include the Author who wrote the Post
      db.sample.findOne({
        where: {
          id: req.params.id
        }
      }).then(function(result) {
        console.log(result);
        res.json(result);
      });
    });

    // Get route for retrieving a single post
    app.get("/api/samples/:Country", function(req, res) {
      // 2. Add a join here to include the Author who wrote the Post
      db.sample.findOne({
        where: {
          country: req.params.country
        }
      }).then(function(result) {
        console.log(result);
        res.json(result);
      });
    });

    // Get route for retrieving a single post
    app.get("/api/samples/:Sector", function(req, res) {
      // 2. Add a join here to include the Author who wrote the Post
      db.sample.findOne({
        where: {
          sector: req.params.sector
        }
      }).then(function(result) {
        console.log(result);
        res.json(result);
      });
    });
    // Get route for retrieving a single post
    app.get("/api/samples/:Product", function(req, res) {
      // 2. Add a join here to include the Author who wrote the Post
      db.sample.findOne({
        where: {
          product: req.params.product
        }
      }).then(function(result) {
        console.log(result);
        res.json(result);
      });
    });