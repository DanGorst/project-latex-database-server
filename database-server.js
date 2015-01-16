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
    res.send('Welcome to the Project Latex database server. To get latest data, go to /latest. To get historical data, go to /historical?dataTypes_here');
});

app.get('/latest', function(req, res) {
    var callback = function(err, data) {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                res.send(queryHelper.getLatestDataToReturn(data));
            }
        };
    telemetryDb.getLatestData(callback);
});

app.get('/data/:id', function(req, res) {
    var callback = function(err, data) {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                res.send(data);
            }
        };
    telemetryDb.getData(req.params.id, callback);
});

app.get('/historical', function(req, res) {
    var query = req.query;
    var dataTypes = [];
    for (var property in query) {
        if (query.hasOwnProperty(property)) {
            dataTypes[dataTypes.length] = property;
        }
    }
    var validDataTypes = true;
    for (var i = 0; i < dataTypes.length; ++i) {
        validDataTypes = queryHelper.dataTypeIsValid(dataTypes[i]);
    }
    if (validDataTypes) {
        var callback = function(err, data) {
                if (err) {
                    res.status(400);
                    res.send(err);
                } else {
                    res.send(data);
                }
            };
        telemetryDb.getHistoricalData(queryHelper.queryStringFromDataTypes(dataTypes), callback);
    } else {
        res.status(400);
        var validKeys = queryHelper.validKeys();
        res.send('Invalid data type requested. Valid data types are: ' + validKeys);
    }
});

function saveTelemetryInfo(req, res) {
    var saveCallback = function(err, dbTelemetryInfo) {
        if (err) {
          res.status(400);
          res.send(err);
        } else {
          res.send(dbTelemetryInfo);
        }
    };
    telemetryDb.getData(req.body.sentence_id, function(err, existingData) {
        if (err) {
          res.status(400);
          res.send(err);
        } else if (existingData != null) {
          res.status(400);
          res.send("Data not saved as it already exists in database: " + existingData);
        } else {
            telemetryDb.saveTelemetryInfo(req.body, saveCallback);
        }
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

var port = Number(process.env.PORT || 4000);
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
    telemetryDb.initialiseDb();
});