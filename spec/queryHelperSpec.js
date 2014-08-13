'use strict';

var queryHelper = require('../queryHelper');

describe('Get latest data', function() {
    it('should return an empty object when there is no data', function() {
        expect(queryHelper.getLatestDataToReturn([])).toEqual({});
    });
    
    it('should return first entry when there is data available', function() {
        var input = [2,3,5];
        expect(queryHelper.getLatestDataToReturn(input)).toEqual(2);
    });
});

describe('Get telemetry keys', function() {
    it('should return the expected telemetry keys', function() {
        expect(queryHelper.validKeys()).toEqual(['payload_name', 'sentence_id', 'time', 'latitude', 'longitude', 'altitude', 'speed', 'heading', 'temp_internal', 'temp_external']);
    });
});

describe('Test whether data type is valid', function() {
    it('should return false if passed null', function() {
        expect(queryHelper.dataTypeIsValid(null)).toEqual(false);
    });
    
    it('should return false if passed an undefined object', function() {
        var undefinedVar;
        expect(queryHelper.dataTypeIsValid(undefinedVar)).toEqual(false);
    });
    
    it('should return false if passed an invalid value', function() {
        expect(queryHelper.dataTypeIsValid('invalid_key')).toEqual(false);
    });
    
    it('should return true if passed a valid value', function() {
        expect(queryHelper.dataTypeIsValid('time')).toEqual(true);
    });
});