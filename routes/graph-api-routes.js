var db = require("../models");

module.exports = function(app) {
  app.get("/api/graphs", function(req, res) {
    var query = {};
    if (req.query.id) {
      query.id = req.query.id;
    }
    db.graph.findAll({
      where: query,
      include: [db.dashboard] 
    }).then(function(dbdataset) {
      res.json(dbdataset);
    });
  });

  app.get("/api/graphs/:id", function(req, res) {
    // Find one graph with the id in req.params.id and return them to the graph with res.json
    db.graph.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbgraph) {
      res.json(dbgraph);
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
    // Delete the graph with the id available to us in req.params.id
    db.graph.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbgraph) {
      res.json(dbgraph);
    });
  });
};
