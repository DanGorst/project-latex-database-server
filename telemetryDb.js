'use strict';

var mongoose = require('mongoose');

module.exports = {
    url: 'mongodb://user:latex1@ds053109.mongolab.com:53109/project-latex',
    telemetrySchema: function() {
        return new mongoose.Schema({
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
    },
    telemetryModelClass: function() {
        return mongoose.model('TelemetryInfo', this.telemetrySchema());
    },
    getLatestDataToReturn: function(data)    {
        if (data.length === 0)  {
            return {};
        }
        else {
            return data[0];
        }
    }
};