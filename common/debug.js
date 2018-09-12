/*
    author     : bak chulhyong
    created    : 2018 - 09 - 12
    modified   : 2018 - 09 - 12
    description: for make log file
*/
var m_os    = require('os'); // createUserKey 관련

Object.defineProperty(global, '__stack', {
    get: function() {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack){ return stack; };

        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);

        var stack = err.stack;
        Error.prepareStackTrace = orig;

        // console.log("STACK:" + stack.toString());
        return stack;
    }
});
/*
 * preprossor
*/
Object.defineProperty(global, '__line', {
    get: function() {
        return __stack[1].getLineNumber();
    }
});
Object.defineProperty(global, '__func', {
    get: function() {
        return __stack[1].getFunctionName();
    }
});
Object.defineProperty(global, '__file', {
    get: function() {
        return __stack[1].getFileName().split('/').slice(-1)[0];
    }
});
Object.defineProperty(global, '__path', {
    get: function() {
        return __stack[1].getFileName().split('/').slice(-1)[0];
    }
});
/*
 * preprossor for log
*/
Object.defineProperty(global, '__dline', {
    get: function() {
        return __stack[2].getLineNumber();
    }
});
Object.defineProperty(global, '__dfunc', {
    get: function() {
        return __stack[2].getFunctionName();
    }
});
Object.defineProperty(global, '__dfile', {
    get: function() {
        if( m_os.type() == 'Windows_NT' )
            return __stack[2].getFileName().split('\\').slice(-1)[0];
        return __stack[2].getFileName().split('/').slice(-1)[0];
    }
});
/*
STACK:get (/home/cscore/project/core/debug.js:24:12),
StartRun.start (/home/cscore/project/core/client/start_run_4.js:24:14),
serverRecvAfter (/home/cscore/project/core/main.js:101:10),
IncomingMessage.<anonymous> (/home/cscore/project/core/main.js:59:4),
emitNone (events.js:86:13),
IncomingMessage.emit (events.js:185:7),
endReadableNT (_stream_readable.js:974:12),
_combinedTickCallback (internal/process/next_tick.js:80:11),
process._tickCallback (internal/process/next_tick.js:104:9)
*/
