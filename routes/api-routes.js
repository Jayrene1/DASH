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
    // Get route for retrieving a single post
    app.get("/api/sample/:id", function(req, res) {
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
    app.get("/api/sample/country/:country", function(req, res) {
      // 2. Add a join here to include the Author who wrote the Post
      db.sample.findAll({
        where: {
          country: req.params.country
        }
      }).then(function(result) {
        console.log(result);
        res.json(result);
      });
    });

    // Get route for retrieving a single post
    app.get("/api/sample/sector/:sector", function(req, res) {
      // 2. Add a join here to include the Author who wrote the Post
      db.sample.findAll({
        where: {
          sector: req.params.sector
        }
      }).then(function(result) {
        console.log(result);
        res.json(result);
      });
    });
    // Get route for retrieving a single post
    app.get("/api/sample/product/:product", function(req, res) {
      // 2. Add a join here to include the Author who wrote the Post
      db.sample.findAll({
        where: {
          product: req.params.product
        }
      }).then(function(result) {
        console.log(result);
        res.json(result);
      });
    });

    app.get("/api/datasets/:id", function(req, res) {
      db.datasets.findOne({
        where: {
          id: req.params.id
        }
      }).then(function(result) {
        console.log(result);
        res.json(result);
      });
    });


    app.post("/api/datasets", function(req, res) {
      console.log(req.body);
      db.datasets.create({
        json_data: req.body,
      }).then(function(dbDatasets) {
        res.json(dbDatasets);
      });
    });
  };