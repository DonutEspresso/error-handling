'use strict';

var path = require('path');

var chai = require('chai');
var childProcess = require('child_process');

var assert = chai.assert;
var spawn = childProcess.spawn;


describe('Callback error handling', function() {

    it('should throw and crash on programmer error (programmerError1)', function(done) {

        var proc = spawn('node', [ path.join(__dirname, './callback/programmerError1.js') ]);

        proc.on('close', function(code) {
            assert.equal(code, 1);
            done();
        });
    });

    it('should throw and crash on programmer error (programmerError2)', function(done) {

        var proc = spawn('node', [ path.join(__dirname, './callback/programmerError2.js') ]);

        proc.on('close', function(code) {
            assert.equal(code, 1);
            done();
        });
    });

});

