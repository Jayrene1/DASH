var db = require("../models");

module.exports = function(app) {
  // routes here
  app.get("/api/users", function(req, res) {
    db.user.findAll({}).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    // Find one user with the id in req.params.id and return them to the user with res.json
    db.user.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  app.post("/api/users", function(req, res) {
    console.log(req.body);
    db.user.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function(dbusers) {
      res.json(dbusers);
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    // Delete the user with the id available to us in req.params.id
    db.user.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbuser) {
      res.json(dbuser);
    });
  });
};
