'use strict';

var rx = require('rx');
var Observable = rx.Observable;


var asyncVal = Observable.create(function(o) {
    setTimeout(function() {
        o.onNext('hello');
        o.onCompleted();
    }, 100);
});


asyncVal.map(function onProgrammerError(val, idx, source) {
    // blow up!
    var x = y + 1;
}).subscribe(function onNext() {
    console.log(arguments);
}, function onError() {
    console.log('catch');
    // blow up!
    var x = y + 1;
});

