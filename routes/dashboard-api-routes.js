var db = require("../models");

module.exports = function(app) {

  app.get("/api/dashboards/", function(req, res) {
    var query = {};
    console.log(req.query);
    if (req.query.id) {
      query.id = req.query.id;
    }
    db.Dashboard.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbDashboard) {
      res.json(dbDashboard);
    });
  });

  app.get("/api/dashboards/:id", function(req, res) {
    // Find one Dashboard with the id in req.params.id and return them to the Dashboard with res.json
    db.Dashboard.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbDashboard) {
      res.json(dbDashboard);
    });
  });

  app.post("/api/dashboards", function(req, res) {
    db.Dashboard.create(req.body).then(function(dbdashboards) {
      res.json(dbdashboards);
    });
  });

  app.delete("/api/dashboards/:id", function(req, res) {
    // Delete the Dashboard with the id available to us in req.params.id
    db.Dashboard.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbDashboard) {
      res.json(dbDashboard);
    });
  });
};
