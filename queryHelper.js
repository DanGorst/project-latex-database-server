'use strict';

var telemetryKeys = require('./telemetryKeys.json');

function getLatestDataToReturn(data) {
    if (data.length === 0)  {
        return {};
    }
    else {
        return data[0];
    }
}

function dataTypeIsValid(dataTypeId) {
    var keys = telemetryKeys.keys;
    for (var i = 0; i < keys.length; ++i) {
        if (keys[i] === dataTypeId) {
            return true;
        }
    }
    return false;
}

function validKeys() {
    return telemetryKeys.keys;
}

module.exports = {
    getLatestDataToReturn: getLatestDataToReturn,
    dataTypeIsValid: dataTypeIsValid,
    validKeys: validKeys
};