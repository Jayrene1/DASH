var db = require("../models");

module.exports = function(app) {

  app.get("/api/datasets/", function(req, res) {
    var query = {};
    if (req.query.source) {
      query.source = req.query.source;
    }
    db.dataset.findAll({
      where: query,
      include: [db.user] 
    }).then(function(dbdataset) {
      res.json(dbdataset);
    });
  });

  app.get("/api/datasets/:id", function(req, res) {
    // Find one dataset with the id in req.params.id and return them to the dataset with res.json
    db.dataset.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbdataset) {
      res.json(dbdataset);
    });
  });

  app.post("/api/datasets", function(req, res) {
    db.dataset.create(req.body).then(function(dbdatasets) {
      res.json(dbdatasets);
    });
  });

  app.delete("/api/datasets/:id", function(req, res) {
    // Delete the dataset with the id available to us in req.params.id
    db.dataset.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbdataset) {
      res.json(dbdataset);
    });
  });

  app.put("/api/datasets/:id", function(req, res) {
    db.dataset.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(data) {
      res.json(data);
    });
  });
};
