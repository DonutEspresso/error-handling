'use strict';

function programmerError(callback) {
    setTimeout(function() {
        var x = y + 1;
        callback();
    }, 100);
}

programmerError();
