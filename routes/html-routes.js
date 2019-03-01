// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.handlebars"));
  });

  // cms route loads cms.html
  app.get("/dash", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/dashboard.handlebars"));
  });

  // blog route loads blog.html
  app.get("/make", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/createdash.handlebars"));
  });

}; 