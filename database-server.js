'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var telemetryDb = require('./telemetryDb');
var queryHelper = require('./queryHelper.js');
var cors = require('cors');

var app = express();

app.use(bodyParser());
app.use(cors());

app.get('/', function(req, res) {
    res.send('Welcome to the Project Latex database server. To get latest data, go to /latest. To get historical data, go to /historical/<data type>');
});

app.get('/latest', function(req, res) {
    var callback = function(err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send(queryHelper.getLatestDataToReturn(data));
            }
        };
    telemetryDb.getLatestData(callback);
});

app.get('/historical/:dataTypeId', function(req, res) {
    var dataTypeId = req.param('dataTypeId');
    var validDataType = queryHelper.dataTypeIsValid(dataTypeId);
    if (validDataType) {
        var callback = function(err, data) {
                if (err) {
                    res.send(err);
                }
                res.send(data);
            };
        telemetryDb.getHistoricalData(dataTypeId, callback);
    } else {
        res.status(400);
        var validKeys = queryHelper.validKeys();
        res.send('Invalid data type requested. Valid data types are: ' + validKeys);
    }
});

function saveTelemetryInfo(req, res) {
    var callback = function(err, dbTelemetryInfo) {
      if (err) {
          res.send(err);
      }
      res.send(dbTelemetryInfo);
    };
    telemetryDb.saveTelemetryInfo(req.body, callback);
}

app.put('/upload', function(req, res) {
    console.log('Handling PUT');
    saveTelemetryInfo(req, res);
});

app.post('/upload', function(req, res) {
    console.log('Handling POST');
    saveTelemetryInfo(req, res);
});

var port = Number(process.env.PORT || 4000);
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
    telemetryDb.initialiseDb();
});