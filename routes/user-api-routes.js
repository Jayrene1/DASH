var db = require("../models");

module.exports = function(app) {
  // routes here
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    // Find one User with the id in req.params.id and return them to the user with res.json
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users", function(req, res) {
    console.log(req.body);
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    // Delete the User with the id available to us in req.params.id
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
