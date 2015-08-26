'use strict';

var Promise = require('promise');


function programmerError() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            var x = y + 1;
        }, 100);
    });
}

programmerError();
