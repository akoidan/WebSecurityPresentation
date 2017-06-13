function noPreflight() {
    var r = new XMLHttpRequest();
    r.onreadystatechange = function () {
        if (r.readyState === 4) {
           logger.log(r.response);
        }
    };
    r.open("POST", 'http://hack:3002/dummy', true);
    r.send({'somekey': 'someValue'});
}

function prePut() {
    var r = new XMLHttpRequest();
    r.onreadystatechange = function () {
        if (r.readyState === 4) {
            logger.log(r.response);
        }
    };
    r.open("PUT", 'http://hack:3002/dummy', true);
    r.send("Some data");
}

function prePutOWn() {
    var r = new XMLHttpRequest();
    r.onreadystatechange = function () {
        if (r.readyState === 4) {
            logger.log(r.response);
        }
    };
    r.open("PUT", '/dummy', true);
    r.send("Some data");
}

function preHeader() {
    var r = new XMLHttpRequest();
    r.onreadystatechange = function () {
        if (r.readyState === 4) {
            logger.log(r.response);
        }
    };
    r.open("POST", 'http://hack:3002/dummy', true);
    r.setRequestHeader("custom_header", "any value here");
    r.send({'somekey': 'someValue'});
}

function preContentType() {
    var r = new XMLHttpRequest();
    r.onreadystatechange = function () {
        if (r.readyState === 4) {
            logger.log(r.response);
        }
    };
    r.open("POST", 'http://hack:3002/dummy', true);
    // this one doesn't generate options
    // r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // but this one does
    r.setRequestHeader('Content-Type', 'text/html; charset=utf-8');
    r.send('{"data": "value"}');
}