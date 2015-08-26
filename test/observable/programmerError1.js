'use strict';

var Observable = require('rx').Observable;


var programmerError = Observable.create(function(o) {
    setTimeout(function() {
        var x = y + 1;
        o.onNext();
        o.onCompleted();
    }, 100);
});


programmerError.subscribe(
    function onNext() {

    },
    function onError() {

    },
    function onCompleted() {

    }
);
