String.prototype.format = function() {
    var args = arguments,  replacement = 0;
    return this.replace(/\{\}/g, function() {
        return args[replacement++];
    });
};

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

window.logger = (function (logsEnabled) {
    var self = this;
    self.historyStorage = null;
    self.styles = {
        time: "color: blue",
        msg: "color: black",
        ws: "color: green; font-weight: bold",
        http: "color: green; font-weight: bold",
        webrtc: "color: #960055; font-weight: bold"
    };
    self.dummyFun = function () {
        return function () { }
    };
    self.disableLogs = function () {
        self.info = dummyFun;
        self.error = dummyFun;
        self.ws = dummyFun;
        self.http = dummyFun;
        self.httpErr = dummyFun;
        self.warn = dummyFun;
        self.webrtc = dummyFun;
        self.webrtcErr = dummyFun;
    };
    self.enableLogs = function () {
        self.info = self._info;
        self.error = self._error;
        self.warn = self._warn;
        self.ws = self._http;
        self.http = self._http;
        self.httpErr = self._httpErr;
        self.webrtc = self._webrtc;
        self.webrtcErr = _webrtcErr;
    };
    self._info = function () {
        return self.doLog(arguments, console.log);
    };
    self._error = function () {
        return self.doLog(arguments, console.error);
    };
    self._warn = function () {
        return self.doLog(arguments, console.warn);
    };
    self._webrtc = function() {
        return self._debug(arguments, self.styles.webrtc, console.log);
    };
    self._webrtcErr = function() {
        return self._debug(arguments, self.styles.webrtc, console.error);
    };
    self._http = function() {
        return self._debug(arguments, self.styles.http, console.log);
    };
    self._ws = function() {
        return self._debug(arguments, self.styles.ws, console.log);
    };
    self._httpErr = function() {
        return self._debug(arguments, self.styles.http, console.error);
    };
    self._debug = function (inArg, style, dest) {
        var args = Array.prototype.slice.call(inArg);
        var initiator = args.shift();
        var now = new Date();
        // second argument is format, others are params
        var text = args.length > 1 ? String.prototype.format.apply(args.shift(), args) : args[0];
        var result = "%c{}:{}:{}.{}: %c{} %c{}".format(
            sliceZero(now.getHours()),
            sliceZero(now.getMinutes()),
            sliceZero(now.getSeconds()),
            sliceZero(now.getMilliseconds(), -3),
            initiator,
            text
        );
        saveLogToStorage(result);
        return Function.prototype.bind.apply(dest,
            [window.console, result, self.styles.time, style, self.styles.msg]);
    };
    self.saveLogToStorage = function (result) {
        if (!window.loggingEnabled) {
            return;
        }
        if (self.historyStorage == null) {
            self.historyStorage = result;
        } else if (self.historyStorage.length > MAX_STORAGE_LENGTH) {
            var notConcatInfo = self.historyStorage + ';;;' + result;
            self.historyStorage = notConcatInfo.substr(notConcatInfo.length - MAX_STORAGE_LENGTH, notConcatInfo.length);
        } else {
            self.historyStorage = self.historyStorage + ';;;' + result;
        }
    };

    self.doLog = function (arguments, fn) {
        return Function.prototype.bind.apply(fn, self.log.apply(self.log, arguments));
    };
    /**
     *
     * Formats message for debug,
     * Usage log("{} is {}", 'war', 'bad');
     * @returns:  Array "15:09:31:009: war is bad"
     *  */
    self.log = function () {
        var now = new Date();
        // first argument is format, others are params
        var text;
        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments);
            text = String.prototype.format.apply(args.shift(), args);
        } else {
            text = arguments[0];
        }
        var result = "%c{}:{}:{}.{}%c: {}".format(
            sliceZero(now.getHours()),
            sliceZero(now.getMinutes()),
            sliceZero(now.getSeconds()),
            sliceZero(now.getMilliseconds(), -3),
            text
        );
        saveLogToStorage(result);
        return [window.console, result, self.styles.time, self.styles.msg];
    };
    if (logsEnabled)  {
        self.enableLogs();
    } else {
        self.disableLogs();
    }
    return self;
})(true);


function sliceZero(number, count) {
    return String("00" + number).slice(count || -2);
}

function doPost(url, params, callback, form) {
    var r = new XMLHttpRequest();
    r.withCredentials = true;
    r.onreadystatechange = function () {
        if (r.readyState === 4) {
            if (r.status === 200) {
                logger.http("POST in", "{} ::: {};", url, r.response)();
            } else {
                logger.httpErr("POST out: {} ::: {}, status:", url, r.response, r.status)();
            }
            if (typeof(callback) === "function") {
                callback(r.response);
            } else {
                logger.warn("Skipping {} callback for POST {}", callback, url)();
            }
        }
    };
    /*Firefox doesn't accept null*/
    var data = form == null ? new FormData() : new FormData(form);

    if (params) {
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                data.append(key, params[key]);
            }
        }
    }
    if (url === "") {
        url = window.location.href ; // f*cking IE
    }
    r.open("POST", url, true);
    //r.setRequestHeader("X-CSRFToken", readCookie("csrftoken"));
    if (data.entries) { //es6
        params = '';
        for (var pair of data.entries()) {
            params += pair[0] +'='+ pair[1] +'; ';
        }
    }
    logger.http("POST out", "{} ::: {}", url, params)();
    r.send(data);
}

function doGet(fileUrl, callback) {
    logger.http("GET out", fileUrl)();
    var fileRef = null;
    var xobj = new XMLHttpRequest();
    // special for IE
    if (xobj.overrideMimeType) {
        xobj.overrideMimeType("application/json");
    }
    xobj.open('GET', fileUrl, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4) {
            if (xobj.status === 200) {
                logger.http('GET in', '{} ::: "{}"...', fileUrl, xobj.responseText.substr(0, 100))();
                if (callback) {
                    callback(JSON.parse(xobj.responseText));
                }
            } else {
                logger._http("Unable to load {}, response code is '{}', response: {}", fileUrl, xobj.status, xobj.response)();
                growlError("<span>Unable to load {}, response code is <b>{}</b>, response: {} <span>".format(fileUrl, xobj.status, xobj.response));
            }
        }
    };
    xobj.send(null);
    if (fileRef) {
        document.getElementsByTagName("head")[0].appendChild(fileRef);
        fileRef.onload = callback;
    }
}


function changePassword() {
    doPost('/changePassword', {password: document.getElementById('pass').value})
}

$(document).ready(function() {
    $(".dropdown-toggle").dropdown();
});