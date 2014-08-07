'use strict';

var telemetryDb = require('../telemetryDb');

describe('Get latest data', function() {
    it('should return an empty object when there is no data', function() {
        expect(telemetryDb.getLatestDataToReturn([])).toEqual({});
    });
    
    it('should return first entry when there is data available', function() {
        var input = [2,3,5];
        expect(telemetryDb.getLatestDataToReturn(input)).toEqual(2);
    });
});