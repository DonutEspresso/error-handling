'use strict';

var Promise = require('promise');


function asyncVal() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('hello');
        }, 100);
    });
}


function programmerError() {
    var x = y + 1;
}


asyncVal().then(programmerError)
            .catch(function(e) {
                // handled the error!
                // now do something bad and blow up some more
                var x = y + 1;
            });

