'use strict';

var bunyan = require('bunyan');
var Promise = require('promise');
var verror = require('verror');

var WError = verror.WError;
var logger = bunyan.createLogger({
    name: 'promise-stackTraces',
    serializers: bunyan.stdSerializers
});


function getAsyncValue() {
    return new Promise(function(resolve, reject) {
        // fake a network call to get a value, default to null.
        // fake a failure too.
        var errored = (Math.random() > 0.5);

        if (errored === true) {
            return reject({
                val: null,
                err: new Error('500 InternalServerError')
            });
        } else {
            var val;

            if (Math.random() > 0.5) {
                val = 'hello';
            } else {
                val = 'world';
            }
            return resolve({
                val: val
            });
        }
    });
}


function isValid(previousData) {
    var valid = (previousData.val === 'hello');
    var payload = {
        val: previousData.val,
        valid: valid
    };

    if (Math.random() > 0.5) {
        // should crash and burn, but instead silently swallowed.
        console.log('silently failed, zomg');
        var x = y + 1;
    }

    if (valid === true) {
        return Promise.resolve(payload);
    } else {
        payload.err = new Error('data validation error');
        return Promise.reject(payload);
    }
}


getAsyncValue()
    .then(isValid)
    .then(function finalSuccess(payload) {
        logger.info(payload);
    }, function finalFailure(payload) {

        // because we smartly wrapped all our expected payloads in our own
        // object, if payload here is an instance of Error that means we
        // 'caught' an unexpected error. we need to rethrow that here.
        // EXCEPT WHOOPS! you can't rethrow, it gets swallowed. instead, you
        // need to force a process.exit.
        if (payload instanceof Error)   {
            console.log('should rethrow, but where\'s my stack?');
            throw payload;
            // process.exit(1);
        }

        // wrap the payload error with our own error, then replace the ref.
        payload.err = new WError(payload.err, 'getAsyncValue failure!');
        logger.error(payload);
    });

