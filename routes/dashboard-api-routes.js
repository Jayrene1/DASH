var db = require("../models");

module.exports = function(app) {

  app.get("/api/dashboards/", function(req, res) {
    var query = {};
    console.log(req.query);
    if (req.query.id) {
      query.id = req.query.id;
    }
    db.dashboard.findAll({
      where: query,
      include: [db.user]
    }).then(function(dbdashboard) {
      res.json(dbdashboard);
    });
  });

  app.get("/api/dashboards/:id", function(req, res) {
    // Find one dashboard with the id in req.params.id and return them to the dashboard with res.json
    db.dashboard.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbdashboard) {
      res.json(dbdashboard);
    });
  });

  app.post("/api/dashboards", function(req, res) {
    db.dashboard.create(req.body).then(function(dbdashboards) {
      res.json(dbdashboards);
    });
  });

  app.delete("/api/dashboards/:id", function(req, res) {
    // Delete the dashboard with the id available to us in req.params.id
    db.dashboard.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbdashboard) {
      res.json(dbdashboard);
    });
  });
};
