'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var telemetryDb = require('./telemetryDb');
var cors = require('cors');

var app = express();

var db = mongoose.connection;
mongoose.connect(telemetryDb.url);

db.on('error', console.error);
db.once('open', function() {
});

var TelemetryDbModel = telemetryDb.telemetryModelClass();

app.use(bodyParser());
app.use(cors());

app.get('/latest', function(req, res) {
    TelemetryDbModel
        .find()
        .sort('-time')
        .limit(1)
        .exec(function(err, data) {
            if (err) {
                res.send(err);
            }
            res.send(telemetryDb.getLatestDataToReturn(data));
        });
});

app.get('/altitude', function(req, res) {
    TelemetryDbModel
        .find()
        .sort('time')
        .select('time altitude')
        .exec(function(err, data) {
            if (err) {
                res.send(err);
            }
            res.send(data);
        });
});

function saveTelemetryInfo(req, res) {
    var dbTelemetryInfo = new TelemetryDbModel(req.body);
    dbTelemetryInfo.save(function(err, dbTelemetryInfo) {
      if (err) {
          res.send(err);
      }
      res.send(dbTelemetryInfo);
    });
}

app.put('/upload', function(req, res) {
    console.log('Handling PUT');
    saveTelemetryInfo(req, res);
});

app.post('/upload', function(req, res) {
    console.log('Handling POST');
    saveTelemetryInfo(req, res);
});

var server = app.listen(4000, function() {
    console.log('Listening on port %d', server.address().port);
});