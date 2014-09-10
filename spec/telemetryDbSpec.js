'use strict';

var telemetryDb = require('../telemetryDb');

describe('Ensure that unavailable values (e.g. N/A) are put into valid format so we can add them to database', function() {
    it('should convert latitude N/A to placeholder value', function() {
        var data = {'latitude':'N/A'};
        telemetryDb.putUnavailableDataIntoCorrectFormat(data);
        expect(data).toEqual({'latitude':'99.99'});
    });
    
    it('should convert longitude N/A to placeholder value', function() {
        var data = {'longitude':'N/A'}
        telemetryDb.putUnavailableDataIntoCorrectFormat(data);
        expect(data).toEqual({'longitude':'99.99'});
    });
    
    it('should convert heading N/A to placeholder value', function() {
        var data = {'heading':'N/A'};
        telemetryDb.putUnavailableDataIntoCorrectFormat(data);
        expect(data).toEqual({'heading':'99.99'});
    });
    
    it('should not attempt to convert time value', function() {
        var data = {'time':'N/A'};
        telemetryDb.putUnavailableDataIntoCorrectFormat(data);
        expect(data).toEqual({'time':'N/A'});
    });
    
    it('should not attempt to convert sentence ID', function() {
        var data = {'sentence_id':'N/A'};
        telemetryDb.putUnavailableDataIntoCorrectFormat(data);
        expect(data).toEqual({'sentence_id':'N/A'});
    });
    
    it('should not attempt to convert payload name', function() {
        var data = {'payload_name':'N/A'};
        telemetryDb.putUnavailableDataIntoCorrectFormat(data);
        expect(data).toEqual({'payload_name':'N/A'});
    });
});