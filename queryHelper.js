'use strict';

var telemetryKeys = require('./telemetryKeys.json');

var invalidArrayMessage = 'Invalid array of data types';

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

function queryStringFromDataTypes(dataTypes) {
    if (typeof dataTypes === 'undefined' || dataTypes === null) {
        throw invalidArrayMessage + ': ' + dataTypes;
    }
    if (dataTypes.length == 0) {
        throw invalidArrayMessage + ': []';
    }
    
    var dataTypesString = '';
    for (var i = 0; i < dataTypes.length - 1; ++i) {
        dataTypesString += dataTypes[i] + ' ';
    }
    dataTypesString += dataTypes[dataTypes.length - 1];
    return dataTypesString;
}

function validKeys() {
    return telemetryKeys.keys;
}

module.exports = {
    getLatestDataToReturn: getLatestDataToReturn,
    dataTypeIsValid: dataTypeIsValid,
    validKeys: validKeys,
    queryStringFromDataTypes: queryStringFromDataTypes,
    invalidArrayMessage: invalidArrayMessage
};