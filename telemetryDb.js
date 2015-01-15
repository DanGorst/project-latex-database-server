'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
            payload_name: String, 
            sentence_id: String, 
            time: Date,
            latitude: Number,
            longitude: Number,
            altitude: Number,
            speed: Number,
            heading: Number,
            temp_internal: Number,
            temp_external: Number
        });

function initialiseDb() {
    var db = mongoose.connection;
    mongoose.connect('mongodb://user:latex1@ds053109.mongolab.com:53109/project-latex');

    db.on('error', console.error);
    db.once('open', function() {
        console.log('Database connection opened');
    });
}

var TelemetryDbModel = mongoose.model('TelemetryInfo', schema);

function getLatestData(callback) {
    TelemetryDbModel
        .find()
        .sort('-time')
        .limit(1)
        .exec(callback);
}

function getData(id, callback) {
    TelemetryDbModel
            .findOne({ 'sentence_id' : id })
            .exec(callback);
}

function getHistoricalData(dataTypesString, callback) {
    TelemetryDbModel
            .find()
            .sort('time')
            .select('time ' + dataTypesString)
            .exec(callback);
}

function putUnavailableDataIntoCorrectFormat(data) {
    for (var property in data) {
        if (data.hasOwnProperty(property)) {
            var value = data[property];
            if (value === 'N/A' && property != 'payload_name' && property != 'sentence_id' && property != 'time') {
                data[property] = '99.99';
            }
        }
    }
    return data;
}

function saveTelemetryInfo(data, callback) {
    putUnavailableDataIntoCorrectFormat(data);
    var dbTelemetryInfo = new TelemetryDbModel(data);
    dbTelemetryInfo.save(callback);
}

module.exports = {
    initialiseDb: initialiseDb,
    getLatestData: getLatestData,
    getData: getData,
    getHistoricalData: getHistoricalData,
    saveTelemetryInfo: saveTelemetryInfo,
    putUnavailableDataIntoCorrectFormat: putUnavailableDataIntoCorrectFormat
};