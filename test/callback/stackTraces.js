'use strict';

var bunyan = require('bunyan');
var verror = require('verror');
var vasync = require('vasync');

var WError = verror.WError;
var logger = bunyan.createLogger({
    name: 'cb-stackTraces',
    serializers: bunyan.stdSerializers
});


function getAsyncValue(callback) {
    setTimeout(function() {
        // fake a network call to get a value, default to null.
        // fake a failure too.
        var errored = (Math.random() > 0.5);
        var val;
        var err;

        if (errored === true) {
            err = new Error('500 InternalServerError');
            val = null;
        } else {
            if (Math.random() > 0.5) {
                val = 'hello';
            } else {
                val = 'world';
            }
        }

        // save value onto iterator
        return callback(err, val);
    }, 100);
}



function isValid(val, callback) {
    var valid = (val === 'hello');
    var err;

    if (Math.random() > 0.5) {
        // should crash and burn!
        var x = y + 1;
    }

    if (valid === false) {
        err = new Error('data validation error');
    }
    return callback(err, val, valid);
}



vasync.waterfall([ getAsyncValue, isValid ], function done(err, val, valid) {

    if (err) {
        var wrappedErr = new WError(err, 'getAsyncValue failure!');
        logger.error({
            err: wrappedErr,
            val: val,
            valid: valid
        });
    } else {
        logger.info({
            val: val,
            valid: valid
        });
    }
});
