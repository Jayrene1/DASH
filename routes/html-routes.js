// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  //handlebars routing 
  app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
  });

  app.get('/createdash', (req, res) => {
  res.render('createdash', { title: 'Create Dash' });
  });

  app.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'Dashboard' });
  });

  app.get('/home', (req, res) => {
    res.render('home', { title: 'Home Page' });
    });
}; 