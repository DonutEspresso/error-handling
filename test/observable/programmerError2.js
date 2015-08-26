'use strict';

var Observable = require('rx').Observable;

var asyncVal = Observable.create(function(o) {
    setTimeout(function() {
        o.onNext('hello');
        o.onCompleted();
    });
});


asyncVal.subscribe(
    function onNext() {
        var x = y + 1;
    }
);
