var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var NodeCache = require( "node-cache" );
var boilerCache = new NodeCache( { stdTTL: 10, checkperiod: 2 } );
var tempCache = new NodeCache( { stdTTL: 10, checkperiod: 2 } );

app.locals = {
    site: {
        title: 'CoffeeMachine',
        description: ''
    },
    author: {
        name: 'Mibou',
        contact: ''
    }
};

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.set('port', (process.env.PORT || 5000));

app.post('/sudoboil', function(req, res) {
    res.render("okboil");
    boilerCache.set("boiler", "sudo boil", 300);
});

app.get('/sudoboil', function(req, res) {
    res.render("sudoboil");
});

app.get('/temp', function(req, res) {
    res.render("temp", {
        'ambiant': tempCache.get("ambiant"),
        'object': tempCache.get("object")
    });
});

app.post('/temp', function(req, res) {
    var ambiant = req.body.ambiantcelcius;
    var object = req.body.objectcelcius;

    tempCache.set("ambiant", ambiant, 300);
    tempCache.set("object", object, 300);

    res.render("temp", {
        'ambiant': ambiant,
        'object': object
    });
});

app.get('/boil', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end(boilerCache.get("boiler"));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

