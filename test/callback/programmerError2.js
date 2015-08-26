'use strict';

function asyncVal(callback) {
    setTimeout(function() {
        callback('hello');
    }, 100);
}

asyncVal(function(val) {
    var x = y + 1;
});
