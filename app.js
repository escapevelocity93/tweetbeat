var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var PythonShell = require('python-shell');

// configuration ===========================================

// set our port
var port = process.env.PORT || 7000;


// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));


app.get('*', function(req, res) {
           res.sendfile('./public/views/index.html'); // load our public/index.html file
});

app.post('/search', function(req, res) {

      var searchy = req.body.searchThis;
      var emotions = [];
      var positive = req.body.positive;
      var negative = req.body.negative;
      var media =  req.body.media;
      var extras = "";
      var radius = req.body.radius;
      var lat = req.body.lat;
      var lng = req.body.lng;

      console.log(searchy);
      console.log(radius);
      console.log(lat);
      console.log(lng);

      if(positive)
      {
        emotions.push(" :)");
      }
      if(negative)
      {
        emotions.push(" :(");
      }
      if(media)
      {
          extras +=" filter:media"
      }
      console.log(emotions);
      var options = {
        mode: 'text',
        args: [searchy, emotions, extras, radius, lat, lng]
      };

PythonShell.run('searchScript.py', options, function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  console.log('results: %j', results);
  res.send(JSON.stringify(results));
});
});


app.post('/stream', function(req, res) {

var stream = req.body.stream;
console.log(stream);


var options = {
        mode: 'text',
        args: []
};

PythonShell.run('streamScript.py', options, function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  console.log('results: %j', results);
  res.send(JSON.stringify(results));
});
});

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
