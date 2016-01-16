var express = require('express');

var app = express();
var NodeCache = require( "node-cache" );
var boilerCache = new NodeCache( { stdTTL: 10, checkperiod: 2 } );

app.set('port', (process.env.PORT || 5000));

app.get('/sudoboil', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
    boilerCache.set("boiler", "sudo boil", 10);
});

app.get('/boil', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end(boilerCache.get("boiler"));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

