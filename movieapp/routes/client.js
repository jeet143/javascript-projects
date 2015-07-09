module.exports = function (app) {

  app.get('/', function(req, res) {
    res.render('search');
  });

  app.get('/movie/:id', function(req, res) {
    res.render('detail');
  });

  app.get('/help', function(req, res) {
    res.render('help');
  });

};