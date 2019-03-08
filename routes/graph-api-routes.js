var db = require("../models");

module.exports = function(app) {
  app.get("/api/graphs", function(req, res) {
    db.Graph.findAll({}).then(function(dbGraph) {
      res.json(dbGraph);
    });
  });

  app.get("/api/graphs/:id", function(req, res) {
    // Find one Graph with the id in req.params.id and return them to the Graph with res.json
    db.Graph.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbGraph) {
      res.json(dbGraph);
    });
  });

  app.post("/api/graphs", function(req, res) {
    console.log(req.body);
    db.graphs
      .create({
        graph_name: req.body.name,
        graph_values: req.body.graph_values
      })
      .then(function(dbgraphs) {
        res.json(dbgraphs);
      });
  });

  app.delete("/api/graphs/:id", function(req, res) {
    // Delete the Graph with the id available to us in req.params.id
    db.Graph.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbGraph) {
      res.json(dbGraph);
    });
  });
};
