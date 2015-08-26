'use strict';

var Promise = require('bluebird');

function noop() {}

function asyncVal() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('hello');
        }, 100);
    });
}

function operationalError() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error('iz bad'));
        }, 200);
    });
}


function programmerError() {
    // do some bad stuff here
    throw new Error('yahoo');
    var x = y + 1;

    return new Promise(function(resolve, reject) {
        setTimeout(function() {
        resolve('world');
        }, 500);
    });
}

asyncVal().then(function(val) {
    console.log('1', val);
});

asyncVal().then(operationalError).then(function(val) {
    console.log('2 swallowed', arguments);
});

asyncVal().then(operationalError).then(noop, function(val) {
    console.log('2', arguments);
});

asyncVal().then(programmerError).then(function(val) {
    console.log('3', arguments);
}, function(val) {
    console.log('3', arguments);
    //var x  = y + 2;
});
