import {
  __commonJS
} from "./chunk-ROME4SDB.js";

// node_modules/@alan-ai/alan-sdk-web/dist/alan_lib.js
var require_alan_lib = __commonJS({
  "node_modules/@alan-ai/alan-sdk-web/dist/alan_lib.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define([], factory);
      } else if (typeof exports === "object") {
        module.exports = factory();
      } else {
        root.alanBtn = factory();
      }
    })(exports, function() {
      (function(ns) {
        "use strict";
        function testSocket() {
          return new Promise(function(resolve, reject) {
            var socketUrl = "wss://javascript.info/article/websocket/chat/ws";
            console.log("[WS]: Start testing");
            console.log("[WS]: Connecting to " + socketUrl);
            try {
              var socket = new WebSocket(socketUrl);
              socket.onopen = function(e) {
                var testMsg = "test-msg";
                console.log("[WS]: Connection established");
                console.log("[WS]: Sending data to socket, msg: " + testMsg);
                socket.send(testMsg);
              };
              socket.onmessage = function(event) {
                console.log("[WS]: Data received from server: " + event.data);
                console.log("[WS]: Finish testing - OK");
                resolve();
              };
              socket.onerror = function(error) {
                console.log("[WS]: ", error.message);
                console.log("[WS]: Finish testing - ERROR");
                reject();
              };
            } catch (err) {
              console.log("[WS]: ", err);
              reject();
            }
          });
        }
        function testWorker() {
          return new Promise(function(resolve, reject) {
            console.log("[WebWorker]: Start testing");
            if (typeof Worker !== "undefined") {
              console.log("[WebWorker]: Has Web Worker support");
              try {
                var myWorker = new Worker(window.URL.createObjectURL(new Blob(["onmessage = function(e) {console.log('[WebWorker]: Message received from main script');var workerResult = e.data[0];console.log('[WebWorker]: Posting message back to main script');postMessage(workerResult);}"])));
                myWorker.onmessage = function(e) {
                  console.log("[WebWorker]: Message received from worker: ", e.data);
                  console.log("[WebWorker]: Finish testing - OK");
                  resolve();
                };
                myWorker.onerror = function(err) {
                  console.error("[WebWorker]: Finish testing - ERROR");
                  reject();
                };
                myWorker.postMessage(["test-msg"]);
              } catch (err) {
                console.error("[WebWorker]: Finish testing - ERROR");
                reject();
              }
            } else {
              console.log("[WebWorker]: No Web Worker support");
              reject();
            }
          });
        }
        function testOrignSecure() {
          return new Promise(function(resolve, reject) {
            console.log("[ORIGN]: Start testing");
            var protocol = window.location.protocol;
            var hostname = window.location.hostname;
            if (protocol === "https:" || protocol === "file:" || protocol === "http:" && (hostname.indexOf("localhost") > -1 || hostname.indexOf("127.0.0.1") > -1)) {
              console.log("[ORIGN]: Secure");
              console.log("[ORIGN]: Finish testing - OK");
              resolve();
            } else {
              console.log("[ORIGN]: Not secure");
              console.log("[ORIGN]: Finish testing - ERROR");
              reject();
            }
          });
        }
        function testAudioContext() {
          return new Promise(function(resolve, reject) {
            console.log("[AUDIO CONTEXT]: Start testing");
            var fakeGetUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
            var fakeContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
            if (fakeGetUserMedia && fakeContext) {
              console.log("[AUDIO CONTEXT]: Audio supported");
              console.log("[AUDIO CONTEXT]: Finish testing - OK");
              resolve();
            } else {
              console.log("[AUDIO CONTEXT]: Audio NOT supported");
              console.log("[AUDIO CONTEXT DETAILS]:", getAudioDebugInfo());
              console.log("[AUDIO CONTEXT]: Finish testing - ERROR");
              reject();
            }
          });
        }
        function getAudioDebugInfo() {
          var info = "";
          info += "getUserMedia: ";
          info += navigator.getUserMedia ? "1" : "0";
          info += ", ";
          info += "mediaDevices: ";
          info += navigator.mediaDevices ? "1" : "0";
          info += ", ";
          info += "mediaDevices.getUserMedia: ";
          info += navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? "1" : "0";
          info += ", ";
          info += "webkitGUM: ";
          info += navigator.webkitGetUserMedia ? "1" : "0";
          info += ", ";
          info += "mozGUM: ";
          info += navigator.mozGetUserMedia ? "1" : "0";
          info += ", ";
          info += "msGUM: ";
          info += navigator.msGetUserMedia ? "1" : "0";
          info += "\n";
          info += "window: \n";
          info += "AudioContext: ";
          info += window.AudioContext ? "1" : "0";
          info += ", ";
          info += "webkitAC: ";
          info += window.webkitAudioContext ? "1" : "0";
          info += ", ";
          info += "mozAC: ";
          info += window.mozAudioContext ? "1" : "0";
          info += "\n";
          info += "userAgent: ";
          info += navigator.userAgent;
          return info;
        }
        function testAll() {
          var that = this;
          var allTests = Object.keys(this);
          function getNextTest(nextTestName) {
            return that[nextTestName]();
          }
          allTests = allTests.filter((name) => name !== "run" && name !== "getAudioDebugInfo");
          return allTests.reduce((prevPromise, nextTestName) => {
            return prevPromise.then(() => {
              return getNextTest(nextTestName);
            });
          }, Promise.resolve());
        }
        ns.alanDiagnostic = {
          testSocket,
          testWorker,
          testOrignSecure,
          testAudioContext,
          getAudioDebugInfo,
          run: testAll
        };
      })(window);
      (function(ns) {
        "use strict";
        var host = "studio.alan.app";
        var config = {
          // baseURL: (window.location.protocol === "https:" ? "wss://" : "ws://") +
          baseURL: "wss://" + (host.indexOf("$") === 0 || host === "" ? window.location.hostname : host),
          codec: "opus",
          version: "2.0.45",
          platform: "web"
        };
        function ConnectionWrapper() {
          var _this = this;
          this._worker = new Worker(window.URL.createObjectURL(new Blob(["(function(ns) {\n    'use strict';\n\n    var SENT_TS    = 1;\n    var REMOTE_TS  = 2;\n    var TIMESTAMP  = 3;\n    var AUDIO_DATA = 4;\n    var JSON_DATA  = 5;\n\n    AlanFrame.fields = [\n        propUint64(SENT_TS,   'sentTs'),\n        propUint64(REMOTE_TS, 'remoteTs'),\n        propUint64(TIMESTAMP, 'timestamp'),\n        propBytes(AUDIO_DATA, 'audioData'),\n        propJson(JSON_DATA,   'jsonData'),\n    ];\n\n    function AlanFrameProp(type, name, sizeF, readF, writeF) {\n        this.type   = type;\n        this.name   = name;\n        this.sizeF  = sizeF;\n        this.writeF = writeF;\n        this.readF  = readF;\n    }\n\n    function fixedSize(size) {\n        return function() {\n            return size;\n        }\n    }\n\n    function bufferSize(buffer) {\n        return 4 + byteLength(buffer);\n    }\n\n    function writeUIntN(uint8array, value, nBytes, offset) {\n        for (var i = 0; i < nBytes; i++ ) {\n            uint8array[offset + i] = 0xFF & value;\n            value /= 256;\n        }\n    }\n\n    function readUIntN(uint8array, nBytes, offset) {\n        var r = 0;\n        for (var i = nBytes - 1; i >= 0; i-- ) {\n            r *= 256;\n            r += 0xFF & uint8array[offset + i];\n        }\n        return r;\n    }\n\n    function writeUInt64(uint8array, value, offset) {\n        writeUIntN(uint8array, value, 8, offset);\n    }\n\n    function readUInt64(uint8array, offset) {\n        return readUIntN(uint8array, 8, offset);\n    }\n\n    function writeUInt32(uint8array, value, offset) {\n        writeUIntN(uint8array, value, 4, offset);\n    }\n\n    function readUInt32(uint8array, offset) {\n        return readUIntN(uint8array, 4, offset);\n    }\n\n    function writeBuffer(uint8array, buffer, offset) {\n        buffer = toUint8(buffer);\n        writeUInt32(uint8array, buffer.length, offset);\n        for (var i = 0; i < buffer.length; i++ ) {\n            uint8array[offset + 4 + i] = buffer[i];\n        }\n    }\n\n    function readBuffer(uint8array, offset) {\n        var size = readUInt32(uint8array, offset);\n        if (size > 1024 * 1024) {\n            throw new Error('buffer too big');\n        }\n        return uint8array.subarray(offset + 4, offset + 4 + size);\n    }\n\n    function readUTF8(uint8array, offset) {\n        var size = readUInt32(uint8array, offset);\n        if (size > 1024 * 1024) {\n            throw new Error('string too big');\n        }\n        return String.fromCharCode.apply(null, uint8array.slice(offset + 4, offset + 4 + size));\n    }\n\n    function writeUTF8(uint8array, string, offset) {\n        writeUInt32(uint8array, string.length, offset);\n        for (var i = 0; i < string.length; i++ ) {\n            uint8array[offset + 4 + i] = string.charCodeAt(i);\n        }\n    }\n\n    function sizeUTF8(string) {\n        return 4 + string.length;\n    }\n\n    function propUint32(type, name) {\n        return new AlanFrameProp(type, name, fixedSize(4), readUInt32, writeUInt32);\n    }\n\n    function propUint64(type, name) {\n        return new AlanFrameProp(type, name, fixedSize(8), readUInt64, writeUInt64);\n    }\n\n    function propBytes(type, name) {\n        return new AlanFrameProp(type, name, bufferSize, readBuffer, writeBuffer);\n    }\n\n    function propJson(type, name) {\n        return new AlanFrameProp(type, name, sizeUTF8, readUTF8, writeUTF8);\n    }\n\n    AlanFrame.fieldByType = function(type) {\n        for (var i = 0; i < AlanFrame.fields.length; i++ ) {\n            var frame = AlanFrame.fields[i];\n            if (frame.type === type) {\n                return frame;\n            }\n        }\n        throw new Error('invalid field: ' + type);\n    };\n\n    function AlanFrame() {\n        this.version = 1;\n    }\n\n    AlanFrame.prototype.write = function() {\n        var result = new Uint8Array(this.writeSize());\n        var offset = 1;\n        result[0]  = 1;\n        for (var i = 0; i < AlanFrame.fields.length; i++ ) {\n            var field = AlanFrame.fields[i];\n            var value = this[field.name];\n            if (value) {\n                result[offset++] = field.type;\n                field.writeF(result, value, offset);\n                offset += field.sizeF(value);\n            }\n        }\n        return result.buffer;\n    };\n\n    /**\n     * @returns UInt8Array\n     */\n    AlanFrame.prototype.writeSize = function() {\n        var size = 1;\n        for (var i = 0; i < AlanFrame.fields.length; i++ ) {\n            var field = AlanFrame.fields[i];\n            var value = this[field.name];\n            if (value) {\n                size += 1 + field.sizeF(value);\n            }\n        }\n        return size;\n    };\n\n    AlanFrame.prototype.toString = function() {\n        var first = true, str = '';\n        for (var k in this) {\n            if (this.hasOwnProperty(k)) {\n                if (first) {\n                    str += k + ' = ';\n                    first = false;\n                } else {\n                    str += ', ' + k + ' = ';\n                }\n                var v = this[k];\n                if (typeof(v) === 'object') {\n                    str += 'bytes[' + byteLength(v) + ']';\n                } else {\n                    str += v;\n                }\n            }\n        }\n        return str;\n    };\n\n    function byteLength(b) {\n        if (b instanceof Uint8Array) {\n            return b.length;\n        }\n        if (b instanceof ArrayBuffer) {\n            return b.byteLength;\n        }\n    }\n\n    function toArrayBuffer(buffer) {\n        if (buffer instanceof ArrayBuffer) {\n            return buffer;\n        }\n        return buffer.buffer;\n    }\n\n    function toUint8(buffer) {\n        if (buffer instanceof Uint8Array) {\n            return buffer;\n        }\n        if (buffer instanceof ArrayBuffer) {\n            return new Uint8Array(buffer);\n        }\n        throw new Error('invalid buffer type');\n    }\n\n    function parse(uint8array) {\n        uint8array = toUint8(uint8array);\n        var r = new AlanFrame();\n        var offset = 0;\n        r.version = uint8array[offset++];\n        while (offset < uint8array.length) {\n            var frame = AlanFrame.fieldByType(uint8array[offset++]);\n            r[frame.name] = frame.readF(uint8array, offset);\n            offset += frame.sizeF(r[frame.name]);\n        }\n        return r;\n    }\n\n    ns.create = function() {\n        return new AlanFrame();\n    };\n\n    ns.parse = parse;\n\n})(typeof(window)            !== 'undefined' ? (function() {window.alanFrame = {}; return window.alanFrame; })() :\n   typeof(WorkerGlobalScope) !== 'undefined' ? (function() {alanFrame = {}; return alanFrame; })() :\n   exports);\n\n\n'use strict';\n\n\n\nvar ALAN_OFF       = 'off';\nvar ALAN_SPEAKING  = 'speaking';\nvar ALAN_LISTENING = 'listening';\n\nfunction ConnectionImpl(config, auth, mode) {\n    var _this = this;\n    this._config = config;\n    this._auth = auth;\n    this._mode = mode;\n    this._projectId = config.projectId;\n    this._url = config.url;\n    this._connected = false;\n    this._authorized = false;\n    this._dialogId = null;\n    this._callId = 1;\n    this._callSent = {};\n    this._callWait = [];\n    this._failed = false;\n    this._closed = false;\n    this._reconnectTimeout = 100;\n    this._cleanups = [];\n    this._format = null;\n    this._formatSent = false;\n    this._frameQueue = [];\n    this._remoteSentTs = 0;\n    this._remoteRecvTs = 0;\n    this._rtt = 25;\n    this._rttAlpha = 1./16;\n    this._alanState = ALAN_OFF;\n    this._sendTimer = setInterval(_this._flushQueue.bind(_this), 50);\n    this._visualState = {};\n    this._addCleanup(function() {clearInterval(_this._sendTimer);});\n    this._connect();\n    console.log('Alan: connection created');\n}\n\nConnectionImpl.prototype._addCleanup = function(f) {\n    this._cleanups.push(f);\n};\n\nConnectionImpl.prototype._onConnectStatus = function(s) {\n    console.log('Alan: connection status - ' + s);\n    this._fire('connectStatus', s);\n};\n\nConnectionImpl.prototype._fire = function(event, object) {\n    if (event === 'options') {\n        if (object.versions) {\n            object.versions['alanbase:web'] = this._config.version;\n        }\n    }\n    postMessage(['fireEvent', event, object]);\n};\n\nConnectionImpl.prototype._connect = function() {\n    var _this = this;\n    if (this._socket) {\n        console.error('socket is already connected');\n        return;\n    }\n    console.log('Alan: connecting - ' + getConnectionDetails(this._url));\n    this._socket = new WebSocket(this._url);\n    this._socket.binaryType = 'arraybuffer';\n    console.time('Alan: connection time');\n    this._socket.onopen = function(e) {\n        console.info('Alan: connected');\n        _this._connected = true;\n        _this._reconnectTimeout = 100;\n        _this._fire('connection', {status: 'connected'});\n        console.timeEnd('Alan: connection time');\n        if (_this._auth) {\n            _this._fire('connection', {status: 'authorizing'});\n            _this._callAuth();\n        } else {\n            _this._callWait.forEach(function(c) {  _this._sendCall(c); });\n            _this._callWait = [];\n        }\n    };\n    this._socket.onmessage = function(msg) {\n        if (msg.data instanceof ArrayBuffer) {\n            var f = alanFrame.parse(msg.data);\n            if (f.sentTs > 0) {\n                _this._remoteSentTs = f.sentTs;\n                _this._remoteRecvTs = Date.now();\n            } else {\n                _this._remoteSentTs = null;\n                _this._remoteRecvTs = null;\n            }\n            var rtt = 0;\n            if (f.remoteTs) {\n                rtt = Date.now() - f.remoteTs;\n            }\n            _this._rtt = _this._rttAlpha * rtt  + (1 - _this._rttAlpha) * _this._rtt;\n            var uint8 = new Uint8Array(f.audioData);\n            var frame = [];\n            var batch = 10000;\n            for (var offset = 0; offset < uint8.byteLength; offset += batch) {\n                var b = uint8.subarray(offset, Math.min(uint8.byteLength, offset + batch));\n                let a = String.fromCharCode.apply(null, b);\n                frame.push(a);\n            }\n            frame = frame.join('');\n            postMessage(['alanAudio', 'playFrame', frame]);\n        } else if (typeof(msg.data) === 'string') {\n            msg = JSON.parse(msg.data);\n            if (msg.i) {\n                var c = _this._callSent[msg.i];\n                delete _this._callSent[msg.i];\n                if (c && c.callback) {\n                    c.callback(msg.e, msg.r);\n                }\n            } else if (msg.e) {\n                if (msg.e === 'text') {\n                    postMessage(['alanAudio', 'playText', msg.p]);\n                } else if (msg.e === 'afterText') {\n                    postMessage(['alanAudio', 'playAfterText', msg.p]);\n                } else if (msg.e === 'showPopup') {\n                    postMessage(['alanAudio', 'showPopup', msg.p]);\n                } else if (msg.e === 'command') {\n                    postMessage(['alanAudio', 'playCommand', msg.p]);\n                } else if (msg.e === 'inactivity') {\n                    postMessage(['alanAudio', 'stop']);\n                } else {\n                    _this._fire(msg.e, msg.p);\n                }\n            }\n        } else {\n            console.error('invalid message type');\n        }\n    };\n    this._socket.onerror = function(evt) {\n        console.error('Alan: connection closed due to error: ', evt);\n    };\n    this._socket.onclose = function(evt) {\n        console.info('Alan: connection closed');\n        _this._connected = false;\n        _this._authorized = false;\n        _this._socket = null;\n        _this._onConnectStatus('disconnected');\n        if (!_this._failed && _this._reconnectTimeout && !_this._closed) {\n            console.log('Alan: reconnecting in %s ms.', _this._reconnectTimeout);\n            _this._reConnect = setTimeout(_this._connect.bind(_this), _this._reconnectTimeout);\n            if (_this._reconnectTimeout < 3000) {\n                _this._reconnectTimeout *= 2;\n            } else {\n                _this._reconnectTimeout += 500;\n            }\n            _this._reconnectTimeout = Math.min(7000, _this._reconnectTimeout);\n        }\n    };\n    this._addCleanup(function() {\n        if (this._socket) {\n            this._socket.close();\n            this._socket = null;\n        }\n    });\n};\n\nConnectionImpl.prototype._callAuth = function() {\n    var _this = this;\n    var callback = function(err, r) {\n        if (!err && r.status === 'authorized') {\n            _this._authorized = true;\n            _this._formatSent = false;\n            if (r.dialogId) {\n                postMessage(['setDialogId', r.dialogId]);\n                _this._dialogId = r.dialogId;\n            }\n            _this._onAuthorized();\n            _this._onConnectStatus('authorized');\n        } else if (err === 'auth-failed') {\n            _this._onConnectStatus('auth-failed');\n            if (_this._socket) {\n                _this._socket.close();\n                _this._socket = null;\n                _this._failed = true;\n            }\n        } else {\n            _this._onConnectStatus('invalid-auth-response');\n            console.log('Alan: invalid auth response', err, r);\n        }\n    };\n    var authParam = this._auth;\n    authParam.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;\n    if (this._dialogId) {\n        authParam.dialogId = this._dialogId;\n    }\n    authParam.mode = this._mode;\n    this._sendCall({cid: this._callId++, method: '_auth_', callback: callback, param: authParam});\n    return this;\n};\n\nConnectionImpl.prototype._sendCall = function(call) {\n    this._sendFormatIfNeeded(false);\n    this._socket.send(JSON.stringify({i: call.cid, m: call.method, p: call.param}));\n    if (call.callback) {\n        this._callSent[call.cid] = call;\n    }\n};\n\nConnectionImpl.prototype._onAuthorized = function() {\n    var _this = this;\n    this._callWait.forEach(function(c) {\n        _this._sendCall(c);\n    });\n    this._callWait = [];\n};\n\nConnectionImpl.prototype.close = function() {\n    for (var i = 0; i < this._cleanups.length; i++ ) {\n        this._cleanups[i]();\n    }\n    this._cleanups = [];\n    this._closed = true;\n    \n    if (this._socket && (this._socket.readyState === WebSocket.OPEN || this._socket.readyState === WebSocket.CONNECTING)) {\n        this._socket.close();\n        this._socket = null;\n    }\n    console.log('Alan: closed connection to: ' + getConnectionDetails(this._url));\n    //close(); TODO: delete it!\n};\n\nConnectionImpl.prototype.call = function(cid, method, param) {\n    var call = {cid: cid, method: method, param: param, callback: function(err, obj) {\n        if (cid) {\n            postMessage(['callback', cid, err, obj]);\n        }\n    }};\n    if (this._authorized || this._connected && !this._auth) {\n        this._sendCall(call);\n    } else {\n        this._callWait.push(call);\n    }\n};\n\nConnectionImpl.prototype.setVisual = function(state) {\n    this._visualState = state;\n    this.call(null, '_visual_', state);\n};\n\nConnectionImpl.prototype._sendFrame = function(frame) {\n    if (!this._socket) {\n        console.error('sendFrame to closed socket');\n        return;\n    }\n    frame.sentTs = Date.now();\n    if (this._remoteSentTs > 0 && this._remoteRecvTs > 0) {\n        frame.remoteTs = this._remoteSentTs + Date.now() - this._remoteRecvTs;\n    }\n    this._socket.send(frame.write());\n};\n\nConnectionImpl.prototype._listen = function() {\n    var f = alanFrame.create();\n    f.jsonData = JSON.stringify({signal: 'listen'});\n    this._frameQueue.push(f);\n    this._alanState = ALAN_LISTENING;\n};\n\nConnectionImpl.prototype._stopListen = function() {\n    var f = alanFrame.create();\n    f.jsonData = JSON.stringify({signal: 'stopListen'});\n    this._frameQueue.push(f);\n    this._alanState = ALAN_OFF;\n};\n\nConnectionImpl.prototype._onAudioFormat = function(format) {\n    this._formatSent = false;\n    this._format = format;\n};\n\nConnectionImpl.prototype._onMicFrame = function(sampleRate, frame) {\n    if (this._alanState === ALAN_SPEAKING) {\n        return;\n    }\n    if (this._alanState === ALAN_OFF) {\n        this._listen();\n    }\n    if (this._alanState !== ALAN_LISTENING) {\n        console.error('invalid alan state: ' + this._alanState);\n        return;\n    }\n    this._sendFormatIfNeeded(true);\n    var f = alanFrame.create();\n    f.audioData = frame;\n    this._frameQueue.push(f);\n};\n\nConnectionImpl.prototype._sendFormatIfNeeded = function(inQueue) {\n    if (!this._format || this._formatSent) {\n        return;\n    }\n    this._formatSent = true;\n    var f = alanFrame.create();\n    f.jsonData = JSON.stringify({format: this._format});\n    if (inQueue) {\n        this._frameQueue.push(f);\n    } else {\n        this._sendFrame(f);\n    }\n};\n\nConnectionImpl.prototype._flushQueue = function() {\n    if (!this._socket || !this._connected) {\n        var d = 0;\n        while (this._frameQueue.length > 100 && !this._frameQueue[0].jsonData) {\n            this._frameQueue.shift();\n            d++;\n        }\n        if (d > 0) {\n            console.error('dropped: %s, frames', d);\n        }\n        return;\n    }\n    while (this._frameQueue.length > 0 && this._socket && this._socket.bufferedAmount < 64 * 1024) {\n        this._sendFrame(this._frameQueue.shift());\n    }\n};\n\nfunction getConnectionDetails(url){\n    var urlParts = url.split('/');\n    var projectId = urlParts[4];\n    var environment = urlParts[5];\n    var host = urlParts[2];\n\n    if (projectId && environment && host) {\n        return ' (ProjectID: ' + projectId + ', environment: ' + environment + ', host: ' + host + ')';\n    }\n\n    return url;\n}\n\nfunction connectProject(config, auth, mode) {\n    var c = new ConnectionImpl(config, auth, mode);\n    c.onAudioEvent = function(event, arg1, arg2) {\n        if (event === 'format') {\n            c._onAudioFormat(arg1);\n        } else if (event === 'frame') {\n            c._onMicFrame(arg1, arg2);\n        } else if (event === 'micStop' || event === 'playStart') {\n            c._stopListen();\n        } else {\n            console.error('unknown audio event: ' + event, arg1, arg2);\n        }\n    };\n    return c;\n}\n\nvar factories = {\n    connectProject: connectProject,\n};\n\nvar currentConnect = null;\n\nonmessage = function(e) {\n    var name = e.data[0];\n    try {\n        if (!currentConnect) {\n            currentConnect = factories[name].apply(null, e.data.slice(1, e.data.length));\n        } else {\n            currentConnect[name].apply(currentConnect, e.data.slice(1, e.data.length));\n        }\n    } catch(e) {\n        console.error('error calling: ' + name, e);\n    }\n};\n"], { type: "text/javascript" })));
          this._worker.onmessage = function(e) {
            if (e.data[0] === "fireEvent") {
              _this._fire(e.data[1], e.data[2]);
              return;
            }
            if (e.data[0] === "alanAudio") {
              if (e.data[1] === "playText") {
                alanAudio.playText(e.data[2]);
                return;
              }
              if (e.data[1] === "playAfterText") {
                alanAudio.playAfterText(e.data[2]);
                return;
              }
              if (e.data[1] === "playAudio" || e.data[1] === "playFrame") {
                alanAudio.playAudio(e.data[2]);
                return;
              }
              if (e.data[1] === "playEvent" || e.data[1] === "playCommand") {
                alanAudio.playEvent(e.data[2]);
                return;
              }
              if (e.data[1] === "showPopup") {
                alanAudio.showPopup(e.data[2]);
                return;
              }
              if (e.data[1] === "stop") {
                alanAudio.stop();
                return;
              }
            }
            if (e.data[0] === "callback") {
              _this._callback[e.data[1]](e.data[2], e.data[3]);
              delete _this._callback[e.data[1]];
              return;
            }
            if (e.data[0] === "setDialogId") {
              _this._dialogId = e.data[1];
              return;
            }
            console.error("invalid event", e.data);
          };
          this._worker.onerror = function(e) {
            console.error("error in worker: " + e.filename + ":" + e.lineno + " - " + e.message);
          };
          this._handlers = {};
          this._cleanups = [];
          this._callback = {};
          this._callIds = 1;
          this._config = {};
        }
        ConnectionWrapper.prototype.on = function(event, handler) {
          var h = this._handlers[event];
          if (!h) {
            h = [];
            this._handlers[event] = h;
          }
          h.push(handler);
        };
        ConnectionWrapper.prototype.off = function(event, handler) {
          var h = this._handlers[event];
          if (h) {
            var index = h.indexOf(handler);
            if (index >= 0) {
              h.splice(index, 1);
            }
          }
        };
        ConnectionWrapper.prototype.getSettings = function() {
          return {
            server: config.baseURL,
            projectId: this._config.projectId,
            dialogId: this._dialogId
          };
        };
        ConnectionWrapper.prototype.setVisual = function(state) {
          this._worker.postMessage(["setVisual", state]);
        };
        ConnectionWrapper.prototype.call = function(method, param, callback) {
          var cid = null;
          if (callback) {
            cid = this._callIds++;
            this._callback[cid] = callback;
          }
          this._worker.postMessage(["call", cid, method, param]);
        };
        ConnectionWrapper.prototype.close = function() {
          console.log("closing connection to: " + this._url);
          this._cleanups.forEach(function(h) {
            h();
          });
          this._worker.postMessage(["close"]);
          this._worker.terminate();
        };
        ConnectionWrapper.prototype._fire = function(event, object) {
          var h = this._handlers[event];
          if (h) {
            for (var i = 0; i < h.length; i++) {
              h[i](object);
            }
          }
        };
        ConnectionWrapper.prototype._addCleanup = function(f) {
          this._cleanups.push(f);
        };
        function fillAuth(values, ext) {
          var auth = {};
          for (var k in ext) {
            auth[k] = ext[k];
          }
          for (var k in values) {
            auth[k] = values[k];
          }
          if (!ext || ext && ext.platform == null) {
            auth.platform = config.platform;
          } else {
            auth.platform = config.platform + ":" + ext.platform;
          }
          if (!ext || ext && ext.platformVersion == null) {
            auth.platformVersion = config.version;
          } else {
            auth.platformVersion = config.version + ":" + ext.platformVersion;
          }
          if (ext && ext.appName) {
            auth.appName = ext.appName;
          }
          return auth;
        }
        function isProjectIdValid(projectId) {
          return projectId.match(/^[A-Z0-9]{64}\/(prod|stage|testing)$/gi);
        }
        function connectProject(projectId, auth, host2, mode, ext) {
          var connect = new ConnectionWrapper();
          if (host2) {
            config.baseURL = "wss://" + host2;
          }
          connect._config.projectId = projectId;
          connect._config.codec = config.codec;
          connect._config.version = config.version;
          connect._config.url = config.baseURL + "/ws_project/" + projectId;
          if (!isProjectIdValid(projectId)) {
            throw new Error("Wrong projectId was provided: ", projectId);
          }
          connect._worker.postMessage(["connectProject", connect._config, fillAuth(auth, ext), mode]);
          function signupEvent(name, handler) {
            alanAudio.on(name, handler);
            connect._addCleanup(function() {
              alanAudio.off(name, handler);
            });
          }
          function passEventToWorker(name) {
            function handler(a1, a2) {
              if (name === "frame" && alanAudio.isPlaying()) {
                return;
              }
              connect._worker.postMessage(["onAudioEvent", name, a1, a2]);
            }
            signupEvent(name, handler);
          }
          function passEventToClient(name) {
            function handler(e1) {
              connect._fire(name, e1);
            }
            signupEvent(name, handler);
          }
          passEventToWorker("frame");
          passEventToWorker("micStop");
          passEventToWorker("playStart");
          passEventToClient("text");
          passEventToClient("command");
          connect._worker.postMessage(["onAudioEvent", "format", alanAudio.getFormat()]);
          return connect;
        }
        function connectProjectTest(projectId, auth, host2, mode, ext) {
          var connect = new ConnectionWrapper();
          if (host2) {
            config.baseURL = "wss://" + host2;
          }
          connect._config.projectId = projectId;
          connect._config.codec = config.codec;
          connect._config.version = config.version;
          connect._config.url = config.baseURL + "/ws_project/" + projectId;
          if (!isProjectIdValid(projectId)) {
            throw new Error("Wrong projectId was provided");
          }
          connect._worker.postMessage(["connectProject", connect._config, fillAuth(auth, ext), mode]);
          function signupEvent(name, handler) {
            alanAudio.on(name, handler);
            connect._addCleanup(function() {
              alanAudio.off(name, handler);
            });
          }
          function passEventToWorker(name) {
            function handler(a1, a2) {
              if (name === "frame" && alanAudio.isPlaying()) {
                return;
              }
              connect._worker.postMessage(["onAudioEvent", name, a1, a2]);
            }
            signupEvent(name, handler);
          }
          function passEventToClient(name) {
            function handler(e1) {
              connect._fire(name, e1);
            }
            signupEvent(name, handler);
          }
          passEventToWorker("frame");
          passEventToWorker("micStop");
          passEventToWorker("playStart");
          passEventToClient("text");
          passEventToClient("command");
          return connect;
        }
        function connectTutor(auth, host2) {
          var connect = new ConnectionWrapper();
          if (host2) {
            config.baseURL = "wss://" + host2;
          }
          connect._config.version = config.version;
          connect._config.url = config.baseURL + "/ws_tutor";
          connect._worker.postMessage(["connectProject", connect._config, auth]);
          return connect;
        }
        ns.alanSDKVersion = config.version;
        ns.alan = {
          sdkVersion: config.version,
          diagnostic: ns.alanDiagnostic,
          projectTest: connectProjectTest,
          project: connectProject,
          tutor: connectTutor
        };
      })(window);
      (function(ns) {
        "use strict";
        var PLAY_IDLE = "playIdle";
        var PLAY_ACTIVE = "playActive";
        var PLAY_STOPPED = "playStopped";
        var playWhenInactive = false;
        var MIC_IDLE = "micIdle";
        var MIC_ACTIVE = "micActive";
        var MIC_STOPPED = "micStopped";
        var PROCESSING_IDLE = "processingIdle";
        var PROCESSING_ACTIVE = "processingActive";
        var AUDIO_RUNNING = "audioRunning";
        var config = {
          bufferLength: 4096,
          sampleRate: 16e3,
          encoderApplication: 2048,
          encodePCM: false,
          micTimeout: 4e3
        };
        const opusEncoderWorkerUrl = getWorkerURL(opusEncoderWorkerUrlPath);
        function getWorkerURL(url) {
          const content = `importScripts( "${url}" );`;
          return URL.createObjectURL(new Blob([content], { type: "text/javascript" }));
        }
        var encoder = new Worker(opusEncoderWorkerUrl);
        URL.revokeObjectURL(opusEncoderWorkerUrl);
        var handlers = {};
        var micState = MIC_STOPPED;
        var playState = PLAY_STOPPED;
        var processingState = PROCESSING_IDLE;
        var audioQueue = [];
        var audioElement = null;
        var audioContext = null;
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        var stopMicTimer = null;
        var skipFrame = false;
        var isIE = !!document.documentMode;
        var isEdge = !isIE && !!window.StyleMedia;
        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        var isMobileIos = navigator.userAgent.match(/safari/i) && navigator.vendor.match(/apple/i) && navigator.maxTouchPoints;
        if (isEdge || isChrome) {
          audioContext = new AudioContext({ sampleRate: config.sampleRate });
        } else {
          audioContext = new AudioContext();
        }
        audioContext.resume().then(() => fireEvent(AUDIO_RUNNING));
        var microphoneStream = null;
        var microphoneNode = null;
        var gainNode = audioContext.createGain();
        var audioGainNode = audioContext.createGain();
        audioGainNode.gain.value = 1;
        var audioBufferSource = null;
        var encoderNode = audioContext.createScriptProcessor(config.bufferLength, 1, 1);
        encoderNode.onaudioprocess = ({ inputBuffer }) => encodeBuffers(inputBuffer);
        encoderNode.connect(audioContext.destination);
        if (encoder.start) {
          encoder.start();
        }
        var encoderCallback = ({ data }) => {
          switch (data["message"]) {
            case "ready":
              console.log("Alan: audio worker initialized");
              break;
            case "page":
              if (playState !== PLAY_ACTIVE && processingState !== PROCESSING_ACTIVE) {
                fireEvent("frame", config.sampleRate, data["page"]);
              }
              break;
            case "done":
              encoder.removeEventListener("message", encoderCallback);
              break;
            case "print":
              console.log("AUDIO-WORKER", data.text);
              break;
          }
        };
        encoder.addEventListener("message", encoderCallback);
        encoder.postMessage({
          command: "init",
          originalSampleRate: audioContext.sampleRate,
          encoderSampleRate: config.sampleRate,
          encoderApplication: config.encoderApplication,
          encodePCM: config.encodePCM
        });
        function openMicrophone() {
          if (microphoneNode) {
            return Promise.resolve(microphoneNode);
          }
          return navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            fireEvent("micAllowed");
            microphoneStream = stream;
            microphoneNode = audioContext.createMediaStreamSource(stream);
            microphoneNode.connect(gainNode);
            gainNode.connect(encoderNode);
          });
        }
        function encodeBuffers(inputBuffer) {
          if (micState !== MIC_ACTIVE || playState === PLAY_ACTIVE || skipFrame) {
            return;
          }
          var buffers = [inputBuffer.getChannelData(0)];
          encoder.postMessage({
            command: "encode",
            buffers
          });
        }
        function onPlayEnded() {
          playState = PLAY_IDLE;
          _handleQueue(true);
        }
        function getAudioElement() {
          if (audioElement) {
            return audioElement;
          }
          audioElement = document.createElement("audio");
          audioElement.addEventListener("ended", function() {
            onPlayEnded();
          });
          document.body.appendChild(audioElement);
          audioElement.setAttribute("autoplay", "true");
          return audioElement;
        }
        function _base64ToArrayBuffer(base64) {
          var binary_string = window.atob(base64);
          var len = binary_string.length;
          var bytes = new Uint8Array(len);
          for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
          }
          return bytes.buffer;
        }
        function playAudio(audio) {
          processingState = PROCESSING_IDLE;
          if (isMobileIos) {
            const base64prefix = "data:audio/mpeg;base64,";
            if (audio.startsWith(base64prefix)) {
              audio = audio.substring(base64prefix.length);
            }
            var audioData = _base64ToArrayBuffer(audio);
            audioContext.decodeAudioData(
              audioData,
              (buffer) => {
                audioBufferSource = audioContext.createBufferSource();
                audioBufferSource.addEventListener("ended", (e) => onPlayEnded());
                audioBufferSource.connect(gainNode);
                audioBufferSource.connect(audioGainNode);
                audioGainNode.connect(audioContext.destination);
                audioBufferSource.loop = false;
                audioBufferSource.buffer = buffer;
                audioBufferSource.start(0);
              },
              (err) => console.error(`Error with decoding audio data: ${err.err}`)
            );
          } else {
            getAudioElement().muted = false;
            getAudioElement().setAttribute("src", audio);
          }
        }
        function stopPlaying() {
          if (isMobileIos) {
            if (audioBufferSource) {
              audioBufferSource.stop();
            }
          } else {
            if (audioElement) {
              audioElement.pause();
              audioElement.currentTime = 0;
              audioElement.src = "";
            }
          }
        }
        function onStopPlaying() {
          if (!isMobileIos) {
            getAudioElement().setAttribute("src", "");
          }
          onPlayStop();
        }
        function _handleQueue(nowPlaying) {
          if (audioContext.state === "suspended") {
            return;
          }
          if (nowPlaying && !audioQueue.length) {
            onStopPlaying();
          }
          if (!audioQueue.length || playState === PLAY_ACTIVE) {
            return;
          }
          while (audioQueue.length && playState !== PLAY_ACTIVE) {
            var o = audioQueue.shift();
            if (o.event) {
              fireEvent("command", o.event);
            } else if (o.text) {
              fireEvent("text", o.text);
            } else if (o.afterText) {
              fireEvent("afterText", o.afterText);
            } else if (o.popup) {
              fireEvent("popup", o.popup);
            } else if (o.audio) {
              if (playWhenInactive || micState !== MIC_STOPPED) {
                playState = PLAY_ACTIVE;
                fireEvent("playStart");
                playAudio(o.audio);
              }
            } else {
              console.error("invalid queue item");
            }
          }
          if (nowPlaying && playState !== PLAY_ACTIVE) {
            onPlayStop();
          }
        }
        function onPlayStop() {
          fireEvent("playStop");
        }
        function fireEvent(event, o1, o2) {
          var h = handlers[event];
          if (h) {
            for (var i = 0; i < h.length; i++) {
              h[i](o1, o2);
            }
          }
        }
        ns.getFormat = function() {
          if (config.encodePCM) {
            return {
              send: { codec: "pcm_f32le", sampleRate: 16e3 },
              recv: { codec: "mp3;base64", sampleRate: 16e3 }
            };
          } else {
            return {
              send: { codec: "opus", sampleRate: 16e3 },
              recv: { codec: "mp3;base64", sampleRate: 16e3 }
            };
          }
        };
        ns.isAudioRunning = function() {
          return audioContext && audioContext.state === "running";
        };
        ns.isPlaying = function() {
          return playState === PLAY_ACTIVE;
        };
        ns.enableVoice = function() {
          playWhenInactive = true;
          getAudioElement().muted = false;
        };
        ns.disableVoice = function() {
          playWhenInactive = false;
          getAudioElement().muted = true;
        };
        ns.setProcessingState = function() {
          processingState = PROCESSING_ACTIVE;
        };
        ns.playText = function(text) {
          if (text && text.ctx && text.ctx.opts && text.ctx.opts.force === true) {
            fireEvent("text", text);
          } else {
            audioContext.resume().then(() => {
              audioQueue.push({ text });
              _handleQueue();
            });
          }
        };
        ns.playAfterText = function(afterText) {
          audioContext.resume().then(() => {
            audioQueue.push({ afterText });
            _handleQueue();
          });
        };
        ns.playCommand = function(command) {
          audioContext.resume().then(() => {
            audioQueue.push({ event: command });
            _handleQueue();
          });
        };
        ns.showPopup = function(popup) {
          if (popup.popup.force) {
            fireEvent("popup", popup);
          } else {
            audioContext.resume().then(() => {
              audioQueue.push({ popup });
              _handleQueue();
            });
          }
        };
        ns.playEvent = function(event) {
          ns.playCommand(event);
        };
        ns.playAudio = function(audio) {
          audioContext.resume().then(() => {
            audioQueue.push({ audio });
            _handleQueue();
          });
        };
        ns.on = function(event, handler) {
          var h = handlers[event];
          if (h == null) {
            handlers[event] = [handler];
          } else {
            h.push(handler);
          }
        };
        ns.off = function(event, handler) {
          var h = handlers[event];
          if (h) {
            var index = h.indexOf(handler);
            if (index >= 0) {
              h.splice(index, 1);
            }
          }
        };
        ns.resumeAudioCtx = function() {
          audioContext.resume();
        };
        var micAllowed = false;
        function setMicAllowed(value) {
          micAllowed = value;
        }
        ns.isMicAllowed = function() {
          return micAllowed;
        };
        ns.start = function(onStarted) {
          if (stopMicTimer) {
            clearTimeout(stopMicTimer);
            stopMicTimer = null;
          }
          processingState = PROCESSING_IDLE;
          getAudioElement().setAttribute("src", "");
          playState = PLAY_IDLE;
          openMicrophone().then(() => {
            micState = MIC_ACTIVE;
            fireEvent("micStart");
          }).then(() => {
            setMicAllowed(true);
            if (!isMobileIos) {
              audioContext.resume();
            }
          }).catch((err) => {
            fireEvent("micFail", err);
          });
          if (onStarted) {
            onStarted();
            onStarted = null;
          }
        };
        ns.stop = function() {
          if (microphoneNode) {
            micState = MIC_IDLE;
          }
          if (stopMicTimer) {
            clearTimeout(stopMicTimer);
            stopMicTimer = null;
          }
          stopMicTimer = setTimeout(stopMicrophone, config.micTimeout);
          fireEvent("micStop");
          playState = PLAY_STOPPED;
          audioQueue = [];
          stopPlaying();
        };
        ns.skipExternalSounds = function(skip) {
          skipFrame = skip;
        };
        function stopMicrophone() {
          console.log("stopping the mic.");
          micState = MIC_STOPPED;
          if (microphoneNode) {
            microphoneNode.disconnect();
            microphoneNode = null;
          }
          gainNode.disconnect();
          if (microphoneStream) {
            if (microphoneStream.getTracks) {
              microphoneStream.getTracks().forEach((track) => track.stop());
            } else {
              microphoneStream.stop();
            }
            microphoneStream = null;
          }
        }
      })(typeof window !== "undefined" ? function() {
        window.alanAudio = {};
        return window.alanAudio;
      }() : exports);
      var __assign = this && this.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = this && this.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      var __spreadArray = this && this.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      (function() {
        var __defProp = Object.defineProperty;
        var __defNormalProp = function(obj, key, value) {
          return key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
        };
        var __publicField = function(obj, key, value) {
          __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
          return value;
        };
        function getMsgLoader() {
          return '<div class="alan-btn__chat-incomming-msg-wrapper"> <div class="alan-btn__chat-incomming-msg msg-1">&nbsp;</div> <div class="alan-btn__chat-incomming-msg msg-2">&nbsp;</div> <div class="alan-btn__chat-incomming-msg msg-3">&nbsp;</div>  </div>';
        }
        function isFinalMessage(msg) {
          var _a;
          return ((_a = msg.ctx) === null || _a === void 0 ? void 0 : _a.final) !== false;
        }
        function buildMsgIncommingLoader(msg) {
          if (msg.initLoad)
            return "";
          return !isFinalMessage(msg) ? '<div style="margin-top: 12px;margin-bottom: 12px;">'.concat(getMsgLoader(), "</div>") : "";
        }
        function getDefaults() {
          return {
            async: false,
            baseUrl: null,
            breaks: false,
            extensions: null,
            gfm: true,
            headerIds: true,
            headerPrefix: "",
            highlight: null,
            hooks: null,
            langPrefix: "language-",
            mangle: true,
            pedantic: false,
            renderer: null,
            sanitize: false,
            sanitizer: null,
            silent: false,
            smartypants: false,
            tokenizer: null,
            walkTokens: null,
            xhtml: false
          };
        }
        var defaults = getDefaults();
        function changeDefaults(newDefaults) {
          defaults = newDefaults;
        }
        var escapeTest = /[&<>"']/;
        var escapeReplace = new RegExp(escapeTest.source, "g");
        var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
        var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
        var escapeReplacements = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };
        var getEscapeReplacement = function(ch) {
          return escapeReplacements[ch];
        };
        function escape(html, encode) {
          if (encode) {
            if (escapeTest.test(html)) {
              return html.replace(escapeReplace, getEscapeReplacement);
            }
          } else {
            if (escapeTestNoEncode.test(html)) {
              return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
            }
          }
          return html;
        }
        var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
        function unescape(html) {
          return html.replace(unescapeTest, function(_, n) {
            n = n.toLowerCase();
            if (n === "colon")
              return ":";
            if (n.charAt(0) === "#") {
              return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
            }
            return "";
          });
        }
        var caret = /(^|[^\[])\^/g;
        function edit(regex, opt) {
          regex = typeof regex === "string" ? regex : regex.source;
          opt = opt || "";
          var obj = {
            replace: function(name, val) {
              val = val.source || val;
              val = val.replace(caret, "$1");
              regex = regex.replace(name, val);
              return obj;
            },
            getRegex: function() {
              return new RegExp(regex, opt);
            }
          };
          return obj;
        }
        var nonWordAndColonTest = /[^\w:]/g;
        var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
        function cleanUrl(sanitize, base, href) {
          if (sanitize) {
            var prot = void 0;
            try {
              prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, "").toLowerCase();
            } catch (e) {
              return null;
            }
            if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
              return null;
            }
          }
          if (base && !originIndependentUrl.test(href)) {
            href = resolveUrl(base, href);
          }
          try {
            href = encodeURI(href).replace(/%25/g, "%");
          } catch (e) {
            return null;
          }
          return href;
        }
        var baseUrls = {};
        var justDomain = /^[^:]+:\/*[^/]*$/;
        var protocol = /^([^:]+:)[\s\S]*$/;
        var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
        function resolveUrl(base, href) {
          if (!baseUrls[" " + base]) {
            if (justDomain.test(base)) {
              baseUrls[" " + base] = base + "/";
            } else {
              baseUrls[" " + base] = rtrim(base, "/", true);
            }
          }
          base = baseUrls[" " + base];
          var relativeBase = base.indexOf(":") === -1;
          if (href.substring(0, 2) === "//") {
            if (relativeBase) {
              return href;
            }
            return base.replace(protocol, "$1") + href;
          } else if (href.charAt(0) === "/") {
            if (relativeBase) {
              return href;
            }
            return base.replace(domain, "$1") + href;
          } else {
            return base + href;
          }
        }
        var noopTest = { exec: function noopTest2() {
        } };
        function splitCells(tableRow, count) {
          var row = tableRow.replace(/\|/g, function(match, offset, str) {
            var escaped = false, curr = offset;
            while (--curr >= 0 && str[curr] === "\\")
              escaped = !escaped;
            if (escaped) {
              return "|";
            } else {
              return " |";
            }
          }), cells = row.split(/ \|/);
          var i = 0;
          if (!cells[0].trim()) {
            cells.shift();
          }
          if (cells.length > 0 && !cells[cells.length - 1].trim()) {
            cells.pop();
          }
          if (cells.length > count) {
            cells.splice(count);
          } else {
            while (cells.length < count)
              cells.push("");
          }
          for (; i < cells.length; i++) {
            cells[i] = cells[i].trim().replace(/\\\|/g, "|");
          }
          return cells;
        }
        function rtrim(str, c, invert) {
          var l = str.length;
          if (l === 0) {
            return "";
          }
          var suffLen = 0;
          while (suffLen < l) {
            var currChar = str.charAt(l - suffLen - 1);
            if (currChar === c && !invert) {
              suffLen++;
            } else if (currChar !== c && invert) {
              suffLen++;
            } else {
              break;
            }
          }
          return str.slice(0, l - suffLen);
        }
        function findClosingBracket(str, b) {
          if (str.indexOf(b[1]) === -1) {
            return -1;
          }
          var l = str.length;
          var level = 0, i = 0;
          for (; i < l; i++) {
            if (str[i] === "\\") {
              i++;
            } else if (str[i] === b[0]) {
              level++;
            } else if (str[i] === b[1]) {
              level--;
              if (level < 0) {
                return i;
              }
            }
          }
          return -1;
        }
        function checkDeprecations(opt, callback) {
          if (!opt || opt.silent) {
            return;
          }
          if (callback) {
            console.warn("marked(): callback is deprecated since version 5.0.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/using_pro#async");
          }
          if (opt.sanitize || opt.sanitizer) {
            console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
          }
          if (opt.highlight || opt.langPrefix !== "language-") {
            console.warn("marked(): highlight and langPrefix parameters are deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-highlight.");
          }
          if (opt.mangle) {
            console.warn("marked(): mangle parameter is enabled by default, but is deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install https://www.npmjs.com/package/marked-mangle, or disable by setting `{mangle: false}`.");
          }
          if (opt.baseUrl) {
            console.warn("marked(): baseUrl parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-base-url.");
          }
          if (opt.smartypants) {
            console.warn("marked(): smartypants parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-smartypants.");
          }
          if (opt.xhtml) {
            console.warn("marked(): xhtml parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-xhtml.");
          }
          if (opt.headerIds || opt.headerPrefix) {
            console.warn("marked(): headerIds and headerPrefix parameters enabled by default, but are deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install  https://www.npmjs.com/package/marked-gfm-heading-id, or disable by setting `{headerIds: false}`.");
          }
        }
        function outputLink(cap, link, raw, lexer2) {
          var href = link.href;
          var title = link.title ? escape(link.title) : null;
          var text = cap[1].replace(/\\([\[\]])/g, "$1");
          if (cap[0].charAt(0) !== "!") {
            lexer2.state.inLink = true;
            var token = {
              type: "link",
              raw,
              href,
              title,
              text,
              tokens: lexer2.inlineTokens(text)
            };
            lexer2.state.inLink = false;
            return token;
          }
          return {
            type: "image",
            raw,
            href,
            title,
            text: escape(text)
          };
        }
        function indentCodeCompensation(raw, text) {
          var matchIndentToCode = raw.match(/^(\s+)(?:```)/);
          if (matchIndentToCode === null) {
            return text;
          }
          var indentToCode = matchIndentToCode[1];
          return text.split("\n").map(function(node) {
            var matchIndentInNode = node.match(/^\s+/);
            if (matchIndentInNode === null) {
              return node;
            }
            var indentInNode = matchIndentInNode[0];
            if (indentInNode.length >= indentToCode.length) {
              return node.slice(indentToCode.length);
            }
            return node;
          }).join("\n");
        }
        var Tokenizer = (
          /** @class */
          function() {
            function Tokenizer2(options2) {
              this.options = options2 || defaults;
            }
            Tokenizer2.prototype.space = function(src) {
              var cap = this.rules.block.newline.exec(src);
              if (cap && cap[0].length > 0) {
                return {
                  type: "space",
                  raw: cap[0]
                };
              }
            };
            Tokenizer2.prototype.code = function(src) {
              var cap = this.rules.block.code.exec(src);
              if (cap) {
                var text = cap[0].replace(/^ {1,4}/gm, "");
                return {
                  type: "code",
                  raw: cap[0],
                  codeBlockStyle: "indented",
                  text: !this.options.pedantic ? rtrim(text, "\n") : text
                };
              }
            };
            Tokenizer2.prototype.fences = function(src) {
              var cap = this.rules.block.fences.exec(src);
              if (cap) {
                var raw = cap[0];
                var text = indentCodeCompensation(raw, cap[3] || "");
                return {
                  type: "code",
                  raw,
                  lang: cap[2] ? cap[2].trim().replace(this.rules.inline._escapes, "$1") : cap[2],
                  text
                };
              }
            };
            Tokenizer2.prototype.heading = function(src) {
              var cap = this.rules.block.heading.exec(src);
              if (cap) {
                var text = cap[2].trim();
                if (/#$/.test(text)) {
                  var trimmed = rtrim(text, "#");
                  if (this.options.pedantic) {
                    text = trimmed.trim();
                  } else if (!trimmed || / $/.test(trimmed)) {
                    text = trimmed.trim();
                  }
                }
                return {
                  type: "heading",
                  raw: cap[0],
                  depth: cap[1].length,
                  text,
                  tokens: this.lexer.inline(text)
                };
              }
            };
            Tokenizer2.prototype.hr = function(src) {
              var cap = this.rules.block.hr.exec(src);
              if (cap) {
                return {
                  type: "hr",
                  raw: cap[0]
                };
              }
            };
            Tokenizer2.prototype.blockquote = function(src) {
              var cap = this.rules.block.blockquote.exec(src);
              if (cap) {
                var text = cap[0].replace(/^ *>[ \t]?/gm, "");
                var top_1 = this.lexer.state.top;
                this.lexer.state.top = true;
                var tokens = this.lexer.blockTokens(text);
                this.lexer.state.top = top_1;
                return {
                  type: "blockquote",
                  raw: cap[0],
                  tokens,
                  text
                };
              }
            };
            Tokenizer2.prototype.list = function(src) {
              var cap = this.rules.block.list.exec(src);
              if (cap) {
                var raw = void 0, istask = void 0, ischecked = void 0, indent = void 0, i = void 0, blankLine = void 0, endsWithBlankLine = void 0, line = void 0, nextLine = void 0, rawLine = void 0, itemContents = void 0, endEarly = void 0;
                var bull = cap[1].trim();
                var isordered = bull.length > 1;
                var list = {
                  type: "list",
                  raw: "",
                  ordered: isordered,
                  start: isordered ? +bull.slice(0, -1) : "",
                  loose: false,
                  items: []
                };
                bull = isordered ? "\\d{1,9}\\".concat(bull.slice(-1)) : "\\".concat(bull);
                if (this.options.pedantic) {
                  bull = isordered ? bull : "[*+-]";
                }
                var itemRegex = new RegExp("^( {0,3}".concat(bull, ")((?:[	 ][^\\n]*)?(?:\\n|$))"));
                while (src) {
                  endEarly = false;
                  if (!(cap = itemRegex.exec(src))) {
                    break;
                  }
                  if (this.rules.block.hr.test(src)) {
                    break;
                  }
                  raw = cap[0];
                  src = src.substring(raw.length);
                  line = cap[2].split("\n", 1)[0].replace(/^\t+/, function(t) {
                    return " ".repeat(3 * t.length);
                  });
                  nextLine = src.split("\n", 1)[0];
                  if (this.options.pedantic) {
                    indent = 2;
                    itemContents = line.trimLeft();
                  } else {
                    indent = cap[2].search(/[^ ]/);
                    indent = indent > 4 ? 1 : indent;
                    itemContents = line.slice(indent);
                    indent += cap[1].length;
                  }
                  blankLine = false;
                  if (!line && /^ *$/.test(nextLine)) {
                    raw += nextLine + "\n";
                    src = src.substring(nextLine.length + 1);
                    endEarly = true;
                  }
                  if (!endEarly) {
                    var nextBulletRegex = new RegExp("^ {0,".concat(Math.min(3, indent - 1), "}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))"));
                    var hrRegex = new RegExp("^ {0,".concat(Math.min(3, indent - 1), "}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)"));
                    var fencesBeginRegex = new RegExp("^ {0,".concat(Math.min(3, indent - 1), "}(?:```|~~~)"));
                    var headingBeginRegex = new RegExp("^ {0,".concat(Math.min(3, indent - 1), "}#"));
                    while (src) {
                      rawLine = src.split("\n", 1)[0];
                      nextLine = rawLine;
                      if (this.options.pedantic) {
                        nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
                      }
                      if (fencesBeginRegex.test(nextLine)) {
                        break;
                      }
                      if (headingBeginRegex.test(nextLine)) {
                        break;
                      }
                      if (nextBulletRegex.test(nextLine)) {
                        break;
                      }
                      if (hrRegex.test(src)) {
                        break;
                      }
                      if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
                        itemContents += "\n" + nextLine.slice(indent);
                      } else {
                        if (blankLine) {
                          break;
                        }
                        if (line.search(/[^ ]/) >= 4) {
                          break;
                        }
                        if (fencesBeginRegex.test(line)) {
                          break;
                        }
                        if (headingBeginRegex.test(line)) {
                          break;
                        }
                        if (hrRegex.test(line)) {
                          break;
                        }
                        itemContents += "\n" + nextLine;
                      }
                      if (!blankLine && !nextLine.trim()) {
                        blankLine = true;
                      }
                      raw += rawLine + "\n";
                      src = src.substring(rawLine.length + 1);
                      line = nextLine.slice(indent);
                    }
                  }
                  if (!list.loose) {
                    if (endsWithBlankLine) {
                      list.loose = true;
                    } else if (/\n *\n *$/.test(raw)) {
                      endsWithBlankLine = true;
                    }
                  }
                  if (this.options.gfm) {
                    istask = /^\[[ xX]\] /.exec(itemContents);
                    if (istask) {
                      ischecked = istask[0] !== "[ ] ";
                      itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
                    }
                  }
                  list.items.push({
                    type: "list_item",
                    raw,
                    task: !!istask,
                    checked: ischecked,
                    loose: false,
                    text: itemContents
                  });
                  list.raw += raw;
                }
                list.items[list.items.length - 1].raw = raw.trimRight();
                list.items[list.items.length - 1].text = itemContents.trimRight();
                list.raw = list.raw.trimRight();
                var l = list.items.length;
                for (i = 0; i < l; i++) {
                  this.lexer.state.top = false;
                  list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
                  if (!list.loose) {
                    var spacers = list.items[i].tokens.filter(function(t) {
                      return t.type === "space";
                    });
                    var hasMultipleLineBreaks = spacers.length > 0 && spacers.some(function(t) {
                      return /\n.*\n/.test(t.raw);
                    });
                    list.loose = hasMultipleLineBreaks;
                  }
                }
                if (list.loose) {
                  for (i = 0; i < l; i++) {
                    list.items[i].loose = true;
                  }
                }
                return list;
              }
            };
            Tokenizer2.prototype.html = function(src) {
              var cap = this.rules.block.html.exec(src);
              if (cap) {
                var token = {
                  type: "html",
                  block: true,
                  raw: cap[0],
                  pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
                  text: cap[0]
                };
                if (this.options.sanitize) {
                  var text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]);
                  token.type = "paragraph";
                  token.text = text;
                  token.tokens = this.lexer.inline(text);
                }
                return token;
              }
            };
            Tokenizer2.prototype.def = function(src) {
              var cap = this.rules.block.def.exec(src);
              if (cap) {
                var tag = cap[1].toLowerCase().replace(/\s+/g, " ");
                var href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "";
                var title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline._escapes, "$1") : cap[3];
                return {
                  type: "def",
                  tag,
                  raw: cap[0],
                  href,
                  title
                };
              }
            };
            Tokenizer2.prototype.table = function(src) {
              var cap = this.rules.block.table.exec(src);
              if (cap) {
                var item = {
                  type: "table",
                  header: splitCells(cap[1]).map(function(c) {
                    return { text: c };
                  }),
                  align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                  rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
                };
                if (item.header.length === item.align.length) {
                  item.raw = cap[0];
                  var l = item.align.length;
                  var i = void 0, j = void 0, k = void 0, row = void 0;
                  for (i = 0; i < l; i++) {
                    if (/^ *-+: *$/.test(item.align[i])) {
                      item.align[i] = "right";
                    } else if (/^ *:-+: *$/.test(item.align[i])) {
                      item.align[i] = "center";
                    } else if (/^ *:-+ *$/.test(item.align[i])) {
                      item.align[i] = "left";
                    } else {
                      item.align[i] = null;
                    }
                  }
                  l = item.rows.length;
                  for (i = 0; i < l; i++) {
                    item.rows[i] = splitCells(item.rows[i], item.header.length).map(function(c) {
                      return { text: c };
                    });
                  }
                  l = item.header.length;
                  for (j = 0; j < l; j++) {
                    item.header[j].tokens = this.lexer.inline(item.header[j].text);
                  }
                  l = item.rows.length;
                  for (j = 0; j < l; j++) {
                    row = item.rows[j];
                    for (k = 0; k < row.length; k++) {
                      row[k].tokens = this.lexer.inline(row[k].text);
                    }
                  }
                  return item;
                }
              }
            };
            Tokenizer2.prototype.lheading = function(src) {
              var cap = this.rules.block.lheading.exec(src);
              if (cap) {
                return {
                  type: "heading",
                  raw: cap[0],
                  depth: cap[2].charAt(0) === "=" ? 1 : 2,
                  text: cap[1],
                  tokens: this.lexer.inline(cap[1])
                };
              }
            };
            Tokenizer2.prototype.paragraph = function(src) {
              var cap = this.rules.block.paragraph.exec(src);
              if (cap) {
                var text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
                return {
                  type: "paragraph",
                  raw: cap[0],
                  text,
                  tokens: this.lexer.inline(text)
                };
              }
            };
            Tokenizer2.prototype.text = function(src) {
              var cap = this.rules.block.text.exec(src);
              if (cap) {
                return {
                  type: "text",
                  raw: cap[0],
                  text: cap[0],
                  tokens: this.lexer.inline(cap[0])
                };
              }
            };
            Tokenizer2.prototype.escape = function(src) {
              var cap = this.rules.inline.escape.exec(src);
              if (cap) {
                return {
                  type: "escape",
                  raw: cap[0],
                  text: escape(cap[1])
                };
              }
            };
            Tokenizer2.prototype.tag = function(src) {
              var cap = this.rules.inline.tag.exec(src);
              if (cap) {
                if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
                  this.lexer.state.inLink = true;
                } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
                  this.lexer.state.inLink = false;
                }
                if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
                  this.lexer.state.inRawBlock = true;
                } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
                  this.lexer.state.inRawBlock = false;
                }
                return {
                  type: this.options.sanitize ? "text" : "html",
                  raw: cap[0],
                  inLink: this.lexer.state.inLink,
                  inRawBlock: this.lexer.state.inRawBlock,
                  block: false,
                  text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0]
                };
              }
            };
            Tokenizer2.prototype.link = function(src) {
              var cap = this.rules.inline.link.exec(src);
              if (cap) {
                var trimmedUrl = cap[2].trim();
                if (!this.options.pedantic && /^</.test(trimmedUrl)) {
                  if (!/>$/.test(trimmedUrl)) {
                    return;
                  }
                  var rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
                  if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
                    return;
                  }
                } else {
                  var lastParenIndex = findClosingBracket(cap[2], "()");
                  if (lastParenIndex > -1) {
                    var start = cap[0].indexOf("!") === 0 ? 5 : 4;
                    var linkLen = start + cap[1].length + lastParenIndex;
                    cap[2] = cap[2].substring(0, lastParenIndex);
                    cap[0] = cap[0].substring(0, linkLen).trim();
                    cap[3] = "";
                  }
                }
                var href = cap[2];
                var title = "";
                if (this.options.pedantic) {
                  var link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
                  if (link) {
                    href = link[1];
                    title = link[3];
                  }
                } else {
                  title = cap[3] ? cap[3].slice(1, -1) : "";
                }
                href = href.trim();
                if (/^</.test(href)) {
                  if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
                    href = href.slice(1);
                  } else {
                    href = href.slice(1, -1);
                  }
                }
                return outputLink(cap, {
                  href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
                  title: title ? title.replace(this.rules.inline._escapes, "$1") : title
                }, cap[0], this.lexer);
              }
            };
            Tokenizer2.prototype.reflink = function(src, links) {
              var cap;
              if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
                var link = (cap[2] || cap[1]).replace(/\s+/g, " ");
                link = links[link.toLowerCase()];
                if (!link) {
                  var text = cap[0].charAt(0);
                  return {
                    type: "text",
                    raw: text,
                    text
                  };
                }
                return outputLink(cap, link, cap[0], this.lexer);
              }
            };
            Tokenizer2.prototype.emStrong = function(src, maskedSrc, prevChar) {
              if (prevChar === void 0) {
                prevChar = "";
              }
              var match = this.rules.inline.emStrong.lDelim.exec(src);
              if (!match)
                return;
              if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
                return;
              var nextChar = match[1] || match[2] || "";
              if (!nextChar || nextChar && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar))) {
                var lLength = match[0].length - 1;
                var rDelim = void 0, rLength = void 0, delimTotal = lLength, midDelimTotal = 0;
                var endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
                endReg.lastIndex = 0;
                maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
                while ((match = endReg.exec(maskedSrc)) != null) {
                  rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
                  if (!rDelim)
                    continue;
                  rLength = rDelim.length;
                  if (match[3] || match[4]) {
                    delimTotal += rLength;
                    continue;
                  } else if (match[5] || match[6]) {
                    if (lLength % 3 && !((lLength + rLength) % 3)) {
                      midDelimTotal += rLength;
                      continue;
                    }
                  }
                  delimTotal -= rLength;
                  if (delimTotal > 0)
                    continue;
                  rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
                  var raw = src.slice(0, lLength + match.index + (match[0].length - rDelim.length) + rLength);
                  if (Math.min(lLength, rLength) % 2) {
                    var text2 = raw.slice(1, -1);
                    return {
                      type: "em",
                      raw,
                      text: text2,
                      tokens: this.lexer.inlineTokens(text2)
                    };
                  }
                  var text = raw.slice(2, -2);
                  return {
                    type: "strong",
                    raw,
                    text,
                    tokens: this.lexer.inlineTokens(text)
                  };
                }
              }
            };
            Tokenizer2.prototype.codespan = function(src) {
              var cap = this.rules.inline.code.exec(src);
              if (cap) {
                var text = cap[2].replace(/\n/g, " ");
                var hasNonSpaceChars = /[^ ]/.test(text);
                var hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
                if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
                  text = text.substring(1, text.length - 1);
                }
                text = escape(text, true);
                return {
                  type: "codespan",
                  raw: cap[0],
                  text
                };
              }
            };
            Tokenizer2.prototype.br = function(src) {
              var cap = this.rules.inline.br.exec(src);
              if (cap) {
                return {
                  type: "br",
                  raw: cap[0]
                };
              }
            };
            Tokenizer2.prototype.del = function(src) {
              var cap = this.rules.inline.del.exec(src);
              if (cap) {
                return {
                  type: "del",
                  raw: cap[0],
                  text: cap[2],
                  tokens: this.lexer.inlineTokens(cap[2])
                };
              }
            };
            Tokenizer2.prototype.autolink = function(src, mangle2) {
              var cap = this.rules.inline.autolink.exec(src);
              if (cap) {
                var text = void 0, href = void 0;
                if (cap[2] === "@") {
                  text = escape(this.options.mangle ? mangle2(cap[1]) : cap[1]);
                  href = "mailto:" + text;
                } else {
                  text = escape(cap[1]);
                  href = text;
                }
                return {
                  type: "link",
                  raw: cap[0],
                  text,
                  href,
                  tokens: [
                    {
                      type: "text",
                      raw: text,
                      text
                    }
                  ]
                };
              }
            };
            Tokenizer2.prototype.url = function(src, mangle2) {
              var cap;
              if (cap = this.rules.inline.url.exec(src)) {
                var text = void 0, href = void 0;
                if (cap[2] === "@") {
                  text = escape(this.options.mangle ? mangle2(cap[0]) : cap[0]);
                  href = "mailto:" + text;
                } else {
                  var prevCapZero = void 0;
                  do {
                    prevCapZero = cap[0];
                    cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
                  } while (prevCapZero !== cap[0]);
                  text = escape(cap[0]);
                  if (cap[1] === "www.") {
                    href = "http://" + cap[0];
                  } else {
                    href = cap[0];
                  }
                }
                return {
                  type: "link",
                  raw: cap[0],
                  text,
                  href,
                  tokens: [
                    {
                      type: "text",
                      raw: text,
                      text
                    }
                  ]
                };
              }
            };
            Tokenizer2.prototype.inlineText = function(src, smartypants2) {
              var cap = this.rules.inline.text.exec(src);
              if (cap) {
                var text = void 0;
                if (this.lexer.state.inRawBlock) {
                  text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
                } else {
                  text = escape(this.options.smartypants ? smartypants2(cap[0]) : cap[0]);
                }
                return {
                  type: "text",
                  raw: cap[0],
                  text
                };
              }
            };
            return Tokenizer2;
          }()
        );
        var block = {
          newline: /^(?: *(?:\n|$))+/,
          code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
          fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
          hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
          heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
          blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
          list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
          html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
          def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
          table: noopTest,
          lheading: /^((?:(?!^bull ).|\n(?!\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
          // regex template, placeholders will be replaced according to different paragraph
          // interruption rules of commonmark and the original markdown spec:
          _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
          text: /^[^\n]+/
        };
        block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
        block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
        block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
        block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
        block.listItemStart = edit(/^( *)(bull) */).replace("bull", block.bullet).getRegex();
        block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
        block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
        block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
        block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
        block.lheading = edit(block.lheading).replace(/bull/g, block.bullet).getRegex();
        block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
        block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
        block.normal = __assign({}, block);
        block.gfm = __assign(__assign({}, block.normal), { table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)" });
        block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
        block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
        block.pedantic = __assign(__assign({}, block.normal), {
          html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
          def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
          heading: /^(#{1,6})(.*)(?:\n+|$)/,
          fences: noopTest,
          // fences not supported
          lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
          paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
        });
        var inline = {
          escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
          autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
          url: noopTest,
          tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
          // CDATA section
          link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
          reflink: /^!?\[(label)\]\[(ref)\]/,
          nolink: /^!?\[(ref)\](?:\[\])?/,
          reflinkSearch: "reflink|nolink(?!\\()",
          emStrong: {
            lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
            //        (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
            //          () Skip orphan inside strong                                      () Consume to delim     (1) #***                (2) a***#, a***                             (3) #***a, ***a                 (4) ***#              (5) #***#                 (6) a***a
            rDelimAst: /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
            rDelimUnd: /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
            // ^- Not allowed for _
          },
          code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
          br: /^( {2,}|\\)\n(?!\s*$)/,
          del: noopTest,
          text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
          punctuation: /^([\spunctuation])/
        };
        inline._uc_punctuation = "\\u00A1\\u00A7\\u00AB\\u00B6\\u00B7\\u00BB\\u00BF\\u037E\\u0387\\u055A-\\u055F\\u0589\\u058A\\u05BE\\u05C0\\u05C3\\u05C6\\u05F3\\u05F4\\u0609\\u060A\\u060C\\u060D\\u061B\\u061E\\u061F\\u066A-\\u066D\\u06D4\\u0700-\\u070D\\u07F7-\\u07F9\\u0830-\\u083E\\u085E\\u0964\\u0965\\u0970\\u0AF0\\u0DF4\\u0E4F\\u0E5A\\u0E5B\\u0F04-\\u0F12\\u0F14\\u0F3A-\\u0F3D\\u0F85\\u0FD0-\\u0FD4\\u0FD9\\u0FDA\\u104A-\\u104F\\u10FB\\u1360-\\u1368\\u1400\\u166D\\u166E\\u169B\\u169C\\u16EB-\\u16ED\\u1735\\u1736\\u17D4-\\u17D6\\u17D8-\\u17DA\\u1800-\\u180A\\u1944\\u1945\\u1A1E\\u1A1F\\u1AA0-\\u1AA6\\u1AA8-\\u1AAD\\u1B5A-\\u1B60\\u1BFC-\\u1BFF\\u1C3B-\\u1C3F\\u1C7E\\u1C7F\\u1CC0-\\u1CC7\\u1CD3\\u2010-\\u2027\\u2030-\\u2043\\u2045-\\u2051\\u2053-\\u205E\\u207D\\u207E\\u208D\\u208E\\u2308-\\u230B\\u2329\\u232A\\u2768-\\u2775\\u27C5\\u27C6\\u27E6-\\u27EF\\u2983-\\u2998\\u29D8-\\u29DB\\u29FC\\u29FD\\u2CF9-\\u2CFC\\u2CFE\\u2CFF\\u2D70\\u2E00-\\u2E2E\\u2E30-\\u2E42\\u3001-\\u3003\\u3008-\\u3011\\u3014-\\u301F\\u3030\\u303D\\u30A0\\u30FB\\uA4FE\\uA4FF\\uA60D-\\uA60F\\uA673\\uA67E\\uA6F2-\\uA6F7\\uA874-\\uA877\\uA8CE\\uA8CF\\uA8F8-\\uA8FA\\uA8FC\\uA92E\\uA92F\\uA95F\\uA9C1-\\uA9CD\\uA9DE\\uA9DF\\uAA5C-\\uAA5F\\uAADE\\uAADF\\uAAF0\\uAAF1\\uABEB\\uFD3E\\uFD3F\\uFE10-\\uFE19\\uFE30-\\uFE52\\uFE54-\\uFE61\\uFE63\\uFE68\\uFE6A\\uFE6B\\uFF01-\\uFF03\\uFF05-\\uFF0A\\uFF0C-\\uFF0F\\uFF1A\\uFF1B\\uFF1F\\uFF20\\uFF3B-\\uFF3D\\uFF3F\\uFF5B\\uFF5D\\uFF5F-\\uFF65";
        inline._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~" + inline._uc_punctuation;
        inline.punctuation = edit(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();
        inline.blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
        inline.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g;
        inline._comment = edit(block._comment).replace("(?:-->|$)", "-->").getRegex();
        inline.emStrong.lDelim = edit(inline.emStrong.lDelim).replace(/punct/g, inline._punctuation).getRegex();
        inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "g").replace(/punct/g, inline._punctuation).getRegex();
        inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "g").replace(/punct/g, inline._punctuation).getRegex();
        inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
        inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
        inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
        inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
        inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
        inline.tag = edit(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
        inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
        inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
        inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
        inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
        inline.reflink = edit(inline.reflink).replace("label", inline._label).replace("ref", block._label).getRegex();
        inline.nolink = edit(inline.nolink).replace("ref", block._label).getRegex();
        inline.reflinkSearch = edit(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
        inline.normal = __assign({}, inline);
        inline.pedantic = __assign(__assign({}, inline.normal), { strong: {
          start: /^__|\*\*/,
          middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
          endAst: /\*\*(?!\*)/g,
          endUnd: /__(?!_)/g
        }, em: {
          start: /^_|\*/,
          middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
          endAst: /\*(?!\*)/g,
          endUnd: /_(?!_)/g
        }, link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(), reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex() });
        inline.gfm = __assign(__assign({}, inline.normal), { escape: edit(inline.escape).replace("])", "~|])").getRegex(), _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/, url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/, text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/ });
        inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
        inline.breaks = __assign(__assign({}, inline.gfm), { br: edit(inline.br).replace("{2,}", "*").getRegex(), text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() });
        function smartypants(text) {
          return text.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…");
        }
        function mangle(text) {
          var out = "", i, ch;
          var l = text.length;
          for (i = 0; i < l; i++) {
            ch = text.charCodeAt(i);
            if (Math.random() > 0.5) {
              ch = "x" + ch.toString(16);
            }
            out += "&#" + ch + ";";
          }
          return out;
        }
        var Lexer = (
          /** @class */
          function() {
            function Lexer2(options2) {
              this.tokens = [];
              this.tokens.links = /* @__PURE__ */ Object.create(null);
              this.options = options2 || defaults;
              this.options.tokenizer = this.options.tokenizer || new Tokenizer();
              this.tokenizer = this.options.tokenizer;
              this.tokenizer.options = this.options;
              this.tokenizer.lexer = this;
              this.inlineQueue = [];
              this.state = {
                inLink: false,
                inRawBlock: false,
                top: true
              };
              var rules = {
                block: block.normal,
                inline: inline.normal
              };
              if (this.options.pedantic) {
                rules.block = block.pedantic;
                rules.inline = inline.pedantic;
              } else if (this.options.gfm) {
                rules.block = block.gfm;
                if (this.options.breaks) {
                  rules.inline = inline.breaks;
                } else {
                  rules.inline = inline.gfm;
                }
              }
              this.tokenizer.rules = rules;
            }
            Object.defineProperty(Lexer2, "rules", {
              /**
               * Expose Rules
               */
              get: function() {
                return {
                  block,
                  inline
                };
              },
              enumerable: false,
              configurable: true
            });
            Lexer2.lex = function(src, options2) {
              var lexer2 = new Lexer2(options2);
              return lexer2.lex(src);
            };
            Lexer2.lexInline = function(src, options2) {
              var lexer2 = new Lexer2(options2);
              return lexer2.inlineTokens(src);
            };
            Lexer2.prototype.lex = function(src) {
              src = src.replace(/\r\n|\r/g, "\n");
              this.blockTokens(src, this.tokens);
              var next;
              while (next = this.inlineQueue.shift()) {
                this.inlineTokens(next.src, next.tokens);
              }
              return this.tokens;
            };
            Lexer2.prototype.blockTokens = function(src, tokens) {
              var _this = this;
              if (tokens === void 0) {
                tokens = [];
              }
              if (this.options.pedantic) {
                src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
              } else {
                src = src.replace(/^( *)(\t+)/gm, function(_, leading, tabs) {
                  return leading + "    ".repeat(tabs.length);
                });
              }
              var token, lastToken, cutSrc, lastParagraphClipped;
              var _loop_1 = function() {
                if (this_1.options.extensions && this_1.options.extensions.block && this_1.options.extensions.block.some(function(extTokenizer) {
                  if (token = extTokenizer.call({ lexer: _this }, src, tokens)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    return true;
                  }
                  return false;
                })) {
                  return "continue";
                }
                if (token = this_1.tokenizer.space(src)) {
                  src = src.substring(token.raw.length);
                  if (token.raw.length === 1 && tokens.length > 0) {
                    tokens[tokens.length - 1].raw += "\n";
                  } else {
                    tokens.push(token);
                  }
                  return "continue";
                }
                if (token = this_1.tokenizer.code(src)) {
                  src = src.substring(token.raw.length);
                  lastToken = tokens[tokens.length - 1];
                  if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
                    lastToken.raw += "\n" + token.raw;
                    lastToken.text += "\n" + token.text;
                    this_1.inlineQueue[this_1.inlineQueue.length - 1].src = lastToken.text;
                  } else {
                    tokens.push(token);
                  }
                  return "continue";
                }
                if (token = this_1.tokenizer.fences(src)) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                if (token = this_1.tokenizer.heading(src)) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                if (token = this_1.tokenizer.hr(src)) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                if (token = this_1.tokenizer.blockquote(src)) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                if (token = this_1.tokenizer.list(src)) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                if (token = this_1.tokenizer.html(src)) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                if (token = this_1.tokenizer.def(src)) {
                  src = src.substring(token.raw.length);
                  lastToken = tokens[tokens.length - 1];
                  if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
                    lastToken.raw += "\n" + token.raw;
                    lastToken.text += "\n" + token.raw;
                    this_1.inlineQueue[this_1.inlineQueue.length - 1].src = lastToken.text;
                  } else if (!this_1.tokens.links[token.tag]) {
                    this_1.tokens.links[token.tag] = {
                      href: token.href,
                      title: token.title
                    };
                  }
                  return "continue";
                }
                if (token = this_1.tokenizer.table(src)) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                if (token = this_1.tokenizer.lheading(src)) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                cutSrc = src;
                if (this_1.options.extensions && this_1.options.extensions.startBlock) {
                  var startIndex_1 = Infinity;
                  var tempSrc_1 = src.slice(1);
                  var tempStart_1;
                  this_1.options.extensions.startBlock.forEach(function(getStartIndex) {
                    tempStart_1 = getStartIndex.call({ lexer: this }, tempSrc_1);
                    if (typeof tempStart_1 === "number" && tempStart_1 >= 0) {
                      startIndex_1 = Math.min(startIndex_1, tempStart_1);
                    }
                  });
                  if (startIndex_1 < Infinity && startIndex_1 >= 0) {
                    cutSrc = src.substring(0, startIndex_1 + 1);
                  }
                }
                if (this_1.state.top && (token = this_1.tokenizer.paragraph(cutSrc))) {
                  lastToken = tokens[tokens.length - 1];
                  if (lastParagraphClipped && lastToken.type === "paragraph") {
                    lastToken.raw += "\n" + token.raw;
                    lastToken.text += "\n" + token.text;
                    this_1.inlineQueue.pop();
                    this_1.inlineQueue[this_1.inlineQueue.length - 1].src = lastToken.text;
                  } else {
                    tokens.push(token);
                  }
                  lastParagraphClipped = cutSrc.length !== src.length;
                  src = src.substring(token.raw.length);
                  return "continue";
                }
                if (token = this_1.tokenizer.text(src)) {
                  src = src.substring(token.raw.length);
                  lastToken = tokens[tokens.length - 1];
                  if (lastToken && lastToken.type === "text") {
                    lastToken.raw += "\n" + token.raw;
                    lastToken.text += "\n" + token.text;
                    this_1.inlineQueue.pop();
                    this_1.inlineQueue[this_1.inlineQueue.length - 1].src = lastToken.text;
                  } else {
                    tokens.push(token);
                  }
                  return "continue";
                }
                if (src) {
                  var errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
                  if (this_1.options.silent) {
                    console.error(errMsg);
                    return "break";
                  } else {
                    throw new Error(errMsg);
                  }
                }
              };
              var this_1 = this;
              while (src) {
                var state_1 = _loop_1();
                if (state_1 === "break")
                  break;
              }
              this.state.top = true;
              return tokens;
            };
            Lexer2.prototype.inline = function(src, tokens) {
              if (tokens === void 0) {
                tokens = [];
              }
              this.inlineQueue.push({ src, tokens });
              return tokens;
            };
            Lexer2.prototype.inlineTokens = function(src, tokens) {
              var _this = this;
              if (tokens === void 0) {
                tokens = [];
              }
              var token, lastToken, cutSrc;
              var maskedSrc = src;
              var match;
              var keepPrevChar, prevChar;
              if (this.tokens.links) {
                var links = Object.keys(this.tokens.links);
                if (links.length > 0) {
                  while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
                    if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
                      maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
                    }
                  }
                }
              }
              while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
                maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
              }
              while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
                maskedSrc = maskedSrc.slice(0, match.index + match[0].length - 2) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
                this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
              }
              var _loop_2 = function() {
                if (!keepPrevChar) {
                  prevChar = "";
                }
                keepPrevChar = false;
                if (this_2.options.extensions && this_2.options.extensions.inline && this_2.options.extensions.inline.some(function(extTokenizer) {
                  if (token = extTokenizer.call({ lexer: _this }, src, tokens)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    return true;
                  }
                  return false;
                })) {
                  return "continue";
                }
                if (token = this_2.tokenizer.escape(src)) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                if (token = this_2.tokenizer.tag(src)) {
                  src = src.substring(token.raw.length);
                  lastToken = tokens[tokens.length - 1];
                  if (lastToken && token.type === "text" && lastToken.type === "text") {
                    lastToken.raw += token.raw;
                    lastToken.text += token.text;
                  } else {
                    tokens.push(token);
                  }
                  return "continue";
                }
                if (token = this_2.tokenizer.link(src)) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                if (token = this_2.tokenizer.reflink(src, this_2.tokens.links)) {
                  src = src.substring(token.raw.length);
                  lastToken = tokens[tokens.length - 1];
                  if (lastToken && token.type === "text" && lastToken.type === "text") {
                    lastToken.raw += token.raw;
                    lastToken.text += token.text;
                  } else {
                    tokens.push(token);
                  }
                  return "continue";
                }
                if (token = this_2.tokenizer.emStrong(src, maskedSrc, prevChar)) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                if (token = this_2.tokenizer.codespan(src)) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                if (token = this_2.tokenizer.br(src)) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                if (token = this_2.tokenizer.del(src)) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                if (token = this_2.tokenizer.autolink(src, mangle)) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                if (!this_2.state.inLink && (token = this_2.tokenizer.url(src, mangle))) {
                  src = src.substring(token.raw.length);
                  tokens.push(token);
                  return "continue";
                }
                cutSrc = src;
                if (this_2.options.extensions && this_2.options.extensions.startInline) {
                  var startIndex_2 = Infinity;
                  var tempSrc_2 = src.slice(1);
                  var tempStart_2;
                  this_2.options.extensions.startInline.forEach(function(getStartIndex) {
                    tempStart_2 = getStartIndex.call({ lexer: this }, tempSrc_2);
                    if (typeof tempStart_2 === "number" && tempStart_2 >= 0) {
                      startIndex_2 = Math.min(startIndex_2, tempStart_2);
                    }
                  });
                  if (startIndex_2 < Infinity && startIndex_2 >= 0) {
                    cutSrc = src.substring(0, startIndex_2 + 1);
                  }
                }
                if (token = this_2.tokenizer.inlineText(cutSrc, smartypants)) {
                  src = src.substring(token.raw.length);
                  if (token.raw.slice(-1) !== "_") {
                    prevChar = token.raw.slice(-1);
                  }
                  keepPrevChar = true;
                  lastToken = tokens[tokens.length - 1];
                  if (lastToken && lastToken.type === "text") {
                    lastToken.raw += token.raw;
                    lastToken.text += token.text;
                  } else {
                    tokens.push(token);
                  }
                  return "continue";
                }
                if (src) {
                  var errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
                  if (this_2.options.silent) {
                    console.error(errMsg);
                    return "break";
                  } else {
                    throw new Error(errMsg);
                  }
                }
              };
              var this_2 = this;
              while (src) {
                var state_2 = _loop_2();
                if (state_2 === "break")
                  break;
              }
              return tokens;
            };
            return Lexer2;
          }()
        );
        var Renderer = (
          /** @class */
          function() {
            function Renderer2(options2) {
              this.options = options2 || defaults;
            }
            Renderer2.prototype.code = function(code, infostring, escaped) {
              var lang = (infostring || "").match(/\S*/)[0];
              if (this.options.highlight) {
                var out = this.options.highlight(code, lang);
                if (out != null && out !== code) {
                  escaped = true;
                  code = out;
                }
              }
              code = code.replace(/\n$/, "") + "\n";
              if (!lang) {
                return "<pre><code>" + (escaped ? code : escape(code, true)) + "</code></pre>\n";
              }
              return '<pre><code class="' + this.options.langPrefix + escape(lang) + '">' + (escaped ? code : escape(code, true)) + "</code></pre>\n";
            };
            Renderer2.prototype.blockquote = function(quote) {
              return "<blockquote>\n".concat(quote, "</blockquote>\n");
            };
            Renderer2.prototype.html = function(html, block2) {
              return html;
            };
            Renderer2.prototype.heading = function(text, level, raw, slugger) {
              if (this.options.headerIds) {
                var id = this.options.headerPrefix + slugger.slug(raw);
                return "<h".concat(level, ' id="').concat(id, '">').concat(text, "</h").concat(level, ">\n");
              }
              return "<h".concat(level, ">").concat(text, "</h").concat(level, ">\n");
            };
            Renderer2.prototype.hr = function() {
              return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
            };
            Renderer2.prototype.list = function(body, ordered, start) {
              var type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
              return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
            };
            Renderer2.prototype.listitem = function(text) {
              return "<li>".concat(text, "</li>\n");
            };
            Renderer2.prototype.checkbox = function(checked) {
              return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
            };
            Renderer2.prototype.paragraph = function(text) {
              return "<p>".concat(text, "</p>\n");
            };
            Renderer2.prototype.table = function(header, body) {
              if (body)
                body = "<tbody>".concat(body, "</tbody>");
              return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
            };
            Renderer2.prototype.tablerow = function(content) {
              return "<tr>\n".concat(content, "</tr>\n");
            };
            Renderer2.prototype.tablecell = function(content, flags) {
              var type = flags.header ? "th" : "td";
              var tag = flags.align ? "<".concat(type, ' align="').concat(flags.align, '">') : "<".concat(type, ">");
              return tag + content + "</".concat(type, ">\n");
            };
            Renderer2.prototype.strong = function(text) {
              return "<strong>".concat(text, "</strong>");
            };
            Renderer2.prototype.em = function(text) {
              return "<em>".concat(text, "</em>");
            };
            Renderer2.prototype.codespan = function(text) {
              return "<code>".concat(text, "</code>");
            };
            Renderer2.prototype.br = function() {
              return this.options.xhtml ? "<br/>" : "<br>";
            };
            Renderer2.prototype.del = function(text) {
              return "<del>".concat(text, "</del>");
            };
            Renderer2.prototype.link = function(href, title, text) {
              href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
              if (href === null) {
                return text;
              }
              var out = '<a href="' + href + '"';
              if (title) {
                out += ' title="' + title + '"';
              }
              out += ">" + text + "</a>";
              return out;
            };
            Renderer2.prototype.image = function(href, title, text) {
              href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
              if (href === null) {
                return text;
              }
              var out = '<img src="'.concat(href, '" alt="').concat(text, '"');
              if (title) {
                out += ' title="'.concat(title, '"');
              }
              out += this.options.xhtml ? "/>" : ">";
              return out;
            };
            Renderer2.prototype.text = function(text) {
              return text;
            };
            return Renderer2;
          }()
        );
        var TextRenderer = (
          /** @class */
          function() {
            function TextRenderer2() {
            }
            TextRenderer2.prototype.strong = function(text) {
              return text;
            };
            TextRenderer2.prototype.em = function(text) {
              return text;
            };
            TextRenderer2.prototype.codespan = function(text) {
              return text;
            };
            TextRenderer2.prototype.del = function(text) {
              return text;
            };
            TextRenderer2.prototype.html = function(text) {
              return text;
            };
            TextRenderer2.prototype.text = function(text) {
              return text;
            };
            TextRenderer2.prototype.link = function(href, title, text) {
              return "" + text;
            };
            TextRenderer2.prototype.image = function(href, title, text) {
              return "" + text;
            };
            TextRenderer2.prototype.br = function() {
              return "";
            };
            return TextRenderer2;
          }()
        );
        var Slugger = (
          /** @class */
          function() {
            function Slugger2() {
              this.seen = {};
            }
            Slugger2.prototype.serialize = function(value) {
              return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
            };
            Slugger2.prototype.getNextSafeSlug = function(originalSlug, isDryRun) {
              var slug = originalSlug;
              var occurenceAccumulator = 0;
              if (this.seen.hasOwnProperty(slug)) {
                occurenceAccumulator = this.seen[originalSlug];
                do {
                  occurenceAccumulator++;
                  slug = originalSlug + "-" + occurenceAccumulator;
                } while (this.seen.hasOwnProperty(slug));
              }
              if (!isDryRun) {
                this.seen[originalSlug] = occurenceAccumulator;
                this.seen[slug] = 0;
              }
              return slug;
            };
            Slugger2.prototype.slug = function(value, options2) {
              if (options2 === void 0) {
                options2 = {};
              }
              var slug = this.serialize(value);
              return this.getNextSafeSlug(slug, options2.dryrun);
            };
            return Slugger2;
          }()
        );
        var Parser = (
          /** @class */
          function() {
            function Parser2(options2) {
              this.options = options2 || defaults;
              this.options.renderer = this.options.renderer || new Renderer();
              this.renderer = this.options.renderer;
              this.renderer.options = this.options;
              this.textRenderer = new TextRenderer();
              this.slugger = new Slugger();
            }
            Parser2.parse = function(tokens, options2) {
              var parser2 = new Parser2(options2);
              return parser2.parse(tokens);
            };
            Parser2.parseInline = function(tokens, options2) {
              var parser2 = new Parser2(options2);
              return parser2.parseInline(tokens);
            };
            Parser2.prototype.parse = function(tokens, top) {
              if (top === void 0) {
                top = true;
              }
              var out = "", i, j, k, l2, l3, row, cell, header, body, token, ordered, start, loose, itemBody, item, checked, task, checkbox, ret;
              var l = tokens.length;
              for (i = 0; i < l; i++) {
                token = tokens[i];
                if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
                  ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
                  if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(token.type)) {
                    out += ret || "";
                    continue;
                  }
                }
                switch (token.type) {
                  case "space": {
                    continue;
                  }
                  case "hr": {
                    out += this.renderer.hr();
                    continue;
                  }
                  case "heading": {
                    out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
                    continue;
                  }
                  case "code": {
                    out += this.renderer.code(token.text, token.lang, token.escaped);
                    continue;
                  }
                  case "table": {
                    header = "";
                    cell = "";
                    l2 = token.header.length;
                    for (j = 0; j < l2; j++) {
                      cell += this.renderer.tablecell(this.parseInline(token.header[j].tokens), { header: true, align: token.align[j] });
                    }
                    header += this.renderer.tablerow(cell);
                    body = "";
                    l2 = token.rows.length;
                    for (j = 0; j < l2; j++) {
                      row = token.rows[j];
                      cell = "";
                      l3 = row.length;
                      for (k = 0; k < l3; k++) {
                        cell += this.renderer.tablecell(this.parseInline(row[k].tokens), { header: false, align: token.align[k] });
                      }
                      body += this.renderer.tablerow(cell);
                    }
                    out += this.renderer.table(header, body);
                    continue;
                  }
                  case "blockquote": {
                    body = this.parse(token.tokens);
                    out += this.renderer.blockquote(body);
                    continue;
                  }
                  case "list": {
                    ordered = token.ordered;
                    start = token.start;
                    loose = token.loose;
                    l2 = token.items.length;
                    body = "";
                    for (j = 0; j < l2; j++) {
                      item = token.items[j];
                      checked = item.checked;
                      task = item.task;
                      itemBody = "";
                      if (item.task) {
                        checkbox = this.renderer.checkbox(checked);
                        if (loose) {
                          if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                            item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                            if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                              item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                            }
                          } else {
                            item.tokens.unshift({
                              type: "text",
                              text: checkbox
                            });
                          }
                        } else {
                          itemBody += checkbox;
                        }
                      }
                      itemBody += this.parse(item.tokens, loose);
                      body += this.renderer.listitem(itemBody, task, checked);
                    }
                    out += this.renderer.list(body, ordered, start);
                    continue;
                  }
                  case "html": {
                    out += this.renderer.html(token.text, token.block);
                    continue;
                  }
                  case "paragraph": {
                    out += this.renderer.paragraph(this.parseInline(token.tokens));
                    continue;
                  }
                  case "text": {
                    body = token.tokens ? this.parseInline(token.tokens) : token.text;
                    while (i + 1 < l && tokens[i + 1].type === "text") {
                      token = tokens[++i];
                      body += "\n" + (token.tokens ? this.parseInline(token.tokens) : token.text);
                    }
                    out += top ? this.renderer.paragraph(body) : body;
                    continue;
                  }
                  default: {
                    var errMsg = 'Token with "' + token.type + '" type was not found.';
                    if (this.options.silent) {
                      console.error(errMsg);
                      return;
                    } else {
                      throw new Error(errMsg);
                    }
                  }
                }
              }
              return out;
            };
            Parser2.prototype.parseInline = function(tokens, renderer) {
              renderer = renderer || this.renderer;
              var out = "", i, token, ret;
              var l = tokens.length;
              for (i = 0; i < l; i++) {
                token = tokens[i];
                if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
                  ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
                  if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
                    out += ret || "";
                    continue;
                  }
                }
                switch (token.type) {
                  case "escape": {
                    out += renderer.text(token.text);
                    break;
                  }
                  case "html": {
                    out += renderer.html(token.text);
                    break;
                  }
                  case "link": {
                    out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
                    break;
                  }
                  case "image": {
                    out += renderer.image(token.href, token.title, token.text);
                    break;
                  }
                  case "strong": {
                    out += renderer.strong(this.parseInline(token.tokens, renderer));
                    break;
                  }
                  case "em": {
                    out += renderer.em(this.parseInline(token.tokens, renderer));
                    break;
                  }
                  case "codespan": {
                    out += renderer.codespan(token.text);
                    break;
                  }
                  case "br": {
                    out += renderer.br();
                    break;
                  }
                  case "del": {
                    out += renderer.del(this.parseInline(token.tokens, renderer));
                    break;
                  }
                  case "text": {
                    out += renderer.text(token.text);
                    break;
                  }
                  default: {
                    var errMsg = 'Token with "' + token.type + '" type was not found.';
                    if (this.options.silent) {
                      console.error(errMsg);
                      return;
                    } else {
                      throw new Error(errMsg);
                    }
                  }
                }
              }
              return out;
            };
            return Parser2;
          }()
        );
        var Hooks = (
          /** @class */
          function() {
            function Hooks2(options2) {
              this.options = options2 || defaults;
            }
            Hooks2.prototype.preprocess = function(markdown) {
              return markdown;
            };
            Hooks2.prototype.postprocess = function(html) {
              return html;
            };
            return Hooks2;
          }()
        );
        __publicField(Hooks, "passThroughHooks", /* @__PURE__ */ new Set([
          "preprocess",
          "postprocess"
        ]));
        function onError(silent, async, callback) {
          return function(e) {
            e.message += "\nPlease report this to https://github.com/markedjs/marked.";
            if (silent) {
              var msg = "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
              if (async) {
                return Promise.resolve(msg);
              }
              if (callback) {
                callback(null, msg);
                return;
              }
              return msg;
            }
            if (async) {
              return Promise.reject(e);
            }
            if (callback) {
              callback(e);
              return;
            }
            throw e;
          };
        }
        function parseMarkdown(lexer2, parser2) {
          return function(src, opt, callback) {
            if (typeof opt === "function") {
              callback = opt;
              opt = null;
            }
            var origOpt = __assign({}, opt);
            opt = __assign(__assign({}, marked.defaults), origOpt);
            var throwError = onError(opt.silent, opt.async, callback);
            if (typeof src === "undefined" || src === null) {
              return throwError(new Error("marked(): input parameter is undefined or null"));
            }
            if (typeof src !== "string") {
              return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
            }
            checkDeprecations(opt, callback);
            if (opt.hooks) {
              opt.hooks.options = opt;
            }
            if (callback) {
              var highlight_1 = opt.highlight;
              var tokens_1;
              try {
                if (opt.hooks) {
                  src = opt.hooks.preprocess(src);
                }
                tokens_1 = lexer2(src, opt);
              } catch (e) {
                return throwError(e);
              }
              var done_1 = function(err) {
                var out;
                if (!err) {
                  try {
                    if (opt.walkTokens) {
                      marked.walkTokens(tokens_1, opt.walkTokens);
                    }
                    out = parser2(tokens_1, opt);
                    if (opt.hooks) {
                      out = opt.hooks.postprocess(out);
                    }
                  } catch (e) {
                    err = e;
                  }
                }
                opt.highlight = highlight_1;
                return err ? throwError(err) : callback(null, out);
              };
              if (!highlight_1 || highlight_1.length < 3) {
                return done_1();
              }
              delete opt.highlight;
              if (!tokens_1.length)
                return done_1();
              var pending_1 = 0;
              marked.walkTokens(tokens_1, function(token) {
                if (token.type === "code") {
                  pending_1++;
                  setTimeout(function() {
                    highlight_1(token.text, token.lang, function(err, code) {
                      if (err) {
                        return done_1(err);
                      }
                      if (code != null && code !== token.text) {
                        token.text = code;
                        token.escaped = true;
                      }
                      pending_1--;
                      if (pending_1 === 0) {
                        done_1();
                      }
                    });
                  }, 0);
                }
              });
              if (pending_1 === 0) {
                done_1();
              }
              return;
            }
            if (opt.async) {
              return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then(function(src2) {
                return lexer2(src2, opt);
              }).then(function(tokens2) {
                return opt.walkTokens ? Promise.all(marked.walkTokens(tokens2, opt.walkTokens)).then(function() {
                  return tokens2;
                }) : tokens2;
              }).then(function(tokens2) {
                return parser2(tokens2, opt);
              }).then(function(html2) {
                return opt.hooks ? opt.hooks.postprocess(html2) : html2;
              })["catch"](throwError);
            }
            try {
              if (opt.hooks) {
                src = opt.hooks.preprocess(src);
              }
              var tokens = lexer2(src, opt);
              if (opt.walkTokens) {
                marked.walkTokens(tokens, opt.walkTokens);
              }
              var html = parser2(tokens, opt);
              if (opt.hooks) {
                html = opt.hooks.postprocess(html);
              }
              return html;
            } catch (e) {
              return throwError(e);
            }
          };
        }
        function marked(src, opt, callback) {
          return parseMarkdown(Lexer.lex, Parser.parse)(src, opt, callback);
        }
        marked.options = marked.setOptions = function(opt) {
          marked.defaults = __assign(__assign({}, marked.defaults), opt);
          changeDefaults(marked.defaults);
          return marked;
        };
        marked.getDefaults = getDefaults;
        marked.defaults = defaults;
        marked.use = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var extensions = marked.defaults.extensions || { renderers: {}, childTokens: {} };
          args.forEach(function(pack) {
            var opts = __assign({}, pack);
            opts.async = marked.defaults.async || opts.async || false;
            if (pack.extensions) {
              pack.extensions.forEach(function(ext) {
                if (!ext.name) {
                  throw new Error("extension name required");
                }
                if (ext.renderer) {
                  var prevRenderer_1 = extensions.renderers[ext.name];
                  if (prevRenderer_1) {
                    extensions.renderers[ext.name] = function() {
                      var args2 = [];
                      for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                        args2[_i2] = arguments[_i2];
                      }
                      var ret = ext.renderer.apply(this, args2);
                      if (ret === false) {
                        ret = prevRenderer_1.apply(this, args2);
                      }
                      return ret;
                    };
                  } else {
                    extensions.renderers[ext.name] = ext.renderer;
                  }
                }
                if (ext.tokenizer) {
                  if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
                    throw new Error("extension level must be 'block' or 'inline'");
                  }
                  if (extensions[ext.level]) {
                    extensions[ext.level].unshift(ext.tokenizer);
                  } else {
                    extensions[ext.level] = [ext.tokenizer];
                  }
                  if (ext.start) {
                    if (ext.level === "block") {
                      if (extensions.startBlock) {
                        extensions.startBlock.push(ext.start);
                      } else {
                        extensions.startBlock = [ext.start];
                      }
                    } else if (ext.level === "inline") {
                      if (extensions.startInline) {
                        extensions.startInline.push(ext.start);
                      } else {
                        extensions.startInline = [ext.start];
                      }
                    }
                  }
                }
                if (ext.childTokens) {
                  extensions.childTokens[ext.name] = ext.childTokens;
                }
              });
              opts.extensions = extensions;
            }
            if (pack.renderer) {
              var renderer_1 = marked.defaults.renderer || new Renderer();
              var _loop_3 = function(prop2) {
                var prevRenderer = renderer_1[prop2];
                renderer_1[prop2] = function() {
                  var args2 = [];
                  for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                    args2[_i2] = arguments[_i2];
                  }
                  var ret = pack.renderer[prop2].apply(renderer_1, args2);
                  if (ret === false) {
                    ret = prevRenderer.apply(renderer_1, args2);
                  }
                  return ret;
                };
              };
              for (var prop in pack.renderer) {
                _loop_3(prop);
              }
              opts.renderer = renderer_1;
            }
            if (pack.tokenizer) {
              var tokenizer_1 = marked.defaults.tokenizer || new Tokenizer();
              var _loop_4 = function(prop2) {
                var prevTokenizer = tokenizer_1[prop2];
                tokenizer_1[prop2] = function() {
                  var args2 = [];
                  for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                    args2[_i2] = arguments[_i2];
                  }
                  var ret = pack.tokenizer[prop2].apply(tokenizer_1, args2);
                  if (ret === false) {
                    ret = prevTokenizer.apply(tokenizer_1, args2);
                  }
                  return ret;
                };
              };
              for (var prop in pack.tokenizer) {
                _loop_4(prop);
              }
              opts.tokenizer = tokenizer_1;
            }
            if (pack.hooks) {
              var hooks_1 = marked.defaults.hooks || new Hooks();
              var _loop_5 = function(prop2) {
                var prevHook = hooks_1[prop2];
                if (Hooks.passThroughHooks.has(prop2)) {
                  hooks_1[prop2] = function(arg) {
                    if (marked.defaults.async) {
                      return Promise.resolve(pack.hooks[prop2].call(hooks_1, arg)).then(function(ret2) {
                        return prevHook.call(hooks_1, ret2);
                      });
                    }
                    var ret = pack.hooks[prop2].call(hooks_1, arg);
                    return prevHook.call(hooks_1, ret);
                  };
                } else {
                  hooks_1[prop2] = function() {
                    var args2 = [];
                    for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                      args2[_i2] = arguments[_i2];
                    }
                    var ret = pack.hooks[prop2].apply(hooks_1, args2);
                    if (ret === false) {
                      ret = prevHook.apply(hooks_1, args2);
                    }
                    return ret;
                  };
                }
              };
              for (var prop in pack.hooks) {
                _loop_5(prop);
              }
              opts.hooks = hooks_1;
            }
            if (pack.walkTokens) {
              var walkTokens2_1 = marked.defaults.walkTokens;
              opts.walkTokens = function(token) {
                var values = [];
                values.push(pack.walkTokens.call(this, token));
                if (walkTokens2_1) {
                  values = values.concat(walkTokens2_1.call(this, token));
                }
                return values;
              };
            }
            marked.setOptions(opts);
          });
        };
        marked.walkTokens = function(tokens, callback) {
          var values = [];
          var _loop_6 = function(token2) {
            values = values.concat(callback.call(marked, token2));
            switch (token2.type) {
              case "table": {
                for (var _a = 0, _b = token2.header; _a < _b.length; _a++) {
                  var cell = _b[_a];
                  values = values.concat(marked.walkTokens(cell.tokens, callback));
                }
                for (var _c = 0, _d = token2.rows; _c < _d.length; _c++) {
                  var row = _d[_c];
                  for (var _e = 0, row_1 = row; _e < row_1.length; _e++) {
                    var cell = row_1[_e];
                    values = values.concat(marked.walkTokens(cell.tokens, callback));
                  }
                }
                break;
              }
              case "list": {
                values = values.concat(marked.walkTokens(token2.items, callback));
                break;
              }
              default: {
                if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token2.type]) {
                  marked.defaults.extensions.childTokens[token2.type].forEach(function(childTokens) {
                    values = values.concat(marked.walkTokens(token2[childTokens], callback));
                  });
                } else if (token2.tokens) {
                  values = values.concat(marked.walkTokens(token2.tokens, callback));
                }
              }
            }
          };
          for (var _i = 0, tokens_2 = tokens; _i < tokens_2.length; _i++) {
            var token = tokens_2[_i];
            _loop_6(token);
          }
          return values;
        };
        marked.parseInline = parseMarkdown(Lexer.lexInline, Parser.parseInline);
        marked.Parser = Parser;
        marked.parser = Parser.parse;
        marked.Renderer = Renderer;
        marked.TextRenderer = TextRenderer;
        marked.Lexer = Lexer;
        marked.lexer = Lexer.lex;
        marked.Tokenizer = Tokenizer;
        marked.Slugger = Slugger;
        marked.Hooks = Hooks;
        marked.parse = marked;
        var options = marked.options;
        var setOptions = marked.setOptions;
        var use = marked.use;
        var walkTokens = marked.walkTokens;
        var parseInline = marked.parseInline;
        var parser = Parser.parse;
        var lexer = Lexer.lex;
        function getTextAreaFontSize(mobile, value) {
          if (mobile) {
            return Math.max(16, value);
          }
          return value;
        }
        function getMsgReadProp(msg, textChatIsHidden) {
          return {
            read: msg.read !== void 0 ? msg.read : !textChatIsHidden
          };
        }
        function mergeProgressiveMessages(messages, i, message) {
          var _a;
          var newImages = message.images || [];
          var oldText = messages[i].text || "";
          var newText = message.text || "";
          messages[i].text = oldText + ((oldText && newText ? " " : "") + newText);
          messages[i].images = __spreadArray(__spreadArray([], messages[i].images || [], true), newImages, true);
          messages[i].links = __spreadArray(__spreadArray([], messages[i].links || [], true), message.links || [], true);
          messages[i].hasLikes = messages[i].hasLikes || message.hasLikes;
          if (((_a = message.ctx) === null || _a === void 0 ? void 0 : _a.format) === "markdown") {
            if (messages[i].ctx) {
              messages[i].ctx.format = "markdown";
            } else {
              messages[i].ctx = { format: "markdown" };
            }
          }
        }
        function processMessageForChat(msg, messages) {
          var _a, _b;
          var isNew = true;
          var replaceLoader = false;
          var msgInd = null;
          var updateResponse = false;
          var msgReqId = msg.reqId || ((_a = msg === null || msg === void 0 ? void 0 : msg.ctx) === null || _a === void 0 ? void 0 : _a.reqId);
          var msgResponseId = (_b = msg === null || msg === void 0 ? void 0 : msg.ctx) === null || _b === void 0 ? void 0 : _b.responseId;
          if (msg.type === "response" && msg.name === "text") {
            var loadingMsgReqId = messages.findIndex(function(m) {
              var _a2;
              return m.name === "loading" && msgReqId && (((_a2 = m === null || m === void 0 ? void 0 : m.ctx) === null || _a2 === void 0 ? void 0 : _a2.reqId) || m.reqId) === msgReqId;
            });
            if (loadingMsgReqId > -1) {
              msgInd = loadingMsgReqId;
              messages[msgInd] = __assign({}, msg);
              replaceLoader = true;
              isNew = false;
            } else {
              var unfinalizeMsgInd = messages.findIndex(function(m) {
                var _a2;
                return m.type === "response" && msgResponseId && ((_a2 = m === null || m === void 0 ? void 0 : m.ctx) === null || _a2 === void 0 ? void 0 : _a2.responseId) === msgResponseId;
              });
              var hasUnfinalizedResponses = unfinalizeMsgInd !== -1;
              if (hasUnfinalizedResponses) {
                msgInd = unfinalizeMsgInd;
                updateResponse = true;
                replaceLoader = false;
                isNew = false;
                mergeProgressiveMessages(messages, msgInd, msg);
              }
            }
          }
          if (isNew) {
            messages.push(__assign({}, msg));
            return {
              isNew,
              msgInd: messages.length - 1,
              replaceLoader,
              updateResponse
            };
          }
          return {
            isNew,
            updateResponse,
            replaceLoader,
            msgInd
          };
        }
        function filterImagesForTextChat(images) {
          return (images || []).filter(function(image) {
            if (image && image.src) {
              return image.src.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i);
            }
            return null;
          });
        }
        function isYouTubeUrl(url) {
          var regExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;
          if (url.match(regExp)) {
            return true;
          }
          return false;
        }
        function getLinkIcon(link) {
          if (isYouTubeUrl(link.href)) {
            return '<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="20px" height="20px">    <path d="M 12 4 C 12 4 5.7455469 3.9999687 4.1855469 4.4179688 C 3.3245469 4.6479688 2.6479687 5.3255469 2.4179688 6.1855469 C 1.9999687 7.7455469 2 12 2 12 C 2 12 1.9999687 16.254453 2.4179688 17.814453 C 2.6479687 18.675453 3.3255469 19.352031 4.1855469 19.582031 C 5.7455469 20.000031 12 20 12 20 C 12 20 18.254453 20.000031 19.814453 19.582031 C 20.674453 19.352031 21.352031 18.674453 21.582031 17.814453 C 22.000031 16.254453 22 12 22 12 C 22 12 22.000031 7.7455469 21.582031 6.1855469 C 21.352031 5.3255469 20.674453 4.6479688 19.814453 4.4179688 C 18.254453 3.9999687 12 4 12 4 z M 12 6 C 14.882 6 18.490875 6.1336094 19.296875 6.3496094 C 19.465875 6.3946094 19.604391 6.533125 19.650391 6.703125 C 19.891391 7.601125 20 10.342 20 12 C 20 13.658 19.891391 16.397875 19.650391 17.296875 C 19.605391 17.465875 19.466875 17.604391 19.296875 17.650391 C 18.491875 17.866391 14.882 18 12 18 C 9.119 18 5.510125 17.866391 4.703125 17.650391 C 4.534125 17.605391 4.3956094 17.466875 4.3496094 17.296875 C 4.1086094 16.398875 4 13.658 4 12 C 4 10.342 4.1086094 7.6011719 4.3496094 6.7011719 C 4.3946094 6.5331719 4.533125 6.3946094 4.703125 6.3496094 C 5.508125 6.1336094 9.118 6 12 6 z M 10 8.5351562 L 10 15.464844 L 16 12 L 10 8.5351562 z" fill="#919191"/></svg>';
          }
          return '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path d="M7.22602 9.27842L5.17192 11.3326C5.17192 11.3326 5.17192 11.3326 5.17187 11.3326C5.17187 11.3326 5.17187 11.3327 5.17183 11.3327C4.32239 12.1821 2.94018 12.1822 2.09065 11.3327C1.67911 10.9211 1.45252 10.374 1.45252 9.79203C1.45252 9.21015 1.67911 8.66309 2.09051 8.25154C2.09056 8.25149 2.09061 8.25144 2.09065 8.25139L4.14475 6.19725C4.42833 5.91362 4.42833 5.45375 4.1447 5.17017C3.86112 4.88659 3.40126 4.88659 3.11763 5.17017L1.06353 7.22432C1.06339 7.22447 1.06324 7.22466 1.0631 7.2248C0.377557 7.91058 0 8.82233 0 9.79203C0 10.762 0.377702 11.6739 1.06358 12.3597C1.77154 13.0676 2.70139 13.4216 3.63129 13.4216C4.56119 13.4216 5.49109 13.0676 6.19895 12.3597C6.199 12.3597 6.199 12.3596 6.199 12.3596L8.25309 10.3055C8.53667 10.0219 8.53667 9.56205 8.25305 9.27842C7.96951 8.99484 7.5097 8.99484 7.22602 9.27842Z" fill="#919191"/>\n    <path d="M13.4249 3.62955C13.4249 2.65961 13.0472 1.74772 12.3613 1.06184C10.9455 -0.353972 8.64171 -0.353923 7.22595 1.06184C7.2259 1.06194 7.2258 1.06199 7.22576 1.06209L5.17171 3.11609C4.88808 3.39967 4.88808 3.85958 5.17171 4.14316C5.31357 4.28502 5.49939 4.35591 5.68527 4.35591C5.87109 4.35591 6.05701 4.28497 6.19878 4.14316L8.25283 2.08916C8.25288 2.08906 8.25297 2.08901 8.25307 2.08892C9.1025 1.23949 10.4847 1.23944 11.3342 2.08892C11.7457 2.50046 11.9724 3.04762 11.9724 3.62955C11.9724 4.21143 11.7458 4.75849 11.3344 5.17004L11.3342 5.17018L9.28014 7.22433C8.99656 7.50791 8.99656 7.96778 9.28019 8.2514C9.42201 8.39322 9.60788 8.46415 9.7937 8.46415C9.97958 8.46415 10.1655 8.39322 10.3073 8.2514L12.3614 6.19726C12.3615 6.19711 12.3617 6.19692 12.3618 6.19677C13.0473 5.51099 13.4249 4.59925 13.4249 3.62955Z" fill="#919191"/>\n    <path d="M4.14491 9.27836C4.28672 9.42018 4.4726 9.49111 4.65842 9.49111C4.8443 9.49111 5.03017 9.42018 5.17198 9.27836L9.28028 5.17007C9.56391 4.88649 9.56391 4.42663 9.28028 4.143C8.9967 3.85942 8.53683 3.85942 8.2532 4.143L4.14491 8.25124C3.86128 8.53492 3.86128 8.99479 4.14491 9.27836Z" fill="#919191"/>\n</svg>';
        }
        function replaceAttrInPopupHtml(html) {
          return html.replace(/send-text/gi, "data-alan-btn-send-text").replace(/call-project-api/gi, "data-alan-btn-call-project-api").replace(/project-api-param/gi, "data-alan-btn-project-api-param");
        }
        function processClickByButtonInPopup(clickedEl, btnInstance, sendTextCall) {
          var elWithSendText = clickedEl.closest("[data-alan-btn-send-text]");
          if (elWithSendText) {
            var text = elWithSendText.getAttribute("data-alan-btn-send-text");
            if (text) {
              sendTextCall(text);
              return;
            }
          }
          var elWithCallProjectApi = clickedEl.closest("[data-alan-btn-call-project-api]");
          if (elWithCallProjectApi) {
            var method = elWithCallProjectApi.getAttribute("data-alan-btn-call-project-api");
            var data = null;
            try {
              data = elWithCallProjectApi.getAttribute("data-alan-btn-project-api-param");
              data = JSON.parse(data);
            } catch (err) {
              console.log("Alan: unable to parse params for calling project api method");
            }
            if (method) {
              btnInstance.callProjectApi(method, data);
              return;
            }
          }
        }
        (function(ns) {
          var alanButtonVersion = "alan-version.1.8.53";
          alanButtonVersion = alanButtonVersion.replace("alan-version.", "");
          if (window.alanBtn) {
            console.warn("Alan: the Alan Button source code has already added (v." + alanButtonVersion + ")");
          }
          var alanAltPrefix = "Alan voice assistant";
          var currentProjectId = null;
          var deviceId;
          var firstClick = null;
          var btnInstance;
          var isLocalStorageAvailable = false;
          try {
            localStorage.getItem("test");
            isLocalStorageAvailable = true;
          } catch (e) {
            isLocalStorageAvailable = false;
          }
          var isSessionStorageAvailable = false;
          try {
            sessionStorage.getItem("test");
            isSessionStorageAvailable = true;
          } catch (e) {
            isSessionStorageAvailable = false;
          }
          function printNavigatorFlag(flag) {
            return flag ? "1" : "0";
          }
          function getDebugInfo() {
            return "\n        Debug Info:\n        alanBtn: v.".concat(alanButtonVersion, "\n        alanSDK: v.").concat(window.alanSDKVersion, "\n        projectId: ").concat(currentProjectId || "unknown", "\n        deviceId: ").concat(getDeviceId(), "\n        navigator: \n        getUserMedia: ").concat(printNavigatorFlag(navigator.getUserMedia), ", \n        mediaDevices: ").concat(printNavigatorFlag(navigator.mediaDevices), ", \n        mediaDevices.getUserMedia: ").concat(printNavigatorFlag(navigator.mediaDevices && navigator.mediaDevices.getUserMedia), ",\n        webkitGUM: ").concat(printNavigatorFlag(navigator.webkitGetUserMedia), ",\n        mozGUM: ").concat(printNavigatorFlag(navigator.mozGetUserMedia), ",\n        msGUM: ").concat(printNavigatorFlag(navigator.msGetUserMedia), ",\n        window:\n        AudioContext: ").concat(printNavigatorFlag(window.AudioContext), ",\n        webkitAC: ").concat(printNavigatorFlag(window.webkitAudioContext), ",\n        mozAC: ").concat(printNavigatorFlag(window.mozAudioContext), ",\n        userAgent: ").concat(navigator.userAgent, "\n        ");
          }
          function getDeviceId() {
            if (!currentProjectId)
              return;
            var deviceIdKey = "alan-btn-uuid-" + currentProjectId;
            if (isLocalStorageAvailable) {
              deviceId = localStorage.getItem(deviceIdKey);
            }
            if (!deviceId) {
              deviceId = guid();
              if (isLocalStorageAvailable) {
                localStorage.setItem(deviceIdKey, deviceId);
              }
            }
            return deviceId;
          }
          function guid() {
            function s4() {
              return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
            }
            return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
          }
          var AlanButtonTextMessageType;
          (function(AlanButtonTextMessageType2) {
            AlanButtonTextMessageType2["Request"] = "request";
            AlanButtonTextMessageType2["Response"] = "response";
          })(AlanButtonTextMessageType || (AlanButtonTextMessageType = {}));
          function alanBtn2(options2) {
            options2 = options2 || {};
            var btnDisabled = true;
            var btnIsReady = false;
            var hideS2TPanel = false;
            var popupEnabled = true;
            var pinned = false;
            var absolutePosition = false;
            var micWasStoppedByTimeout = false;
            var keepButtonPositionAfterDnD = false;
            var dragAndDropEnabled = true;
            var curDialogId = null;
            var textChatIsHidden = true;
            var textChatIsAvailable = false;
            var voiceEnabledInTextChat = true;
            var textChatMessages = [];
            var textChatOptions = null;
            var clearChatIsInProcess = false;
            var textChatScrollPosition = null;
            var sentMessageInd = null;
            var sentMessages = [];
            var defaultMinChatHeight = 400;
            var defaultChatHeight = 700;
            var defaultMinChatWidth = 250;
            var chatHeaderHeight = 40;
            var chatTextareaLineHieght = 1.25;
            var textareaHolderHeight = 67;
            var chatTextareaHeight = 50;
            var chatMicBtnActiveSize = 34;
            var textChatScrollSize = 6;
            var textChatAppearAnimationMs = 200;
            var defaultChatMargin = 25;
            var defaultChatTextareaFontSize = 15;
            var textToSpeachVoiceEnabled = getVoiceEnabledFlag();
            var mode;
            if (options2.mode === "tutor") {
              mode = "tutor";
              pinned = true;
            } else if (options2.mode === "demo") {
              mode = "demo";
            } else {
              mode = "component";
            }
            console.log("Alan: v." + alanButtonVersion);
            if (window.tutorProject && !isTutorMode() && btnInstance) {
              if (currentProjectId === options2.key) {
                return btnInstance;
              }
              throw new Error("The Alan Button instance has already been created. There cannot be two Alan Button instances created at the same time connected to the different projects.");
            }
            btnInstance = {
              // Common public API
              version: alanButtonVersion,
              setVisualState: function(visualStateData) {
                if (btnDisabled) {
                  return;
                }
                if (window.tutorProject) {
                  window.tutorProject.setVisual(visualStateData);
                }
              },
              callProjectApi: function(method, data, callback) {
                var methodPrefix = "script::";
                if (btnDisabled) {
                  return;
                }
                if (!method) {
                  throw new Error("Function name for callProjectApi must be provided");
                }
                if (window.tutorProject) {
                  if (method.indexOf(methodPrefix) === 0) {
                    window.tutorProject.call(method, data, callback);
                  } else {
                    window.tutorProject.call(methodPrefix + method, data, callback);
                  }
                }
              },
              playText: function(text) {
                if (btnDisabled) {
                  return;
                }
                if (window.tutorProject) {
                  window.tutorProject.call("play", {
                    text
                  });
                }
              },
              playCommand: function(command) {
                if (btnDisabled) {
                  return;
                }
                alanAudio2.playCommand({
                  data: command
                });
              },
              activate: function() {
                return activateAlanButton({ activate: true });
              },
              deactivate: function() {
                deactivateAlanButton();
              },
              isActive: function() {
                return isAlanActive;
              },
              sendText: function(text) {
                _sendText(text);
              },
              textChat: {
                setAudioOutputEnabled: function(value) {
                  if (value === true) {
                    enableAudio(true);
                  } else {
                    disableAudio(true);
                  }
                },
                isAudioOutputEnabled: function() {
                  return textToSpeachVoiceEnabled;
                }
              },
              //deprecated
              callClientApi: function(method, data, callback) {
                console.error('The "callClientApi" method is deprecated. Please use the "callProjectApi: instead.\n\nSee more info here: https://alan.app/docs/client-api/methods/common-api/?highlight=callprojectapi#callprojectapi');
                if (btnDisabled) {
                  return;
                }
                if (window.tutorProject) {
                  window.tutorProject.call(method, data, callback);
                }
              },
              // deprecated
              setAuthData: function(data) {
                console.error('The "setAuthData" method is deprecated. Please use the "authData" property when you create the Alan Button.\n\nSee more info here:  https://alan.app/docs/server-api/sending-data/authdata/?highlight=authdata');
                if (btnDisabled) {
                  return;
                }
                if (window.tutorProject) {
                  window.tutorProject.close();
                  window.tutorProject = window.alan.project(options2.key, getAuthData(data), options2.host);
                  window.tutorProject.on("connectStatus", onConnectStatusChange);
                  window.tutorProject.on("options", onOptionsReceived);
                }
              },
              // Other methods
              setOptions: function(options3) {
                onOptionsReceived(options3);
              },
              setPreviewState: function(state2) {
                switchState(state2);
              },
              remove: function() {
                alanAudio2.stop();
                window.tutorProject.close();
                window.tutorProject.off("scripts", onScriptsCb);
                window.tutorProject.off("text", onTextCbInMicBtn);
                window.tutorProject.off("parsed", onParsedCbInMicBtn);
                alanAudio2.off("command", onCommandCbInMicBtn);
                alanAudio2.off("afterText", onAfterTextCbInMicBtn);
                rootEl.innerHTML = "";
                btnInstance = null;
                if (!isTutorMode()) {
                  window.tutorProject = null;
                }
              },
              stop: function() {
                alanAudio2.stop();
              },
              updateButtonState: function(state2) {
                onConnectStatusChange(state2);
              },
              sendEvent: sendUserEvent
            };
            document.addEventListener("click", resumeAudioCtx);
            function resumeAudioCtx() {
              alanAudio2.resumeAudioCtx();
              document.removeEventListener("click", resumeAudioCtx);
            }
            function sendUserEvent(eventName, eventValue) {
              var obj = eventValue ? { name: eventName, value: eventValue } : { name: eventName };
              sendClientEvent(obj);
            }
            function sendClientEvent(param) {
              if (window.tutorProject) {
                window.tutorProject.call("clientEvent", param);
              } else {
                setTimeout(function() {
                  return sendClientEvent(param);
                }, 3e3);
              }
            }
            var host = "studio.alan.app";
            var baseUrl = "https://" + (host.indexOf("$") === 0 || host === "" ? window.location.host : host);
            if (options2.host) {
              baseUrl = "https://" + options2.host;
            }
            if (options2.position === "absolute" || options2.pinned) {
              pinned = true;
            }
            if (options2.position === "absolute") {
              absolutePosition = true;
            }
            var btnStateMapping = {
              "default": "ONLINE",
              "offline": "OFFLINE",
              "disconnected": "CONNECTING",
              "listening": "LISTEN",
              "understood": "PROCESS",
              "intermediate": "PROCESS",
              "speaking": "REPLY",
              "permissionDenied": "NO_PERMISSION",
              "noVoiceSupport": "NO_VOICE_SUPPORT",
              "notSecureOrigin": "INSECURE_ORIGIN"
            };
            var DEFAULT = "default";
            var LISTENING = "listening";
            var SPEAKING = "speaking";
            var INTERMEDIATE = "intermediate";
            var UNDERSTOOD = "understood";
            var DISCONNECTED = "disconnected";
            var OFFLINE = "offline";
            var LOW_VOLUME = "lowVolume";
            var PERMISSION_DENIED = "permissionDenied";
            var NO_VOICE_SUPPORT = "noVoiceSupport";
            var NOT_SECURE_ORIGIN = "notSecureOrigin";
            var MIC_BLOCKED_MSG = "Microphone access is blocked in your browser settings. Enable it to allow the voice assistant using your microphone";
            var NO_VOICE_SUPPORT_IN_BROWSER_MSG = "Your browser doesn’t support voice input. If you think your browser supports voice input, please send the Debug info below to support@alan.app. " + getDebugInfo();
            var NOT_SECURE_ORIGIN_MSG = 'Audio is allowed only on a secure connection: make sure your connection protocol is under HTTPS, HTTP on localhost or file. A connection over the file protocol may not work in some browsers, e.g., in Safari. Now you are running with "' + window.location.protocol + '" protocol and "' + window.location.hostname + '" hostname';
            var LOW_VOLUME_MSG = "Low volume level";
            var OFFLINE_MSG = "You're offline";
            var currentErrMsg = null;
            var NO_VOICE_SUPPORT_IN_BROWSER_CODE = "browser-does-not-support-voice-input";
            var MIC_BLOCKED_CODE = "microphone-access-blocked";
            var PREVIEW_MODE_CODE = "preview-mode";
            var BTN_IS_DISABLED_CODE = "btn-is-disabled";
            var NO_ALAN_AUDIO_INSANCE_WAS_PROVIDED_CODE = "no-alan-audio-instance-was-provided";
            var state = DISCONNECTED;
            var previousState = null;
            var isAlanSpeaking = false;
            var isAlanActive = false;
            var isLeftAligned = false;
            var isRightAligned = true;
            var isTopAligned = false;
            var isBottomAligned = false;
            var recognisedTextVisible = false;
            var playReadyToListenSound = true;
            var turnOffTimeout = 3e4;
            var turnOffVoiceFn;
            var dndInitMousePos = [0, 0];
            var dndIsDown = false;
            var btnWasMoved = false;
            var afterMouseMove = false;
            var dndFinalHorPos = null;
            var dndBtnLeftPos = 0;
            var dndBtnTopPos;
            var dndAnimDelay = 300;
            var tempDeltaX = 0, tempDeltaY = 0;
            var dndAnimTransition = dndAnimDelay + "ms";
            var dndBackAnimFinished = true;
            function setTurnOffVoiceTimeout() {
              turnOffVoiceFn = debounce(function() {
                if (isAlanActive) {
                  if (isAlanSpeaking) {
                    turnOffVoiceFn();
                  } else {
                    alanAudio2.stop();
                    micWasStoppedByTimeout = true;
                  }
                }
              }, turnOffTimeout);
            }
            setTurnOffVoiceTimeout();
            var switchToLowVolumeStateTimer = null;
            var pulsatingAnimation = "";
            var pulsatingMicAnimation = "";
            var pulsatingTriangleMicAnimation = "";
            if (!isPreviewMode()) {
              pulsatingAnimation = "alan-pulsating 2s ease-in-out infinite";
              pulsatingMicAnimation = "alan-mic-pulsating 1.4s ease-in-out infinite";
              pulsatingTriangleMicAnimation = "alan-triangle-mic-pulsating 1.2s ease-in-out infinite";
            }
            var pulsatingAnimationForMicBtnInTextChat = "alan-text-chat-pulsating 2s ease-in-out infinite";
            var gradientAnimation = "alan-gradient 3s ease-in-out infinite";
            var disconnectedLoaderAnimation = "disconnected-loader-animation 2s linear infinite";
            var alanAudio2 = window.alanAudio;
            var rootEl = options2.rootEl || document.createElement("div");
            var body = document.getElementsByTagName("body")[0];
            var btn = document.createElement("div");
            var noWiFiChatIcon = '<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M7.90233 10.4566C7.52988 9.72656 6.63602 9.42857 5.90602 9.78613C4.95254 10.2629 4.02887 11.0525 3.32866 11.708C2.71784 12.2593 2.68803 13.2127 3.23926 13.8086C3.53722 14.1215 3.93946 14.2854 4.34171 14.2854C4.69926 14.2854 5.05681 14.1513 5.35477 13.898C5.65273 13.6298 6.54661 12.7956 7.24682 12.4529C7.97682 12.0805 8.27478 11.1866 7.91723 10.4566H7.90233Z" />\n        <path d="M32.1414 11.4398C28.1636 7.92391 23.0983 5.9872 17.884 5.9872C15.4258 5.9872 13.0273 6.40437 10.733 7.22376C10.6883 7.23866 10.6436 7.28335 10.5989 7.31315L8.40888 4.97415C7.84276 4.37823 6.9042 4.33355 6.30828 4.89967C5.71236 5.4658 5.68256 6.40434 6.23379 7.00026L27.091 29.3472C27.3889 29.6601 27.7763 29.824 28.1785 29.824C28.5361 29.824 28.9085 29.6899 29.1916 29.4217C29.7875 28.8556 29.8173 27.917 29.2661 27.3211L18.2714 15.5368C21.5638 15.6411 24.6328 17.0266 26.9718 19.4848C27.2698 19.7976 27.6571 19.9466 28.0444 19.9466C28.4169 19.9466 28.7893 19.8127 29.0724 19.5296C29.6683 18.9635 29.6981 18.0248 29.132 17.4288C26.1375 14.2705 22.1299 12.5424 17.884 12.5424C17.1391 12.5424 16.3942 12.6019 15.6642 12.7062C15.6642 12.7062 15.6493 12.7062 15.6344 12.7062L12.8187 9.68189C14.4575 9.20515 16.1558 8.9519 17.884 8.9519C22.3683 8.9519 26.7334 10.6205 30.1749 13.6597C30.4579 13.913 30.8155 14.0322 31.1581 14.0322C31.5753 14.0322 31.9775 13.8682 32.2755 13.5256C32.8267 12.9148 32.7671 11.9613 32.1414 11.425V11.4398Z" />\n        <path d="M12.2079 15.1643C11.7908 14.4492 10.882 14.2109 10.1669 14.628C8.94526 15.3282 7.8279 16.2072 6.82973 17.2203C6.24871 17.8013 6.26361 18.7548 6.82973 19.3209C7.12769 19.6039 7.50014 19.7529 7.87259 19.7529C8.24504 19.7529 8.64731 19.6039 8.93037 19.306C9.74976 18.4717 10.6585 17.7715 11.6418 17.1905C12.3569 16.7733 12.5953 15.8645 12.1781 15.1494L12.2079 15.1643Z" />\n        <path d="M16.7666 20.3637C16.5282 19.5741 15.694 19.1421 14.9044 19.3805C13.355 19.8572 11.8354 21.2874 11.0756 22.0919C10.5094 22.6878 10.5243 23.6263 11.1352 24.1924C11.4182 24.4605 11.7907 24.6097 12.1631 24.6097C12.5505 24.6097 12.9527 24.4607 13.2358 24.1478C14.1595 23.1795 15.1576 22.4346 15.7833 22.2409C16.5729 22.0025 17.005 21.1682 16.7666 20.3786V20.3637Z" />\n        <path d="M17.7499 29.7644C18.7785 29.7644 19.6122 28.9307 19.6122 27.9021C19.6122 26.8737 18.7785 26.0399 17.7499 26.0399C16.7214 26.0399 15.8877 26.8737 15.8877 27.9021C15.8877 28.9307 16.7214 29.7644 17.7499 29.7644Z"/>\n        </svg>\n        ';
            var disconnectedChatIcon = '\n        <svg class="alan-btn_disconnected-chat-icon-rotate" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path opacity="0.8" fill-rule="evenodd" clip-rule="evenodd" d="M24.0579 3.47502C18.5874 0.922942 12.1534 1.67973 7.4383 5.76748C2.7232 9.85523 1.24337 15.2725 2.34798 20.767C3.45259 26.2615 7.87342 31.0097 13.2994 32.4594C19.715 34.174 26.6107 31.7302 30.2577 26.2615C26.9893 30.6213 20.7089 33.242 15.1228 32.2771C9.62181 31.3275 4.71002 26.606 3.45259 21.1573C2.11284 15.3541 3.59462 10.949 8.37598 6.57398C13.1573 2.19898 22.9638 1.8344 28.2519 8.2146C29.2614 9.43264 30.6224 11.6781 30.9871 14.4125C31.1694 15.5063 31.1694 15.6886 31.3518 16.6C31.3518 16.9646 31.7165 17.3292 32.0812 17.3292C32.6282 17.3292 33.0612 16.918 32.9929 16.2354C32.4459 10.7667 29.0622 5.80967 24.0579 3.47502Z" fill="#B8B6B6"/>\n        </svg>';
            var sendChatIcon = '\n        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M28.0134 15.9238L8.98646 6.40981C7.82892 5.83162 6.75249 5.99963 6.17778 6.77248C5.89042 7.15832 5.61697 7.85122 5.94952 8.96241L8.09542 16.1092C8.39668 17.1138 8.39668 18.8797 8.09542 19.8843L5.94952 27.0311C5.61697 28.1423 5.88926 28.8363 6.17662 29.2222C6.51959 29.681 7.04564 29.9348 7.65743 29.9348C8.07109 29.9348 8.51834 29.8166 8.9853 29.5837L28.0134 20.0697C28.9635 19.5946 29.5093 18.838 29.5093 17.9968C29.5093 17.1555 28.9647 16.3989 28.0134 15.9238ZM8.27386 27.3486L10.3155 20.5494C10.4383 20.1403 10.5217 19.6606 10.575 19.1554H16.6868C17.3276 19.1554 17.8455 18.6375 17.8455 17.9968C17.8455 17.356 17.3276 16.8381 16.6868 16.8381H10.575C10.5217 16.3329 10.4395 15.8532 10.3155 15.4441L8.27386 8.64493L26.9775 17.9968L8.27386 27.3486Z" fill="#B8B6B6"/>\n        </svg>';
            var chatMicIcon = '\n        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M18.2623 24.0476C16.7915 24.0458 15.3814 23.4608 14.3414 22.4208C13.3014 21.3808 12.7164 19.9707 12.7147 18.5V10.7333C12.7147 9.26204 13.2992 7.85099 14.3395 6.81061C15.3799 5.77024 16.791 5.18576 18.2623 5.18576C19.7336 5.18576 21.1446 5.77024 22.185 6.81061C23.2254 7.85099 23.8099 9.26204 23.8099 10.7333V18.5C23.8081 19.9707 23.2231 21.3808 22.1831 22.4208C21.1431 23.4608 19.733 24.0458 18.2623 24.0476ZM18.2623 7.4048C17.3798 7.40576 16.5337 7.75676 15.9097 8.38078C15.2857 9.00479 14.9347 9.85086 14.9337 10.7333V18.5C14.9337 19.3828 15.2844 20.2294 15.9086 20.8536C16.5329 21.4778 17.3795 21.8285 18.2623 21.8285C19.1451 21.8285 19.9917 21.4778 20.6159 20.8536C21.2401 20.2294 21.5908 19.3828 21.5908 18.5V10.7333C21.5899 9.85086 21.2389 9.00479 20.6148 8.38078C19.9908 7.75676 19.1448 7.40576 18.2623 7.4048ZM28.2479 18.5C28.2479 18.2057 28.131 17.9235 27.923 17.7154C27.7149 17.5073 27.4327 17.3905 27.1384 17.3905C26.8441 17.3905 26.5619 17.5073 26.3539 17.7154C26.1458 17.9235 26.0289 18.2057 26.0289 18.5C26.0289 20.5598 25.2106 22.5353 23.7541 23.9918C22.2976 25.4483 20.3221 26.2666 18.2623 26.2666C16.2024 26.2666 14.227 25.4483 12.7704 23.9918C11.3139 22.5353 10.4956 20.5598 10.4956 18.5C10.4956 18.2057 10.3788 17.9235 10.1707 17.7154C9.9626 17.5073 9.68039 17.3905 9.38613 17.3905C9.09187 17.3905 8.80966 17.5073 8.60158 17.7154C8.39351 17.9235 8.27661 18.2057 8.27661 18.5C8.27661 21.1483 9.32867 23.6882 11.2013 25.5609C13.074 27.4336 15.6139 28.4856 18.2623 28.4856C20.9106 28.4856 23.4505 27.4336 25.3232 25.5609C27.1959 23.6882 28.2479 21.1483 28.2479 18.5ZM19.3718 30.7047V27.3761C19.3718 27.0818 19.2549 26.7996 19.0468 26.5916C18.8387 26.3835 18.5565 26.2666 18.2623 26.2666C17.968 26.2666 17.6858 26.3835 17.4777 26.5916C17.2696 26.7996 17.1528 27.0818 17.1528 27.3761V30.7047C17.1528 30.9989 17.2696 31.2811 17.4777 31.4892C17.6858 31.6973 17.968 31.8142 18.2623 31.8142C18.5565 31.8142 18.8387 31.6973 19.0468 31.4892C19.2549 31.2811 19.3718 30.9989 19.3718 30.7047Z" fill="#171717"/>\n        </svg>\n        <div class="alan-text-chat__animated-btn-bars">\n            <div class="alan-text-chat__bar alan-text-chat__bar-1"></div>\n            <div class="alan-text-chat__bar alan-text-chat__bar-2"></div>\n            <div class="alan-text-chat__bar alan-text-chat__bar-3"></div>\n            <div class="alan-text-chat__bar alan-text-chat__bar-3"></div>\n            <div class="alan-text-chat__bar alan-text-chat__bar-2"></div>\n            <div class="alan-text-chat__bar alan-text-chat__bar-1"></div>\n        </div>';
            var chatNoMicIcon = '<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9675 16.3602V18.6166C12.9692 20.0539 13.541 21.432 14.5574 22.4483C15.5738 23.4647 16.9518 24.0365 18.3892 24.0382C19.2643 24.0371 20.1175 23.8248 20.8804 23.4294L19.0569 21.8003C18.8389 21.846 18.6153 21.8695 18.3892 21.8695C17.5264 21.8695 16.699 21.5268 16.089 20.9168C15.4789 20.3067 15.1362 19.4793 15.1362 18.6166V18.2976L12.9675 16.3602ZM21.6421 16.7466V11.0263C21.6412 10.1638 21.2982 9.33696 20.6883 8.72712C20.0785 8.11727 19.2516 7.77424 18.3892 7.7733C17.5267 7.77424 16.6999 8.11727 16.09 8.72712C15.5048 9.31233 15.1653 10.0974 15.138 10.9219L13.2678 9.24713C13.5339 8.48102 13.9711 7.77698 14.5555 7.1926C15.5723 6.17585 16.9513 5.60464 18.3892 5.60464C19.8271 5.60464 21.2061 6.17585 22.2228 7.1926C23.2396 8.20935 23.8108 9.58837 23.8108 11.0263V18.6166C23.8108 18.6404 23.8106 18.6643 23.8102 18.6882L21.6421 16.7466ZM22.5782 24.9462C21.345 25.7623 19.89 26.2068 18.3892 26.2068C16.3761 26.2068 14.4455 25.4071 13.022 23.9837C11.5986 22.5602 10.7989 20.6296 10.7989 18.6166C10.7989 18.329 10.6847 18.0532 10.4813 17.8498C10.2779 17.6465 10.0021 17.5322 9.71457 17.5322C9.42699 17.5322 9.15118 17.6465 8.94783 17.8498C8.74448 18.0532 8.63024 18.329 8.63024 18.6166C8.63024 21.2048 9.65841 23.687 11.4886 25.5172C13.0613 27.0899 15.1156 28.0704 17.3048 28.3151V30.5441C17.3048 30.8317 17.4191 31.1075 17.6224 31.3109C17.8258 31.5142 18.1016 31.6285 18.3892 31.6285C18.6768 31.6285 18.9526 31.5142 19.1559 31.3109C19.3593 31.1075 19.4735 30.8317 19.4735 30.5441V28.3151C21.2027 28.1218 22.8477 27.4695 24.2378 26.4288L22.5782 24.9462ZM27.5342 22.0231L25.7589 20.4332C25.9042 19.8436 25.9794 19.2339 25.9794 18.6166C25.9794 18.329 26.0937 18.0532 26.297 17.8498C26.5004 17.6465 26.7762 17.5322 27.0638 17.5322C27.3514 17.5322 27.6272 17.6465 27.8305 17.8498C28.0339 18.0532 28.1481 18.329 28.1481 18.6166C28.1481 19.7909 27.9364 20.9434 27.5342 22.0231Z" fill="#B8B6B6"/>\n        <path d="M8.18825 6.56812L31.2883 27.1759C31.8123 27.6433 31.8581 28.4471 31.3906 28.9711C30.9232 29.4951 30.1194 29.5409 29.5954 29.0735L6.49538 8.46573C5.97137 7.99826 5.92553 7.1945 6.39301 6.67049C6.86048 6.14648 7.66424 6.10065 8.18825 6.56812Z" fill="#B8B6B6"/>\n        </svg>\n        ';
            var micIconSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH9SURBVHgB7dvvUcIwGMfxByfADdjAEdQN3EA2YATcAJ2AEXADdALcgG4AGzwm13DQkNKWQBvK93OXF4W0Z36mf5IUEQAAAAAAAAAAgPOo6ocpS91bmfIuOM2ENHJhlVnbOoIwF1CVleCYCWas9U0kEQ+SjibXuDdJxEASYbtVg+rbwWDwKAm41QDFBJjE357SKXyTCDASAUYiwEgEGIkAIxFgJAKMRICRWgvQTRZs3IzLxef2rn38zmlxqmoT+L6Rpse/ltbGk36j/bFsKJRTqvZva6zc2TXQtHfofbSV+rYVx2pNmwFm3vbI2/6R+r4rjvUnLWkzQL9Rz972l9T3WXGsTPrGTsN794FloM5Uq00D+/kLUb28Cw8DYbwE6k1LgrOPKJNA/dBaykj6SItrvdZaAzcAzZc3bTBzVyYl9YZ6vJK3kL6yPS7QW+ZyJhvW3fS+HdPAWaDRiyYNdz1vecl/xs0oOe12p3Plxd+d2mX7t/482MnKlutt9i48CnydSf5M+Cv7xxFb78mUsSnDkn1ezeAjk3uh+Y0i1JOaWuu9vi/jTueZns/u29kwLhma98Z5g+CWpjwLirT4/Oezn01S63HJvNrhs4kdbqfyKoePKf1IBBiJACMRYCQCjESAkVIO8HDhKBM0o/tZFzsTzY9sAAAAAAAAAABAjH+9EqX09fBHaQAAAABJRU5ErkJggg==";
            var alanLogoIconSrc = "data:image/png;base64,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";
            var roundedTriangleSecondLayerSrc = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjEgKDY3MDQ4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5BbGFuIEJ1dHRvbiAvIEFuaW1hdGlvbiAvIGJ1dHRvbi1pbm5lci1zaGFwZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iMTAwJSIgeTE9IjMuNzQ5Mzk5NDZlLTMxJSIgeDI9IjIuODYwODIwMDklIiB5Mj0iOTcuMTM5MTc5OSUiIGlkPSJsaW5lYXJHcmFkaWVudC0xIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjEyIiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4wNCIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJBbGFuLUJ1dHRvbi0vLUFuaW1hdGlvbi0vLWJ1dHRvbi1pbm5lci1zaGFwZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTQwLjEwMDU0MjIsOSBMNDAuMTAwNTQyMiw5IEM1MC4wNzA0NzUxLDkgNTkuMTUxNjIzNSwxNC43MzM3OTM4IDYzLjQzODA5OCwyMy43MzUyMjE0IEw3MC40MjIwMjY3LDM4LjQwMTE5NyBDNzUuMTcxMDE0NSw0OC4zNzM4ODQ0IDcwLjkzNjM2OTMsNjAuMzA4MTYwMSA2MC45NjM2ODE5LDY1LjA1NzE0NzggQzU4LjI3NzU5NDksNjYuMzM2MjYwOCA1NS4zMzk5NzQ0LDY3IDUyLjM2NDg3ODksNjcgTDI3LjgzNjIwNTQsNjcgQzE2Ljc5MDUxMDQsNjcgNy44MzYyMDU0Myw1OC4wNDU2OTUgNy44MzYyMDU0Myw0NyBDNy44MzYyMDU0Myw0NC4wMjQ5MDQ1IDguNDk5OTQ0NTksNDEuMDg3Mjg0IDkuNzc5MDU3NiwzOC40MDExOTcgTDE2Ljc2Mjk4NjQsMjMuNzM1MjIxNCBDMjEuMDQ5NDYwOCwxNC43MzM3OTM4IDMwLjEzMDYwOTIsOSA0MC4xMDA1NDIyLDkgWiIgaWQ9ImlubmVyLWJnIiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50LTEpIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==\n";
            var circleSecondLayerSrc = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjEgKDY3MDQ4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5BbGFuIEJ1dHRvbiAvIEFuaW1hdGlvbiAvIGJ1dHRvbi1pbm5lci1zaGFwZS1zcGVha2luZyBiYWNrPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSIxMDAlIiB5MT0iMy43NDkzOTk0NmUtMzElIiB4Mj0iMi44NjA4MjAwOSUiIHkyPSI5Ny4xMzkxNzk5JSIgaWQ9ImxpbmVhckdyYWRpZW50LTEiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuMTIiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjA0IiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgogICAgPGcgaWQ9IkFsYW4tQnV0dG9uLS8tQW5pbWF0aW9uLS8tYnV0dG9uLWlubmVyLXNoYXBlLXNwZWFraW5nLWJhY2siIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxjaXJjbGUgaWQ9ImlubmVyLWJnIiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50LTEpIiBjeD0iNDAiIGN5PSI0MCIgcj0iMzIiPjwvY2lyY2xlPgogICAgPC9nPgo8L3N2Zz4=\n";
            var micIconDiv = document.createElement("div");
            var unreadChatMsgCount = 0;
            var chatHolderDiv = document.createElement("div");
            var chatDiv = document.createElement("div");
            chatDiv.id = "alan-text-chat";
            chatHolderDiv.appendChild(chatDiv);
            var chatNotificationsBubble = document.createElement("div");
            chatNotificationsBubble.id = "chat-notifications-bubble";
            chatNotificationsBubble.classList.add("alan-btn__chat-notifications-bubble");
            var defaultStateBtnIconImg = document.createElement("img");
            var listenStateBtnIconImg = document.createElement("img");
            var processStateBtnIconImg = document.createElement("img");
            var replyStateBtnIconImg = document.createElement("img");
            var logoState1 = document.createElement("img");
            var logoState2 = document.createElement("img");
            var logoState3 = document.createElement("img");
            var logoState4 = document.createElement("img");
            var logoState5 = document.createElement("img");
            var logoState6 = document.createElement("img");
            var logoState7 = document.createElement("img");
            var logoState8 = document.createElement("img");
            var logoState9 = document.createElement("img");
            var logoState10 = document.createElement("img");
            var roundedTriangleIconDiv = document.createElement("div");
            var circleIconDiv = document.createElement("div");
            var disconnectedMicLoaderIconImg = document.createElement("img");
            var lowVolumeMicIconImg = document.createElement("img");
            var noVoiceSupportMicIconImg = document.createElement("img");
            var offlineIconImg = document.createElement("img");
            var recognisedTextHolder = document.createElement("div");
            var recognisedTextContent = document.createElement("div");
            var soundOnAudioDoesNotExist = false;
            var soundOffAudioDoesNotExist = false;
            var soundNextAudioDoesNotExist = false;
            var soundNextColdPlay = true;
            var soundOnAudio = new Audio("data:audio/mp4;base64,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");
            soundOnAudio.onerror = function() {
              soundOnAudioDoesNotExist = true;
            };
            var soundOffAudio = new Audio("data:audio/mp4;base64,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");
            soundOffAudio.onerror = function() {
              soundOffAudioDoesNotExist = true;
            };
            var soundNextAudio = new Audio("data:audio/mp4;base64,AAAAHGZ0eXBNNEEgAAAAAE00QSBtcDQyaXNvbQAAAAFtZGF0AAAAAAAAEXohTMaAB//+fl/BB7eRCgV2mzE3qLQC1u4rDx0KkHPyP1u9BFKZpQkBB8EicZPF5QlOkEJ0CfxejbF3c+XEnaGMrrPIi1pFYX7RSRwfPCfji+Rm0yGDwXUvEbQDhsh2jUC3FkfyaOAfzkXvoQEqnC1FecwjgLVauoVSOWRDynF4XD1zKtfD1DCtfFZSrh98VEfFNJRghlwCehCn5OPSGuv5OW92wL6xXijBoPoR7iE7gq1Psxwd8XKRPwoaKeSNdlSVhTX3MJ0rTBlYIMMspkJnTNIQT1DMAVDDua4RiI33A9Bgso4voe3qbITeimbtNGJEKK3sIjpv14j7p5egilM0oSAn0vkZDH+NyHnXnJPuXnYn4RQQ47xIhprGQaZPAxCCI+PXymDl7blk2fSrBGW/RtGkHDsFCfZZnbOqlBqXrEoaglwjsBP0/81CHifxES7HtySnEZOCI1REkxruZ9h56hax83BiQV0uKLk2G2m2OROyNbBdMEgfGix5wKADUIpkBO4OoOnyb/URHgTSIvUpNkUivz4T40/RMpF135VpOcVi/jaiZkjUTRrzxqK6Um1gYb/vVhfr9VGpnvApXXcq7lVLPTrChM1tMzGeXoyG8hTagEkMw6ZaE5ERc7DQSnE5up6NxLY4gxG+MRABwCF6FGW2B2JhWGSm4jkrn5Pp7YOAIBQC2jq5AHE4l0m5hEQ/8vauaadaV6Rig03RaDMTNhQsLttn2EhHqY+X3Vi09fZuLsxQ6ctFn2fZ3NqSZLKp7maonEbMjAQd46NtmKuntwEGbzYzIVaVpYYjKI/xtGGCpGrjjCDHHi8X6x5qdfKRBYtAvk9FOwaMAn1Hw5StArWbfVLAXvY1ok4xaFbVqVqIhBMClwFKEAAAESQuUDYqDFZqVtXq/4fr56UQOFAFAK3N0z3Txb+17p1TCNJfVvWvz35LZzj8Zz79VIlSRdD0j6zj0OPK2BQfisWi13A5qpo/cvGvZOxf2vNNkqFPaS2N2Vsbt6tjkYDvvvdOjcw2y6ZpkqVVVZVUUtFmpyUWWNCtOJ4shO+7CR3E6URA6TFykd1ADamZJkB3d3rmOw6F4jazKsUzUN+T3nxqhzyh3qx4pwspSnZGTenE98n24zulbEnAgzTqJAWBYC1FVQJViHAhGgj98H///I2Gk2IyWKSIGwkGQkFwkFhIk68qHfyeeEFTyQQKALHxdRAdIoD4QfN9RmuCzV0ano4IIYQkMBLYw5UsuBOd2vYwha4Znoka6T10PtualGszgHPwKlU8/+2wLSGdRh5MxAWArV7MqAY9P+fe+LyuYpn2vqGL6trm2yLxwG13W2cJ3s/fjgpgSVnV3GJoCu4G1jsZoKqVJaCe5MV+y1hERS3hwy94k2xAv/net3ntB/4j9M5gQekdh6OsLB86SKxWRCBOqSBFMaviCl+H3ffUGS3jDY8VEFAbu8dbVHYZIwqCwkceRKV/R+66J0LASgAs+haA4Aw76UDgKJbIpkxhRvKizCNaix0SUwlxHjJCc1zDinkWRn3BKOykJBQt5hOOXyeSspyC6yjO0R11fRvvojZ1CjCkdKDAzBTQyKBreiARne+wEpYRim8EBgivVbR9XRhWqRtwZqMyOnLRchLUivXL0evSiKIQ8/EedgmCROhUA6RgN0PuXCiiNavaTJ78D2o6B7MxCmgroGewObQy5e20Vr4dFhy56RDX2fjofPSxrNBehgIBqIIa+T+l6HdgbanfByEaFFWOD2IyWKTEFwqRgoYhjQk3/Rp+uE4FwEKABLhUwjLPhLZq4TayevWHTW9Wr1waHfBDxqRl4D4dKUF9E9hoSxGo5/KSjwcvDFGCGRNjLKotWpO//S+xTc5SDJalVLHg/6HTKOCnO/NKkVhqfRxGsb0u4jWdKVUfz5b1E7gzwcYhZqTupGdbToNrUvFzgbHuZ2AVAOP2O7lMW7r4s+qBBiNGTzxXQ5vY7climkQHn2zy3M0KkNsoLj2yZFujsvyZoF13aFQfeJ25GGWUgI2wweyCSwudFsFCIu1nj7D6scDgEAKDArr2wfQrMgi+Fy5y/Fs1cjSMsi5NKRu9UIx5OXSgYxCkwR99kgj98ggDdSalWlfV/g4L5QVOsTVYTzzk+TGWrdDiZbKs3ld4n1BoVDKaYPhEUYVkSg+9wP1dfD6LR5yC7LwgU5wvcC+JdOUqms8TFBs9Q0Ob/sjAusvQyrjsZBJnPBlTQOSiwcrd8IpqFkI7oaBA3M84abyu3AUoE1Bk4UhJ7NXutUf8El2o7vwhGgj78H///IWwyWGSIKgsdEj+XK32D27HVxxgAABLHOJvCtjAbsqA6vfq46YbDRcLRAMj5B2lJnMiVSHjocCGH+H6dDaEUbRFMkrysRaKkNeMyq52F+q/JuyNFPVMPzpnhKkAz/7wjkGViMDc4VFIQIHb3ZQZw6PDkbVJCRcYkl3AEUEUANDM0oeFYol7QgzMIcjoCwFFUAwjkqMeszwNW40jpbVXI7PD69wiOkWvFerPV+QlR127inp+RwZbXHNMiV0mX4/HyswzrlSPOO9pVvMZ71+WlJSQBNyWut3h7GxLKJLDJWEkAho/4D+cccCUQJQAJZ2mTwkjQbgl4Drov1KDxKijrq06ABOLJIWM8SoDfRYMYW6GG7xoAvMItlphhOvvz0WpOf0P2HQNG4oL2q4Cpt4GTf45UioVRHlYk2Bux2AKFRLAIN3j3til3crhCfCLR69bYx20K2JIomzfmh3X2PB1JIRGm+Jg2+dE/Ixc4ZCOX51ZfWaVQ5cxEWlKmpg9QGhCms8XZimgIizxKkR8DC8Sv/gm5xBTkbzh3Pr6BbvwIRoI7xB7OXy1sMlhk7PILp/I5P6D+WJ7F89b1eXWcDChLy/QloYAzYoYfNDzjXJFUxgLAANaiZhy7GOFBfRPa9r2Ywz/5lUnmSKJDQyx25yy0NT1T1LhxCpiYvLGsKWyiI9JtWMvbXUC+RO5jABJmYPo10ED4OR2ikapTrZTr+dN+x9luN8+02c3kjEomW7zSWvup51yWYA1l+RpcZrXy1BdAEU5m6syGB1y68Nc+TfP48k3VNP+c6R1P5cWGMoH0H7dhyVyC8uz1c++mxe3d5klx2bJ3sncJbPJZdNfONtVwWroqCkYnel0kZ0BzcTg96EkpHbQCC3jIwoyAjLGx7FKULAmJAkDAWGgToXh4HTL11i93XG9MlRKjYqeGSglpKON9P+W6RoYusLfMwAOMSiSCXWKxPDinIBOndwUmrwxqz3T/+vS3jUS25axUbPH3o1raefpvMlDecmjWk+KVMeyAdyCYbkxHVsANzdNSMiGyTKCkVfenHcooJwDpj67gmFjNU0+geOug+WMoEgT7qKjFY6gvA5iGi88jFXvYgRQUaEro2njsxeESnoOymhCpV8qAKYwQDQRqJb0I3onQWTOQeL6yJX+vJ4BVTHKfTM1AwWOyjxJ1In3WsEiqVFMsOGnbuya+fvK2KstjYb4jFmeqVYJ7aym2UeNmXd+IRoO//i926x9idFiYlhdDOUJrhdtuTXW6OM4osq6rWKgEvKsxj8UIr37u4x2bey34cuAxhyqEjkLVTvaRgLsOKhIbvVLbASQW9czUVC+lNTnOGlJGzfVXoVMtTtt9zF7ZXTUz3VF3N3l3W2r12Wd4GBpc5JjOeblMxO5FKKgp1WDQFBQ74TaAUgMSNbbyC0KdQyE0S1TUcROxcgWZa8bnYgrDSQFTBkIIYINB0hLNzmGrvtvkWrDO2Qp1GCmQCUt6olVNQJSJuthTgE6EbAMErCbpOo7NnQ5seQzrbS8mV9M1VE5MU63g00KN/Hq7EI8nzLrZZ8V93OOvUQCPsansREsSCgSDgKCgTGgKBYKBcGrDweQkzzVWm9MXUq+eMEzEihcLj95i+eM4RfP22CSWRTBI8C5pneFmkYDuDZ12GSMgsK1hrQ4xg4einiWJRnGAHWrgEvpNLAHPkdozM7LvwVtukei8FxaE4UVpyiQ+Oyem/N7ZxcN/20eYuPitICE85F0MJJ4JThIkvEq1qzYG3hR11awmeUbnNwcEQinIorJnRHOuKUr65E/b7CuXUlcI9LsF9pgcqC8rtk6T5V3rAyX6K+NlJxPgtVVCpIUtLT4SjXiFNSqC16Z46ntA4yriETRbbyoqEYp3r1TNvp51t/Gl659bvwhGhRFlYtiYlhYcBYaGZKhBoPR1d0sQVaoIKAkOmRhz4jkRbRzgzGjTzWc+I4GmYPWfiTK3nSsAHyCKnlHfSt60uyNDwXoqa2BzgKGaFcxvWE0QA6hQHDOiFJainWQQ4rUP7V0glyb5LxCrpoHvvoBYPCFcctCUE4/8J2XmaZK3hY0ECA+Lz9H92PsciSRWMjdYs9NgziT3tDjU00xiYDFeE60wVwQAPZSriCK7WHSBIyO72LcU8oDSrGCex5r+CzXyQLtC3TyRXBWB33QbtQRWmVijLaQ23k4ZlPah2O4VFGt44ot8NyCIsZGsYkgLWMIb6pRwBd4tKSgSquqBIZPvsV0u4CtKrjnhFOi5GwYJJ3RSWwwdBCRLwv24SMH9ewRFRTEUpWFretjNRk3IgoaqTVz5WhWglCUusioRtKs2dmNVZKiSxSbLORpLFI0QAwN1QnK65nPmNx2Q5xesHWkBeMXo2k0FbQApmM58iORRECfi5izmIuQ5znYUK5FbfK4kklyBdD2AyizuwVSXRK0E2BIypEYwMzJLFIvSMEKmBODsUNEyxYwETrY2gIGIjI5j5Eiw0XtgyjIBFTc8Pp3bjghGhQ9ihFjYdBaCHAQFpS7CggFQBAgrPznO+HU4MWDUxhEngvuwAUSYeeLrr2a1VEKZx0Yj4HD7laJEogVFr8zqrAbojZPQ4z9V10sHDH96pTvtZ4eRZykhQJgfKvxkBFJgWBeEKcQMaII/SigpQYHNBwEEwhBXa3UnIaqoZWsMGYDmOWzNtokRWEgJSMllAJAK8rwMLaJG+LXGBG6Tqb7aKoapzNkJN2v4+uspoXomgSEAAczaTfM7ga0fR9zokgE4gwb+k/12kn5jxLSutL2YF8xtXNWxdrchWuAJTvD2JUWISQFiINmIQAGL4DrkWKgFIFmCmc2g88+fPHlqrBAB7+lE8BgbFlKgBiTj7M7pCMPgyI5OCGCQmKzrQSgkV8ca5EHyLHt+Kh9APUrLAz5qXMJDQsDCy6aWV82Aicrzi5ocr3U+0AtR7IatFe26g3rCqSsNEhMUWXICUshQZwNQPbMMBlYySm4OhLQTmlxWiqoYFVSIAaCSxrpgU4rCUglct7LaCwLWwIsNBKqktGTSTZcm+DQLMg+riPttNf9gJF0l/lR86H9N1Ox1uf+gFC/W78hGhQ1ihEiYqIYJBYKEYSGCpeK2vhKRnAVKRGWOQRu1yA8D+x/NRe94rS178YwI4qZoD3r9j759PdF/gilKoLfwtaXKap7rtY29dp7srocBXqD7pd554++DSmqMtYd3e0al0mm5l4uZOl8wog37m8XeNCc7lTKwiQNqMzPm9Ld2oAuHxOm9LuROd2ak97lMBnxePslqa4T6qzVzFTqwLJSIaj0xCMRkjVNdkmEvo2ki3fBMSAAel4PH9eU+VCvc07fICtLcOh4LfbOORavbs8/kiLotbu+goc5KUbu8HY2Io7Ej2Cg2OggNoBYQqyZYBgEcAWfFXDOosKfbYfGYmNToNAzt0ZGlE1WsmBwMbqdKMqRfpkITR2OqdWCpVMaXTpay0xdQs3NExg2j4G+3e8co3+B8khh6SuM8XfCSDis0r0EAeXXXn3KUprBDwCCQem/qv5/nwyPkHlau60GaF7gBIAZxh6rxF2mdb5JFnxNZJwK2BujWdSCcVIq0EgODoZ3CgcphaUZCeMJHVbUNhWhpkJzY0CLYERSwdJC7XJWF25yUexFYoLqnfgAAAONbW9vdgAAAGxtdmhkAAAAANfIAsvXyALLAAAD6AAAAH8AAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAfp0cmFrAAAAXHRraGQAAAAB18gCy9fIAssAAAABAAAAAAAAAH8AAAAAAAAAAAAAAAEBAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAOdGdhcwAAAAAAAAAAAYhtZGlhAAAAIG1kaGQAAAAA18gCy9fIAssAALuAAAAoAFXEAAAAAAAxaGRscgAAAAAAAAAAc291bgAAAAAAAAAAAAAAAENvcmUgTWVkaWEgQXVkaW8AAAABL21pbmYAAAAQc21oZAAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA83N0YmwAAABnc3RzZAAAAAAAAAABAAAAV21wNGEAAAAAAAAAAQAAAAAAAAAAAAIAEAAAAAC7gAAAAAAAM2VzZHMAAAAAA4CAgCIAAQAEgICAFEAVAAAAAAI2cgACNnIFgICAAhGQBoCAgAECAAAAGHN0dHMAAAAAAAAAAQAAAAoAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAAKAAAAAQAAADxzdHN6AAAAAAAAAAAAAAAKAAAB7gAAAXUAAAG7AAABkwAAAaUAAAH+AAAB9wAAAcIAAAGzAAABqgAAABRzdGNvAAAAAAAAAAEAAAAsAAABH3VkdGEAAAEXbWV0YQAAAAAAAAAiaGRscgAAAAAAAAAAbWRpcgAAAAAAAAAAAAAAAAAAAAAA6Wlsc3QAAAC8LS0tLQAAABxtZWFuAAAAAGNvbS5hcHBsZS5pVHVuZXMAAAAUbmFtZQAAAABpVHVuU01QQgAAAIRkYXRhAAAAAQAAAAAgMDAwMDAwMDAgMDAwMDBDNDAgMDAwMDAzRUYgMDAwMDAwMDAwMDAwMTdEMSAwMDAwMDAwMCAwMDAwMDAwMCAwMDAwMDAwMCAwMDAwMDAwMCAwMDAwMDAwMCAwMDAwMDAwMCAwMDAwMDAwMCAwMDAwMDAwMAAAACWpdG9vAAAAHWRhdGEAAAABAAAAAExhdmY1Ny40MS4xMDA=");
            soundNextAudio.onerror = function() {
              soundNextAudioDoesNotExist = true;
            };
            soundNextAudio.onended = function() {
              if (soundNextColdPlay)
                return;
              setTimeout(function() {
                alanAudio2.skipExternalSounds(false);
              }, 100);
            };
            soundNextAudio.onplay = function() {
              if (soundNextColdPlay)
                return;
              alanAudio2.skipExternalSounds(true);
            };
            var btnBgDefault = document.createElement("div");
            var btnBgListening = document.createElement("div");
            var btnBgSpeaking = document.createElement("div");
            var btnBgIntermediate = document.createElement("div");
            var btnBgUnderstood = document.createElement("div");
            var btnOval1 = document.createElement("div");
            var btnOval2 = document.createElement("div");
            var btnSize;
            var sideBtnPos;
            var bottomBtnPos;
            var topBtnPos;
            var initRightPos;
            var btnZIndex;
            var btnIconsZIndex;
            var btnTextPanelsZIndex;
            var btnBgLayerZIndex;
            var popupIsVisible = false;
            var tabActive = true;
            window.addEventListener("online", updateOnlineStatus);
            window.addEventListener("offline", updateOnlineStatus);
            window.addEventListener("focus", syncChatHistoryBetweenTabs);
            window.addEventListener("blur", function() {
              tabActive = false;
            });
            function updateOnlineStatus() {
              if (navigator.onLine) {
                switchState(getDefaultBtnState());
              } else {
                alanAudio2.stop();
                switchState(OFFLINE);
              }
            }
            function getDefaultBtnState(state2) {
              if (state2 === void 0) {
                state2 = DEFAULT;
              }
              if (btnDisabled) {
                return state2;
              }
              if (!isOriginSecure()) {
                return NOT_SECURE_ORIGIN;
              }
              if (isAudioSupported()) {
                return state2;
              }
              return NO_VOICE_SUPPORT;
            }
            var btnModes = {
              "tutor": {
                btnSize: 44,
                rightPos: 0,
                leftPos: 0,
                bottomPos: 0,
                topPos: 0
              },
              "demo": {
                btnSize: options2.size || 64,
                rightPos: 20,
                leftPos: 20,
                bottomPos: 40,
                topPos: 0
              },
              "component": {
                btnSize: options2.size || 64,
                rightPos: 20,
                leftPos: 20,
                bottomPos: 40,
                topPos: 0
              }
            };
            function isTutorMode() {
              return mode.indexOf("tutor") > -1;
            }
            function isPreviewMode() {
              return mode.indexOf("preview") > -1;
            }
            btnSize = btnModes[mode].btnSize;
            function setDefautlPositionProps(value) {
              if (/^\d+$/.test(value)) {
                return value + "px";
              }
              return value;
            }
            function findHighestZIndex() {
              var elements = document.getElementsByTagName("*");
              var defaultZIndex = 4;
              for (var i2 = 0; i2 < elements.length; i2++) {
                var zindex = Number.parseInt(document.defaultView.getComputedStyle(elements[i2], null).getPropertyValue("z-index"), 10);
                if (zindex > defaultZIndex) {
                  defaultZIndex = zindex;
                }
              }
              return defaultZIndex;
            }
            btnZIndex = options2.zIndex || findHighestZIndex() + 1;
            btnIconsZIndex = btnZIndex - 2;
            btnTextPanelsZIndex = btnZIndex - 1;
            btnBgLayerZIndex = btnZIndex - 3;
            if (btnZIndex) {
              rootEl.style.zIndex = btnZIndex;
            }
            rootEl.style.position = options2.position ? options2.position : "fixed";
            setButtonPosition();
            recognisedTextContent.classList.add("alanBtn-recognised-text-content");
            recognisedTextHolder.classList.add("alanBtn-recognised-text-holder");
            setTextPanelPosition(recognisedTextHolder);
            setTextChatPosition(chatHolderDiv);
            function setButtonPosition(keepBtnPosition) {
              var _savedBtnPosition = keepBtnPosition ? getSavedBtnPosition() : null;
              if (_savedBtnPosition) {
                if (_savedBtnPosition.orientation === "left") {
                  options2.left = _savedBtnPosition.x;
                  options2.top = _savedBtnPosition.y;
                }
                if (_savedBtnPosition.orientation === "right") {
                  options2.right = _savedBtnPosition.x;
                  options2.top = _savedBtnPosition.y;
                }
              }
              if (options2.left !== void 0) {
                isLeftAligned = true;
                isRightAligned = false;
              }
              if (options2.top !== void 0) {
                isTopAligned = true;
                isBottomAligned = false;
              }
              if (isLeftAligned) {
                sideBtnPos = setDefautlPositionProps(options2.left !== void 0 ? options2.left : btnModes[mode].leftPos);
              } else {
                sideBtnPos = setDefautlPositionProps(options2.right !== void 0 ? options2.right : btnModes[mode].rightPos);
                initRightPos = parseInt(sideBtnPos, 10);
              }
              rootEl.style[isLeftAligned ? "left" : "right"] = sideBtnPos;
              setDefaultBtnHorizontalPosition();
            }
            function setDefaultBtnHorizontalPosition() {
              if (isTopAligned) {
                topBtnPos = setDefautlPositionProps(options2.top !== void 0 ? options2.top : btnModes[mode].topPos);
              } else {
                bottomBtnPos = setDefautlPositionProps(options2.bottom !== void 0 ? options2.bottom : btnModes[mode].bottomPos);
              }
              if (isTopAligned) {
                rootEl.style.top = topBtnPos;
                rootEl.style.setProperty("bottom", "");
              } else {
                rootEl.style.bottom = bottomBtnPos;
                rootEl.style.setProperty("top", "");
              }
            }
            function setTextChatPosition(el, topPos) {
              if (textChatIsHidden) {
                return;
              }
              el.style.zIndex = btnZIndex + 2;
              if (isMobile()) {
                return;
              }
              setTimeout(function() {
                var _a, _b;
                var defaultMargin = defaultChatMargin;
                var chatHeight2 = el.clientHeight;
                var canPutTextChatInSavedPos = false;
                var savedPosTop = +getTextChatPositionAfterResize("top");
                var savedPosBottom = +getTextChatPositionAfterResize("bottom");
                var savedPosLeft = +getTextChatPositionAfterResize("left");
                var savedPosRight = +getTextChatPositionAfterResize("right");
                var savedChatHeight = +getTextChatSizeAfterResize("height");
                var savedChatWidth = +getTextChatSizeAfterResize("width");
                var chatIntersectWithScreen = false;
                if (savedPosTop || savedPosBottom || savedPosLeft || savedPosRight) {
                  if (savedPosTop !== void 0 && savedPosTop + savedChatHeight > window.innerHeight || savedPosBottom !== void 0 && savedPosBottom + savedChatHeight > window.innerHeight || savedPosLeft !== void 0 && savedPosLeft + savedChatWidth > window.innerWidth || savedPosRight !== void 0 && savedPosRight + savedChatWidth > window.innerWidth) {
                    chatIntersectWithScreen = true;
                  }
                  if (!chatIntersectWithScreen) {
                    if (savedPosTop !== void 0) {
                      el.style.bottom = "";
                      el.style.top = savedPosTop + "px";
                    }
                    if (savedPosBottom !== void 0) {
                      el.style.top = "";
                      el.style.bottom = savedPosBottom + "px";
                    }
                    if (savedPosLeft !== void 0) {
                      el.style.right = "";
                      el.style.left = savedPosLeft + "px";
                    }
                    if (savedPosRight !== void 0) {
                      el.style.left = "";
                      el.style.right = savedPosRight + "px";
                    }
                    canPutTextChatInSavedPos = true;
                  } else {
                    canPutTextChatInSavedPos = false;
                  }
                }
                if (!canPutTextChatInSavedPos) {
                  if (isLeftAligned) {
                    el.style.right = "";
                    el.style.left = defaultMargin + "px";
                  } else {
                    el.style.left = "";
                    el.style.right = defaultMargin + "px";
                  }
                  var btnTopPos = (_a = rootEl.getBoundingClientRect()) === null || _a === void 0 ? void 0 : _a.top;
                  var btnBottomPos = (_b = rootEl.getBoundingClientRect()) === null || _b === void 0 ? void 0 : _b.bottom;
                  var isTopPartOfTheScreen = btnTopPos < window.innerHeight / 2;
                  var newTopPos = 0;
                  var newBottomPos = 0;
                  if (isTopPartOfTheScreen) {
                    if (defaultMargin + chatHeight2 > btnBottomPos) {
                      newTopPos = defaultMargin;
                    } else {
                      newTopPos = btnBottomPos - chatHeight2 + defaultMargin;
                    }
                    if (chatHeight2 >= window.innerHeight) {
                      newTopPos = 0;
                    }
                  } else {
                    if (defaultMargin + chatHeight2 > window.innerHeight - btnTopPos) {
                      newBottomPos = defaultMargin;
                    } else {
                      newBottomPos = window.innerHeight - btnBottomPos - defaultMargin;
                    }
                    if (chatHeight2 >= window.innerHeight) {
                      newBottomPos = 0;
                    }
                  }
                  if (isTopPartOfTheScreen) {
                    el.style.bottom = "";
                    el.style.top = newTopPos + "px";
                  } else {
                    el.style.top = "";
                    el.style.bottom = newBottomPos + "px";
                  }
                }
                el.style.display = "flex";
                setTimeout(function() {
                  var textareaEl = getChatTextareaEl();
                  if (textareaEl && state === DEFAULT) {
                    textareaEl.focus();
                  }
                }, 0);
              }, 0);
            }
            function setTextPanelPosition(el, topPos) {
              var _btnSize = parseInt(btnSize, 10);
              if (isLeftAligned) {
                el.style.textAlign = "left";
                el.style.right = "";
                el.style.left = (absolutePosition ? 0 : parseInt(rootEl.style.left, 10)) + _btnSize + 10 + "px";
              } else {
                el.style.textAlign = "right";
                el.style.left = "";
                el.style.right = (absolutePosition ? 0 : parseInt(rootEl.style.right, 10)) + _btnSize + 10 + "px";
              }
              if (!topPos) {
                if (isTopAligned) {
                  el.style.bottom = "";
                  el.style.top = (absolutePosition ? 0 : parseInt(rootEl.style.top, 10)) + _btnSize / 2 + "px";
                } else {
                  el.style.top = "";
                  el.style.bottom = (absolutePosition ? 0 : parseInt(rootEl.style.bottom, 10)) + _btnSize / 2 + "px";
                }
              }
              if (absolutePosition) {
                el.style.position = "absolute";
                el.classList.add("alan-btn-lib__absolute-positioned");
              }
              if (topPos) {
                el.style.bottom = "";
                el.style.top = (absolutePosition ? 0 : topPos) + _btnSize / 2 + "px";
                el.style.setProperty("transform", "translateY(-50%)", "important");
              }
              el.style.zIndex = btnTextPanelsZIndex;
            }
            function setStylesBasedOnSide() {
              if (isLeftAligned) {
                btn.style.left = "0";
                btn.style.right = "";
                recognisedTextHolder.classList.remove("alan-btn-lib__left-side");
                recognisedTextHolder.classList.add("alan-btn-lib__right-side");
              } else {
                btn.style.right = "0";
                btn.style.left = "";
                recognisedTextHolder.classList.remove("alan-btn-lib__right-side");
                recognisedTextHolder.classList.add("alan-btn-lib__left-side");
              }
            }
            function changeBtnSize(size) {
              if (!size)
                return;
              btnSize = size;
              btn.style.width = size + "px";
              btn.style.minWidth = size + "px";
              btn.style.maxWidth = size + "px";
              btn.style.minHeight = size + "px";
              btn.style.height = size + "px";
              btn.style.maxHeight = size + "px";
              rootEl.style.width = size + "px";
              rootEl.style.minWidth = size + "px";
              rootEl.style.maxWidth = size + "px";
              rootEl.style.minHeight = size + "px";
              rootEl.style.height = size + "px";
              rootEl.style.maxHeight = size + "px";
            }
            function applyBtnSizeOptions(size) {
              changeBtnSize(size);
              if (isMobile()) {
                recognisedTextHolder.style.maxWidth = "calc(100vw - " + (parseInt(sideBtnPos, 10) + parseInt(btnSize, 10) + 20) + "px)";
              }
              applySizeSettingsToBlurLayers([btnOval1, btnOval2]);
              setTextPanelPosition(recognisedTextHolder);
              setTextChatPosition(chatHolderDiv);
            }
            btn.style.color = "#fff";
            btn.style.position = "absolute";
            var transitionCss = "transform 0.4s ease-in-out, opacity 0.4s ease-in-out";
            applyBtnSizeOptions(btnSize);
            if (isTopAligned) {
              btn.style.top = "0";
            } else {
              btn.style.bottom = "0";
            }
            setStylesBasedOnSide();
            btn.style.borderRadius = "50%";
            btn.style.textAlign = "center";
            btn.style.transition = transitionCss;
            btn.style.zIndex = btnZIndex;
            if (options2 && options2.tabIndex) {
              btn.tabIndex = options2.tabIndex;
            }
            if (isPreviewMode()) {
              btn.style.cursor = "default";
            } else {
              if (!isMobile()) {
                btn.style.cursor = "pointer";
              }
            }
            micIconDiv.style.minHeight = "100%";
            micIconDiv.style.height = "100%";
            micIconDiv.style.maxHeight = "100%";
            micIconDiv.style.top = "0%";
            micIconDiv.style.left = "0%";
            micIconDiv.style.zIndex = btnIconsZIndex;
            micIconDiv.style.position = "relative";
            micIconDiv.style.transition = transitionCss;
            function setUpStylesForAnimatedLogoParts(logos) {
              for (var i2 = 0; i2 < logos.length; i2++) {
                logos[i2].style.minHeight = "100%";
                logos[i2].style.height = "100%";
                logos[i2].style.maxHeight = "100%";
                logos[i2].style.minWidth = "100%";
                logos[i2].style.width = "100%";
                logos[i2].style.maxWidth = "100%";
                logos[i2].style.top = "0%";
                logos[i2].style.left = "0%";
                logos[i2].style.position = "absolute";
                logos[i2].style.pointerEvents = "none";
                logos[i2].style.animationIterationCount = "infinite";
                logos[i2].style.animationDuration = "9s";
                logos[i2].style.animationTimingFunction = "ease-in-out";
                logos[i2].style.opacity = 0;
                logos[i2].alt = alanAltPrefix + " logo animated part " + i2;
                micIconDiv.appendChild(logos[i2]);
              }
            }
            logoState1.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjEgKDY3MDQ4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5BbGFuIEJ1dHRvbiAvIEFuaW1hdGlvbiAvIGJ1dHRvbi1sb2dvLXN0YXRlLTAxPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkFsYW4tQnV0dG9uLS8tQW5pbWF0aW9uLS8tYnV0dG9uLWxvZ28tc3RhdGUtMDEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsb2dvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNi4wMDAwMDAsIDIxLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTkuNjQwMDAxLDEuNDk1NDY4NSBMMjQsOS44NjY2NjY2NyBMMTguMjcxMTkyNCwyMSBMNi40NzczOTQ2NiwyMSBDNS43MDEzMTEwMSwyMS4wMDAxMDYzIDQuOTg5NjE3NzYsMjEuMjk5OTMzOSA0LjYzMDYyNzg1LDIxLjk4OTE5NDUgTDE1LjQ5OTE2NTksMS4xMjE2MDEzOCBDMTUuODQ2MDc4MSwwLjQ1NTUyOTk2NCAxNi41MjIzNTU1LDAuMDI5NDg4MzMzNSAxNy4yNjc4MTEsMC4wMDE0NzIxODExNSBDMTguMjY3Mjc3MSwwLjAzMzk5NDI4OTEgMTkuMTc1MjgxMSwwLjYwMzIwNjQyIDE5LjY0MDAwMSwxLjQ5NTQ2ODUgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTguMjcxMTkyNCwyMSBMMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEMxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTEuOTg1NTIzOSwzMiAxMS4yMDkzMzc4LDMyIEwxLjcwNzg2NDk1LDMyIEMwLjk0MDgwMjc5NiwzMiAwLjMxODk3NjA1OSwzMS4zNzcwOTE4IDAuMzE4OTc2MDU5LDMwLjYwODY5NTcgQzAuMzE4OTc2MDU5LDMwLjM4NDU5NDggMC4zNzMwMTU2MTgsMzAuMTYzODEgMC40NzY0OTcxMDYsMjkuOTY1MTI1NiBMNC42MzA2Mjc4NSwyMS45ODkxOTQ1IEM0Ljk4OTYxNzc2LDIxLjI5OTkzMzkgNS43MDEzMTEwMSwyMS4wMDAxMDYzIDYuNDc3Mzk0NjYsMjEgTDE4LjI3MTE5MjQsMjEgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuMyI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTEuMjA5MzM3OCwzMiBDMTEuOTg1NTIzOSwzMiAxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEwxOC4yNzExOTI0LDIwLjg2NTk3NzMgTDIzLjk1NjQ1ODIsMjAuODY1MTk4MyBDMjQuNzMwOTU2MiwyMC44NjUwOTIyIDI1LjQ0MTU4NjcsMjEuMjk1Mzg0OCAyNS44MDE0ODQ2LDIxLjk4MjM3NjcgTDI5Ljk4MTkwMTUsMjkuOTYyMTc2OSBDMzAuMzM4MzQ0LDMwLjY0MjU3MzIgMzAuMDc2Njg1MiwzMS40ODM1OTk3IDI5LjM5NzQ3MDEsMzEuODQwNjYyMSBDMjkuMTk4MzgzOCwzMS45NDUzMjE1IDI4Ljk3NjkwOTMsMzIgMjguNzUyMDczOCwzMiBMMTEuMjA5MzM3OCwzMiBaIiBpZD0ic2hhcGUiIGZpbGwtb3BhY2l0eT0iMC41Ij48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMC42NTM3ODIzLC0xLjIzNTcyNjVlLTE0IEMzMC42Nzk5OTUsLTEuMjM1MjQ0MTRlLTE0IDMwLjcwNjEzNDIsMC4wMDA0OTI5NzU2OTEgMzAuNzMyMTg5LDAuMDAxNDcyMTgxMTUgQzI5LjczMjcyMjksMC4wMzM5OTQyODkxIDI4LjgyNDcxODksMC42MDMyMDY0MiAyOC4zNTk5OTksMS40OTU0Njg1IEwyNCw5Ljg2NjY2NjY3IEwxOS42NDAwMDEsMS40OTU0Njg1IEMxOS4xNjEyODQ2LDAuNTc2MzMzMDYgMTguMjEyMTgsLTEuMjE3ODgzODNlLTE0IDE3LjE3NzI2NTMsLTEuNDIxMDg1NDdlLTE0IEwzMC42NTM3ODIzLC0xLjIzNTcyNjVlLTE0IFogTTI4LjM1OTk5OSwxLjQ5NTQ2ODUgQzI4LjgyNDcxODksMC42MDMyMDY0MiAyOS43MzI3MjI5LDAuMDMzOTk0Mjg5MSAzMC43MzIxODksMC4wMDE0NzIxODExNSBDMzAuNzA2MTM0MiwwLjAwMDQ5Mjk3NTY5MSAzMC42Nzk5OTUsLTEuMjM1MjQ0MTRlLTE0IDMwLjY1Mzc4MjMsLTEuMjM1NzI2NWUtMTQgTDMwLjk0NDQ0NDQsLTEuNDIxMDg1NDdlLTE0IEwzMC44MjI3MzQ3LC0xLjIzNzUxMTgzZS0xNCBDMzAuNzkyNDc2MywtMS4yMzE1ODY5M2UtMTQgMzAuNzYyMjkxMSwwLjAwMDQ5MjY3MjYzNSAzMC43MzIxODksMC4wMDE0NzIxODExNSBDMzEuNDc3NjQ0NSwwLjAyOTQ4ODMzMzUgMzIuMTUzOTIxOSwwLjQ1NTUyOTk2NCAzMi41MDA4MzQxLDEuMTIxNjAxMzggTDQ3LjUyMzUwMjksMjkuOTY1MTI1NiBDNDcuNjI2OTg0NCwzMC4xNjM4MSA0Ny42ODEwMjM5LDMwLjM4NDU5NDggNDcuNjgxMDIzOSwzMC42MDg2OTU3IEM0Ny42ODEwMjM5LDMxLjM3NzA5MTggNDcuMDU5MTk3MiwzMiA0Ni4yOTIxMzUxLDMyIEwzNi43OTA2NjIyLDMyIEMzNi4wMTQ0NzYxLDMyIDM1LjMwMjY0NzcsMzEuNTY3NzUwMiAzNC45NDM2MTA0LDMwLjg3ODM5ODYgTDI0LDkuODY2NjY2NjcgTDI4LjM1OTk5OSwxLjQ5NTQ2ODUgWiIgaWQ9InNoYXBlLTIiIGZpbGwtb3BhY2l0eT0iMC45Ij48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
            logoState2.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjEgKDY3MDQ4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5BbGFuIEJ1dHRvbiAvIEFuaW1hdGlvbiAvIGJ1dHRvbi1sb2dvLXN0YXRlLTAyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkFsYW4tQnV0dG9uLS8tQW5pbWF0aW9uLS8tYnV0dG9uLWxvZ28tc3RhdGUtMDIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsb2dvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNi4wMDAwMDAsIDIxLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTguMjcxMTkyNCwyMSBMMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEMxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTEuOTg1NTIzOSwzMiAxMS4yMDkzMzc4LDMyIEwxLjcwNzg2NDk1LDMyIEMwLjk0MDgwMjc5NiwzMiAwLjMxODk3NjA1OSwzMS4zNzcwOTE4IDAuMzE4OTc2MDU5LDMwLjYwODY5NTcgQzAuMzE4OTc2MDU5LDMwLjM4NDU5NDggMC4zNzMwMTU2MTgsMzAuMTYzODEgMC40NzY0OTcxMDYsMjkuOTY1MTI1NiBMNC42MzA2Mjc4NSwyMS45ODkxOTQ1IEwxNS40OTkxNjU5LDEuMTIxNjAxMzggQzE1Ljg0NjA3ODEsMC40NTU1Mjk5NjQgMTYuNTIyMzU1NSwwLjAyOTQ4ODMzMzUgMTcuMjY3ODExLDAuMDAxNDcyMTgxMTUgQzE4LjI2NzI3NzEsMC4wMzM5OTQyODkxIDE5LjE3NTI4MTEsMC42MDMyMDY0MiAxOS42NDAwMDEsMS40OTU0Njg1IEwyNCw5Ljg2NjY2NjY3IEwxOC4yNzExOTI0LDIxIFoiIGlkPSJzaGFwZS0yIiBmaWxsLW9wYWNpdHk9IjAuMyI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTEuMjA5MzM3OCwzMiBDMTEuOTg1NTIzOSwzMiAxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEwxOC4yNzExOTI0LDIwLjg2NTk3NzMgTDIzLjk1NjQ1ODIsMjAuODY1MTk4MyBDMjQuNzMwOTU2MiwyMC44NjUwOTIyIDI1LjQ0MTU4NjcsMjEuMjk1Mzg0OCAyNS44MDE0ODQ2LDIxLjk4MjM3NjcgTDI5Ljk4MTkwMTUsMjkuOTYyMTc2OSBDMzAuMzM4MzQ0LDMwLjY0MjU3MzIgMzAuMDc2Njg1MiwzMS40ODM1OTk3IDI5LjM5NzQ3MDEsMzEuODQwNjYyMSBDMjkuMTk4MzgzOCwzMS45NDUzMjE1IDI4Ljk3NjkwOTMsMzIgMjguNzUyMDczOCwzMiBMMTEuMjA5MzM3OCwzMiBaIiBpZD0ic2hhcGUiIGZpbGwtb3BhY2l0eT0iMC41Ij48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yOC4zNTk5OTksMS40OTU0Njg1IEMyOC44MjQ3MTg5LDAuNjAzMjA2NDIgMjkuNzMyNzIyOSwwLjAzMzk5NDI4OTEgMzAuNzMyMTg5LDAuMDAxNDcyMTgxMTUgQzMwLjcwNjEzNDIsMC4wMDA0OTI5NzU2OTEgMzAuNjc5OTk1LDEuODU4NDEzMzFlLTE1IDMwLjY1Mzc4MjMsMS44NTM1ODk3NWUtMTUgTDMwLjk0NDQ0NDQsMCBMMzAuODIyNzM0NywxLjgzNTczNjRlLTE1IEMzMC43OTI0NzYzLDEuODk0OTg1MzllLTE1IDMwLjc2MjI5MTEsMC4wMDA0OTI2NzI2MzUgMzAuNzMyMTg5LDAuMDAxNDcyMTgxMTUgQzMxLjQ3NzY0NDUsMC4wMjk0ODgzMzM1IDMyLjE1MzkyMTksMC40NTU1Mjk5NjQgMzIuNTAwODM0MSwxLjEyMTYwMTM4IEw0Ny41MjM1MDI5LDI5Ljk2NTEyNTYgQzQ3LjYyNjk4NDQsMzAuMTYzODEgNDcuNjgxMDIzOSwzMC4zODQ1OTQ4IDQ3LjY4MTAyMzksMzAuNjA4Njk1NyBDNDcuNjgxMDIzOSwzMS4zNzcwOTE4IDQ3LjA1OTE5NzIsMzIgNDYuMjkyMTM1MSwzMiBMMzYuNzkwNjYyMiwzMiBDMzYuMDE0NDc2MSwzMiAzNS4zMDI2NDc3LDMxLjU2Nzc1MDIgMzQuOTQzNjEwNCwzMC44NzgzOTg2IEwyNCw5Ljg2NjY2NjY3IEwyOC4zNTk5OTksMS40OTU0Njg1IFoiIGlkPSJzaGFwZSIgZmlsbC1vcGFjaXR5PSIwLjkiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTMwLjY1Mzc4MjMsMS44NTM1ODk3NWUtMTUgQzMwLjY3OTk5NSwxLjg1ODQxMzMxZS0xNSAzMC43MDYxMzQyLDAuMDAwNDkyOTc1NjkxIDMwLjczMjE4OSwwLjAwMTQ3MjE4MTE1IEMyOS43MzI3MjI5LDAuMDMzOTk0Mjg5MSAyOC44MjQ3MTg5LDAuNjAzMjA2NDIgMjguMzU5OTk5LDEuNDk1NDY4NSBMMjQsOS44NjY2NjY2NyBMMTkuNjQwMDAxLDEuNDk1NDY4NSBDMTkuMTYxMjg0NiwwLjU3NjMzMzA2IDE4LjIxMjE4LDIuMDMyMDE2NDNlLTE1IDE3LjE3NzI2NTMsMCBMMzAuNjUzNzgyMywxLjg1MzU4OTc1ZS0xNSBaIiBpZD0ic2hhcGUiIGZpbGwtb3BhY2l0eT0iMC41Ij48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
            logoState3.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjEgKDY3MDQ4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5BbGFuIEJ1dHRvbiAvIEFuaW1hdGlvbiAvIGJ1dHRvbi1sb2dvLXN0YXRlLTAzPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkFsYW4tQnV0dG9uLS8tQW5pbWF0aW9uLS8tYnV0dG9uLWxvZ28tc3RhdGUtMDMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsb2dvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNi4wMDAwMDAsIDIxLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTkuNjQwMDAxLDEuNDk1NDY4NSBMMjQsOS44NjY2NjY2NyBMMTguMjcxMTkyNCwyMSBMNi40NzczOTQ2NiwyMSBDNS43MDEzMTEwMSwyMS4wMDAxMDYzIDQuOTg5NjE3NzYsMjEuMjk5OTMzOSA0LjYzMDYyNzg1LDIxLjk4OTE5NDUgTDE1LjQ5OTE2NTksMS4xMjE2MDEzOCBDMTUuODQ2MDc4MSwwLjQ1NTUyOTk2NCAxNi41MjIzNTU1LDAuMDI5NDg4MzMzNSAxNy4yNjc4MTEsMC4wMDE0NzIxODExNSBDMTguMjY3Mjc3MSwwLjAzMzk5NDI4OTEgMTkuMTc1MjgxMSwwLjYwMzIwNjQyIDE5LjY0MDAwMSwxLjQ5NTQ2ODUgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuMyI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTguMjcxMTkyNCwyMSBMMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEMxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTEuOTg1NTIzOSwzMiAxMS4yMDkzMzc4LDMyIEwxLjcwNzg2NDk1LDMyIEMwLjk0MDgwMjc5NiwzMiAwLjMxODk3NjA1OSwzMS4zNzcwOTE4IDAuMzE4OTc2MDU5LDMwLjYwODY5NTcgQzAuMzE4OTc2MDU5LDMwLjM4NDU5NDggMC4zNzMwMTU2MTgsMzAuMTYzODEgMC40NzY0OTcxMDYsMjkuOTY1MTI1NiBMNC42MzA2Mjc4NSwyMS45ODkxOTQ1IEM0Ljk4OTYxNzc2LDIxLjI5OTkzMzkgNS43MDEzMTEwMSwyMS4wMDAxMDYzIDYuNDc3Mzk0NjYsMjEgTDE4LjI3MTE5MjQsMjEgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTEuMjA5MzM3OCwzMiBDMTEuOTg1NTIzOSwzMiAxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEwxOC4yNzExOTI0LDIwLjg2NTk3NzMgTDIzLjk1NjQ1ODIsMjAuODY1MTk4MyBDMjQuNzMwOTU2MiwyMC44NjUwOTIyIDI1LjQ0MTU4NjcsMjEuMjk1Mzg0OCAyNS44MDE0ODQ2LDIxLjk4MjM3NjcgTDI5Ljk4MTkwMTUsMjkuOTYyMTc2OSBDMzAuMzM4MzQ0LDMwLjY0MjU3MzIgMzAuMDc2Njg1MiwzMS40ODM1OTk3IDI5LjM5NzQ3MDEsMzEuODQwNjYyMSBDMjkuMTk4MzgzOCwzMS45NDUzMjE1IDI4Ljk3NjkwOTMsMzIgMjguNzUyMDczOCwzMiBMMTEuMjA5MzM3OCwzMiBaIiBpZD0ic2hhcGUiIGZpbGwtb3BhY2l0eT0iMC45Ij48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yOC4zNTk5OTksMS40OTU0Njg1IEMyOC44MjQ3MTg5LDAuNjAzMjA2NDIgMjkuNzMyNzIyOSwwLjAzMzk5NDI4OTEgMzAuNzMyMTg5LDAuMDAxNDcyMTgxMTUgQzMwLjcwNjEzNDIsMC4wMDA0OTI5NzU2OTEgMzAuNjc5OTk1LC0xLjIzNTI0NDE0ZS0xNCAzMC42NTM3ODIzLC0xLjIzNTcyNjVlLTE0IEwzMC45NDQ0NDQ0LC0xLjQyMTA4NTQ3ZS0xNCBMMzAuODIyNzM0NywtMS4yMzc1MTE4M2UtMTQgQzMwLjc5MjQ3NjMsLTEuMjMxNTg2OTNlLTE0IDMwLjc2MjI5MTEsMC4wMDA0OTI2NzI2MzUgMzAuNzMyMTg5LDAuMDAxNDcyMTgxMTUgQzMxLjQ3NzY0NDUsMC4wMjk0ODgzMzM1IDMyLjE1MzkyMTksMC40NTU1Mjk5NjQgMzIuNTAwODM0MSwxLjEyMTYwMTM4IEw0Ny41MjM1MDI5LDI5Ljk2NTEyNTYgQzQ3LjYyNjk4NDQsMzAuMTYzODEgNDcuNjgxMDIzOSwzMC4zODQ1OTQ4IDQ3LjY4MTAyMzksMzAuNjA4Njk1NyBDNDcuNjgxMDIzOSwzMS4zNzcwOTE4IDQ3LjA1OTE5NzIsMzIgNDYuMjkyMTM1MSwzMiBMMzYuNzkwNjYyMiwzMiBDMzYuMDE0NDc2MSwzMiAzNS4zMDI2NDc3LDMxLjU2Nzc1MDIgMzQuOTQzNjEwNCwzMC44NzgzOTg2IEwyNCw5Ljg2NjY2NjY3IEwyOC4zNTk5OTksMS40OTU0Njg1IFoiIGlkPSJzaGFwZSIgZmlsbC1vcGFjaXR5PSIwLjkiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTMwLjY1Mzc4MjMsLTEuMjM1NzI2NWUtMTQgQzMwLjY3OTk5NSwtMS4yMzUyNDQxNGUtMTQgMzAuNzA2MTM0MiwwLjAwMDQ5Mjk3NTY5MSAzMC43MzIxODksMC4wMDE0NzIxODExNSBDMjkuNzMyNzIyOSwwLjAzMzk5NDI4OTEgMjguODI0NzE4OSwwLjYwMzIwNjQyIDI4LjM1OTk5OSwxLjQ5NTQ2ODUgTDI0LDkuODY2NjY2NjcgTDE5LjY0MDAwMSwxLjQ5NTQ2ODUgQzE5LjE2MTI4NDYsMC41NzYzMzMwNiAxOC4yMTIxOCwtMS4yMTc4ODM4M2UtMTQgMTcuMTc3MjY1MywtMS40MjEwODU0N2UtMTQgTDMwLjY1Mzc4MjMsLTEuMjM1NzI2NWUtMTQgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";
            logoState4.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjEgKDY3MDQ4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5BbGFuIEJ1dHRvbiAvIEFuaW1hdGlvbiAvIGJ1dHRvbi1sb2dvLXN0YXRlLTA0PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkFsYW4tQnV0dG9uLS8tQW5pbWF0aW9uLS8tYnV0dG9uLWxvZ28tc3RhdGUtMDQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsb2dvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNi4wMDAwMDAsIDIxLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMjQsOS44NjY2NjY2NyBMMTguMjcxMTkyNCwyMSBMNi40NzczOTQ2NiwyMSBDNS43MDEzMTEwMSwyMS4wMDAxMDYzIDQuOTg5NjE3NzYsMjEuMjk5OTMzOSA0LjYzMDYyNzg1LDIxLjk4OTE5NDUgTDE1LjQ5OTE2NTksMS4xMjE2MDEzOCBDMTUuODQ2MDc4MSwwLjQ1NTUyOTk2NCAxNi41MjIzNTU1LDAuMDI5NDg4MzMzNSAxNy4yNjc4MTEsMC4wMDE0NzIxODExNSBDMTcuMjM3NzA4OSwwLjAwMDQ5MjY3MjYzNSAxNy4yMDc1MjM3LDEuOTU5OTMzNjZlLTE0IDE3LjE3NzI2NTMsMS45NTM5OTI1MmUtMTQgTDMwLjY1Mzc4MjMsMi4xMzkzNTE1ZS0xNCBDMzAuNjc5OTk1LDIuMTM5ODMzODVlLTE0IDMwLjcwNjEzNDIsMC4wMDA0OTI5NzU2OTEgMzAuNzMyMTg5LDAuMDAxNDcyMTgxMTUgQzI5LjczMjcyMjksMC4wMzM5OTQyODkxIDI4LjgyNDcxODksMC42MDMyMDY0MiAyOC4zNTk5OTksMS40OTU0Njg1IEwyNCw5Ljg2NjY2NjY3IFoiIGlkPSJzaGFwZS0yIiBmaWxsLW9wYWNpdHk9IjAuMyI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTguMjcxMTkyNCwyMSBMMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEMxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTEuOTg1NTIzOSwzMiAxMS4yMDkzMzc4LDMyIEwxLjcwNzg2NDk1LDMyIEMwLjk0MDgwMjc5NiwzMiAwLjMxODk3NjA1OSwzMS4zNzcwOTE4IDAuMzE4OTc2MDU5LDMwLjYwODY5NTcgQzAuMzE4OTc2MDU5LDMwLjM4NDU5NDggMC4zNzMwMTU2MTgsMzAuMTYzODEgMC40NzY0OTcxMDYsMjkuOTY1MTI1NiBMNC42MzA2Mjc4NSwyMS45ODkxOTQ1IEM0Ljk4OTYxNzc2LDIxLjI5OTkzMzkgNS43MDEzMTEwMSwyMS4wMDAxMDYzIDYuNDc3Mzk0NjYsMjEgTDE4LjI3MTE5MjQsMjEgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTEuMjA5MzM3OCwzMiBDMTEuOTg1NTIzOSwzMiAxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEwxOC4yNzExOTI0LDIwLjg2NTk3NzMgTDIzLjk1NjQ1ODIsMjAuODY1MTk4MyBDMjQuNzMwOTU2MiwyMC44NjUwOTIyIDI1LjQ0MTU4NjcsMjEuMjk1Mzg0OCAyNS44MDE0ODQ2LDIxLjk4MjM3NjcgTDI5Ljk4MTkwMTUsMjkuOTYyMTc2OSBDMzAuMzM4MzQ0LDMwLjY0MjU3MzIgMzAuMDc2Njg1MiwzMS40ODM1OTk3IDI5LjM5NzQ3MDEsMzEuODQwNjYyMSBDMjkuMTk4MzgzOCwzMS45NDUzMjE1IDI4Ljk3NjkwOTMsMzIgMjguNzUyMDczOCwzMiBMMTEuMjA5MzM3OCwzMiBaIiBpZD0ic2hhcGUiIGZpbGwtb3BhY2l0eT0iMC45Ij48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yOC4zNTk5OTksMS40OTU0Njg1IEMyOC44MjQ3MTg5LDAuNjAzMjA2NDIgMjkuNzMyNzIyOSwwLjAzMzk5NDI4OTEgMzAuNzMyMTg5LDAuMDAxNDcyMTgxMTUgQzMwLjcwNjEzNDIsMC4wMDA0OTI5NzU2OTEgMzAuNjc5OTk1LC0xLjIzNTI0NDE0ZS0xNCAzMC42NTM3ODIzLC0xLjIzNTcyNjVlLTE0IEwzMC45NDQ0NDQ0LC0xLjQyMTA4NTQ3ZS0xNCBMMzAuODIyNzM0NywtMS4yMzc1MTE4M2UtMTQgQzMwLjc5MjQ3NjMsLTEuMjMxNTg2OTNlLTE0IDMwLjc2MjI5MTEsMC4wMDA0OTI2NzI2MzUgMzAuNzMyMTg5LDAuMDAxNDcyMTgxMTUgQzMxLjQ3NzY0NDUsMC4wMjk0ODgzMzM1IDMyLjE1MzkyMTksMC40NTU1Mjk5NjQgMzIuNTAwODM0MSwxLjEyMTYwMTM4IEw0Ny41MjM1MDI5LDI5Ljk2NTEyNTYgQzQ3LjYyNjk4NDQsMzAuMTYzODEgNDcuNjgxMDIzOSwzMC4zODQ1OTQ4IDQ3LjY4MTAyMzksMzAuNjA4Njk1NyBDNDcuNjgxMDIzOSwzMS4zNzcwOTE4IDQ3LjA1OTE5NzIsMzIgNDYuMjkyMTM1MSwzMiBMMzYuNzkwNjYyMiwzMiBDMzYuMDE0NDc2MSwzMiAzNS4zMDI2NDc3LDMxLjU2Nzc1MDIgMzQuOTQzNjEwNCwzMC44NzgzOTg2IEwyNCw5Ljg2NjY2NjY3IEwyOC4zNTk5OTksMS40OTU0Njg1IFoiIGlkPSJzaGFwZSIgZmlsbC1vcGFjaXR5PSIwLjUiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==";
            logoState5.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjEgKDY3MDQ4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5BbGFuIEJ1dHRvbiAvIEFuaW1hdGlvbiAvIGJ1dHRvbi1sb2dvLXN0YXRlLTA1PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkFsYW4tQnV0dG9uLS8tQW5pbWF0aW9uLS8tYnV0dG9uLWxvZ28tc3RhdGUtMDUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsb2dvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNi4wMDAwMDAsIDIxLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTkuNjQwMDAxLDEuNDk1NDY4NSBMMjQsOS44NjY2NjY2NyBMMTguMjcxMTkyNCwyMSBMNi40NzczOTQ2NiwyMSBDNS43MDEzMTEwMSwyMS4wMDAxMDYzIDQuOTg5NjE3NzYsMjEuMjk5OTMzOSA0LjYzMDYyNzg1LDIxLjk4OTE5NDUgTDE1LjQ5OTE2NTksMS4xMjE2MDEzOCBDMTUuODQ2MDc4MSwwLjQ1NTUyOTk2NCAxNi41MjIzNTU1LDAuMDI5NDg4MzMzNSAxNy4yNjc4MTEsMC4wMDE0NzIxODExNSBDMTguMjY3Mjc3MSwwLjAzMzk5NDI4OTEgMTkuMTc1MjgxMSwwLjYwMzIwNjQyIDE5LjY0MDAwMSwxLjQ5NTQ2ODUgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMjguMzU5OTk5LDEuNDk1NDY4NSBDMjguODI0NzE4OSwwLjYwMzIwNjQyIDI5LjczMjcyMjksMC4wMzM5OTQyODkxIDMwLjczMjE4OSwwLjAwMTQ3MjE4MTE1IEMzMC43MDYxMzQyLDAuMDAwNDkyOTc1NjkxIDMwLjY3OTk5NSwtMS4yMzUyNDQxNGUtMTQgMzAuNjUzNzgyMywtMS4yMzU3MjY1ZS0xNCBMMzAuOTQ0NDQ0NCwtMS40MjEwODU0N2UtMTQgTDMwLjgyMjczNDcsLTEuMjM3NTExODNlLTE0IEMzMC43OTI0NzYzLC0xLjIzMTU4NjkzZS0xNCAzMC43NjIyOTExLDAuMDAwNDkyNjcyNjM1IDMwLjczMjE4OSwwLjAwMTQ3MjE4MTE1IEMzMS40Nzc2NDQ1LDAuMDI5NDg4MzMzNSAzMi4xNTM5MjE5LDAuNDU1NTI5OTY0IDMyLjUwMDgzNDEsMS4xMjE2MDEzOCBMNDcuNTIzNTAyOSwyOS45NjUxMjU2IEM0Ny42MjY5ODQ0LDMwLjE2MzgxIDQ3LjY4MTAyMzksMzAuMzg0NTk0OCA0Ny42ODEwMjM5LDMwLjYwODY5NTcgQzQ3LjY4MTAyMzksMzEuMzc3MDkxOCA0Ny4wNTkxOTcyLDMyIDQ2LjI5MjEzNTEsMzIgTDM2Ljc5MDY2MjIsMzIgQzM2LjAxNDQ3NjEsMzIgMzUuMzAyNjQ3NywzMS41Njc3NTAyIDM0Ljk0MzYxMDQsMzAuODc4Mzk4NiBMMjQsOS44NjY2NjY2NyBMMjguMzU5OTk5LDEuNDk1NDY4NSBaIiBpZD0ic2hhcGUiIGZpbGwtb3BhY2l0eT0iMC41Ij48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMC42NTM3ODIzLC0xLjIzNTcyNjVlLTE0IEMzMC42Nzk5OTUsLTEuMjM1MjQ0MTRlLTE0IDMwLjcwNjEzNDIsMC4wMDA0OTI5NzU2OTEgMzAuNzMyMTg5LDAuMDAxNDcyMTgxMTUgQzI5LjczMjcyMjksMC4wMzM5OTQyODkxIDI4LjgyNDcxODksMC42MDMyMDY0MiAyOC4zNTk5OTksMS40OTU0Njg1IEwyNCw5Ljg2NjY2NjY3IEwxOS42NDAwMDEsMS40OTU0Njg1IEMxOS4xNjEyODQ2LDAuNTc2MzMzMDYgMTguMjEyMTgsLTEuMjE3ODgzODNlLTE0IDE3LjE3NzI2NTMsLTEuNDIxMDg1NDdlLTE0IEwzMC42NTM3ODIzLC0xLjIzNTcyNjVlLTE0IFoiIGlkPSJzaGFwZSIgZmlsbC1vcGFjaXR5PSIwLjMiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE4LjI3MTE5MjQsMjEgTDIzLjk1NjQ1ODIsMjEgQzI0LjczMDk1NjIsMjAuOTk5ODkzOSAyNS40NDE1ODY3LDIxLjI5NTM4NDggMjUuODAxNDg0NiwyMS45ODIzNzY3IEwyOS45ODE5MDE1LDI5Ljk2MjE3NjkgQzMwLjMzODM0NCwzMC42NDI1NzMyIDMwLjA3NjY4NTIsMzEuNDgzNTk5NyAyOS4zOTc0NzAxLDMxLjg0MDY2MjEgQzI5LjE5ODM4MzgsMzEuOTQ1MzIxNSAyOC45NzY5MDkzLDMyIDI4Ljc1MjA3MzgsMzIgTDExLjIwOTMzNzgsMzIgTDEuNzA3ODY0OTUsMzIgQzAuOTQwODAyNzk2LDMyIDAuMzE4OTc2MDU5LDMxLjM3NzA5MTggMC4zMTg5NzYwNTksMzAuNjA4Njk1NyBDMC4zMTg5NzYwNTksMzAuMzg0NTk0OCAwLjM3MzAxNTYxOCwzMC4xNjM4MSAwLjQ3NjQ5NzEwNiwyOS45NjUxMjU2IEw0LjYzMDYyNzg1LDIxLjk4OTE5NDUgQzQuOTg5NjE3NzYsMjEuMjk5OTMzOSA1LjcwMTMxMTAxLDIxLjAwMDEwNjMgNi40NzczOTQ2NiwyMSBMMTguMjcxMTkyNCwyMSBaIiBpZD0ic2hhcGUiIGZpbGwtb3BhY2l0eT0iMC45Ij48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
            logoState6.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjEgKDY3MDQ4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5BbGFuIEJ1dHRvbiAvIEFuaW1hdGlvbiAvIGJ1dHRvbi1sb2dvLXN0YXRlLTA2PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkFsYW4tQnV0dG9uLS8tQW5pbWF0aW9uLS8tYnV0dG9uLWxvZ28tc3RhdGUtMDYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsb2dvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNi4wMDAwMDAsIDIxLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTkuNjQwMDAxLDEuNDk1NDY4NSBMMjQsOS44NjY2NjY2NyBMMTguMjcxMTkyNCwyMSBMNi40NzczOTQ2NiwyMSBDNS43MDEzMTEwMSwyMS4wMDAxMDYzIDQuOTg5NjE3NzYsMjEuMjk5OTMzOSA0LjYzMDYyNzg1LDIxLjk4OTE5NDUgTDE1LjQ5OTE2NTksMS4xMjE2MDEzOCBDMTUuODQ2MDc4MSwwLjQ1NTUyOTk2NCAxNi41MjIzNTU1LDAuMDI5NDg4MzMzNSAxNy4yNjc4MTEsMC4wMDE0NzIxODExNSBDMTguMjY3Mjc3MSwwLjAzMzk5NDI4OTEgMTkuMTc1MjgxMSwwLjYwMzIwNjQyIDE5LjY0MDAwMSwxLjQ5NTQ2ODUgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMzAuNjUzNzgyMywxLjg1MzU4OTc1ZS0xNSBMMzAuOTQ0NDQ0NCwwIEwzMC44MjI3MzQ3LDEuODM1NzM2NGUtMTUgQzMwLjc5MjQ3NjMsMS44OTQ5ODUzOWUtMTUgMzAuNzYyMjkxMSwwLjAwMDQ5MjY3MjYzNSAzMC43MzIxODksMC4wMDE0NzIxODExNSBDMzEuNDc3NjQ0NSwwLjAyOTQ4ODMzMzUgMzIuMTUzOTIxOSwwLjQ1NTUyOTk2NCAzMi41MDA4MzQxLDEuMTIxNjAxMzggTDQ3LjUyMzUwMjksMjkuOTY1MTI1NiBDNDcuNjI2OTg0NCwzMC4xNjM4MSA0Ny42ODEwMjM5LDMwLjM4NDU5NDggNDcuNjgxMDIzOSwzMC42MDg2OTU3IEM0Ny42ODEwMjM5LDMxLjM3NzA5MTggNDcuMDU5MTk3MiwzMiA0Ni4yOTIxMzUxLDMyIEwzNi43OTA2NjIyLDMyIEMzNi4wMTQ0NzYxLDMyIDM1LjMwMjY0NzcsMzEuNTY3NzUwMiAzNC45NDM2MTA0LDMwLjg3ODM5ODYgTDI0LDkuODY2NjY2NjcgTDE5LjY0MDAwMSwxLjQ5NTQ2ODUgQzE5LjE2MTI4NDYsMC41NzYzMzMwNiAxOC4yMTIxOCwyLjAzMjAxNjQzZS0xNSAxNy4xNzcyNjUzLDAgTDMwLjY1Mzc4MjMsMS44NTM1ODk3NWUtMTUgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuMyI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTguMjcxMTkyNCwyMSBMMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEMxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTEuOTg1NTIzOSwzMiAxMS4yMDkzMzc4LDMyIEwxLjcwNzg2NDk1LDMyIEMwLjk0MDgwMjc5NiwzMiAwLjMxODk3NjA1OSwzMS4zNzcwOTE4IDAuMzE4OTc2MDU5LDMwLjYwODY5NTcgQzAuMzE4OTc2MDU5LDMwLjM4NDU5NDggMC4zNzMwMTU2MTgsMzAuMTYzODEgMC40NzY0OTcxMDYsMjkuOTY1MTI1NiBMNC42MzA2Mjc4NSwyMS45ODkxOTQ1IEM0Ljk4OTYxNzc2LDIxLjI5OTkzMzkgNS43MDEzMTEwMSwyMS4wMDAxMDYzIDYuNDc3Mzk0NjYsMjEgTDE4LjI3MTE5MjQsMjEgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuOSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTEuMjA5MzM3OCwzMiBDMTEuOTg1NTIzOSwzMiAxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEwxOC4yNzExOTI0LDIwLjg2NTk3NzMgTDIzLjk1NjQ1ODIsMjAuODY1MTk4MyBDMjQuNzMwOTU2MiwyMC44NjUwOTIyIDI1LjQ0MTU4NjcsMjEuMjk1Mzg0OCAyNS44MDE0ODQ2LDIxLjk4MjM3NjcgTDI5Ljk4MTkwMTUsMjkuOTYyMTc2OSBDMzAuMzM4MzQ0LDMwLjY0MjU3MzIgMzAuMDc2Njg1MiwzMS40ODM1OTk3IDI5LjM5NzQ3MDEsMzEuODQwNjYyMSBDMjkuMTk4MzgzOCwzMS45NDUzMjE1IDI4Ljk3NjkwOTMsMzIgMjguNzUyMDczOCwzMiBMMTEuMjA5MzM3OCwzMiBaIiBpZD0ic2hhcGUiIGZpbGwtb3BhY2l0eT0iMC41Ij48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
            logoState7.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjEgKDY3MDQ4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5BbGFuIEJ1dHRvbiAvIEFuaW1hdGlvbiAvIGJ1dHRvbi1sb2dvLXN0YXRlLTA3PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkFsYW4tQnV0dG9uLS8tQW5pbWF0aW9uLS8tYnV0dG9uLWxvZ28tc3RhdGUtMDciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsb2dvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNi4wMDAwMDAsIDIxLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTguMjcxMTkyNCwyMSBMMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEMxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTEuOTg1NTIzOSwzMiAxMS4yMDkzMzc4LDMyIEwxLjcwNzg2NDk1LDMyIEMwLjk0MDgwMjc5NiwzMiAwLjMxODk3NjA1OSwzMS4zNzcwOTE4IDAuMzE4OTc2MDU5LDMwLjYwODY5NTcgQzAuMzE4OTc2MDU5LDMwLjM4NDU5NDggMC4zNzMwMTU2MTgsMzAuMTYzODEgMC40NzY0OTcxMDYsMjkuOTY1MTI1NiBMNC42MzA2Mjc4NSwyMS45ODkxOTQ1IEwxNS40OTkxNjU5LDEuMTIxNjAxMzggQzE1Ljg0NjA3ODEsMC40NTU1Mjk5NjQgMTYuNTIyMzU1NSwwLjAyOTQ4ODMzMzUgMTcuMjY3ODExLDAuMDAxNDcyMTgxMTUgQzE4LjI2NzI3NzEsMC4wMzM5OTQyODkxIDE5LjE3NTI4MTEsMC42MDMyMDY0MiAxOS42NDAwMDEsMS40OTU0Njg1IEwyNCw5Ljg2NjY2NjY3IEwxOC4yNzExOTI0LDIxIFoiIGlkPSJzaGFwZS0yIiBmaWxsLW9wYWNpdHk9IjAuOSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMjguMzU5OTk5LDEuNDk1NDY4NSBDMjguODI0NzE4OSwwLjYwMzIwNjQyIDI5LjczMjcyMjksMC4wMzM5OTQyODkxIDMwLjczMjE4OSwwLjAwMTQ3MjE4MTE1IEMzMC43MDYxMzQyLDAuMDAwNDkyOTc1NjkxIDMwLjY3OTk5NSwxLjg1ODQxMzMxZS0xNSAzMC42NTM3ODIzLDEuODUzNTg5NzVlLTE1IEwzMC45NDQ0NDQ0LDAgTDMwLjgyMjczNDcsMS44MzU3MzY0ZS0xNSBDMzAuNzkyNDc2MywxLjg5NDk4NTM5ZS0xNSAzMC43NjIyOTExLDAuMDAwNDkyNjcyNjM1IDMwLjczMjE4OSwwLjAwMTQ3MjE4MTE1IEMzMS40Nzc2NDQ1LDAuMDI5NDg4MzMzNSAzMi4xNTM5MjE5LDAuNDU1NTI5OTY0IDMyLjUwMDgzNDEsMS4xMjE2MDEzOCBMNDcuNTIzNTAyOSwyOS45NjUxMjU2IEM0Ny42MjY5ODQ0LDMwLjE2MzgxIDQ3LjY4MTAyMzksMzAuMzg0NTk0OCA0Ny42ODEwMjM5LDMwLjYwODY5NTcgQzQ3LjY4MTAyMzksMzEuMzc3MDkxOCA0Ny4wNTkxOTcyLDMyIDQ2LjI5MjEzNTEsMzIgTDM2Ljc5MDY2MjIsMzIgQzM2LjAxNDQ3NjEsMzIgMzUuMzAyNjQ3NywzMS41Njc3NTAyIDM0Ljk0MzYxMDQsMzAuODc4Mzk4NiBMMjQsOS44NjY2NjY2NyBMMjguMzU5OTk5LDEuNDk1NDY4NSBaIiBpZD0ic2hhcGUiIGZpbGwtb3BhY2l0eT0iMC4zIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMC42NTM3ODIzLDEuODUzNTg5NzVlLTE1IEMzMC42Nzk5OTUsMS44NTg0MTMzMWUtMTUgMzAuNzA2MTM0MiwwLjAwMDQ5Mjk3NTY5MSAzMC43MzIxODksMC4wMDE0NzIxODExNSBDMjkuNzMyNzIyOSwwLjAzMzk5NDI4OTEgMjguODI0NzE4OSwwLjYwMzIwNjQyIDI4LjM1OTk5OSwxLjQ5NTQ2ODUgTDI0LDkuODY2NjY2NjcgTDE5LjY0MDAwMSwxLjQ5NTQ2ODUgQzE5LjE2MTI4NDYsMC41NzYzMzMwNiAxOC4yMTIxOCwyLjAzMjAxNjQzZS0xNSAxNy4xNzcyNjUzLDAgTDMwLjY1Mzc4MjMsMS44NTM1ODk3NWUtMTUgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTEuMjA5MzM3OCwzMiBDMTEuOTg1NTIzOSwzMiAxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEwxOC4yNzExOTI0LDIwLjg2NTk3NzMgTDIzLjk1NjQ1ODIsMjAuODY1MTk4MyBDMjQuNzMwOTU2MiwyMC44NjUwOTIyIDI1LjQ0MTU4NjcsMjEuMjk1Mzg0OCAyNS44MDE0ODQ2LDIxLjk4MjM3NjcgTDI5Ljk4MTkwMTUsMjkuOTYyMTc2OSBDMzAuMzM4MzQ0LDMwLjY0MjU3MzIgMzAuMDc2Njg1MiwzMS40ODM1OTk3IDI5LjM5NzQ3MDEsMzEuODQwNjYyMSBDMjkuMTk4MzgzOCwzMS45NDUzMjE1IDI4Ljk3NjkwOTMsMzIgMjguNzUyMDczOCwzMiBMMTEuMjA5MzM3OCwzMiBaIiBpZD0ic2hhcGUiIGZpbGwtb3BhY2l0eT0iMC41Ij48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
            logoState8.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjEgKDY3MDQ4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5BbGFuIEJ1dHRvbiAvIEFuaW1hdGlvbiAvIGJ1dHRvbi1sb2dvLXN0YXRlLTA4PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkFsYW4tQnV0dG9uLS8tQW5pbWF0aW9uLS8tYnV0dG9uLWxvZ28tc3RhdGUtMDgiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsb2dvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNi4wMDAwMDAsIDIxLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTkuNjQwMDAxLDEuNDk1NDY4NSBMMjQsOS44NjY2NjY2NyBMMTguMjcxMTkyNCwyMSBMNi40NzczOTQ2NiwyMSBDNS43MDEzMTEwMSwyMS4wMDAxMDYzIDQuOTg5NjE3NzYsMjEuMjk5OTMzOSA0LjYzMDYyNzg1LDIxLjk4OTE5NDUgTDE1LjQ5OTE2NTksMS4xMjE2MDEzOCBDMTUuODQ2MDc4MSwwLjQ1NTUyOTk2NCAxNi41MjIzNTU1LDAuMDI5NDg4MzMzNSAxNy4yNjc4MTEsMC4wMDE0NzIxODExNSBDMTguMjY3Mjc3MSwwLjAzMzk5NDI4OTEgMTkuMTc1MjgxMSwwLjYwMzIwNjQyIDE5LjY0MDAwMSwxLjQ5NTQ2ODUgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuOSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTguMjcxMTkyNCwyMSBMMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEMxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTEuOTg1NTIzOSwzMiAxMS4yMDkzMzc4LDMyIEwxLjcwNzg2NDk1LDMyIEMwLjk0MDgwMjc5NiwzMiAwLjMxODk3NjA1OSwzMS4zNzcwOTE4IDAuMzE4OTc2MDU5LDMwLjYwODY5NTcgQzAuMzE4OTc2MDU5LDMwLjM4NDU5NDggMC4zNzMwMTU2MTgsMzAuMTYzODEgMC40NzY0OTcxMDYsMjkuOTY1MTI1NiBMNC42MzA2Mjc4NSwyMS45ODkxOTQ1IEM0Ljk4OTYxNzc2LDIxLjI5OTkzMzkgNS43MDEzMTEwMSwyMS4wMDAxMDYzIDYuNDc3Mzk0NjYsMjEgTDE4LjI3MTE5MjQsMjEgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTEuMjA5MzM3OCwzMiBDMTEuOTg1NTIzOSwzMiAxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEwxOC4yNzExOTI0LDIwLjg2NTk3NzMgTDIzLjk1NjQ1ODIsMjAuODY1MTk4MyBDMjQuNzMwOTU2MiwyMC44NjUwOTIyIDI1LjQ0MTU4NjcsMjEuMjk1Mzg0OCAyNS44MDE0ODQ2LDIxLjk4MjM3NjcgTDI5Ljk4MTkwMTUsMjkuOTYyMTc2OSBDMzAuMzM4MzQ0LDMwLjY0MjU3MzIgMzAuMDc2Njg1MiwzMS40ODM1OTk3IDI5LjM5NzQ3MDEsMzEuODQwNjYyMSBDMjkuMTk4MzgzOCwzMS45NDUzMjE1IDI4Ljk3NjkwOTMsMzIgMjguNzUyMDczOCwzMiBMMTEuMjA5MzM3OCwzMiBaIiBpZD0ic2hhcGUiIGZpbGwtb3BhY2l0eT0iMC4zIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yOC4zNTk5OTksMS40OTU0Njg1IEMyOC44MjQ3MTg5LDAuNjAzMjA2NDIgMjkuNzMyNzIyOSwwLjAzMzk5NDI4OTEgMzAuNzMyMTg5LDAuMDAxNDcyMTgxMTUgQzMwLjcwNjEzNDIsMC4wMDA0OTI5NzU2OTEgMzAuNjc5OTk1LC0xLjIzNTI0NDE0ZS0xNCAzMC42NTM3ODIzLC0xLjIzNTcyNjVlLTE0IEwzMC45NDQ0NDQ0LC0xLjQyMTA4NTQ3ZS0xNCBMMzAuODIyNzM0NywtMS4yMzc1MTE4M2UtMTQgQzMwLjc5MjQ3NjMsLTEuMjMxNTg2OTNlLTE0IDMwLjc2MjI5MTEsMC4wMDA0OTI2NzI2MzUgMzAuNzMyMTg5LDAuMDAxNDcyMTgxMTUgQzMxLjQ3NzY0NDUsMC4wMjk0ODgzMzM1IDMyLjE1MzkyMTksMC40NTU1Mjk5NjQgMzIuNTAwODM0MSwxLjEyMTYwMTM4IEw0Ny41MjM1MDI5LDI5Ljk2NTEyNTYgQzQ3LjYyNjk4NDQsMzAuMTYzODEgNDcuNjgxMDIzOSwzMC4zODQ1OTQ4IDQ3LjY4MTAyMzksMzAuNjA4Njk1NyBDNDcuNjgxMDIzOSwzMS4zNzcwOTE4IDQ3LjA1OTE5NzIsMzIgNDYuMjkyMTM1MSwzMiBMMzYuNzkwNjYyMiwzMiBDMzYuMDE0NDc2MSwzMiAzNS4zMDI2NDc3LDMxLjU2Nzc1MDIgMzQuOTQzNjEwNCwzMC44NzgzOTg2IEwyNCw5Ljg2NjY2NjY3IEwyOC4zNTk5OTksMS40OTU0Njg1IFoiIGlkPSJzaGFwZSIgZmlsbC1vcGFjaXR5PSIwLjMiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTMwLjY1Mzc4MjMsLTEuMjM1NzI2NWUtMTQgQzMwLjY3OTk5NSwtMS4yMzUyNDQxNGUtMTQgMzAuNzA2MTM0MiwwLjAwMDQ5Mjk3NTY5MSAzMC43MzIxODksMC4wMDE0NzIxODExNSBDMjkuNzMyNzIyOSwwLjAzMzk5NDI4OTEgMjguODI0NzE4OSwwLjYwMzIwNjQyIDI4LjM1OTk5OSwxLjQ5NTQ2ODUgTDI0LDkuODY2NjY2NjcgTDE5LjY0MDAwMSwxLjQ5NTQ2ODUgQzE5LjE2MTI4NDYsMC41NzYzMzMwNiAxOC4yMTIxOCwtMS4yMTc4ODM4M2UtMTQgMTcuMTc3MjY1MywtMS40MjEwODU0N2UtMTQgTDMwLjY1Mzc4MjMsLTEuMjM1NzI2NWUtMTQgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";
            logoState9.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjEgKDY3MDQ4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5BbGFuIEJ1dHRvbiAvIEFuaW1hdGlvbiAvIGJ1dHRvbi1sb2dvLXN0YXRlLTA5PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkFsYW4tQnV0dG9uLS8tQW5pbWF0aW9uLS8tYnV0dG9uLWxvZ28tc3RhdGUtMDkiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsb2dvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNi4wMDAwMDAsIDIxLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMjQsOS44NjY2NjY2NyBMMTguMjcxMTkyNCwyMSBMNi40NzczOTQ2NiwyMSBDNS43MDEzMTEwMSwyMS4wMDAxMDYzIDQuOTg5NjE3NzYsMjEuMjk5OTMzOSA0LjYzMDYyNzg1LDIxLjk4OTE5NDUgTDE1LjQ5OTE2NTksMS4xMjE2MDEzOCBDMTUuODQ2MDc4MSwwLjQ1NTUyOTk2NCAxNi41MjIzNTU1LDAuMDI5NDg4MzMzNSAxNy4yNjc4MTEsMC4wMDE0NzIxODExNSBDMTcuMjM3NzA4OSwwLjAwMDQ5MjY3MjYzNSAxNy4yMDc1MjM3LDEuOTU5OTMzNjZlLTE0IDE3LjE3NzI2NTMsMS45NTM5OTI1MmUtMTQgTDMwLjY1Mzc4MjMsMi4xMzkzNTE1ZS0xNCBDMzAuNjc5OTk1LDIuMTM5ODMzODVlLTE0IDMwLjcwNjEzNDIsMC4wMDA0OTI5NzU2OTEgMzAuNzMyMTg5LDAuMDAxNDcyMTgxMTUgQzI5LjczMjcyMjksMC4wMzM5OTQyODkxIDI4LjgyNDcxODksMC42MDMyMDY0MiAyOC4zNTk5OTksMS40OTU0Njg1IEwyNCw5Ljg2NjY2NjY3IFoiIGlkPSJzaGFwZS0yIiBmaWxsLW9wYWNpdHk9IjAuOSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTguMjcxMTkyNCwyMSBMMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEMxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTEuOTg1NTIzOSwzMiAxMS4yMDkzMzc4LDMyIEwxLjcwNzg2NDk1LDMyIEMwLjk0MDgwMjc5NiwzMiAwLjMxODk3NjA1OSwzMS4zNzcwOTE4IDAuMzE4OTc2MDU5LDMwLjYwODY5NTcgQzAuMzE4OTc2MDU5LDMwLjM4NDU5NDggMC4zNzMwMTU2MTgsMzAuMTYzODEgMC40NzY0OTcxMDYsMjkuOTY1MTI1NiBMNC42MzA2Mjc4NSwyMS45ODkxOTQ1IEM0Ljk4OTYxNzc2LDIxLjI5OTkzMzkgNS43MDEzMTEwMSwyMS4wMDAxMDYzIDYuNDc3Mzk0NjYsMjEgTDE4LjI3MTE5MjQsMjEgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTEuMjA5MzM3OCwzMiBDMTEuOTg1NTIzOSwzMiAxMi42OTczNTIzLDMxLjU2Nzc1MDIgMTMuMDU2Mzg5NiwzMC44NzgzOTg2IEwxOC4yNzExOTI0LDIwLjg2NTk3NzMgTDIzLjk1NjQ1ODIsMjAuODY1MTk4MyBDMjQuNzMwOTU2MiwyMC44NjUwOTIyIDI1LjQ0MTU4NjcsMjEuMjk1Mzg0OCAyNS44MDE0ODQ2LDIxLjk4MjM3NjcgTDI5Ljk4MTkwMTUsMjkuOTYyMTc2OSBDMzAuMzM4MzQ0LDMwLjY0MjU3MzIgMzAuMDc2Njg1MiwzMS40ODM1OTk3IDI5LjM5NzQ3MDEsMzEuODQwNjYyMSBDMjkuMTk4MzgzOCwzMS45NDUzMjE1IDI4Ljk3NjkwOTMsMzIgMjguNzUyMDczOCwzMiBMMTEuMjA5MzM3OCwzMiBaIiBpZD0ic2hhcGUiIGZpbGwtb3BhY2l0eT0iMC4zIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yOC4zNTk5OTksMS40OTU0Njg1IEMyOC44MjQ3MTg5LDAuNjAzMjA2NDIgMjkuNzMyNzIyOSwwLjAzMzk5NDI4OTEgMzAuNzMyMTg5LDAuMDAxNDcyMTgxMTUgQzMwLjcwNjEzNDIsMC4wMDA0OTI5NzU2OTEgMzAuNjc5OTk1LC0xLjIzNTI0NDE0ZS0xNCAzMC42NTM3ODIzLC0xLjIzNTcyNjVlLTE0IEwzMC45NDQ0NDQ0LC0xLjQyMTA4NTQ3ZS0xNCBMMzAuODIyNzM0NywtMS4yMzc1MTE4M2UtMTQgQzMwLjc5MjQ3NjMsLTEuMjMxNTg2OTNlLTE0IDMwLjc2MjI5MTEsMC4wMDA0OTI2NzI2MzUgMzAuNzMyMTg5LDAuMDAxNDcyMTgxMTUgQzMxLjQ3NzY0NDUsMC4wMjk0ODgzMzM1IDMyLjE1MzkyMTksMC40NTU1Mjk5NjQgMzIuNTAwODM0MSwxLjEyMTYwMTM4IEw0Ny41MjM1MDI5LDI5Ljk2NTEyNTYgQzQ3LjYyNjk4NDQsMzAuMTYzODEgNDcuNjgxMDIzOSwzMC4zODQ1OTQ4IDQ3LjY4MTAyMzksMzAuNjA4Njk1NyBDNDcuNjgxMDIzOSwzMS4zNzcwOTE4IDQ3LjA1OTE5NzIsMzIgNDYuMjkyMTM1MSwzMiBMMzYuNzkwNjYyMiwzMiBDMzYuMDE0NDc2MSwzMiAzNS4zMDI2NDc3LDMxLjU2Nzc1MDIgMzQuOTQzNjEwNCwzMC44NzgzOTg2IEwyNCw5Ljg2NjY2NjY3IEwyOC4zNTk5OTksMS40OTU0Njg1IFoiIGlkPSJzaGFwZSIgZmlsbC1vcGFjaXR5PSIwLjUiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==";
            logoState10.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjEgKDY3MDQ4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5BbGFuIEJ1dHRvbiAvIEFuaW1hdGlvbiAvIGJ1dHRvbi1sb2dvLXN0YXRlLTEwPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkFsYW4tQnV0dG9uLS8tQW5pbWF0aW9uLS8tYnV0dG9uLWxvZ28tc3RhdGUtMTAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsb2dvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNi4wMDAwMDAsIDIxLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTkuNjQwMDAxLDEuNDk1NDY4NSBMMjQsOS44NjY2NjY2NyBMMTguMjcxMTkyNCwyMSBMNi40NzczOTQ2NiwyMSBDNS43MDEzMTEwMSwyMS4wMDAxMDYzIDQuOTg5NjE3NzYsMjEuMjk5OTMzOSA0LjYzMDYyNzg1LDIxLjk4OTE5NDUgTDE1LjQ5OTE2NTksMS4xMjE2MDEzOCBDMTUuODQ2MDc4MSwwLjQ1NTUyOTk2NCAxNi41MjIzNTU1LDAuMDI5NDg4MzMzNSAxNy4yNjc4MTEsMC4wMDE0NzIxODExNSBDMTguMjY3Mjc3MSwwLjAzMzk5NDI4OTEgMTkuMTc1MjgxMSwwLjYwMzIwNjQyIDE5LjY0MDAwMSwxLjQ5NTQ2ODUgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTEuMjA5MzM3OCwzMiBMMS43MDc4NjQ5NSwzMiBDMC45NDA4MDI3OTYsMzIgMC4zMTg5NzYwNTksMzEuMzc3MDkxOCAwLjMxODk3NjA1OSwzMC42MDg2OTU3IEMwLjMxODk3NjA1OSwzMC4zODQ1OTQ4IDAuMzczMDE1NjE4LDMwLjE2MzgxIDAuNDc2NDk3MTA2LDI5Ljk2NTEyNTYgTDQuNjMwNjI3ODUsMjEuOTg5MTk0NSBDNC45ODk2MTc3NiwyMS4yOTk5MzM5IDUuNzAxMzExMDEsMjEuMDAwMTA2MyA2LjQ3NzM5NDY2LDIxIEwxOC4yMDEzODg5LDIxIEwxOC4yNzExOTI0LDIwLjg2NTk3NzMgTDIzLjk1NjQ1ODIsMjAuODY1MTk4MyBDMjQuNzMwOTU2MiwyMC44NjUwOTIyIDI1LjQ0MTU4NjcsMjEuMjk1Mzg0OCAyNS44MDE0ODQ2LDIxLjk4MjM3NjcgTDI5Ljk4MTkwMTUsMjkuOTYyMTc2OSBDMzAuMzM4MzQ0LDMwLjY0MjU3MzIgMzAuMDc2Njg1MiwzMS40ODM1OTk3IDI5LjM5NzQ3MDEsMzEuODQwNjYyMSBDMjkuMTk4MzgzOCwzMS45NDUzMjE1IDI4Ljk3NjkwOTMsMzIgMjguNzUyMDczOCwzMiBMMTEuMjA5MzM3OCwzMiBaIiBpZD0ic2hhcGUtMiIgZmlsbC1vcGFjaXR5PSIwLjMiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTI4LjM1OTk5OSwxLjQ5NTQ2ODUgQzI4LjgyNDcxODksMC42MDMyMDY0MiAyOS43MzI3MjI5LDAuMDMzOTk0Mjg5MSAzMC43MzIxODksMC4wMDE0NzIxODExNSBDMzAuNzA2MTM0MiwwLjAwMDQ5Mjk3NTY5MSAzMC42Nzk5OTUsLTEuMjM1MjQ0MTRlLTE0IDMwLjY1Mzc4MjMsLTEuMjM1NzI2NWUtMTQgTDMwLjk0NDQ0NDQsLTEuNDIxMDg1NDdlLTE0IEwzMC44MjI3MzQ3LC0xLjIzNzUxMTgzZS0xNCBDMzAuNzkyNDc2MywtMS4yMzE1ODY5M2UtMTQgMzAuNzYyMjkxMSwwLjAwMDQ5MjY3MjYzNSAzMC43MzIxODksMC4wMDE0NzIxODExNSBDMzEuNDc3NjQ0NSwwLjAyOTQ4ODMzMzUgMzIuMTUzOTIxOSwwLjQ1NTUyOTk2NCAzMi41MDA4MzQxLDEuMTIxNjAxMzggTDQ3LjUyMzUwMjksMjkuOTY1MTI1NiBDNDcuNjI2OTg0NCwzMC4xNjM4MSA0Ny42ODEwMjM5LDMwLjM4NDU5NDggNDcuNjgxMDIzOSwzMC42MDg2OTU3IEM0Ny42ODEwMjM5LDMxLjM3NzA5MTggNDcuMDU5MTk3MiwzMiA0Ni4yOTIxMzUxLDMyIEwzNi43OTA2NjIyLDMyIEMzNi4wMTQ0NzYxLDMyIDM1LjMwMjY0NzcsMzEuNTY3NzUwMiAzNC45NDM2MTA0LDMwLjg3ODM5ODYgTDI0LDkuODY2NjY2NjcgTDI4LjM1OTk5OSwxLjQ5NTQ2ODUgWiIgaWQ9InNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMzAuNjUzNzgyMywtMS4yMzU3MjY1ZS0xNCBDMzAuNjc5OTk1LC0xLjIzNTI0NDE0ZS0xNCAzMC43MDYxMzQyLDAuMDAwNDkyOTc1NjkxIDMwLjczMjE4OSwwLjAwMTQ3MjE4MTE1IEMyOS43MzI3MjI5LDAuMDMzOTk0Mjg5MSAyOC44MjQ3MTg5LDAuNjAzMjA2NDIgMjguMzU5OTk5LDEuNDk1NDY4NSBMMjQsOS44NjY2NjY2NyBMMTkuNjQwMDAxLDEuNDk1NDY4NSBDMTkuMTYxMjg0NiwwLjU3NjMzMzA2IDE4LjIxMjE4LC0xLjIxNzg4MzgzZS0xNCAxNy4xNzcyNjUzLC0xLjQyMTA4NTQ3ZS0xNCBMMzAuNjUzNzgyMywtMS4yMzU3MjY1ZS0xNCBaIiBpZD0ic2hhcGUiIGZpbGwtb3BhY2l0eT0iMC45Ij48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
            setUpStylesForAnimatedLogoParts([
              logoState1,
              logoState2,
              logoState3,
              logoState4,
              logoState5,
              logoState6,
              logoState7,
              logoState8,
              logoState9,
              logoState10
            ]);
            defaultStateBtnIconImg.alt = alanAltPrefix + " button icon for idle state";
            listenStateBtnIconImg.alt = alanAltPrefix + " button icon for listening state";
            processStateBtnIconImg.alt = alanAltPrefix + " button icon for processing state";
            replyStateBtnIconImg.alt = alanAltPrefix + " button icon for reply state";
            var logoImgs = [
              defaultStateBtnIconImg,
              listenStateBtnIconImg,
              processStateBtnIconImg,
              replyStateBtnIconImg
            ];
            defaultStateBtnIconImg.src = micIconSrc;
            for (var i = 0; i < logoImgs.length; i++) {
              var logoImgEl = logoImgs[i];
              logoImgEl.style.minHeight = "100%";
              logoImgEl.style.height = "100%";
              logoImgEl.style.maxHeight = "100%";
              logoImgEl.style.minWidth = "100%";
              logoImgEl.style.width = "100%";
              logoImgEl.style.maxWidth = "100%";
              logoImgEl.style.top = "0%";
              logoImgEl.style.left = "0%";
              logoImgEl.style.position = "absolute";
              logoImgEl.style.pointerEvents = "none";
              logoImgEl.style.borderRadius = "50%";
              micIconDiv.appendChild(logoImgEl);
            }
            roundedTriangleIconDiv.style.minHeight = "100%";
            roundedTriangleIconDiv.style.height = "100%";
            roundedTriangleIconDiv.style.maxHeight = "100%";
            roundedTriangleIconDiv.style.minWidth = "100%";
            roundedTriangleIconDiv.style.width = "100%";
            roundedTriangleIconDiv.style.maxWidth = "100%";
            roundedTriangleIconDiv.style.top = "0%";
            roundedTriangleIconDiv.style.left = "0%";
            roundedTriangleIconDiv.style.zIndex = btnIconsZIndex;
            roundedTriangleIconDiv.style.position = "absolute";
            roundedTriangleIconDiv.style.opacity = "0";
            roundedTriangleIconDiv.style.transition = transitionCss;
            roundedTriangleIconDiv.style.overflow = "hidden";
            roundedTriangleIconDiv.style.borderRadius = "50%";
            roundedTriangleIconDiv.style.backgroundSize = "100% 100%";
            roundedTriangleIconDiv.style.backgroundPosition = "center center";
            roundedTriangleIconDiv.style.backgroundRepeat = "no-repeat";
            roundedTriangleIconDiv.classList.add("triangleMicIconBg");
            roundedTriangleIconDiv.classList.add("triangleMicIconBg-default");
            circleIconDiv.style.minHeight = "100%";
            circleIconDiv.style.height = "100%";
            circleIconDiv.style.maxHeight = "100%";
            circleIconDiv.style.minWidth = "100%";
            circleIconDiv.style.width = "100%";
            circleIconDiv.style.maxWidth = "100%";
            circleIconDiv.style.top = "0%";
            circleIconDiv.style.left = "0%";
            circleIconDiv.style.zIndex = btnIconsZIndex;
            circleIconDiv.style.position = "absolute";
            circleIconDiv.style.opacity = "0";
            circleIconDiv.style.transition = transitionCss;
            circleIconDiv.style.overflow = "hidden";
            circleIconDiv.style.borderRadius = "50%";
            circleIconDiv.style.backgroundSize = "0% 0%";
            circleIconDiv.style.backgroundPosition = "center center";
            circleIconDiv.style.backgroundRepeat = "no-repeat";
            circleIconDiv.classList.add("circleMicIconBg");
            function setStylesForBtnImage(element, _a) {
              var height = _a.height, top = _a.top, altText = _a.altText, src = _a.src, animation = _a.animation;
              element.style.minHeight = height;
              element.style.height = height;
              element.style.maxHeight = height;
              element.style.top = top;
              element.style.left = top;
              element.style.zIndex = btnIconsZIndex;
              element.style.position = "absolute";
              element.style.transition = transitionCss;
              element.style.opacity = "0";
              element.alt = alanAltPrefix + altText;
              element.src = src;
              if (animation) {
                element.style.animation = animation;
              }
            }
            setStylesForBtnImage(disconnectedMicLoaderIconImg, { height: "70%", top: "15%", altText: " disconnected microphone icon", animation: disconnectedLoaderAnimation, src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiB2aWV3Qm94PSIwIDAgMTkyIDE5MiI+CiAgICA8ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTk2IDBjNTMuMDIgMCA5NiA0Mi45OCA5NiA5NnMtNDIuOTggOTYtOTYgOTZTMCAxNDkuMDIgMCA5NiA0Mi45OCAwIDk2IDB6IiBvcGFjaXR5PSIuMDIiLz4KICAgICAgICA8cGF0aCBkPSJNMTMxLjk2NiAxOS4wOTJjLTMwLTE0LTY1LjI4NC05Ljg0OS05MS4xNDIgMTIuNTc1QzE0Ljk2NiA1NC4wOTIgNi44NSA4My44MSAxMi45MDggMTEzLjk1YzYuMDU4IDMwLjE0MiAzMC4zMDIgNTYuMTkgNjAuMDU4IDY0LjE0MiAzNS4xODMgOS40MDYgNzMtNCA5My0zNC0xNy45MjQgMjMuOTE2LTUyLjM2NiAzOC4yOTMtODMgMzMtMzAuMTY4LTUuMjEtNTcuMTA0LTMxLjExLTY0LTYxLTcuMzQ3LTMxLjgzNS43NzktNTYgMjctODBzODAtMjYgMTA5IDljNS41MzYgNi42ODEgMTMgMTkgMTUgMzQgMSA2IDEgNyAyIDEyIDAgMiAyIDQgNCA0IDMgMCA1LjM3NC0yLjI1NiA1LTYtMy0zMC0yMS41NTYtNTcuMTkzLTQ5LTcweiIgb3BhY2l0eT0iLjQiLz4KICAgIDwvZz4KPC9zdmc+Cg==" });
            setStylesForBtnImage(lowVolumeMicIconImg, { height: "100%", top: "0%", altText: " low volume icon", src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjEgKDY3MDQ4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5BbGFuIEJ1dHRvbiAvIEFuaW1hdGlvbiAvIGJ1dHRvbi1uby1taWM8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iQWxhbi1CdXR0b24tLy1BbmltYXRpb24tLy1idXR0b24tbm8tbWljIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iaWNvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjIuMDAwMDAwLCAxOS4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cGF0aCBkPSJNMzIsMTguNDczNjg0MiBDMzIsMjUuNzE5NDczNyAyNi43OCwzMS42OTI2MzE2IDIwLDMyLjY5ODQyMTEgTDIwLDQwIEMyMCw0MS4xMDQ1Njk1IDE5LjEwNDU2OTUsNDIgMTgsNDIgQzE2Ljg5NTQzMDUsNDIgMTYsNDEuMTA0NTY5NSAxNiw0MCBMMTYsMzIuNjk4NDIxMSBDOS4yMiwzMS42OTI2MzE2IDQsMjUuNzE5NDczNyA0LDE4LjQ3MzY4NDIgTDQsMTggQzQsMTYuODk1NDMwNSA0Ljg5NTQzMDUsMTYgNiwxNiBDNy4xMDQ1Njk1LDE2IDgsMTYuODk1NDMwNSA4LDE4IEw4LDE4LjQ3MzY4NDIgQzgsMjQuMTQxODY5OCAxMi40NzcxNTI1LDI4LjczNjg0MjEgMTgsMjguNzM2ODQyMSBDMjMuNTIyODQ3NSwyOC43MzY4NDIxIDI4LDI0LjE0MTg2OTggMjgsMTguNDczNjg0MiBMMjgsMTggQzI4LDE2Ljg5NTQzMDUgMjguODk1NDMwNSwxNiAzMCwxNiBDMzEuMTA0NTY5NSwxNiAzMiwxNi44OTU0MzA1IDMyLDE4IEwzMiwxOC40NzM2ODQyIFoiIGlkPSJTaGFwZSIgZmlsbC1vcGFjaXR5PSIwLjgiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE4LC00LjUyNzM3MjYzZS0xNCBDMjEuMzEzNzA4NSwtNC42MTg1Mjc3OGUtMTQgMjQsMi43NTY5ODMzOCAyNCw2LjE1Nzg5NDc0IEwyNCwxOC40NzM2ODQyIEMyNCwyMS44NzQ1OTU2IDIxLjMxMzcwODUsMjQuNjMxNTc4OSAxOCwyNC42MzE1Nzg5IEMxNC42ODYyOTE1LDI0LjYzMTU3ODkgMTIsMjEuODc0NTk1NiAxMiwxOC40NzM2ODQyIEwxMiw2LjE1Nzg5NDc0IEMxMiwyLjc1Njk4MzM4IDE0LjY4NjI5MTUsLTQuNTI3MzcyNjNlLTE0IDE4LC00LjYxODUyNzc4ZS0xNCBaIiBpZD0iU2hhcGUiIGZpbGwtb3BhY2l0eT0iMC42Ij48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLjgxLDMuMjcgTDM0LjczLDM0LjE5IEMzNS40MzE0MDE2LDM0Ljg5MTQwMTYgMzUuNDMxNDAxNiwzNi4wMjg1OTg0IDM0LjczLDM2LjczIEMzNC4wMjg1OTg0LDM3LjQzMTQwMTYgMzIuODkxNDAxNiwzNy40MzE0MDE2IDMyLjE5LDM2LjczIEwxLjI3LDUuODEgQzAuNTY4NTk4MzY4LDUuMTA4NTk4MzcgMC41Njg1OTgzNjgsMy45NzE0MDE2MyAxLjI3LDMuMjcgQzEuOTcxNDAxNjMsMi41Njg1OTgzNyAzLjEwODU5ODM3LDIuNTY4NTk4MzcgMy44MSwzLjI3IFoiIGlkPSJQYXRoIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=\n" });
            setStylesForBtnImage(noVoiceSupportMicIconImg, { height: "100%", top: "0%", altText: " no voice support icon", src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIuSURBVHgB7dvxUYMwFAbwpxMwAhvoBtVJygZ1A92gI1Qn6AjoBO0GsEG7wfPlgCtNA7xASzX5fnf5oyThLp+BQDiJAAAAAAAAAAAAAAAAxmHmDyk5n+ykLAn6SUhpHVaXwrQhcBsIr5FTLGSwb1IOmpkj9RnrxXE5+1x+fH7Pwyw0+PKSLLpCrGeq1oFiwNWiUGhCZE8UC22I7IliogmRPVFshkJkTxSjvhDZE8WqJ0QEqNURIgL0MTVEgmkhElTGhkix4WqzoNlYWFp1k1fhvvMHgc9n2cFRPzXAou/8t/JAM7EH/SD66ocM9bfrb+WR7kTGm1iHjqR3HDjXbOYMsLR+p9bvPentr3iuSeYM0B7Uwvr9RXqfA+cqKTRyma2sdSB3tMlZJ7X62Ru3Qa7CiSOIF6uN9pmw4NMuTjYUcDAcM8wEkTjaZdasytm9AfHsOL6lUJkZx5c2yr7a2ZlSyGSAa8egt5qBK0JU/TH+Na7uha4QzLHBm7+0ee8Iz/Sf/XlwtjeRtnq2mVU4dVSXUr6l/NDpccS0e5KSSekKybR9lReQkmLAV9hU7ZiFKcWCq8t5zeOtWfndOWhczcYN6+VSFq2+RfQhGnUYWUeY5ph5m0k6+iHENjs9RXuE2OYbYN3HFeKOYjQmwLrfRYgUo7EB1n2bEM03khXd0F0epDXs0Obaovd1ty39UCDAif5ygO0PRyWBH64eqJuFAP9kAwAAAAAAAAAAAAAAU/wC52820szaQtwAAAAASUVORK5CYII=" });
            setStylesForBtnImage(offlineIconImg, { height: "100%", top: "0%", altText: " offline icon", src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjEgKDY3MDQ4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5BbGFuIEJ1dHRvbiAvIEFuaW1hdGlvbiAvIGJ1dHRvbi1uby1uZXR3b3JrPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkFsYW4tQnV0dG9uLS8tQW5pbWF0aW9uLS8tYnV0dG9uLW5vLW5ldHdvcmsiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJpY29uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMS4wMDAwMDAsIDIyLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMzMsMiBDMzQuNjU2ODU0MiwyIDM2LDMuMzQzMTQ1NzUgMzYsNSBMMzYsMjkgQzM2LDMwLjY1Njg1NDIgMzQuNjU2ODU0MiwzMiAzMywzMiBDMzEuMzQzMTQ1OCwzMiAzMCwzMC42NTY4NTQyIDMwLDI5IEwzMCw1IEMzMCwzLjM0MzE0NTc1IDMxLjM0MzE0NTgsMiAzMywyIFoiIGlkPSJTaGFwZSIgZmlsbC1vcGFjaXR5PSIwLjQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTIzLDggQzI0LjY1Njg1NDIsOCAyNiw5LjM0MzE0NTc1IDI2LDExIEwyNiwyOSBDMjYsMzAuNjU2ODU0MiAyNC42NTY4NTQyLDMyIDIzLDMyIEMyMS4zNDMxNDU4LDMyIDIwLDMwLjY1Njg1NDIgMjAsMjkgTDIwLDExIEMyMCw5LjM0MzE0NTc1IDIxLjM0MzE0NTgsOCAyMyw4IFoiIGlkPSJTaGFwZSIgZmlsbC1vcGFjaXR5PSIwLjYiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTEzLDE2IEMxNC42NTY4NTQyLDE2IDE2LDE3LjM0MzE0NTggMTYsMTkgTDE2LDI5IEMxNiwzMC42NTY4NTQyIDE0LjY1Njg1NDIsMzIgMTMsMzIgQzExLjM0MzE0NTgsMzIgMTAsMzAuNjU2ODU0MiAxMCwyOSBMMTAsMTkgQzEwLDE3LjM0MzE0NTggMTEuMzQzMTQ1OCwxNiAxMywxNiBaIiBpZD0iU2hhcGUiIGZpbGwtb3BhY2l0eT0iMC44Ij48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLDIyIEM0LjY1Njg1NDI1LDIyIDYsMjMuMzQzMTQ1OCA2LDI1IEw2LDI5IEM2LDMwLjY1Njg1NDIgNC42NTY4NTQyNSwzMiAzLDMyIEMxLjM0MzE0NTc1LDMyIDIuMDI5MDYxMjVlLTE2LDMwLjY1Njg1NDIgMCwyOSBMMCwyNSBDLTIuMDI5MDYxMjVlLTE2LDIzLjM0MzE0NTggMS4zNDMxNDU3NSwyMiAzLDIyIFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNNS44MSwxLjI3IEwzNi43MywzMi4xOSBDMzcuNDMxNDAxNiwzMi44OTE0MDE2IDM3LjQzMTQwMTYsMzQuMDI4NTk4NCAzNi43MywzNC43MyBDMzYuMDI4NTk4NCwzNS40MzE0MDE2IDM0Ljg5MTQwMTYsMzUuNDMxNDAxNiAzNC4xOSwzNC43MyBMMy4yNywzLjgxIEMyLjU2ODU5ODM3LDMuMTA4NTk4MzcgMi41Njg1OTgzNywxLjk3MTQwMTYzIDMuMjcsMS4yNyBDMy45NzE0MDE2MywwLjU2ODU5ODM2OCA1LjEwODU5ODM3LDAuNTY4NTk4MzY4IDUuODEsMS4yNyBaIiBpZD0iUGF0aCIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=\n" });
            var defaultBtnColorOptions = {
              "idle": {
                "background": {
                  "color": [
                    "rgb(34, 203, 255)",
                    "rgb(25, 149, 255)"
                  ]
                },
                "hover": {
                  "color": [
                    "rgba(0, 70, 255, 0.95)",
                    "rgba(0, 156,  255, 0.95)"
                  ]
                }
              },
              "listen": {
                "background": {
                  "color": [
                    "rgba(0, 70, 255, 0.95)",
                    "rgba(0, 156,  255, 0.95)"
                  ]
                },
                "hover": {
                  "color": [
                    "rgba(0, 70, 255, 0.95)",
                    "rgb(0, 70, 255)"
                  ]
                }
              },
              "process": {
                "background": {
                  "color": [
                    "rgba(0, 255, 205, 0.95)",
                    "rgba(0, 115, 255, 0.95)"
                  ]
                },
                "hover": {
                  "color": [
                    "rgb(0, 115, 255)",
                    "rgba(0, 115, 255, 0.95)"
                  ]
                }
              },
              "reply": {
                "background": {
                  "color": [
                    "rgba(122, 40, 255, 0.95)",
                    "rgba(61, 122, 255, 0.95)"
                  ]
                },
                "hover": {
                  "color": [
                    "rgba(122, 40, 255, 0.95)",
                    "rgb(122, 40, 255)"
                  ]
                }
              },
              "textChat": {
                "background": {
                  "color": ["#1eb6e5", "#1995ff"],
                  "angle": 45
                },
                "hover": {
                  "color": ["#1ba3ce", "#1686e5"],
                  "angle": 45
                },
                "shadow": {
                  "color": ["#6693bc", "#b3c9de"]
                }
              }
            };
            btnOval1.style.transform = "rotate(-315deg)";
            btnOval2.style.transform = "rotate(-45deg)";
            applySizeSettingsToBlurLayers([btnOval1, btnOval2]);
            function applySizeSettingsToBlurLayers(elements) {
              for (var i2 = 0; i2 < elements.length; i2++) {
                var el = elements[i2];
                el.style.height = btnSize / 2 + "px";
                el.style.maxHeight = btnSize / 2 + "px";
                el.style.minHeight = btnSize / 2 + "px";
                el.style.minWidth = btnSize + "px";
                el.style.width = btnSize + "px";
                el.style.maxWidth = btnSize + "px";
                el.style.top = "calc(100%/2 - " + btnSize / 2 / 2 + "px)";
                el.style.filter = "blur(" + btnSize / 10 + "px)";
                el.style.left = 0;
                el.style.zIndex = btnBgLayerZIndex;
                el.style.position = "absolute";
                el.style.transition = transitionCss;
                el.style.opacity = ".5";
                el.style.borderRadius = "100px";
                el.classList.add("alanBtn-oval-bg-default");
              }
            }
            var popupCloseIconImgBase64 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuNzczNDUgNy4wMDAwM0wxMy44Mzk4IDAuOTMzNjA0QzE0LjA1MzQgMC43MjAwMjIgMTQuMDUzNCAwLjM3Mzc0MSAxMy44Mzk4IDAuMTYwMTg2QzEzLjYyNjMgLTAuMDUzMzY4MSAxMy4yOCAtMC4wNTMzOTU1IDEzLjA2NjQgMC4xNjAxODZMNyA2LjIyNjYxTDAuOTMzNjA0IDAuMTYwMTg2QzAuNzIwMDIyIC0wLjA1MzM5NTUgMC4zNzM3NDEgLTAuMDUzMzk1NSAwLjE2MDE4NiAwLjE2MDE4NkMtMC4wNTMzNjgxIDAuMzczNzY4IC0wLjA1MzM5NTUgMC43MjAwNDkgMC4xNjAxODYgMC45MzM2MDRMNi4yMjY1OSA3TDAuMTYwMTg2IDEzLjA2NjRDLTAuMDUzMzk1NSAxMy4yOCAtMC4wNTMzOTU1IDEzLjYyNjMgMC4xNjAxODYgMTMuODM5OEMwLjI2Njk2NCAxMy45NDY2IDAuNDA2OTM2IDE0IDAuNTQ2OTA5IDE0QzAuNjg2ODgxIDE0IDAuODI2ODI3IDEzLjk0NjYgMC45MzM2MzEgMTMuODM5OEw3IDcuNzczNDVMMTMuMDY2NCAxMy44Mzk4QzEzLjE3MzIgMTMuOTQ2NiAxMy4zMTMyIDE0IDEzLjQ1MzEgMTRDMTMuNTkzMSAxNCAxMy43MzMgMTMuOTQ2NiAxMy44Mzk4IDEzLjgzOThDMTQuMDUzNCAxMy42MjYzIDE0LjA1MzQgMTMuMjggMTMuODM5OCAxMy4wNjY0TDcuNzczNDUgNy4wMDAwM1oiIGZpbGw9IiNCQkNGRTciLz4KPC9zdmc+Cg==";
            btnBgDefault.classList.add("alanBtn-bg-default");
            btnBgListening.classList.add("alanBtn-bg-listening");
            btnBgSpeaking.classList.add("alanBtn-bg-speaking");
            btnBgIntermediate.classList.add("alanBtn-bg-intermediate");
            btnBgUnderstood.classList.add("alanBtn-bg-understood");
            applyBgStyles(btnBgDefault);
            applyBgStyles(btnBgListening);
            applyBgStyles(btnBgSpeaking);
            applyBgStyles(btnBgIntermediate);
            applyBgStyles(btnBgUnderstood);
            var onOpacity = "1";
            var offOpacity = "0";
            btnBgDefault.style.opacity = onOpacity;
            var allIcons = [
              circleIconDiv,
              roundedTriangleIconDiv,
              micIconDiv,
              offlineIconImg,
              lowVolumeMicIconImg,
              noVoiceSupportMicIconImg,
              logoState1,
              logoState2,
              logoState3,
              logoState4,
              logoState5,
              logoState6,
              logoState7,
              logoState8,
              logoState9,
              logoState10
            ];
            for (i = 0; i < allIcons.length; i++) {
              allIcons[i].setAttribute("draggable", "false");
            }
            hideLayers([
              btnBgListening,
              btnBgSpeaking,
              btnBgIntermediate,
              btnBgUnderstood
            ]);
            btn.appendChild(btnOval1);
            btn.appendChild(btnOval2);
            btn.appendChild(btnBgDefault);
            btn.appendChild(btnBgListening);
            btn.appendChild(btnBgSpeaking);
            btn.appendChild(btnBgIntermediate);
            btn.appendChild(btnBgUnderstood);
            btn.appendChild(micIconDiv);
            btn.appendChild(roundedTriangleIconDiv);
            btn.appendChild(circleIconDiv);
            btn.appendChild(disconnectedMicLoaderIconImg);
            btn.appendChild(lowVolumeMicIconImg);
            btn.appendChild(noVoiceSupportMicIconImg);
            btn.appendChild(offlineIconImg);
            btn.classList.add("alanBtn");
            if (isMobile()) {
              rootEl.classList.add("mobile");
            }
            var fixTextChatSizeIfNeeded = function(width, height, doubleMargin) {
              var margin = doubleMargin ? 2 * defaultChatMargin : defaultChatMargin;
              if (height !== null && window.innerHeight - defaultChatMargin < height) {
                setChatHeight(window.innerHeight - margin);
              }
              if (width !== null && window.innerWidth - defaultChatMargin < width) {
                setChatWidth(window.innerWidth - margin);
              }
            };
            createAlanStyleSheet();
            function getStyleSheetMarker(andFlag) {
              return ".alan-" + getProjectId() + (andFlag ? "" : " ");
            }
            function createAlanStyleSheet(webOptions) {
              var _a;
              var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135, _136, _137, _138, _139;
              var style;
              var keyFrames = "";
              var projectId = getProjectId();
              var existingStyleSheet;
              if (options2.shadowDOM) {
                existingStyleSheet = options2.shadowDOM.getElementById("alan-stylesheet-" + projectId);
              } else {
                existingStyleSheet = document.getElementById("alan-stylesheet-" + projectId);
              }
              style = document.createElement("style");
              style.setAttribute("id", "alan-stylesheet-" + projectId);
              style.type = "text/css";
              keyFrames += ".alanBtn-root * {  box-sizing: border-box; font-family: ".concat(((_d = (_c = (_b = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _b === void 0 ? void 0 : _b.textChat) === null || _c === void 0 ? void 0 : _c.popup) === null || _d === void 0 ? void 0 : _d.fontFamily) || "Poppins", "; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;}");
              var hoverSelector = !isMobile() ? ":hover" : ":active";
              if (!isMobile()) {
                keyFrames += getStyleSheetMarker() + ".alanBtn{transform: scale(1); transition: " + transitionCss + ";} .alanBtn" + hoverSelector + "{transform: scale(1.11111);transition:" + transitionCss + ";}.alanBtn:focus {transform: scale(1);" + transitionCss + ";  border: solid 3px #50e3c2;  outline: none;  }";
                keyFrames += getStyleSheetMarker(true) + ".alan-btn-disconnected  .alanBtn" + hoverSelector + "{transform: scale(1);transition:" + transitionCss + ";}";
                keyFrames += getStyleSheetMarker(true) + ".alan-btn-offline  .alanBtn" + hoverSelector + "{transform: scale(1);transition:" + transitionCss + ";}";
                keyFrames += getStyleSheetMarker(true) + ".alan-btn-no-voice-support  .alanBtn" + hoverSelector + "{transform: scale(1);transition:" + transitionCss + ";}";
              }
              keyFrames += getStyleSheetMarker(true) + ".alan-btn__page-scrolled .alanBtn {\n                transform: scale(0.4);\n                opacity: 0.5;\n                pointer-events: none;\n                transition: ".concat(transitionCss, ";\n            }");
              keyFrames += getStyleSheetMarker() + ".alanBtn-recognised-text-holder { position:fixed; transform: translateY(" + (isTopAligned ? "-" : "") + "50%); max-width:236px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; line-height: 18px;  min-height: 40px;  color: #000; font-weight: normal; background-color: #fff; border-radius:10px; box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.35); display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack: activate;-ms-flex-pack: start;justify-content: start;}";
              keyFrames += getStyleSheetMarker() + " .alanBtn-recognised-text-holder.alan-btn-lib__with-text.alan-btn-lib__left-side { text-align: left;}";
              keyFrames += getStyleSheetMarker() + " .alanBtn-recognised-text-holder.alan-btn-lib__with-text.alan-btn-lib__right-side { text-align: right;}";
              keyFrames += getStyleSheetMarker() + " .alanBtn-recognised-text-holder .alanBtn-recognised-text-content:not(:empty) {padding: 10px;}";
              keyFrames += getStyleSheetMarker(true) + ".alanBtn-recognised-text-holder-long  { font-size: 12px!important;line-height: 1.4!important;}  ";
              keyFrames += getStyleSheetMarker(true) + ".alanBtn-recognised-text-holder-super-long  { font-size: 11px!important;line-height: 1.4!important;}  ";
              keyFrames += getStyleSheetMarker() + ".alanBtn-text-appearing {  animation: text-holder-appear 800ms ease-in-out forwards;  }";
              keyFrames += getStyleSheetMarker() + ".alanBtn-text-disappearing {  animation: text-holder-disappear 800ms ease-in-out forwards;    }";
              keyFrames += getStyleSheetMarker() + ".alanBtn-text-disappearing-immediately {  animation: none; opactity: 0;   }";
              keyFrames += getStyleSheetMarker() + ".alan-btn-disabled {  pointer-events: none;  opacity: .5;  transition: all .2s ease-in-out;  }";
              keyFrames += getStyleSheetMarker() + ".shadow-appear {  opacity: 1 !important;  }\n";
              keyFrames += getStyleSheetMarker() + ".shadow-disappear {  opacity: 0 !important;  transition: all .1s linear !important;  }";
              keyFrames += getStyleSheetMarker(true) + ".alan-btn-offline .alanBtn-bg-default {  background-image: linear-gradient(122deg,rgb(78,98,126),rgb(91,116,145));}";
              keyFrames += getStyleSheetMarker(true) + ".alan-btn-offline .alanBtn" + hoverSelector + " .alanBtn-bg-default {  background-image: linear-gradient(122deg,rgb(78,98,126),rgb(91,116,145))!important;}";
              keyFrames += getStyleSheetMarker(true) + ".alan-btn-no-voice-support .alanBtn-bg-default {  background-image: linear-gradient(122deg,rgb(78,98,126),rgb(91,116,145));}";
              keyFrames += getStyleSheetMarker(true) + ".alan-btn-no-voice-support .alanBtn" + hoverSelector + " .alanBtn-bg-default {  background-image: linear-gradient(122deg,rgb(78,98,126),rgb(91,116,145))!important;}";
              keyFrames += getStyleSheetMarker(true) + ".alan-btn-permission-denied .alanBtn .alanBtn-bg-default {  background-image: linear-gradient(122deg,rgb(78,98,126),rgb(91,116,145));}";
              keyFrames += getStyleSheetMarker(true) + ".alan-btn-permission-denied .alanBtn" + hoverSelector + " .alanBtn-bg-default {  background-image: linear-gradient(122deg,rgb(78,98,126),rgb(91,116,145))!important;}";
              keyFrames += getStyleSheetMarker() + ".triangleMicIconBg {background-image:url(" + roundedTriangleSecondLayerSrc + "); pointer-events: none;}";
              keyFrames += getStyleSheetMarker() + ".circleMicIconBg {background-image:url(" + circleSecondLayerSrc + "); pointer-events: none;}";
              keyFrames += getStyleSheetMarker() + " img {pointer-events: none;}";
              keyFrames += getStyleSheetMarker() + "" + hoverSelector + " .triangleMicIconBg-default {opacity:0!important;}";
              keyFrames += getStyleSheetMarker() + ".alan-overlay-for-alert {position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 99;background: rgba(0, 0, 0, 0.57);opacity: 0;-webkit-animation: alan-fade-in 0.5s 0.2s forwards;-moz-animation: alan-fade-in 0.5s 0.2s forwards;-o-animation: alan-fade-in 0.5s 0.2s forwards;animation: alan-fade-in 0.5s 0.2s forwards;}";
              keyFrames += getStyleSheetMarker() + ".alan-alert-popup {border-radius:10px; box-shadow: 0px 5px 14px rgba(3, 3, 3, 0.25);padding:12px;padding-right:24px;text-align: center;width: 220px;background: rgb(255 255 255);position: fixed;left: 50%;transform: translateX(-50%);top: 10%;    color: #000;font-size: 14px;line-height: 18px;}";
              keyFrames += getStyleSheetMarker() + '.alan-alert-popup__close-btn {background:url("' + popupCloseIconImgBase64 + '") no-repeat center;cursor:pointer; background-size:100% 100%;position: absolute;top: 12px;right: 12px;width: 14px;height: 14px;}';
              var cssChatHeight = getTextChatSizeAfterResize("height");
              var cssChatWidth = getTextChatSizeAfterResize("width");
              fixTextChatSizeIfNeeded(cssChatWidth, cssChatHeight, true);
              cssChatHeight = getTextChatSizeAfterResize("height");
              cssChatWidth = getTextChatSizeAfterResize("width");
              if (cssChatHeight) {
                cssChatHeight = "".concat(cssChatHeight, "px");
              } else {
                cssChatHeight = "".concat(migrateHeightFromPercent((_g = (_f = (_e = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _e === void 0 ? void 0 : _e.textChat) === null || _f === void 0 ? void 0 : _f.popup) === null || _g === void 0 ? void 0 : _g.height) || defaultChatHeight, "px");
              }
              function migrateHeightFromPercent(val) {
                if (val && +val <= 100) {
                  return defaultChatHeight;
                }
                return val;
              }
              if (cssChatWidth) {
                cssChatWidth = "".concat(cssChatWidth, "px");
              } else {
                cssChatWidth = "".concat(((_k = (_j = (_h = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _h === void 0 ? void 0 : _h.textChat) === null || _j === void 0 ? void 0 : _j.popup) === null || _k === void 0 ? void 0 : _k.width) || "400", "px");
              }
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-holder {\n                position: fixed;\n                height:  ".concat(cssChatHeight, ";\n                min-height: ").concat(((_o = (_m = (_l = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _l === void 0 ? void 0 : _l.textChat) === null || _m === void 0 ? void 0 : _m.popup) === null || _o === void 0 ? void 0 : _o.minHeight) || defaultMinChatHeight, "px;\n                max-height: ").concat(((_r = (_q = (_p = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _p === void 0 ? void 0 : _p.textChat) === null || _q === void 0 ? void 0 : _q.popup) === null || _r === void 0 ? void 0 : _r.maxHeight) || "1200", "px;\n                width: ").concat(cssChatWidth, ";\n                min-width: ").concat(((_u = (_t = (_s = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _s === void 0 ? void 0 : _s.textChat) === null || _t === void 0 ? void 0 : _t.popup) === null || _u === void 0 ? void 0 : _u.minWidth) || defaultMinChatWidth, "px;\n                max-width: ").concat(((_x = (_w = (_v = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _v === void 0 ? void 0 : _v.textChat) === null || _w === void 0 ? void 0 : _w.popup) === null || _x === void 0 ? void 0 : _x.maxWidth) || "1200", "px;\n                display: none;\n                transform: scale(0);\n                opacity: 0;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-text-chat__openning {\n                transform: scale(0);\n                opacity: 0;\n                animation: text-chat-appear-anim ".concat(textChatAppearAnimationMs, "ms ease-in-out forwards;\n            }");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("text-chat-appear-anim", "\n            0%{\n                transform: scale(0);\n                opacity: 0;\n            }\n            100%{\n                transform: scale(1);\n                opacity: 1;\n            }\n            ");
              keyFrames += getStyleSheetMarker() + ".alan-text-chat__closing {\n                transform: scale(1);\n                opacity: 1;\n                animation: text-chat-disappear-anim ".concat(textChatAppearAnimationMs, "ms ease-in-out forwards;\n            }");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("text-chat-disappear-anim", "\n            0%{\n                transform: scale(1);\n                opacity: 1;\n            }\n            100%{\n                transform: scale(0);\n                opacity: 0;\n            }\n            ");
              keyFrames += ".mobile" + getStyleSheetMarker() + ".alan-btn__chat-holder {\n                position: fixed; \n                height: 100%;\n                min-height: 100%;\n                max-height: 100%;\n                width: 100vw;\n                min-width: 100vw;\n                max-width: 100vw;\n                display: none;\n                top: 0;\n                bottom:0;\n                left:0;\n                right:0;\n                border-radius: 0px;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-holder.bottom-none {\n                cursor: ns-resize;\n              }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-holder.top-none {\n                cursor: ns-resize;\n              }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-holder.none-left {\n                cursor: ew-resize;\n              }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-holder.none-right {\n                cursor: ew-resize;\n              }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-holder.top-left {\n                cursor: nwse-resize;\n              }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-holder.bottom-right {\n                cursor: nwse-resize;\n              }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-holder.top-right {\n                cursor: nesw-resize;\n              }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-holder.bottom-left {\n                cursor: nesw-resize;\n              }";
              var chatBgColor1 = ((_0 = (_z = (_y = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _y === void 0 ? void 0 : _y.textChat) === null || _z === void 0 ? void 0 : _z.popup) === null || _0 === void 0 ? void 0 : _0.backgroundColor) || "rgba(218, 235, 255, 1)";
              var chatBgColor2 = ((_3 = (_2 = (_1 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _1 === void 0 ? void 0 : _1.textChat) === null || _2 === void 0 ? void 0 : _2.popup) === null || _3 === void 0 ? void 0 : _3.backgroundColor2) || "rgba(255, 255, 255, 1)";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat {\n                height: 100%;\n                position: relative;\n                overflow: hidden;\n                display: flex;\n                width: 100%;\n                min-width: 100%;\n                max-width: 100%;\n                flex: 2;\n                position: relative;\n                flex-direction: column;\n                background: linear-gradient(180deg, ".concat(chatBgColor2, " 0%, ").concat(chatBgColor2, " 15%, ").concat(chatBgColor1, " 70%, ").concat(chatBgColor1, " 100%);\n                box-shadow: 0px 5px 44px rgba(0, 0, 0, 0.15);\n                border-radius: 20px;\n                animation: chat-appear 300ms ease-in-out forwards;\n                transform: scale(1);\n                opacity: 1; \n            }");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("alan-btn__sound-bar-1", "\n            0% {\n                opacity: 0; \n                transform: scale(0);\n            }\n            100% {\n                opacity: 1;  \n                transform: scale(1);   \n            }");
              keyFrames += ".mobile" + getStyleSheetMarker() + ".alan-btn__chat {\n                border-radius: 0px;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-textarea-holder {\n                width: 100%;\n                height: ".concat(textareaHolderHeight, "px;\n                max-height: ").concat(textareaHolderHeight, "px;\n                min-height: ").concat(textareaHolderHeight, "px;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-messages-empty-block {\n                flex: 1 1 auto;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-messages-wrapper {\n                width: 100%;\n                height: calc(100% - ".concat(chatHeaderHeight + textareaHolderHeight, "px);\n                max-height: calc(100% - ").concat(chatHeaderHeight + textareaHolderHeight, "px);\n                min-height: calc(100% - ").concat(chatHeaderHeight + textareaHolderHeight, "px);\n                overflow-y: scroll;\n                overflow-x: hidden;\n                padding: 20px 10px;\n                display: flex;\n                flex-shrink: 0;\n                flex-direction: column-reverse;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-messages {\n                display: flex;\n                flex-shrink: 0;\n                flex-direction: column;\n            }";
              var headerBg = ((_6 = (_5 = (_4 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _4 === void 0 ? void 0 : _4.textChat) === null || _5 === void 0 ? void 0 : _5.header) === null || _6 === void 0 ? void 0 : _6.backgroundColor) || "#FFFFFF";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-header {\n                width: 100%;\n                height: ".concat(chatHeaderHeight, "px;\n                max-height: ").concat(chatHeaderHeight, "px;\n                min-height: ").concat(chatHeaderHeight, "px;\n                color: #0f2029;\n                padding: 0px 15px;\n                padding-top: 12px;\n                background: ").concat(headerBg, ";\n                color: ").concat(((_9 = (_8 = (_7 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _7 === void 0 ? void 0 : _7.textChat) === null || _8 === void 0 ? void 0 : _8.header) === null || _9 === void 0 ? void 0 : _9.color) || "#000000", ";\n                text-align: center;\n                text-overflow: ellipsis;\n                white-space: nowrap;\n                position:relative;\n            }");
              var headerFontSize = ((_12 = (_11 = (_10 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _10 === void 0 ? void 0 : _10.textChat) === null || _11 === void 0 ? void 0 : _11.header) === null || _12 === void 0 ? void 0 : _12.fontSize) || 16;
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-header-title {\n                max-width: calc(100% - 112px);\n                overflow: hidden;\n                text-overflow: ellipsis;\n                white-space: nowrap;\n                display: inline-block;\n                font-weight: 600;\n                font-size: ".concat(headerFontSize, "px;\n                position: relative;\n                top: ").concat(headerFontSize >= 20 ? "-2" : "0", "px;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-header-gradient {\n                width: 100%;\n                height: 15px;\n                max-height: 15px;\n                min-height: 15px;\n                position: absolute;\n                left:0;\n                width: 100%;\n                top: ".concat(chatHeaderHeight, "px;\n                background: linear-gradient(180deg, ").concat(headerBg, " 30%, rgba(255, 255, 255, 0) 100%);\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-header-left-resizer {\n                transition: 300ms opacity ease-in-out;\n                position: absolute;\n                top: 3px;\n                left: 5px;\n                transform: rotate(180deg);\n                pointer-events: none;\n                display: block;\n                opacity: 0;\n                height: 18px;\n                width: 14px;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-header-right-resizer {\n                transition: 300ms opacity ease-in-out;\n                position: absolute;\n                top: 3px;\n                right: 5px;\n                transform: rotate(-90deg);\n                pointer-events: none;\n                display: block;\n                opacity: 0;\n                height: 18px;\n                width: 14px;\n            }";
              keyFrames += getStyleSheetMarker() + ".with-hover .alan-btn__chat-header-right-resizer {\n                opacity: 0.8;\n                transition: 300ms opacity ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".with-hover .alan-btn__chat-header-left-resizer {\n                opacity: 0.8;\n                transition: 300ms opacity ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".with-hover .alan-btn__chat-header::after {\n                opacity: 0.8;\n                transition: 300ms opacity ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".with-cursors .alan-btn__chat-messages {\n                pointer-events: none;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-unmute-btn {\n                position: absolute;\n                right: 15px;\n                top: 3px;\n                display: flex;\n                align-items: center;\n                height: ".concat(chatHeaderHeight, "px;\n                font-size: 14px;\n                cursor: pointer;\n            }");
              if (isMobile()) {
                keyFrames += getStyleSheetMarker() + ".alan-btn__chat-unmute-btn {\n                    display: none;\n                }";
              }
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-unmute-btn svg path {\n                fill: ".concat(((_18 = (_17 = (_16 = (_15 = (_14 = (_13 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _13 === void 0 ? void 0 : _13.textChat) === null || _14 === void 0 ? void 0 : _14.popup) === null || _15 === void 0 ? void 0 : _15.icons) === null || _16 === void 0 ? void 0 : _16.mute) === null || _17 === void 0 ? void 0 : _17["default"]) === null || _18 === void 0 ? void 0 : _18.fill) || "rgba(8, 8, 8, 1)", ";\n            }");
              if (!isMobile()) {
                keyFrames += getStyleSheetMarker() + ".alan-btn__chat-unmute-btn:hover svg path {\n                    fill: ".concat(((_24 = (_23 = (_22 = (_21 = (_20 = (_19 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _19 === void 0 ? void 0 : _19.textChat) === null || _20 === void 0 ? void 0 : _20.popup) === null || _21 === void 0 ? void 0 : _21.icons) === null || _22 === void 0 ? void 0 : _22.mute) === null || _23 === void 0 ? void 0 : _23.hover) === null || _24 === void 0 ? void 0 : _24.fill) || "rgba(0, 70, 255, 1)", ";\n                }");
              }
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-unmute-btn.disabled {\n                pointer-events: none;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-unmute-btn.disabled {\n                opacity: 0.4\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-header-clear-btn {\n                position: absolute;\n                right: ".concat(isMobile() ? 15 : 50, "px;\n                top: 3px;\n                width: 17px;\n                display: flex;\n                align-items: center;\n                height: ").concat(chatHeaderHeight, "px;\n                font-size: 14px;\n                cursor: pointer;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-header-clear-btn.disabled {\n                pointer-events: none;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-header-clear-btn.disabled {\n                opacity: 0.4\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-header-clear-btn svg path {\n                fill: ".concat(((_30 = (_29 = (_28 = (_27 = (_26 = (_25 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _25 === void 0 ? void 0 : _25.textChat) === null || _26 === void 0 ? void 0 : _26.popup) === null || _27 === void 0 ? void 0 : _27.icons) === null || _28 === void 0 ? void 0 : _28.clear) === null || _29 === void 0 ? void 0 : _29["default"]) === null || _30 === void 0 ? void 0 : _30.fill) || "rgba(8, 8, 8, 1)", ";\n            }");
              if (!isMobile()) {
                keyFrames += getStyleSheetMarker() + ".alan-btn__chat-header-clear-btn:hover svg path {\n                    fill: ".concat(((_36 = (_35 = (_34 = (_33 = (_32 = (_31 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _31 === void 0 ? void 0 : _31.textChat) === null || _32 === void 0 ? void 0 : _32.popup) === null || _33 === void 0 ? void 0 : _33.icons) === null || _34 === void 0 ? void 0 : _34.clear) === null || _35 === void 0 ? void 0 : _35.hover) === null || _36 === void 0 ? void 0 : _36.fill) || "rgba(255, 0, 92, 1)", ";\n                }");
              }
              keyFrames += getStyleSheetMarker() + ".alan-btn__close-chat-btn {\n                position: absolute;\n                left: 15px;\n                top: 3px;\n                width: 15px;\n                height: ".concat(chatHeaderHeight, "px;\n                display: flex;\n                align-items: center;\n                cursor: pointer;\n                pointer-events: all;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__close-chat-btn svg path {\n                fill: ".concat(((_42 = (_41 = (_40 = (_39 = (_38 = (_37 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _37 === void 0 ? void 0 : _37.textChat) === null || _38 === void 0 ? void 0 : _38.popup) === null || _39 === void 0 ? void 0 : _39.icons) === null || _40 === void 0 ? void 0 : _40.close) === null || _41 === void 0 ? void 0 : _41["default"]) === null || _42 === void 0 ? void 0 : _42.fill) || "rgba(8, 8, 8, 1)", ";\n            }");
              if (!isMobile()) {
                keyFrames += getStyleSheetMarker() + ".alan-btn__close-chat-btn:hover svg path {\n                    fill: ".concat(((_48 = (_47 = (_46 = (_45 = (_44 = (_43 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _43 === void 0 ? void 0 : _43.textChat) === null || _44 === void 0 ? void 0 : _44.popup) === null || _45 === void 0 ? void 0 : _45.icons) === null || _46 === void 0 ? void 0 : _46.close) === null || _47 === void 0 ? void 0 : _47.hover) === null || _48 === void 0 ? void 0 : _48.fill) || "rgba(151, 152, 156, 1)", ";\n                }");
              }
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-messages-wrapper::-webkit-scrollbar {\n                width: ".concat(textChatScrollSize, "px;\n                height: ").concat(textChatScrollSize, "px;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-messages-wrapper::-webkit-scrollbar-thumb {\n                border-radius: 3px;\n                background-color: rgba(224, 224, 224, 0.795);\n                transition: background-color 300ms ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-messages-wrapper::-webkit-scrollbar-thumb:hover {\n                background-color: rgba(230, 230, 230, 0.856);\n                transition: background-color 300ms ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-messages-wrapper::-webkit-scrollbar-track {\n                border-radius: 3px;\n                background: transparent;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-textarea-holder-gradient {\n                background: linear-gradient(0deg, ".concat(((_51 = (_50 = (_49 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _49 === void 0 ? void 0 : _49.textChat) === null || _50 === void 0 ? void 0 : _50.popup) === null || _51 === void 0 ? void 0 : _51.backgroundColor) || "rgba(218, 235, 255, 1)", " 30%, rgba(255, 255, 255, 0) 100%);\n                height:15px;\n                min-height:15px;\n                width: calc(100% - 10px);\n                position: absolute;\n                bottom: ").concat(textareaHolderHeight, "px;\n                left:0;\n            }");
              keyFrames += getStyleSheetMarker() + ".show-gradient .alan-btn__chat-textarea-gradient {\n                position: absolute;\n                left: 26px;\n                border-radius: 16px;\n                bottom: 15px;\n                width: 15px;\n                opacity: 0;\n                transition: opacity 300ms ease-in-out;\n                height: ".concat(chatTextareaHeight, "px;\n                background: linear-gradient(90deg, ").concat(((_54 = (_53 = (_52 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _52 === void 0 ? void 0 : _52.textChat) === null || _53 === void 0 ? void 0 : _53.textarea) === null || _54 === void 0 ? void 0 : _54.backgroundColor) || "rgb(255, 255, 255)", " 60%, rgba(255, 255, 255, 0) 100%);\n            }");
              keyFrames += getStyleSheetMarker() + ".show-gradient .alan-btn__chat-textarea-gradient {\n                opacity: 1;\n                transition: opacity 300ms ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-holder.alan-text-chat__voice-enabled .show-gradient .alan-btn__chat-textarea-gradient {\n                left: 50px;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-textarea {\n                position: absolute;\n                left: 15px;\n                bottom: 15px;\n                width: calc(100% - 30px);\n                border-radius: 20px;\n                box-shadow: 0px 1px 3px rgba(16, 39, 126, 0.2);\n                background-color: ".concat(((_57 = (_56 = (_55 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _55 === void 0 ? void 0 : _55.textChat) === null || _56 === void 0 ? void 0 : _56.textarea) === null || _57 === void 0 ? void 0 : _57.backgroundColor) || "rgb(255, 255, 255)", " ;\n                color: ").concat(((_60 = (_59 = (_58 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _58 === void 0 ? void 0 : _58.textChat) === null || _59 === void 0 ? void 0 : _59.textarea) === null || _60 === void 0 ? void 0 : _60.color) || "rgba(23, 23, 23, 1)", " ;\n                overflow: hidden;\n                outline: none;\n                resize: none;\n                border: 1px solid transparent;\n                -webkit-appearance: none;\n                font-size: ").concat(getTextAreaFontSize(isMobile(), ((_63 = (_62 = (_61 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _61 === void 0 ? void 0 : _61.textChat) === null || _62 === void 0 ? void 0 : _62.textarea) === null || _63 === void 0 ? void 0 : _63.fontSize) || defaultChatTextareaFontSize), "px;\n                line-height: ").concat(chatTextareaLineHieght, ";\n                text-align: left;\n                max-height: ").concat(chatTextareaHeight, "px;\n                height: ").concat(chatTextareaHeight, "px;\n                padding: ").concat(calculateTextareaTopPadding(), "px 42px 12px 12px;\n                margin: 0px!important;\n                -webkit-user-select: text;\n                -khtml-user-select: text;\n                -moz-user-select: text;\n                -ms-user-select: text;\n                user-select: text;\n                transition: opacity 300ms ease-in-out;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-textarea::placeholder {\n                color: ".concat(((_66 = (_65 = (_64 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _64 === void 0 ? void 0 : _64.textChat) === null || _65 === void 0 ? void 0 : _65.textarea) === null || _66 === void 0 ? void 0 : _66.placeholderColor) || "rgba(116, 116, 116, 1)", " ;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-textarea::-webkit-scrollbar {\n                width: 6px;\n                height: 6px;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-textarea::-webkit-scrollbar-thumb {\n                border-radius: 3px;\n                background-color: rgba(224, 224, 224, 0.795);\n                transition: background-color 300ms ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-textarea::-webkit-scrollbar-thumb:hover {\n                background-color: rgba(230, 230, 230, 0.856);\n                transition: background-color 300ms ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-textarea::-webkit-scrollbar-track {\n                border-radius: 3px;\n                background: transparent;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-holder.alan-text-chat__voice-enabled .alan-btn__chat-textarea {\n                padding-left: 42px;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat.alan-btn__mic-active .alan-btn__chat-textarea {\n                opacity: 0.6;\n                transition: opacity 300ms ease-in-out;\n                pointer-events: none;\n                -webkit-touch-callout: none;\n                -webkit-user-select: none;\n                -khtml-user-select: none;\n                -moz-user-select: none;\n                -ms-user-select: none;\n                user-select: none;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat.alan-btn__mic-active .alan-btn__chat-send-btn {\n                opacity: 0.2;\n                pointer-events: none;\n                transition: opacity 300ms ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__inactive .alan-btn__chat-send-btn {\n                opacity: 0.2;\n                pointer-events: none;\n                transition: opacity 300ms ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat.alan-btn__disconnected .alan-btn__chat-textarea {\n                opacity: 0.6;\n                transition: opacity 300ms ease-in-out;\n                pointer-events: none;\n                -webkit-touch-callout: none;\n                -webkit-user-select: none;\n                -khtml-user-select: none;\n                -moz-user-select: none;\n                -ms-user-select: none;\n                user-select: none;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat.alan-btn__disconnected .alan-btn__chat-send-btn {\n                opacity: 0.2;\n                pointer-events: none;\n                transition: opacity 300ms ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat.alan-btn__disconnected .alan-btn__chat-unmute-btn {\n                opacity: 0.2;\n                pointer-events: none;\n                transition: opacity 300ms ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat.alan-btn__disconnected .alan-btn__chat-header-clear-btn {\n                opacity: 0.2;\n                pointer-events: none;\n                transition: opacity 300ms ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat.alan-btn__disconnected .alan-btn__chat-send-btn svg path {\n                opacity: 1;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat.alan-btn__disconnected .alan-btn__chat-mic-btn {\n                opacity: 0.2;\n                pointer-events: none;\n                transition: opacity 300ms ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__inactive .alan-btn__chat-mic-btn {\n                opacity: 0.2;\n                pointer-events: none;\n                transition: opacity 300ms ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn_disconnected-chat-icon-rotate {\n                animation: disconnected-chat-icon-rotate-animation 1500ms linear infinite;\n            }";
              keyFrames += getStyleSheetMarker() + generateKeyFrame("disconnected-chat-icon-rotate-animation", "0%{  transform: rotate(0deg);  } 100%{  transform: rotate(360deg);  }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__disabled {\n                opacity: 0.2;\n                pointer-events: none;\n                transition: opacity 300ms ease-in-out;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-send-btn {\n                position: absolute;\n                transition: opacity 300ms ease-in-out;\n                right: 20px;\n                bottom: 20px;\n                min-width: 40px;\n                width: 40px;\n                max-width: 40px;\n                height: 40px;\n                max-height: 40px;\n                min-height: 40px;\n                display: flex;\n                flex-direction: row;\n                justify-content: center;\n                align-items: center;\n                border-radius: 50%;\n                -webkit-touch-callout: none; /* iOS Safari */\n                -webkit-user-select: none; /* Chrome/Safari/Opera */\n                -khtml-user-select: none; /* Konqueror */\n                -moz-user-select: none; /* Firefox */\n                -ms-user-select: none; /* IE/Edge */\n                user-select: none;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-send-btn svg {\n                position: relative;\n                left: 2px;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-send-btn svg path {\n                fill: ".concat(((_69 = (_68 = (_67 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _67 === void 0 ? void 0 : _67.textChat) === null || _68 === void 0 ? void 0 : _68.textarea) === null || _69 === void 0 ? void 0 : _69.placeholderColor) || "rgba(116, 116, 116, 1)", ";\n                opacity: 0.5;\n            }");
              keyFrames += getStyleSheetMarker() + ".ready-to-send:not(.alan-btn__inactive) .alan-btn__chat-send-btn svg path {\n                fill: ".concat(((_75 = (_74 = (_73 = (_72 = (_71 = (_70 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _70 === void 0 ? void 0 : _70.textChat) === null || _71 === void 0 ? void 0 : _71.popup) === null || _72 === void 0 ? void 0 : _72.icons) === null || _73 === void 0 ? void 0 : _73.general) === null || _74 === void 0 ? void 0 : _74["default"]) === null || _75 === void 0 ? void 0 : _75.fill) || "rgba(23, 23, 23, 1)", ";\n                opacity: 1;\n            }");
              if (!isMobile()) {
                keyFrames += getStyleSheetMarker() + ".ready-to-send:not(.alan-btn__inactive) .alan-btn__chat-send-btn:hover {\n                    cursor: pointer;\n                }";
                keyFrames += getStyleSheetMarker() + ".ready-to-send:not(.alan-btn__inactive) .alan-btn__chat-send-btn:hover svg path {\n                    fill: ".concat(((_81 = (_80 = (_79 = (_78 = (_77 = (_76 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _76 === void 0 ? void 0 : _76.textChat) === null || _77 === void 0 ? void 0 : _77.popup) === null || _78 === void 0 ? void 0 : _78.icons) === null || _79 === void 0 ? void 0 : _79.general) === null || _80 === void 0 ? void 0 : _80.hover) === null || _81 === void 0 ? void 0 : _81.fill) || "rgba(0, 120, 255, 1)", ";\n                    opacity:0.8;\n                }");
              }
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-mic-btn {\n                position: absolute;\n                left: 20px;\n                bottom: 22px;\n                min-width: ".concat(chatMicBtnActiveSize, "px;\n                width: ").concat(chatMicBtnActiveSize, "px;\n                max-width: ").concat(chatMicBtnActiveSize, "px;\n                height: ").concat(chatMicBtnActiveSize, "px;\n                max-height: ").concat(chatMicBtnActiveSize, "px;\n                min-height: ").concat(chatMicBtnActiveSize, "px;\n                display: flex;\n                flex-direction: row;\n                cursor: pointer;\n                justify-content: center;\n                align-items: center;\n                border-radius: 50%;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-mic-btn.active::before {\n                content: '';\n                position: absolute;\n                z-index: -1;\n                left: 0;\n                top: 0;\n                height: 100%;\n                width: 100%;\n                background-color:  ".concat(((_87 = (_86 = (_85 = (_84 = (_83 = (_82 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _82 === void 0 ? void 0 : _82.textChat) === null || _83 === void 0 ? void 0 : _83.popup) === null || _84 === void 0 ? void 0 : _84.icons) === null || _85 === void 0 ? void 0 : _85.general) === null || _86 === void 0 ? void 0 : _86["default"]) === null || _87 === void 0 ? void 0 : _87.fill) || "#C8C8CC", ";\n                opacity: 0.3;\n                border-radius: 50%;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-notifications-bubble {\n                position: absolute;\n                right: 4px;\n                top: -4px;\n                height: 20px;\n                width: 20px;\n                background-color:  ".concat(((_90 = (_89 = (_88 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _88 === void 0 ? void 0 : _88.textChat) === null || _89 === void 0 ? void 0 : _89.notifications) === null || _90 === void 0 ? void 0 : _90.backgroundColor) || "rgba(208, 2, 27, 1)", ";\n                color:  ").concat(((_93 = (_92 = (_91 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _91 === void 0 ? void 0 : _91.textChat) === null || _92 === void 0 ? void 0 : _92.notifications) === null || _93 === void 0 ? void 0 : _93.color) || "rgba(255, 255, 255, 1)", ";\n                border-radius: 50%;\n                z-index: ").concat(btnZIndex + 1, ";\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                justify-content: center;\n                font-size: 10px;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-notifications-bubble:empty {\n                display: none;\n            }";
              if (!isMobile()) {
                keyFrames += getStyleSheetMarker() + ".alan-btn__chat-mic-btn.active:hover::before {\n                opacity: 0.35;\n            }";
              }
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-mic-btn svg {\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-mic-btn svg path {\n                fill: ".concat(((_99 = (_98 = (_97 = (_96 = (_95 = (_94 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _94 === void 0 ? void 0 : _94.textChat) === null || _95 === void 0 ? void 0 : _95.popup) === null || _96 === void 0 ? void 0 : _96.icons) === null || _97 === void 0 ? void 0 : _97.general) === null || _98 === void 0 ? void 0 : _98["default"]) === null || _99 === void 0 ? void 0 : _99.fill) || "rgba(23, 23, 23, 1)", ";\n            }");
              if (!isMobile()) {
                keyFrames += getStyleSheetMarker() + ".alan-btn__chat-mic-btn:hover svg path {\n                fill: ".concat(((_105 = (_104 = (_103 = (_102 = (_101 = (_100 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _100 === void 0 ? void 0 : _100.textChat) === null || _101 === void 0 ? void 0 : _101.popup) === null || _102 === void 0 ? void 0 : _102.icons) === null || _103 === void 0 ? void 0 : _103.general) === null || _104 === void 0 ? void 0 : _104.hover) === null || _105 === void 0 ? void 0 : _105.fill) || "#007AFF", ";\n            }");
              }
              keyFrames += getStyleSheetMarker() + ".alan-text-chat__animated-btn-bars {\n                height:".concat(chatMicBtnActiveSize, "px;\n                width:").concat(chatMicBtnActiveSize, "px;\n                border-radius: 50%;\n                justify-content: center;\n                align-items: center;\n                background: ").concat(((_111 = (_110 = (_109 = (_108 = (_107 = (_106 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _106 === void 0 ? void 0 : _106.textChat) === null || _107 === void 0 ? void 0 : _107.popup) === null || _108 === void 0 ? void 0 : _108.icons) === null || _109 === void 0 ? void 0 : _109.general) === null || _110 === void 0 ? void 0 : _110.hover) === null || _111 === void 0 ? void 0 : _111.fill) || "#007AFF", ";\n                display:none;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-mic-btn.active .alan-text-chat__animated-btn-bars  {\n                display: flex;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-mic-btn.active svg  {\n                display: none;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-text-chat__bar {\n                background: #ffffff;\n                bottom: 1px;\n                height: 3px;\n                width: 2px;\n                margin: 0px 1px;\n                border-radius: 5px;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-text-chat__bar-1 {\n                animation: alan-btn__sound-bar-1 0ms -1200ms linear infinite alternate;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-text-chat__bar-2 {\n                animation: alan-btn__sound-bar-2 0ms -1200ms linear infinite alternate;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-text-chat__bar-3 {\n                animation: alan-btn__sound-bar-3 0ms -1200ms linear infinite alternate;\n            }";
              keyFrames += getStyleSheetMarker() + generateKeyFrame("alan-btn__sound-bar-1", "\n            0% {\n      \n                height: 3px; \n            }\n            100% {\n                  \n                height: 10px;        \n            }");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("alan-btn__sound-bar-2", "\n            0% {\n      \n                height: 8px; \n            }\n            100% {\n                  \n                height: 15px;        \n            }");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("alan-btn__sound-bar-3", "\n            0% {\n      \n                height: 12px; \n            }\n            100% {\n                  \n                height: 28px;        \n            }");
              keyFrames += getStyleSheetMarker() + ".alan-text-chat__bar:nth-child(1)  { animation-duration: 474ms; }";
              keyFrames += getStyleSheetMarker() + ".alan-text-chat__bar:nth-child(2)  { animation-duration: 433ms; }";
              keyFrames += getStyleSheetMarker() + ".alan-text-chat__bar:nth-child(3)  { animation-duration: 407ms; }";
              keyFrames += getStyleSheetMarker() + ".alan-text-chat__bar:nth-child(4)  { animation-duration: 458ms; }";
              keyFrames += getStyleSheetMarker() + ".alan-text-chat__bar:nth-child(5)  { animation-duration: 400ms; }";
              keyFrames += getStyleSheetMarker() + ".alan-text-chat__bar:nth-child(6)  { animation-duration: 427ms; }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-request {\n                margin-bottom: 16px;\n                max-width: 90%;\n                min-height: 41px;\n                padding: 9px 20px;\n                line-height: 1.53;\n                display: block;\n                float: right;\n                clear: both;\n                border-radius: 20px;\n                position: relative;\n                box-shadow: 0px 1px 3px rgba(16, 39, 126, 0.2);\n                background-color: ".concat(((_115 = (_114 = (_113 = (_112 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _112 === void 0 ? void 0 : _112.textChat) === null || _113 === void 0 ? void 0 : _113.bubbles) === null || _114 === void 0 ? void 0 : _114.request) === null || _115 === void 0 ? void 0 : _115.backgroundColor) || "rgba(178, 214, 255, 1)", ";\n                color: ").concat(((_119 = (_118 = (_117 = (_116 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _116 === void 0 ? void 0 : _116.textChat) === null || _117 === void 0 ? void 0 : _117.bubbles) === null || _118 === void 0 ? void 0 : _118.request) === null || _119 === void 0 ? void 0 : _119.color) || "rgba(23, 23, 23, 1)", ";\n                font-size: ").concat(((_123 = (_122 = (_121 = (_120 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _120 === void 0 ? void 0 : _120.textChat) === null || _121 === void 0 ? void 0 : _121.bubbles) === null || _122 === void 0 ? void 0 : _122.request) === null || _123 === void 0 ? void 0 : _123.fontSize) || "15", "px;\n                word-break: break-word;\n                text-align: left;\n                -webkit-touch-callout: text; /* iOS Safari */\n                -webkit-user-select: text; /* Chrome/Safari/Opera */\n                -khtml-user-select: text; /* Konqueror */\n                -moz-user-select: text; /* Firefox */\n                -ms-user-select: text; /* IE/Edge */\n                user-select: text;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-request * {\n                -webkit-touch-callout: text; /* iOS Safari */\n                -webkit-user-select: text; /* Chrome/Safari/Opera */\n                -khtml-user-select: text; /* Konqueror */\n                -moz-user-select: text; /* Firefox */\n                -ms-user-select: text; /* IE/Edge */\n                user-select: text;\n            }";
              var responseBubbleFontSize = +(((_127 = (_126 = (_125 = (_124 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _124 === void 0 ? void 0 : _124.textChat) === null || _125 === void 0 ? void 0 : _125.bubbles) === null || _126 === void 0 ? void 0 : _126.response) === null || _127 === void 0 ? void 0 : _127.fontSize) || 15);
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response {\n                margin-bottom: 16px;\n                max-width: 90%;\n                min-height: 41px;\n                padding: 9px 20px;\n                line-height: 1.53;\n                display: block;\n                float: left;\n                clear: both;\n                border-radius: 20px;\n                position: relative;\n                background-color: ".concat(((_131 = (_130 = (_129 = (_128 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _128 === void 0 ? void 0 : _128.textChat) === null || _129 === void 0 ? void 0 : _129.bubbles) === null || _130 === void 0 ? void 0 : _130.response) === null || _131 === void 0 ? void 0 : _131.backgroundColor) || "rgba(255, 255, 255, 1)", ";\n                box-shadow: 0px 1px 3px rgba(16, 39, 126, 0.2);\n                color: ").concat(((_135 = (_134 = (_133 = (_132 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _132 === void 0 ? void 0 : _132.textChat) === null || _133 === void 0 ? void 0 : _133.bubbles) === null || _134 === void 0 ? void 0 : _134.response) === null || _135 === void 0 ? void 0 : _135.color) || "rgba(23, 23, 23, 1)", ";\n                font-size: ").concat(responseBubbleFontSize, "px;\n                word-break: break-word;\n                text-align: left;\n                -webkit-touch-callout: text; /* iOS Safari */\n                -webkit-user-select: text; /* Chrome/Safari/Opera */\n                -khtml-user-select: text; /* Konqueror */\n                -moz-user-select: text; /* Firefox */\n                -ms-user-select: text; /* IE/Edge */\n                user-select: text;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response.with-images {\n                min-width: 90%;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-chat-small .alan-btn__chat-request {\n                max-width: 100%;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-chat-small .alan-btn__chat-response {\n                max-width: 100%;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-chat-small .alan-btn__chat-response.with-images {\n                min-width: 100%;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-request.animated {\n                opacity:0;\n                animation: chat-bubble-appear-w-opacity 300ms ease-in-out forwards;\n                animation-delay: 100ms;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response.animated {\n                opacity:0;\n                animation: chat-bubble-appear-w-opacity 300ms ease-in-out forwards;\n                animation-delay: 200ms;\n            }";
              keyFrames += getStyleSheetMarker() + generateKeyFrame("chat-bubble-appear-w-opacity", "\n            0% { opacity:0;}\n              \n            100% {\n                opacity:1;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response * {\n                -webkit-touch-callout: text; /* iOS Safari */\n                -webkit-user-select: text; /* Chrome/Safari/Opera */\n                -khtml-user-select: text; /* Konqueror */\n                -moz-user-select: text; /* Firefox */\n                -ms-user-select: text; /* IE/Edge */\n                user-select: text;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-imgs-wrapper {\n                display: flex;\n                flex-wrap: wrap;\n                position: relative;\n                top: -9px;\n                left: -20px;\n                width: calc(100% + 40px);\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-imgs-wrapper-left-arrow {\n                position: absolute;\n                top: 50%;\n                transform: translateY(-50%);\n                left: 12px;\n                opacity:0.85;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-imgs-wrapper-right-arrow {\n                position: absolute;\n                top: 50%;\n                transform: translateY(-50%);\n                right: 12px;\n                opacity:0.85;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-imgs-wrapper-left-arrow:hover {\n                opacity:1;\n                cursor: pointer;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-imgs-wrapper-right-arrow:hover {\n                opacity:1;\n                cursor: pointer;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-imgs-wrapper-left-arrow.invisible {\n                opacity:0;\n                pointer-events: none;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-imgs-wrapper-right-arrow.invisible {\n                opacity:0;\n                pointer-events: none;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-img-block {\n                overflow: hidden;\n                border-radius: 20px 20px 0 0;\n                width: 100%;\n                display: flex;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-video {\n                width: 100%;\n                min-width: 100%;\n                min-height: 220px;\n                height: 220px;\n                max-height: 220px;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-img {\n                cursor: pointer;\n                transition: transform 300ms ease-in-out;\n                width: 100%;\n                min-width: 100%;\n                min-height: 220px;\n                height: 220px;\n                max-height: 220px;\n                object-fit: contain;\n                pointer-events: initial;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-img.img-vertical {\n                object-fit: cover;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-img.not-found {\n                opacity: 0.7;\n            }";
              if (!isMobile()) {
                keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-imgs-wrapper:hover .alan-btn__chat-response-img {\n                    transform: scale(1.04);\n                    transition: transform 300ms ease-in-out;\n                }";
              }
              keyFrames += ".alan-btn__image-preview-overlay {\n                position: fixed;\n                top: 0;\n                left: 0;\n                height: 100vh;\n                min-height: 100vh;\n                width: 100vw;\n                min-width: 100vw;\n                background-color: rgba(0,0,0,0.6);\n                display: flex;\n                align-items: center;\n                justify-content: center;\n            }";
              keyFrames += ".alan-btn__image-preview-overlay img {\n                max-width: calc(100% - 100px);\n                max-height: calc(100% - 100px);\n            }";
              keyFrames += "@media (orientation: landscape) { \n                .alan-btn__image-preview-overlay {\n                    align-items: flex-start;\n                    padding-top: 40px;\n                }\n                .alan-btn__image-preview-overlay img {\n                    max-height: calc(100% - 120px);\n                }\n                .alan-btn__image-preview-overlay iframe {\n                    max-height: calc(100% - 120px);\n                }\n            }";
              keyFrames += ".alan-btn__image-preview-overlay iframe {\n                max-width: calc(100% - 100px);\n                max-height: calc(100% - 100px);\n                width: calc(100% - 100px);\n                height: calc(100% - 100px);\n            }";
              keyFrames += ".alan-btn__image-preview-overlay-close-icon {\n                position: absolute;\n                top: 16px;\n                right: 16px;\n                cursor: pointer;\n                opacity: 0.7;\n            }";
              if (!isMobile()) {
                keyFrames += ".alan-btn__image-preview-overlay-close-icon:hover {\n                    opacity: 1;\n                }";
              }
              keyFrames += ".alan-btn__image-preview-overlay-left-icon {\n                position: absolute;\n                top: 50%;\n                transform: translateY(-50%);\n                left: 16px;\n                cursor: pointer;\n                opacity: 0.7;\n            }";
              keyFrames += ".alan-btn__image-preview-overlay-right-icon {\n                position: absolute;\n                top: 50%;\n                transform: translateY(-50%);\n                right: 16px;\n                cursor: pointer;\n                opacity: 0.7;\n            }";
              keyFrames += ".alan-btn__image-preview-overlay-left-icon.invisible {\n                opacity:0;\n                pointer-events: none;\n            }";
              keyFrames += ".alan-btn__image-preview-overlay-right-icon.invisible {\n                opacity:0;\n                pointer-events: none;\n            }";
              if (!isMobile()) {
                keyFrames += ".alan-btn__image-preview-overlay-left-icon:hover {\n                    opacity: 1;\n                }";
                keyFrames += ".alan-btn__image-preview-overlay-right-icon:hover {\n                    opacity: 1;\n                }";
              }
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-links-wrapper {\n                display: flex;\n                flex-wrap: wrap;\n                border-top: 1px solid #D2DAE5;\n                padding: 10px 0 0 0;\n                margin-top: 10px;\n                align-items: center;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-link {\n                background: #EAF2FC;\n                border-radius: 15px;\n                padding: 6px 8px;\n                margin-right: 10px;\n                margin-top: 4px;\n                margin-bottom: 4px;\n                display: flex;\n                align-items: center;\n                max-width: 100%;\n                font-size: ".concat(responseBubbleFontSize - 2, "px;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-messages a.alan-btn__chat-response-link:hover  {\n                text-decoration: none !important;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-link-title {\n                overflow: hidden;\n                max-width: calc(100% - 15px);\n                text-overflow: ellipsis;\n                white-space: nowrap;\n                display: inline-block;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-link svg {\n                flex-shrink: 0;\n                margin-right: 6px;\n            }";
              if (!isMobile()) {
                keyFrames += getStyleSheetMarker() + "a.alan-btn__chat-response-link:hover svg path  {\n                    fill: #0078FF;\n                }";
              }
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-likes-wrapper  {\n                font-size: ".concat(responseBubbleFontSize + 5, "px;\n                margin-top: 10px;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-like-btn  {\n                cursor: pointer;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-dislike-btn  {\n                cursor: pointer;\n            }";
              if (!isMobile()) {
                keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-like-btn  {\n                    opacity: 0.7;\n                    cursor: pointer;\n                }";
                keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-like-btn:hover  {\n                    opacity: 1;\n                }";
                keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-dislike-btn  {\n                    opacity: 0.7;\n                }";
                keyFrames += getStyleSheetMarker() + ".alan-btn__chat-response-dislike-btn:hover  {\n                    opacity: 1;\n                }";
              }
              keyFrames += getStyleSheetMarker() + ".alan-incoming-msg {\n                display: flex;\n                align-items: center;\n                overflow: hidden;\n                animation:chat-bubble-appear-w-opacity 300ms ease-in-out forwards 100ms, hide-buble 300ms forwards ease 30000ms !important;\n            }";
              keyFrames += getStyleSheetMarker() + generateKeyFrame("hide-buble", "\n            0% { \n                height: 41px; \n                max-height:41px;    \n                min-height: 41px;\n            }\n              \n            100% {\n                height: 0px;\n                max-height: 0px;\n                min-height: 0px;\n                padding: 0px;\n                margin-bottom:0;\n            }");
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-incomming-msg-wrapper {\n                display: flex;\n                align-items: center;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-incomming-msg {\n                border-radius: 50%;\n                background-color: ".concat(((_139 = (_138 = (_137 = (_136 = webOptions === null || webOptions === void 0 ? void 0 : webOptions.chatOptions) === null || _136 === void 0 ? void 0 : _136.textChat) === null || _137 === void 0 ? void 0 : _137.bubbles) === null || _138 === void 0 ? void 0 : _138.response) === null || _139 === void 0 ? void 0 : _139.color) || "rgba(8, 8, 8, 1)", ";\n                margin: 2px;\n                height: 6px;\n                width: 6px;\n                animation: alan-dot-bounce 1.5s infinite ease;\n            }");
              keyFrames += getStyleSheetMarker() + ".msg-2 {\n                animation-delay: .2s;\n            }";
              keyFrames += getStyleSheetMarker() + ".msg-3 {\n                animation-delay: .3s;\n            }";
              keyFrames += getStyleSheetMarker() + generateKeyFrame("alan-dot-bounce", "\n            0%, 100% { opacity:1;}\n              \n            60% {\n                transform: translateY(3px);\n                opacity:.0;\n            }");
              function addCssForMarkdown(cssRules) {
                for (var i22 = 0; i22 < cssRules.length; i22++) {
                  var curRule = cssRules[i22];
                  keyFrames += getStyleSheetMarker() + ".alan-btn__chat-messages ".concat(curRule);
                }
              }
              addCssForMarkdown([
                "a {\n                    color: #4183c4!important;\n                    text-decoration: none!important;\n                }",
                "a:hover {\n                    text-decoration: underline!important;\n                }",
                "p {\n                    margin: 0!important;\n                    font-size: ".concat(responseBubbleFontSize, "px!important;\n                }"),
                "blockquote {\n                    margin: 0!important;\n                    font-size: ".concat(responseBubbleFontSize, "px!important;\n                }"),
                "dl {\n                    margin: 0!important;\n                    font-size: ".concat(responseBubbleFontSize, "px!important;\n                }"),
                "table {\n                    margin: 0!important;\n                    font-size: ".concat(responseBubbleFontSize, "px!important;\n                    word-break: initial!important;\n                }"),
                "ul {\n                    padding-left: 30px!important; \n                    margin: 0!important; \n                    list-style-type: disc!important;\n                    font-size: ".concat(responseBubbleFontSize, "px!important;\n                }"),
                "ul li {\n                   list-style-type: disc!important;\n                   font-size: ".concat(responseBubbleFontSize, "px!important;\n                }"),
                "ol {\n                    padding-left: 30px!important;\n                    margin: 0!important; \n                    list-style-type: decimal!important;\n                    font-size: ".concat(responseBubbleFontSize, "px!important;\n                }"),
                "ol li {\n                    list-style-type: decimal!important;\n                    font-size: ".concat(responseBubbleFontSize, "px!important;\n                }"),
                "h1 { font-size: 2.13em!important;  line-height: 1.7!important; margin: 0 0 10px 0!important; font-weight: normal!important;  text-transform: none!important;}",
                "h2 { font-size: 1.86em!important;  line-height: 1.7!important; margin: 0 0 10px 0!important; font-weight: normal!important;  text-transform: none!important;}",
                "h3 { font-size: 1.6em!important;  line-height: 1.7!important; margin: 0 0 10px 0!important; font-weight: normal!important;  text-transform: none!important;}",
                "h4 { font-size: 1.46em!important;  line-height: 1.7!important; margin: 0 0 10px 0!important; font-weight: normal!important;  text-transform: none!important;}",
                "h5 { font-size: 1.33em!important;  line-height: 1.7!important; margin: 0 0 10px 0!important; font-weight: normal!important;  text-transform: none!important;}",
                "h6 { font-size: 1.2em!important;  line-height: 1.7!important; margin: 0 0 10px 0!important; font-weight: normal!important;  text-transform: none!important;}",
                "h1:after { display: none!important;}",
                "h2:after { display: none!important;}",
                "h3:after { display: none!important;}",
                "h4:after { display: none!important;}",
                "h5:after { display: none!important;}",
                "h6:after { display: none!important;}",
                "h1:before { display: none!important;}",
                "h2:before { display: none!important;}",
                "h3:before { display: none!important;}",
                "h4:before { display: none!important;}",
                "h5:before { display: none!important;}",
                "h6:before { display: none!important;}",
                "h1 + p {\n                    margin-top: 10px!important;\n                }",
                "h2 + p {\n                    margin-top: 10px!important;\n                }",
                "h3 + p {\n                    margin-top: 10px!important;\n                }",
                "h4 + p {\n                    margin-top: 10px!important;\n                }",
                "h5 + p {\n                    margin-top: 10px!important;\n                }",
                "h6 + p {\n                    margin-top: 10px!important;\n                }",
                "p + p {\n                    margin-top: 10px!important;\n                }",
                "* + pre {\n                    margin-top: 8px!important;\n                }",
                "pre + * {\n                    margin-top: 16px!important;\n                    font-size: ".concat(responseBubbleFontSize, "px!important;\n                }"),
                "* + ul {\n                    margin-top: 8px!important;\n                }",
                "ul + * {\n                    margin-top: 16px!important;\n                }",
                "* + ol {\n                    margin-top: 8px!important;\n                }",
                "ol + * {\n                    margin-top: 16px!important;\n                }",
                "* + blockquote {\n                    margin-top: 8px!important;\n                }",
                "blockquote + * {\n                    margin-top: 16px!important;\n                }",
                "audio {\n                    max-width: 100%!important;\n                    max-height: 100%!important;\n                }",
                "video {\n                    max-width: 100%!important;\n                    max-height: 100%!important;\n                }",
                "img {\n                    max-width: 100%!important;\n                    pointer-events: auto!important;\n                    cursor: pointer;\n                    max-height: 500px;\n                }",
                //;iuytfd
                'code {\n                    background-color: #F8F8F8!important;\n                    border-radius: 3px!important;\n                    border: 1px solid #DDD!important;\n                    font-family: Consolas, "Liberation Mono", Courier, monospace!important;\n                    margin: 0 2px!important;\n                    padding: 0 5px!important;\n                    white-space: pre-line!important;\n                    font-size: '.concat(responseBubbleFontSize, "px!important;\n                }"),
                'pre {\n                    background-color: #F8F8F8!important;\n                    border-radius: 3px!important;\n                    border: 1px solid #DDD!important;\n                    font-family: Consolas, "Liberation Mono", Courier, monospace!important;\n                    padding: 0 5px!important;\n                    white-space: pre-line!important;\n                    font-size: '.concat(responseBubbleFontSize, "px!important;\n                }"),
                "pre code {\n                    border: none!important;\n                    margin: 0!important;\n                    padding: 0!important;\n                    white-space: pre-wrap!important;\n                    font-size: ".concat(responseBubbleFontSize, "px!important;\n                }"),
                "hr {\n                    display: block!important;\n                    unicode-bidi: isolate!important;\n                    margin-block-start: 0.5em!important;\n                    margin-block-end: 0.5em!important;\n                    margin-inline-start: auto!important;\n                    margin-inline-end: auto!important;\n                    overflow: hidden!important;\n                    border-style: inset!important;\n                    border-width: 1px!important;\n                }",
                "blockquote {\n                    padding: 5px 20px 0!important;\n                    border-left: 5px solid #beb7b7!important;\n                    font-size: ".concat(responseBubbleFontSize, "px!important;\n                }"),
                "table > tbody > tr > td {\n                    background-color: #fff!important;\n                    color: #000!important;\n                }",
                "table > tbody > tr > th {\n                    color: #000!important;\n                    background-color: #fff!important;\n                }",
                "table > thead > tr > th {\n                    padding: 4px!important;\n                    border-top: 1px solid #b7b5b5!important;\n                }",
                "table > tbody > tr > th {\n                    padding: 4px!important;\n                    border-top: 1px solid #b7b5b5!important;\n                }",
                "table > thead > tr > td {\n                    padding: 4px!important;\n                    border-top: 1px solid #b7b5b5!important;\n                }",
                "table > tbody > tr > td {\n                    padding: 4px;\n                    border-top: 1px solid #b7b5b5!important;\n                }",
                "strong {\n                    font-weight: bold!important;\n                }"
              ]);
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-popup {\n               position: relative;\n               margin-bottom: 16px;\n               -webkit-touch-callout: text; /* iOS Safari */\n               -webkit-user-select: text; /* Chrome/Safari/Opera */\n               -khtml-user-select: text; /* Konqueror */\n               -moz-user-select: text; /* Firefox */\n               -ms-user-select: text; /* IE/Edge */\n               user-select: text;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-btn__chat-popup * {\n                -webkit-touch-callout: text; /* iOS Safari */\n                -webkit-user-select: text; /* Chrome/Safari/Opera */\n                -khtml-user-select: text; /* Konqueror */\n                -moz-user-select: text; /* Firefox */\n                -ms-user-select: text; /* IE/Edge */\n                user-select: text;\n            }";
              keyFrames += getStyleSheetMarker(true) + ".hide-alan-btn-when-text-chat-is-opened-immediately .alanBtn {\n                transform: scale(0);\n                opacity: 0;\n                animation: text-chat-disappear-anim 0ms ease-in-out forwards;\n            }";
              keyFrames += getStyleSheetMarker(true) + ".hide-alan-btn-when-text-chat-is-opened .alanBtn {\n                transform: scale(0);\n                opacity: 0;\n                animation: text-chat-disappear-anim ".concat(textChatAppearAnimationMs, "ms ease-in-out forwards;\n            }");
              keyFrames += getStyleSheetMarker(true) + ".text-chat-is-closing .alanBtn {\n                transform: scale(0);\n                opacity: 0;\n                animation: text-chat-appear-anim ".concat(textChatAppearAnimationMs, "ms ease-in-out forwards;\n            }");
              keyFrames += getStyleSheetMarker(true) + ".hide-alan-btn-when-text-chat-is-opened .alanBtn-recognised-text-holder {\n                display: none;\n            }";
              keyFrames += getStyleSheetMarker() + " mjx-container svg {\n                max-width: 100%;\n            }";
              keyFrames += getStyleSheetMarker() + ".alan-overlay {position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 99;background: rgba(0, 0, 0, 0.57);opacity: 0;-webkit-animation: alan-fade-in 0.5s 0.2s forwards;-moz-animation: alan-fade-in 0.5s 0.2s forwards;-o-animation: alan-fade-in 0.5s 0.2s forwards;animation: alan-fade-in 0.5s 0.2s forwards;}";
              keyFrames += getStyleSheetMarker() + ".alan-overlay-popup.alan-btn-lib__default-popup {border-radius:10px; box-shadow: 0px 5px 14px rgba(3, 3, 3, 0.25);padding:6px 30px 6px 12px;text-align: left;width: 220px;background: rgb(255 255 255);}";
              keyFrames += getStyleSheetMarker() + ".alan-overlay-popup.alan-btn-lib__top.alan-btn-lib__right {border-top-right-radius: 0!important;}";
              keyFrames += getStyleSheetMarker() + ".alan-overlay-popup.alan-btn-lib__top.alan-btn-lib__left {border-top-left-radius: 0!important;}";
              keyFrames += getStyleSheetMarker() + ".alan-overlay-popup.alan-btn-lib__bottom.alan-btn-lib__left {border-bottom-left-radius: 0!important;}";
              keyFrames += getStyleSheetMarker() + ".alan-overlay-popup.alan-btn-lib__bottom.alan-btn-lib__right {border-bottom-right-radius: 0!important;}";
              keyFrames += getStyleSheetMarker() + ".alan-overlay-popup {position: fixed;opacity: 0;-webkit-animation: alan-fade-in 0.5s 0.2s forwards;-moz-animation: alan-fade-in 0.5s 0.2s forwards;-o-animation: alan-fade-in 0.5s 0.2s forwards;animation: alan-fade-in 0.5s 0.2s forwards;}";
              keyFrames += getStyleSheetMarker() + ".alan-overlay-popup__body {position:relative;color: #0D1940;font-size: 16px;line-height: 20px;}";
              keyFrames += getStyleSheetMarker() + '.alan-overlay-popup__ok {background:url("' + popupCloseIconImgBase64 + '") no-repeat center; background-size:100% 100%;min-height:14px;height:14px;max-height:14px;min-width:14px;width:14px;max-width:14px;opacity:0;transition:opacity 300ms ease-in-out;position:absolute;top:8px;right:8px;cursor: pointer;pointer-events: auto!important;}';
              keyFrames += getStyleSheetMarker() + ".alan-overlay-popup__ok:hover {opacity:0.9}";
              keyFrames += getStyleSheetMarker() + ".alan-overlay-popup:hover .alan-overlay-popup__ok{opacity:1;transition:opacity 300ms ease-in-out;}";
              keyFrames += getStyleSheetMarker() + generateKeyFrame("alan-gradient", "0%{backgroundPosition: 0 0;}50%{backgroundPosition: -100% 0;}100%{backgroundPosition: 0 0;}");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("alan-pulsating", "0%{transform: scale(1.11111);}50%{transform: scale(1.0);}100%{transform: scale(1.11111);}");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("alan-text-chat-pulsating", "0%{transform: scale(1.09);}50%{transform: scale(1.0);}100%{transform: scale(1.09);}");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("alan-mic-pulsating", "0%{transform: scale(0.91);}50%{transform: scale(1.0);}100%{transform: scale(0.91);}");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("alan-triangle-mic-pulsating", "0%{transform: scale(0.94);}50%{transform: scale(1.0);}100%{transform: scale(0.94);}");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("alan-fade-in", "0%{opacity: 0;}100%{opacity:1;}");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("alan-fade-out", "0%{opacity: 1;}100%{opacity:0;}");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("text-holder-appear", "0%{\n                    opacity:0;\n                    color:transparent;\n                    background-color:rgba(245, 252, 252, 0.0);\n                    border: solid 1px transparent;\n                }\n                100%{\n                    opacity:1;\n                    color:#000;\n                    background-color:rgba(245, 252, 252, 0.8);\n                }");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("text-holder-disappear", "0%{\n                    opacity:1; \n                    color:#000;\n                    background-color:rgba(245, 252, 252, 0.8);  \n                }\n                100%{\n                    opacity:0; \n                    color:transparent;\n                    background-color:rgba(245, 252, 252, 0.0);\n                    border: solid 1px transparent;\n                }");
              function generateLogoPartAnimation(partName, partIndex) {
                var animSteps = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
                var keyFrameContent = "";
                for (var i22 = 0; i22 < animSteps.length; i22++) {
                  var curOpacity = 0;
                  if (partIndex === 0) {
                    curOpacity = i22 === 0 || i22 === 10 ? 1 : 0;
                  } else {
                    curOpacity = i22 === partIndex ? 1 : 0;
                  }
                  keyFrameContent += "".concat(animSteps[i22], "% {  opacity: ").concat(curOpacity, ";  } ");
                }
                return getStyleSheetMarker() + generateKeyFrame(partName, keyFrameContent);
              }
              for (var i2 = 0; i2 < 10; i2++) {
                keyFrames += generateLogoPartAnimation("logo-state-".concat(i2 + 1, "-animation"), i2);
              }
              keyFrames += getStyleSheetMarker() + generateKeyFrame("disconnected-loader-animation", "0%{  transform: rotate(0deg);  } 100%{  transform: rotate(360deg);  }");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("oval1-animation", "0%{  transform: rotate(-315deg);  } 50%{  transform: rotate(-495deg);  } 100%{  transform: rotate(-315deg);  }");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("oval2-animation", "0%{  transform: rotate(-45deg);  } 50%{  transform: rotate(-215deg);  } 100%{  transform: rotate(-45deg);  }");
              keyFrames += getStyleSheetMarker() + generateKeyFrame("alan-text-fade-in", "0%{  opacity: 0;  } 100%{   opacity: 1;  }");
              keyFrames += getStyleSheetMarker() + ".alanBtn-bg-default.super-hidden{opacity:0!important;display:none;}";
              keyFrames += ".no-scroll-for-popup { overflow:hidden!important; position:fixed; }";
              keyFrames += ".no-scroll-for-popup video { visibility: hidden }";
              keyFrames += ".no-scroll-for-popup audio { visibility: hidden }";
              keyFrames += ".no-scroll-for-popup .alan-btn__chat-holder video { visibility: initial }";
              keyFrames += ".no-scroll-for-popup .alan-btn__chat-holder audio { visibility: initial }";
              var predefinedBtnColorOptions = defaultBtnColorOptions;
              if (webOptions === null || webOptions === void 0 ? void 0 : webOptions.btnOptions) {
                if (webOptions === null || webOptions === void 0 ? void 0 : webOptions.btnOptions.btnLayerOptions) {
                  predefinedBtnColorOptions = defaultBtnColorOptions;
                } else {
                  predefinedBtnColorOptions = (webOptions === null || webOptions === void 0 ? void 0 : webOptions.btnOptions) ? __assign(__assign({}, defaultBtnColorOptions), webOptions === null || webOptions === void 0 ? void 0 : webOptions.btnOptions) : defaultBtnColorOptions;
                }
              }
              var tempLayer;
              var stateName;
              var stateMapping = (_a = {}, _a[textChatIsAvailable ? "textChat" : "idle"] = ["default"], _a.listen = ["listening"], _a.process = ["intermediate", "understood"], _a.reply = ["speaking"], _a);
              var stateNameClasses, stateNameClass;
              var states = Object.keys(stateMapping);
              for (i = 0; i < states.length; i++) {
                stateName = states[i];
                stateNameClasses = stateMapping[stateName];
                tempLayer = predefinedBtnColorOptions[stateName];
                for (var j = 0; j < stateNameClasses.length; j++) {
                  stateNameClass = stateNameClasses[j];
                  if (tempLayer.background) {
                    keyFrames += getStyleSheetMarker() + ".alanBtn-bg-" + stateNameClass + " {";
                    keyFrames += "background-image: linear-gradient(122deg," + tempLayer.background.color[0] + "," + tempLayer.background.color[1] + ");";
                    keyFrames += "}";
                    keyFrames += getStyleSheetMarker() + ".alanBtn-oval-bg-" + stateNameClass + " {";
                    keyFrames += "background-image: linear-gradient(122deg," + tempLayer.background.color[0] + "," + tempLayer.background.color[1] + ");";
                    keyFrames += "}";
                  }
                  if (tempLayer.hover) {
                    keyFrames += getStyleSheetMarker() + ".alanBtn" + hoverSelector + " .alanBtn-bg-" + stateNameClass + ":not(.super-hidden) {";
                    keyFrames += "background-image: linear-gradient(122deg," + tempLayer.hover.color[0] + "," + tempLayer.hover.color[1] + ");";
                    keyFrames += "}";
                    keyFrames += getStyleSheetMarker() + ".alanBtn:active .alanBtn-bg-" + stateNameClass + ":not(.super-hidden) {";
                    keyFrames += "background-image: linear-gradient(122deg," + tempLayer.hover.color[0] + "," + tempLayer.hover.color[1] + ");";
                    keyFrames += "}";
                    keyFrames += getStyleSheetMarker() + ".alanBtn" + hoverSelector + " .alanBtn-oval-bg-" + stateNameClass + ":not(.super-hidden) {";
                    keyFrames += "background-image: linear-gradient(122deg," + tempLayer.hover.color[0] + "," + tempLayer.hover.color[1] + ");";
                    keyFrames += "}";
                    keyFrames += getStyleSheetMarker() + ".alanBtn:active .alanBtn-oval-bg-" + stateNameClass + ":not(.super-hidden) {";
                    keyFrames += "background-image: linear-gradient(122deg," + tempLayer.hover.color[0] + "," + tempLayer.hover.color[1] + ");";
                    keyFrames += "}";
                  }
                }
              }
              style.innerHTML = keyFrames;
              if (options2.shadowDOM) {
                options2.shadowDOM.prepend(style);
              } else {
                document.getElementsByTagName("head")[0].appendChild(style);
              }
              if (existingStyleSheet) {
                existingStyleSheet.disabled = true;
                existingStyleSheet.parentNode.removeChild(existingStyleSheet);
              }
            }
            function generateKeyFrame(name, rule) {
              var prefixes = ["@-webkit-keyframes", "@keyframes"];
              var r = "";
              for (var i2 = 0; i2 < prefixes.length; i2++) {
                r += prefixes[i2] + " " + name + "{" + rule + "} ";
              }
              return r;
            }
            function calculateTextareaTopPadding() {
              return "12";
            }
            function connectProject() {
              currentProjectId = options2.key;
              tryReadSettingsFromLocalStorage();
              switchState(getDefaultBtnState(DISCONNECTED));
              window.tutorProject = window.alan.project(options2.key, getAuthData(options2.authData), options2.host, null, {
                platform: mode === "demo" ? "alanplayground" : null,
                userAgent: navigator.userAgent,
                appName: window.location.hostname
              });
              console.time("Alan: receiving options time");
              window.tutorProject.on("connectStatus", onConnectStatusChange);
              window.tutorProject.on("options", onOptionsReceived);
              window.tutorProject.on("scripts", onScriptsCb);
              window.tutorProject.on("text", onTextCbInMicBtn);
              window.tutorProject.on("parsed", onParsedCbInMicBtn);
              alanAudio2.on("command", onCommandCbInMicBtn);
              alanAudio2.on("afterText", onAfterTextCbInMicBtn);
            }
            if (options2) {
              if (options2.alanAudio) {
                alanAudio2 = options2.alanAudio;
              }
              if (options2.key) {
                connectProject();
              } else {
                if (!isTutorMode()) {
                  console.error("The Alan Button key wasn't provided");
                }
                switchState(getDefaultBtnState());
              }
            }
            function getAuthData(data) {
              var authData = data || {};
              authData.uuid = getDeviceId();
              console.info("Alan: connect to dialog: ", options2.keepDialogSession !== false ? getSavedDialogId() : null);
              return __assign(__assign({}, authData), { dialogId: options2.keepDialogSession !== false ? getSavedDialogId() : null, capabilities: { textFormats: ["text", "html", "markdown"] } });
            }
            function getProjectId() {
              var key;
              if (options2.key) {
                key = options2.key;
                return key.substr(0, key.indexOf("/"));
              }
              return mode;
            }
            function throttle(func, wait) {
              if (wait === void 0) {
                wait = 100;
              }
              var timer = null;
              var throttlePause;
              return function() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
                }
                if (!throttlePause) {
                  func.apply(this, args);
                  throttlePause = true;
                  if (timer === null) {
                    timer = setTimeout(function() {
                      timer = null;
                      throttlePause = false;
                    }, wait);
                  }
                }
              };
            }
            function debounce(func, wait) {
              var timeout;
              var delay = wait || 100;
              return function(args) {
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                  func.apply(this, args);
                }, delay);
              };
            }
            var onresizeDebounced = debounce(function() {
              togglePopupVisibility(true, true);
            }, 400);
            var windowPrevInnerHeight = window.innerHeight;
            var windowPrevOrientation = window.orientation;
            function isSafari() {
              return /apple/i.test(navigator.vendor);
            }
            window.onresize = function() {
              if (isTutorMode())
                return;
              if (absolutePosition)
                return;
              var innerHeightDelta = Math.abs(windowPrevInnerHeight - window.innerHeight);
              var isMobileIos = (isMobile() || isIpadOS()) && isSafari();
              var orientationWasChanged = windowPrevOrientation !== window.orientation;
              var isVerticalResize = innerHeightDelta !== 0;
              var mobilePanelsWereShownOrHidden = isMobileIos && (innerHeightDelta === 84 || innerHeightDelta === 95 || innerHeightDelta === 50 || innerHeightDelta === 0);
              windowPrevOrientation = window.orientation;
              windowPrevInnerHeight = window.innerHeight;
              if ((orientationWasChanged || btnWasMoved || mobilePanelsWereShownOrHidden) && isVerticalResize) {
                var rootElClientRect = rootEl.getBoundingClientRect();
                var newYPos;
                if (innerHeightDelta === 0) {
                  newYPos = rootElClientRect.top + 84;
                } else {
                  newYPos = rootElClientRect.top;
                }
                if (orientationWasChanged && window.orientation === 0) {
                  setDefaultBtnHorizontalPosition();
                } else {
                  rootEl.style.setProperty("top", correctYPos(newYPos) + "px", "important");
                }
              }
              togglePopupVisibility(false);
              onresizeDebounced({});
              var chatHolderRect = chatHolderDiv.getBoundingClientRect();
              fixTextChatSizeIfNeeded(chatHolderRect.width, chatHolderRect.height, false);
            };
            var initialPermissionWasAsked = false;
            function checkPerrmissions() {
              if (navigator.permissions) {
                var permissionName = "microphone";
                navigator.permissions.query({ name: permissionName }).then(function(result) {
                  if (result.state === "prompt") {
                    if (isFileProtocol()) {
                      if (!initialPermissionWasAsked) {
                        initialPermissionWasAsked = true;
                        showPopup({ overlay: true, buttonUnderOverlay: true });
                      }
                    } else {
                      showPopup({ overlay: true, buttonUnderOverlay: true });
                    }
                    sendClientEvent({ micPermissionPrompt: true });
                  }
                  if (result.state !== "granted") {
                    sendClientEvent({ micAllowed: false });
                  }
                })["catch"](function(error) {
                  console.warn("Not possible to detect mic permissions, details: ", error);
                  setTimeout(function() {
                    return sendClientEvent({ micAllowed: alanAudio2.isMicAllowed() });
                  }, 300);
                });
              } else {
                setTimeout(function() {
                  return sendClientEvent({ micAllowed: alanAudio2.isMicAllowed() });
                }, 300);
              }
            }
            alanAudio2.on("popup", onPopup);
            function _activateAlanButton(resolve) {
              checkPerrmissions();
              if (options2.onBeforeMicStart) {
                options2.onBeforeMicStart();
              }
              alanAudio2.on("micStart", onMicStart);
              alanAudio2.on("micStop", onMicStop);
              alanAudio2.on("micAllowed", onMicAllowed);
              alanAudio2.on("audioRunning", onAudioRunning);
              checkIfPlayAllowed();
              alanAudio2.on("micFail", onMicFail);
              alanAudio2.on("playStart", onPlayStart);
              alanAudio2.on("playStop", onPlayStop);
              alanAudio2.start(resolve);
              if (options2.onMicStarted) {
                options2.onMicStarted();
              }
            }
            function sendFirstClickEvent() {
              if (!firstClick) {
                firstClick = true;
                sendClientEvent({ firstClick: true });
              }
            }
            function onBtnClick() {
              if (afterMouseMove)
                return;
              if (!dndBackAnimFinished)
                return;
              if (textChatIsAvailable && textChatIsHidden) {
                activateAlanButton();
              } else {
                activateVoiceBtn();
                this.blur();
              }
            }
            function onBtnClickInTextChat() {
              activateVoiceBtn({ activate: true });
            }
            function getDialogIdSessionKey() {
              return "alan-btn-dialogId-for-projectId-".concat(getProjectId());
            }
            function getSavedDialogId() {
              if (isLocalStorageAvailable) {
                return localStorage.getItem(getDialogIdSessionKey());
              }
              return null;
            }
            function saveDialogId(dialogId) {
              if (isLocalStorageAvailable && dialogId) {
                localStorage.setItem(getDialogIdSessionKey(), dialogId);
              }
            }
            function clearDialogId() {
              if (isLocalStorageAvailable) {
                localStorage.removeItem(getDialogIdSessionKey());
              }
            }
            function activateVoiceBtn(opts) {
              if (alanAudio2) {
                if (state === "default") {
                  activateAlanButton(opts);
                } else {
                  alanAudio2.stop();
                  if (state === NOT_SECURE_ORIGIN) {
                    setTimeout(function() {
                      showAlert(NOT_SECURE_ORIGIN_MSG);
                    }, 300);
                  } else if (state === PERMISSION_DENIED) {
                    setTimeout(function() {
                      showAlert(MIC_BLOCKED_MSG);
                    }, 300);
                  }
                }
              } else {
                throw new Error("No alan audio instance was provided");
              }
            }
            btn.addEventListener("click", onBtnClick);
            function activateAlanButton(opts) {
              hidePopup(null);
              sendFirstClickEvent();
              if (state === "default") {
                coldPlayForSoundNext();
              }
              var continueWithAudio = true;
              if (textChatIsAvailable) {
                continueWithAudio = false;
                if (textChatIsHidden) {
                  sendClientEvent({ buttonClicked: true });
                  fixTextChatSizeIfNeeded(getTextChatSizeAfterResize("width"), getTextChatSizeAfterResize("height"), true);
                  showTextChat();
                  setTextChatPosition(chatHolderDiv);
                }
                if ((opts === null || opts === void 0 ? void 0 : opts.activate) === true && voiceEnabledInTextChat) {
                  if (voiceEnabledInTextChat) {
                    continueWithAudio = true;
                  }
                }
              }
              if (!continueWithAudio) {
                return new Promise(function(resolve) {
                  resolve();
                });
              }
              if (currentErrMsg) {
                if (currentErrMsg === MIC_BLOCKED_MSG) {
                  sendClientEvent({ micAllowed: false });
                  showAlert(currentErrMsg);
                } else {
                  showAlert(currentErrMsg);
                }
                return;
              }
              var activatePromise = new Promise(function(resolve, reject) {
                if (btnDisabled) {
                  reject({ err: BTN_IS_DISABLED_CODE });
                  return;
                }
                if (isPreviewMode()) {
                  reject({ err: PREVIEW_MODE_CODE });
                  return;
                }
                function waitForConnectionForActivateCall(res) {
                  if (res === "authorized") {
                    window.tutorProject.off("connectStatus", waitForConnectionForActivateCall);
                    _activateAlanButton(resolve);
                  }
                }
                if (alanAudio2) {
                  switch (state) {
                    case DEFAULT:
                      try {
                        _activateAlanButton(resolve);
                      } catch (e) {
                        currentErrMsg = NO_VOICE_SUPPORT_IN_BROWSER_MSG;
                        reject({ err: NO_VOICE_SUPPORT_IN_BROWSER_CODE });
                      }
                      break;
                    case DISCONNECTED:
                    case OFFLINE:
                      window.tutorProject.on("connectStatus", waitForConnectionForActivateCall);
                      break;
                    case PERMISSION_DENIED:
                      reject({ err: MIC_BLOCKED_CODE });
                      sendClientEvent({ micAllowed: false });
                      break;
                    case LISTENING:
                    case SPEAKING:
                    case INTERMEDIATE:
                    case UNDERSTOOD:
                      resolve();
                      sendClientEvent({ micAllowed: true });
                      break;
                    default:
                  }
                } else {
                  reject({ err: NO_ALAN_AUDIO_INSANCE_WAS_PROVIDED_CODE });
                }
              });
              return activatePromise;
            }
            function deactivateAlanButton() {
              if (btnDisabled) {
                return;
              }
              alanAudio2.stop();
            }
            function sendText(text) {
              return new Promise(function(resolve, reject) {
                var param = { text };
                param.accept = {
                  voice: textToSpeachVoiceEnabled,
                  image: true,
                  text: true,
                  format: ["markdown", "text", "html"]
                };
                param.ctx = {
                  url: window.location.href
                };
                window.tutorProject.call("text", param, function(e, res) {
                  if (e) {
                    reject({ error: e });
                  } else if (res && res.error) {
                    reject(__assign({}, res));
                  } else {
                    resolve(res);
                  }
                });
              });
            }
            function checkIfPlayAllowed() {
              if (alanAudio2.isAudioRunning()) {
                sendClientEvent({ playAllowed: true });
              }
            }
            function onPopup(p) {
              hidePopup(null);
              if (isTutorMode()) {
                return;
              }
              var popupOptions = (p === null || p === void 0 ? void 0 : p.popup) ? p.popup : p;
              if (popupOptions.type !== "chat" && isMobile()) {
                return;
              }
              if (popupOptions && popupOptions.html) {
                popupOptions.html = replaceAttrInPopupHtml(popupOptions.html);
              }
              if (options2.onEvent) {
                options2.onEvent(Object.assign(p, { name: "popup" }));
              }
              if (p) {
                showPopup(popupOptions);
              }
            }
            function addPopupStyle(popupOptions, popup) {
              if (popupOptions.style) {
                var popupStyle = document.createElement("style");
                popupStyle.setAttribute("id", "alan-stylesheet-popup");
                popupStyle.type = "text/css";
                var parentClass = "alan-popup-" + guid();
                popup.classList.add(parentClass);
                popupStyle.innerHTML = popupOptions.style.replace(/(\.-?[_a-zA-Z]+[_a-zA-Z0-9-:]*\s*\{)/gi, ".".concat(parentClass, " $&"));
                if (options2.shadowDOM) {
                  options2.shadowDOM.prepend(popupStyle);
                } else {
                  document.getElementsByTagName("head")[0].appendChild(popupStyle);
                }
              }
            }
            function showPopup(popupOptions, keepPopupOverlay) {
              if (btnDisabled)
                return;
              if (popupIsVisible)
                return;
              if (!popupEnabled)
                return;
              if (popupOptions.type === "chat") {
                renderMessageInTextChat(popupOptions);
                return;
              }
              savedPopupOptions = popupOptions;
              var message = popupOptions.message;
              var buttonMarginInPopup = popupOptions.buttonMarginInPopup;
              var withOverlay = popupOptions.overlay;
              var _btnSize = parseInt(btnSize, 10);
              var popup = document.createElement("div");
              var rootElClientRect = rootEl.getBoundingClientRect();
              var maxZIndex = 2147483647;
              var popup2BtnMargin = 12;
              popupIsVisible = true;
              popup.id = "alan-overlay-popup";
              popup.classList.add("alan-overlay-popup");
              if (popupOptions.buttonUnderOverlay !== true) {
                btn.style.zIndex = maxZIndex.toString();
              }
              popup.style.zIndex = (maxZIndex - 2).toString();
              if (popupOptions.preventClick) {
                btn.style.pointerEvents = "none";
              }
              addPopupStyle(popupOptions, popup);
              popup.classList.add(isLeftAligned ? "alan-btn-lib__left" : "alan-btn-lib__right");
              if (!absolutePosition) {
                if (!isLeftAligned) {
                  popup.style.right = initRightPos + (-buttonMarginInPopup || 0) + "px";
                } else {
                  popup.style.left = rootElClientRect.x + (-buttonMarginInPopup || 0) + "px";
                }
                if (rootElClientRect.top > 80) {
                  popup.classList.add("alan-btn-lib__bottom");
                  popup.style.top = rootElClientRect.top + (buttonMarginInPopup ? _btnSize + buttonMarginInPopup : -popup2BtnMargin) + "px";
                  popup.style.setProperty("transform", "translateY(-100%)", "important");
                } else {
                  popup.classList.add("alan-btn-lib__top");
                  popup.style.top = rootElClientRect.top + (buttonMarginInPopup ? -buttonMarginInPopup : _btnSize + popup2BtnMargin) + "px";
                }
              } else {
                popup.style.position = "absolute";
                popup.style[isLeftAligned ? "left" : "right"] = (-buttonMarginInPopup || 0) + "px";
                popup.style[isTopAligned ? "top" : "bottom"] = (buttonMarginInPopup ? -buttonMarginInPopup : _btnSize + popup2BtnMargin) + "px";
                popup.classList.add(isTopAligned ? "alan-btn-lib__top" : "alan-btn-lib__bottom");
              }
              if (!popupOptions.html) {
                if (message) {
                  popup.classList.add("alan-btn-lib__default-popup");
                  popup.innerHTML = '<div class="alan-overlay-popup__body">' + message + "</div>";
                }
              } else {
                popup.innerHTML = popupOptions.html;
              }
              var closeIconImg = document.createElement("div");
              closeIconImg.id = "alan-overlay-ok-btn";
              closeIconImg.classList.add("alan-overlay-popup__ok");
              if (popupOptions.html && popup.children[0]) {
                popup.children[0].appendChild(closeIconImg);
              } else {
                popup.appendChild(closeIconImg);
              }
              rootEl.appendChild(popup);
              if (withOverlay && keepPopupOverlay !== true) {
                var overlay = document.createElement("div");
                overlay.id = "alan-overlay";
                overlay.classList.add("alan-overlay");
                overlay.style.zIndex = (maxZIndex - 3).toString();
                rootEl.appendChild(overlay);
                overlay.addEventListener("click", hidePopup);
              }
              closeIconImg.addEventListener("click", hidePopupByCloseIcon);
              document.addEventListener("keyup", hidePopupByEsc);
              var showPopupEvent = "showPopup";
              if (popupOptions.name) {
                showPopupEvent += ":" + popupOptions.name;
              }
              sendUserEvent(showPopupEvent);
            }
            function hidePopupByCloseIcon() {
              hidePopup(null);
              sendClientEvent({ popupCloseClicked: true });
            }
            function hidePopupByEsc(e) {
              if (e.keyCode === 27) {
                hidePopup(null);
                sendClientEvent({ popupCloseClicked: true });
              }
            }
            function hidePopup(e, keepOptionsInMemory, keepPopupOverlay) {
              if (keepOptionsInMemory !== true) {
                savedPopupOptions = null;
              }
              var overlay = rootEl.querySelector("#alan-overlay");
              var popup = rootEl.querySelector("#alan-overlay-popup");
              if (!popup)
                return;
              var overlayCloseIcon = rootEl.querySelector("#alan-overlay-ok-btn");
              if (overlayCloseIcon) {
                overlayCloseIcon.removeEventListener("click", hidePopup);
              }
              if (overlay && keepPopupOverlay !== true) {
                overlay.remove();
                overlay.removeEventListener("click", hidePopup);
              }
              if (popup) {
                popup.remove();
              }
              document.removeEventListener("keyup", hidePopupByEsc);
              btn.style.zIndex = btnZIndex;
              btn.style.pointerEvents = "auto";
              popupIsVisible = false;
            }
            var savedPopupOptions;
            function togglePopupVisibility(isVisible, keepPopupOverlay) {
              var popup = rootEl.querySelector("#alan-overlay-popup");
              if (popup) {
                popup.style.visibility = isVisible ? "visible" : "hidden";
                if (isVisible) {
                  hidePopup(null, true, keepPopupOverlay);
                  if (savedPopupOptions) {
                    showPopup(savedPopupOptions, keepPopupOverlay);
                  }
                }
              }
            }
            function showRecognisedText(e) {
              var recognisedText = "";
              if (hideS2TPanel || dndIsDown || !isAlanActive) {
                return;
              }
              if (!textChatIsHidden) {
                if (e.name === "recognized") {
                  renderInterimForTextChat(Object.assign(e, { type: "request" }));
                }
                return;
              }
              recognisedTextVisible = true;
              if (!options2.hideRecognizedText) {
                if (recognisedTextHolder.classList.value.indexOf("alanBtn-text-appearing") === -1) {
                  recognisedTextHolder.style.opacity = "1";
                  recognisedTextHolder.classList.add("alan-btn-lib__with-text");
                  recognisedTextHolder.classList.add("alanBtn-text-appearing");
                  recognisedTextHolder.classList.remove("alanBtn-text-disappearing");
                }
                if (e.text) {
                  recognisedText = e.text;
                  if (recognisedText.length > 200) {
                    recognisedText = recognisedText.substr(0, 200);
                  }
                  recognisedTextContent.innerHTML = recognisedText;
                }
                if (recognisedTextHolder.classList.contains("alan-btn-lib__absolute-positioned")) {
                  if (recognisedText.length < 33) {
                    recognisedTextHolder.style.whiteSpace = "nowrap";
                    recognisedTextHolder.style.minWidth = "auto";
                  } else {
                    recognisedTextHolder.style.minWidth = "236px";
                    recognisedTextHolder.style.whiteSpace = "normal";
                  }
                }
                if (recognisedText.length > 60 && recognisedText.length <= 80) {
                  recognisedTextHolder.classList.add("alanBtn-recognised-text-holder-long");
                } else if (recognisedText.length > 80) {
                  recognisedTextHolder.classList.add("alanBtn-recognised-text-holder-super-long");
                } else {
                  recognisedTextHolder.classList.remove("alanBtn-recognised-text-holder-long");
                  recognisedTextHolder.classList.remove("alanBtn-recognised-text-holder-super-long");
                }
                replaceRecognisedText(recognisedText);
              }
            }
            function replaceRecognisedText(recognisedText) {
              if (isMobile()) {
                return;
              }
              if (!options2.hideRecognizedText) {
                recognisedTextContent.innerText = recognisedText;
              }
            }
            function hideRecognisedText(delay, noAnimation) {
              if (!options2.hideRecognizedText && recognisedTextVisible) {
                if (noAnimation === true) {
                  recognisedTextHolder.style.opacity = "0";
                  recognisedTextHolder.classList.remove("alanBtn-text-appearing");
                  recognisedTextVisible = false;
                  return;
                } else {
                  recognisedTextHolder.classList.add("alanBtn-text-disappearing");
                  recognisedTextHolder.classList.remove("alanBtn-text-appearing");
                }
                recognisedTextVisible = false;
                setTimeout(function() {
                  recognisedTextContent.innerHTML = "";
                  recognisedTextHolder.classList.remove("alanBtn-recognised-text-holder-long");
                  recognisedTextHolder.classList.remove("alanBtn-recognised-text-holder-super-long");
                  recognisedTextHolder.classList.remove("alan-btn-lib__with-text");
                }, delay || 810);
              }
            }
            function onOptionsReceived(data) {
              var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
              console.log("Alan: options received");
              console.timeEnd("Alan: receiving options time");
              if (data && data.web) {
                keepButtonPositionAfterDnD = ((_a = data.web.alanButtonDragAndDrop) === null || _a === void 0 ? void 0 : _a.keepButtonPositionAfterDnD) || data.web.keepButtonPositionAfterDnD;
                if (!keepButtonPositionAfterDnD) {
                  clearSavedBtnPosition();
                }
                setButtonPosition(keepButtonPositionAfterDnD);
              } else {
                setButtonPosition();
              }
              if (data && data.web) {
                dragAndDropEnabled = (_b = data.web.alanButtonDragAndDrop) === null || _b === void 0 ? void 0 : _b.dragAndDropEnabled;
              }
              if (data && data.web && data.web.hideS2TPanel === true) {
                hideSpeach2TextPanel();
              } else {
                showSpeach2TextPanel();
              }
              if (data && data.web && (((_c = data.web.alanButtonPopup) === null || _c === void 0 ? void 0 : _c.popupEnabled) === true || data.web.popupEnabled === true)) {
                popupEnabled = true;
              } else {
                popupEnabled = false;
                hidePopup();
              }
              if (!isTutorMode()) {
                if (data && data.web && ((_e = (_d = data.web.chatOptions) === null || _d === void 0 ? void 0 : _d.textChat) === null || _e === void 0 ? void 0 : _e.enabled) === true) {
                  textChatIsAvailable = true;
                  voiceEnabledInTextChat = (_h = (_g = (_f = data.web.chatOptions) === null || _f === void 0 ? void 0 : _f.textChat) === null || _g === void 0 ? void 0 : _g.voice) === null || _h === void 0 ? void 0 : _h.enabled;
                  textChatOptions = (_j = data.web.chatOptions) === null || _j === void 0 ? void 0 : _j.textChat;
                  if (getVoiceEnabledFlag() === null) {
                    if ((_m = (_l = (_k = data.web.chatOptions) === null || _k === void 0 ? void 0 : _k.textChat) === null || _l === void 0 ? void 0 : _l.audio) === null || _m === void 0 ? void 0 : _m.enabled) {
                      enableAudio(false);
                    } else {
                      disableAudio(false);
                    }
                  }
                  initTextChat();
                  if (((_q = (_p = (_o = data.web.chatOptions) === null || _o === void 0 ? void 0 : _o.textChat) === null || _p === void 0 ? void 0 : _p.popup) === null || _q === void 0 ? void 0 : _q.openByDefualt) === true || isTextChatSavedStateOpened()) {
                    showTextChat(true);
                  }
                } else {
                  textChatIsAvailable = false;
                  hideTextChat();
                }
              }
              if (data && data.web && data.web.timeout !== void 0) {
                turnOffTimeout = data.web.timeout;
                setTurnOffVoiceTimeout();
              }
              if (data && data.web) {
                applyBtnOptions(data.web);
              }
              applyLogoOptions(data);
              if (options2.mode !== "tutor") {
                if (data && data.web) {
                  applyBtnSizeOptions(data.web.buttonSize || btnModes[mode].btnSize);
                }
              }
              if (isLocalStorageAvailable && data) {
                localStorage.setItem(getStorageKey(), JSON.stringify(data));
              }
              if (data && data.web && data.web.playReadyToListenSound !== void 0) {
                applyPlayReadyToListenSoundOptions(data.web.playReadyToListenSound);
              }
              if (data && data.web && data.web.hidden === true) {
                hideBtn();
              } else {
                if (btnDisabled) {
                  showBtn();
                }
                if (!btnIsReady) {
                  btnIsReady = true;
                  sendClientEvent({ buttonReady: true });
                }
              }
            }
            function onConnectStatusChange(res) {
              if (res === "disconnected") {
                if (previousState !== OFFLINE) {
                  switchState(getDefaultBtnState(DISCONNECTED));
                }
              } else if (res === "authorized") {
                if (previousState) {
                  switchState(previousState);
                } else {
                  switchState(getDefaultBtnState());
                }
                var dialogId = window.tutorProject.getSettings().dialogId;
                if (getSavedDialogId() !== dialogId) {
                  clearChatAndChatHistory();
                }
                console.info("Alan: connected to dialog - ", dialogId, "prev. dialog: ", getSavedDialogId() || "-");
                curDialogId = dialogId;
                saveDialogId(dialogId);
                restoreMessageList(true);
                sentMessages = restoreSentMessages();
              }
              if (options2.onConnectionStatus) {
                options2.onConnectionStatus(res);
              }
            }
            function onMicAllowed() {
              sendClientEvent({ micAllowed: true });
            }
            function onAudioRunning() {
              checkIfPlayAllowed();
            }
            function onMicStart() {
              if (micWasStoppedByTimeout) {
                micWasStoppedByTimeout = false;
                alanAudio2.start();
                return;
              }
              hidePopup(null);
              switchState(LISTENING);
              playSoundNext();
              isAlanActive = true;
              if (window.tutorProject) {
                window.tutorProject.off("recognized", onRecognizedCbInMicBtn);
                window.tutorProject.off("parsed", onParsedCbInMicBtn);
                window.tutorProject.off("options", onOptionsReceived);
                window.tutorProject.on("recognized", onRecognizedCbInMicBtn);
                window.tutorProject.on("parsed", onParsedCbInMicBtn);
                window.tutorProject.on("options", onOptionsReceived);
              }
            }
            function onMicStop() {
              playSoundOff();
              isAlanSpeaking = false;
              alanAudio2.off("micStart", onMicStart);
              alanAudio2.off("micStop", onMicStop);
              alanAudio2.off("micAllowed", onMicAllowed);
              alanAudio2.off("audioRunning", onAudioRunning);
              alanAudio2.off("micFail", onMicFail);
              alanAudio2.off("playStart", onPlayStart);
              alanAudio2.off("playStop", onPlayStop);
              hideRecognisedText();
              enableVoiceEnabledBtn();
              switchState(DEFAULT);
              isAlanActive = false;
              if (window.tutorProject) {
                window.tutorProject.off("parsed", onParsedCbInMicBtn);
                window.tutorProject.off("recognized", onRecognizedCbInMicBtn);
                window.tutorProject.off("connectStatus", onConnectStatusChange);
                window.tutorProject.off("options", onOptionsReceived);
              }
              if (options2.onMicStopped) {
                options2.onMicStopped();
              }
            }
            function onMicFail(err) {
              onMicStop();
              if (err) {
                hidePopup(null);
                if (err.name === "NotAllowedError") {
                  switchState(PERMISSION_DENIED);
                  setTimeout(function() {
                    if (firstClick) {
                      showAlert(MIC_BLOCKED_MSG);
                    }
                  }, 300);
                } else if (err.name === "SecurityError") {
                  switchState(NOT_SECURE_ORIGIN);
                  setTimeout(function() {
                    showAlert(NOT_SECURE_ORIGIN_MSG);
                  }, 300);
                } else {
                  console.error(err.name + " " + err.message);
                }
              }
            }
            function showAlert(msg) {
              var alertPopup = rootEl.querySelector("#alan-alert-popup");
              if (alertPopup)
                return;
              var overlay = document.createElement("div");
              alertPopup = document.createElement("div");
              var maxZIndex = 2147483647;
              overlay.id = "alan-overlay-for-alert";
              overlay.classList.add("alan-overlay-for-alert");
              alertPopup.id = "alan-alert-popup";
              alertPopup.classList.add("alan-alert-popup");
              btn.style.zIndex = maxZIndex.toString();
              overlay.style.zIndex = (maxZIndex - 3).toString();
              alertPopup.style.zIndex = (maxZIndex - 2).toString();
              alertPopup.innerHTML = msg;
              var closeIconImg = document.createElement("div");
              closeIconImg.id = "alan-alert-popup-close-btn";
              closeIconImg.classList.add("alan-alert-popup__close-btn");
              alertPopup.appendChild(closeIconImg);
              rootEl.appendChild(alertPopup);
              rootEl.appendChild(overlay);
              closeIconImg.addEventListener("click", hideAlert);
              overlay.addEventListener("click", hideAlert);
              document.addEventListener("keyup", hideAlertByEsc);
            }
            function hideAlertByEsc(e) {
              if (e.keyCode === 27) {
                hideAlert();
              }
            }
            function hideAlert() {
              var overlay = rootEl.querySelector("#alan-overlay-for-alert");
              var alertPopup = rootEl.querySelector("#alan-alert-popup");
              var overlayCloseIcon = rootEl.querySelector("#alan-alert-popup-close-btn");
              if (overlayCloseIcon) {
                overlayCloseIcon.removeEventListener("click", hidePopup);
              }
              if (overlay) {
                overlay.remove();
                overlay.removeEventListener("click", hidePopup);
              }
              if (alertPopup) {
                alertPopup.remove();
              }
              btn.style.zIndex = btnZIndex;
              btn.style.pointerEvents = "auto";
              document.removeEventListener("keyup", hideAlertByEsc);
            }
            function onPlayStart(e) {
              console.log("BTN: play start");
              isAlanSpeaking = true;
              switchState(SPEAKING);
              turnOffVoiceFn();
            }
            function onPlayStop(e) {
              console.log("BTN: play stop");
              isAlanSpeaking = false;
              playSoundNext();
              switchState(LISTENING);
              turnOffVoiceFn();
            }
            function _onTextCb(e) {
              var _a;
              var event = Object.assign(e, {
                name: "text",
                type: "response"
                /* Response */
              });
              if (((_a = event.images) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                event.images = filterImagesForTextChat(event.images);
              }
              if (options2.onEvent) {
                options2.onEvent(event);
              }
              renderMessageInTextChat(event);
              turnOffVoiceFn();
            }
            function onTextCbInMicBtn(e) {
              var _a, _b, _c, _d;
              if (!isAlanActive && ((_b = (_a = e.ctx) === null || _a === void 0 ? void 0 : _a.opts) === null || _b === void 0 ? void 0 : _b.activate) === true) {
                activateAlanButton({ activate: (_d = (_c = e.ctx) === null || _c === void 0 ? void 0 : _c.opts) === null || _d === void 0 ? void 0 : _d.activate }).then(function() {
                  _onTextCb(e);
                });
              } else {
                _onTextCb(e);
              }
            }
            window.sendFakeMsgs = function(msgs) {
              if (msgs && msgs.length > 0) {
                var _loop_7 = function(i22) {
                  setTimeout(function() {
                    renderMessageInTextChat(msgs[i22]);
                  }, 1e3 * (i22 + 1));
                };
                for (var i2 = 0; i2 < msgs.length; i2++) {
                  _loop_7(i2);
                }
              }
            };
            function onAfterTextCbInMicBtn(e) {
              var _a, _b;
              if (isAlanActive && ((_b = (_a = e.ctx) === null || _a === void 0 ? void 0 : _a.opts) === null || _b === void 0 ? void 0 : _b.deactivate) === true) {
                deactivateAlanButton();
              }
            }
            function onParsedCbInMicBtn(e) {
              var event = Object.assign(e, { name: "parsed" });
              if (options2.onEvent) {
                options2.onEvent(event);
              }
              turnOffVoiceFn();
              showRecognisedText(event);
            }
            function onRecognizedCbInMicBtn(e) {
              var event = Object.assign(e, { name: "recognized" });
              if (options2.onEvent) {
                options2.onEvent(event);
              }
              if (e.final === true) {
                switchState(UNDERSTOOD);
              } else {
                switchState(INTERMEDIATE);
              }
              showRecognisedText(event);
              if (textChatIsAvailable && voiceEnabledInTextChat && !textChatIsHidden && (event === null || event === void 0 ? void 0 : event.final) === true) {
                renderMessageInTextChat({
                  type: "response",
                  name: "loading",
                  text: "",
                  reqId: event.reqId
                });
                alanAudio2.setProcessingState();
              }
              turnOffVoiceFn();
            }
            function _onCommandCb(e) {
              var _a, _b, _c, _d;
              if (isAlanActive || !isAlanActive && ((_b = (_a = e.ctx) === null || _a === void 0 ? void 0 : _a.opts) === null || _b === void 0 ? void 0 : _b.force) === true) {
                if (options2.onCommand) {
                  options2.onCommand(e.data);
                }
              }
              if (isAlanActive) {
                switchState(LISTENING);
                if (((_d = (_c = e.ctx) === null || _c === void 0 ? void 0 : _c.opts) === null || _d === void 0 ? void 0 : _d.deactivate) === true) {
                  deactivateAlanButton();
                }
              }
              turnOffVoiceFn();
            }
            function onCommandCbInMicBtn(e) {
              var _a, _b;
              if (!isAlanActive && ((_b = (_a = e.ctx) === null || _a === void 0 ? void 0 : _a.opts) === null || _b === void 0 ? void 0 : _b.activate) === true) {
                activateAlanButton().then(function() {
                  _onCommandCb(e);
                });
              } else {
                _onCommandCb(e);
              }
            }
            function onScriptsCb(e) {
              if (options2.onEvent) {
                options2.onEvent(Object.assign(e, { name: "scripts" }));
              }
            }
            function playSoundOn() {
              if (!soundOnAudioDoesNotExist) {
                soundOnAudio.currentTime = 0;
                soundOnAudio.play()["catch"](function() {
                  console.log("No activation sound, because the user didn't interact with the button");
                });
              }
            }
            function playSoundOff() {
              if (!soundOffAudioDoesNotExist) {
                soundOffAudio.currentTime = 0;
                soundOffAudio.play()["catch"](function() {
                  console.log("No deactivation sound, because the user didn't interact with the button");
                });
              }
            }
            function coldPlayForSoundNext() {
              if (!playReadyToListenSound)
                return;
              soundNextAudio.loop = true;
              soundNextAudio.muted = true;
              soundNextAudio.play()["catch"](function(err) {
                console.log(err);
              });
            }
            function playSoundNext() {
              soundNextColdPlay = false;
              if (!playReadyToListenSound)
                return;
              alanAudio2.skipExternalSounds(true);
              if (!soundNextAudioDoesNotExist) {
                soundNextAudio.currentTime = 0;
                soundNextAudio.muted = false;
                soundNextAudio.loop = false;
                soundNextAudio.play()["catch"](function(err) {
                  console.log(err);
                });
              }
            }
            function changeCustomLogoVisibility(visibleLogo, logosToHide) {
              if (visibleLogo && visibleLogo.src) {
                visibleLogo.style.opacity = 1;
              }
              for (var i2 = 0; i2 < logosToHide.length; i2++) {
                logosToHide[i2].style.opacity = 0;
              }
            }
            function escapeHtml(text) {
              var resultStr = text;
              var entityMap = {
                "<script>": "&lt;script&gt;",
                "<\/script>": "&lt;/script&gt;"
              };
              for (var key in entityMap) {
                var r = new RegExp("".concat(key), "gi");
                resultStr = String(resultStr).replace(r, entityMap[key]);
              }
              return resultStr;
            }
            function renderInterimForTextChat(msg) {
              var textarea = getChatTextareaEl();
              if (textarea) {
                if (msg.final === true) {
                  renderMessageInTextChat(msg);
                  textarea.value = "";
                } else {
                  textarea.value = msg.text;
                }
              }
            }
            function openImagePreview(imgEl, parentEl) {
              var imgPreviewOverlayEl = document.createElement("div");
              imgPreviewOverlayEl.id = "img-preview-overlay";
              imgPreviewOverlayEl.classList.add("alan-btn__image-preview-overlay");
              imgPreviewOverlayEl.style.zIndex = btnZIndex + 3;
              if (parentEl) {
                imgPreviewOverlayEl.setAttribute("data-img-index", parentEl.getAttribute("data-img-index"));
                imgPreviewOverlayEl.setAttribute("data-msg-req-id", parentEl.getAttribute("data-msg-req-id"));
              }
              var imgPreviewOverlayCloseIcon = document.createElement("div");
              imgPreviewOverlayCloseIcon.id = "img-preview-overlay__close-icon";
              imgPreviewOverlayCloseIcon.innerHTML = '\n            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M0.342029 15.0105C-0.113105 15.4658 -0.113035 16.2036 0.34217 16.6587C0.797374 17.1138 1.53533 17.1138 1.99046 16.6586L8.50015 10.1482L15.0104 16.658C15.4655 17.1131 16.2035 17.1131 16.6586 16.658C17.1138 16.2029 17.1138 15.4649 16.6586 15.0098L10.1483 8.49998L16.6582 1.98944C17.1132 1.53427 17.1132 0.796371 16.6579 0.341282C16.2028 -0.113819 15.4648 -0.113749 15.0097 0.341421L8.49991 6.85183L1.98966 0.341981C1.5345 -0.113143 0.796535 -0.113143 0.341377 0.341981C-0.113792 0.797116 -0.113792 1.53502 0.341377 1.99016L6.85187 8.5001L0.342029 15.0105Z" fill="#FFFFFF"/>\n</svg>\n';
              imgPreviewOverlayCloseIcon.classList.add("alan-btn__image-preview-overlay-close-icon");
              imgPreviewOverlayCloseIcon.addEventListener("click", closeImagePreview);
              var imgElCloned = imgEl.cloneNode();
              imgElCloned.className = "";
              imgElCloned.classList.add("alan-btn__chat-response-img-el");
              imgPreviewOverlayEl.appendChild(imgElCloned);
              imgPreviewOverlayEl.appendChild(imgPreviewOverlayCloseIcon);
              imgPreviewOverlayEl.addEventListener("click", closeImagePreview);
              var leftArrow;
              var rightArrow;
              var leftArrowCloned = null;
              var rightArrowCloned = null;
              if (parentEl) {
                leftArrow = parentEl.querySelector(".alan-btn__chat-response-imgs-wrapper-left-arrow");
                rightArrow = parentEl.querySelector(".alan-btn__chat-response-imgs-wrapper-right-arrow");
                if (leftArrow && rightArrow) {
                  leftArrowCloned = leftArrow.cloneNode(true);
                  rightArrowCloned = rightArrow.cloneNode(true);
                  leftArrowCloned.classList.add("alan-btn__image-preview-overlay-left-icon");
                  leftArrowCloned.classList.remove("alan-btn__chat-response-imgs-wrapper-left-arrow");
                  rightArrowCloned.classList.add("alan-btn__image-preview-overlay-right-icon");
                  rightArrowCloned.classList.remove("alan-btn__chat-response-imgs-wrapper-right-arrow");
                  leftArrowCloned.addEventListener("click", toLeftImage);
                  rightArrowCloned.addEventListener("click", toRightImage);
                  imgPreviewOverlayEl.appendChild(leftArrowCloned);
                  imgPreviewOverlayEl.appendChild(rightArrowCloned);
                }
              }
              document.addEventListener("keydown", closeImagePreviewByEsc);
              body.appendChild(imgPreviewOverlayEl);
              function closeImagePreview() {
                if (leftArrowCloned && rightArrowCloned) {
                  leftArrowCloned.removeEventListener("click", toLeftImage);
                  rightArrowCloned.removeEventListener("click", toRightImage);
                }
                imgPreviewOverlayCloseIcon.removeEventListener("click", closeImagePreview);
                imgPreviewOverlayEl.removeEventListener("click", closeImagePreview);
                document.removeEventListener("keydown", closeImagePreviewByEsc);
                imgPreviewOverlayEl.remove();
              }
              function closeImagePreviewByEsc(e) {
                if (e.keyCode === 27) {
                  closeImagePreview();
                }
              }
              function toLeftImage(e) {
                var previewWrapper = e.target.closest(".alan-btn__image-preview-overlay");
                var imgElInPreview = getImageEl(previewWrapper);
                var imgEl2 = getImageEl(parentEl);
                switchImage(previewWrapper, imgElInPreview, leftArrowCloned, rightArrowCloned, true);
                switchImage(parentEl, imgEl2, leftArrow, rightArrow, true);
                e.stopPropagation();
              }
              function toRightImage(e) {
                var previewWrapper = e.target.closest(".alan-btn__image-preview-overlay");
                var imgElInPreview = getImageEl(previewWrapper);
                var imgEl2 = getImageEl(parentEl);
                switchImage(previewWrapper, imgElInPreview, leftArrowCloned, rightArrowCloned, false);
                switchImage(parentEl, imgEl2, leftArrow, rightArrow, false);
                e.stopPropagation();
              }
            }
            function switchImagesAndFrames(imgEl, src) {
              var parentEl = imgEl.parentNode;
              if (isYouTubeUrl(src)) {
                if (imgEl.tagName.toLowerCase() === "iframe") {
                  imgEl.src = src;
                } else {
                  parentEl.insertAdjacentHTML("afterbegin", getYoutubeFrameHtml(src));
                  imgEl.remove();
                }
              } else {
                if (imgEl.tagName.toLowerCase() === "img") {
                  imgEl.src = src;
                } else {
                  parentEl.insertAdjacentHTML("afterbegin", getImageHtml(src));
                  imgEl.remove();
                }
              }
            }
            function switchImage(parentEl, imgEl, leftArrowEl, rightArrowEl, isLeftArrowClicked) {
              var imgInd = +parentEl.getAttribute("data-img-index");
              var reqId = parentEl.getAttribute("data-msg-req-id");
              var msg = textChatMessages.find(function(m) {
                var _a;
                return m.type !== "request" && (m.reqId === reqId || ((_a = m === null || m === void 0 ? void 0 : m.ctx) === null || _a === void 0 ? void 0 : _a.reqId) === reqId);
              });
              if (msg) {
                var imgCount = msg.images.length;
                if (!isLeftArrowClicked) {
                  if (imgInd < imgCount) {
                    imgInd = imgInd + 1;
                    parentEl.setAttribute("data-img-index", imgInd.toString());
                    switchImagesAndFrames(imgEl, msg.images[imgInd].src);
                    if (imgInd > 0) {
                      leftArrowEl.classList.remove("invisible");
                    }
                    if (imgInd === imgCount - 1) {
                      rightArrowEl.classList.add("invisible");
                    }
                  }
                } else {
                  if (imgInd > 0) {
                    imgInd = imgInd - 1;
                    parentEl.setAttribute("data-img-index", imgInd.toString());
                    switchImagesAndFrames(imgEl, msg.images[imgInd].src);
                    if (imgInd === 0) {
                      leftArrowEl.classList.add("invisible");
                    }
                    if (imgInd < imgCount - 1) {
                      rightArrowEl.classList.remove("invisible");
                    }
                  }
                }
              }
            }
            window.addEventListener("click", function(e) {
              var clickedEl = e.target;
              var isImageWasClicked = clickedEl.classList.contains("alan-btn__chat-response-img");
              if (clickedEl.tagName.toLowerCase() === "img" && clickedEl.closest(".alan-btn__chat-response-text-wrapper")) {
                openImagePreview(clickedEl, null);
                return;
              }
              if (clickedEl.classList.contains("alan-btn__chat-response-imgs-wrapper-right-arrow") || clickedEl.classList.contains("alan-btn__chat-response-imgs-wrapper-left-arrow") || isImageWasClicked) {
                var parentEl = clickedEl.closest(".alan-btn__chat-response-imgs-wrapper");
                if (isImageWasClicked) {
                  openImagePreview(clickedEl, parentEl);
                  return;
                }
                var imgEl = getImageEl(parentEl);
                var leftArrowEl = parentEl.querySelectorAll(".alan-btn__chat-response-imgs-wrapper-left-arrow")[0];
                var rightArrowEl = parentEl.querySelectorAll(".alan-btn__chat-response-imgs-wrapper-right-arrow")[0];
                switchImage(parentEl, imgEl, leftArrowEl, rightArrowEl, clickedEl.classList.contains("alan-btn__chat-response-imgs-wrapper-left-arrow"));
                e.stopPropagation();
              }
            });
            function getImageEl(parentEl) {
              return parentEl.querySelectorAll(".alan-btn__chat-response-img-el")[0] || parentEl.querySelectorAll("iframe")[0];
            }
            function getLinkTarget(link) {
              try {
                return link.target ? link.target : window.location.host === new URL(link.href).host ? "_self" : "_blank";
              } catch (err) {
                return "_blank";
              }
            }
            function fixTargetForLinks(html) {
              var tempNode = document.createElement("div");
              tempNode.innerHTML = html;
              var allLinks = tempNode.querySelectorAll("a");
              for (var i2 = 0; i2 < allLinks.length; i2++) {
                allLinks[i2].setAttribute("target", getLinkTarget(allLinks[i2]));
              }
              var resultHtml = tempNode.innerHTML;
              tempNode.remove();
              return resultHtml;
            }
            function getImageHtml(src) {
              var imgNotFoundSrc = "data:image/png;base64,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";
              return '<img class="alan-btn__chat-response-img alan-btn__chat-response-img-el" src="'.concat(src, `" onerror="this.src = '`).concat(imgNotFoundSrc, `'; this.classList.add('not-found');" onload = "console.info(this.naturalWidth,this.naturalHeight ); if(this.naturalWidth < this.naturalHeight){this.classList.add('img-vertical');}"/>`);
            }
            function getYoutubeFrameHtml(src) {
              return '<iframe class="alan-btn__chat-response-video" width="560" height="315" src="'.concat(src, '?autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>');
            }
            function buildImagesContent(msg) {
              var _a, _b, _c, _d;
              var imgsBlock = "";
              var imgsHtml = "";
              if (((_a = msg.images) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                var imageSrc = msg.images[0].src;
                if (isYouTubeUrl(imageSrc)) {
                  imgsHtml = getYoutubeFrameHtml(imageSrc);
                } else {
                  imgsHtml = getImageHtml(imageSrc);
                }
              }
              if (((_b = msg.images) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                var arrowLeftSvg = '<img class="alan-btn__chat-response-imgs-wrapper-left-arrow invisible" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCAzMCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPgogICAgICAgICAgICAgICAgICAgIDxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2RfMzA1XzE1MDIpIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMy41MDEzNSAyNS4yMDc0TDIzLjg1MjYgNDUuNTAyNEMyNC41MTk0IDQ2LjE2NyAyNS41OTkgNDYuMTY1OSAyNi4yNjQ2IDQ1LjQ5OUMyNi45Mjk4IDQ0LjgzMjIgMjYuOTI4MSA0My43NTIxIDI2LjI2MTIgNDMuMDg3TDcuMTIxMjggMjMuOTk5OUwyNi4yNjE5IDQuOTEyOTNDMjYuOTI4NyA0LjI0Nzc4IDI2LjkzMDQgMy4xNjgzMiAyNi4yNjUzIDIuNTAxNDVDMjUuOTMxNiAyLjE2NzE1IDI1LjQ5NDUgMiAyNS4wNTczIDJDMjQuNjIxMyAyIDI0LjE4NTggMi4xNjYwMyAyMy44NTI3IDIuNDk4MDFMMy41MDEzNSAyMi43OTI1QzMuMTgwMiAyMy4xMTIgMi45OTk5OSAyMy41NDY5IDIuOTk5OTkgMjMuOTk5OUMyLjk5OTk5IDI0LjQ1MyAzLjE4MDcxIDI0Ljg4NzMgMy41MDEzNSAyNS4yMDc0WiIgZmlsbD0id2hpdGUiLz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPGRlZnM+CiAgICAgICAgICAgICAgICAgICAgPGZpbHRlciBpZD0iZmlsdGVyMF9kXzMwNV8xNTAyIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjkuNzYzMSIgaGVpZ2h0PSI1MCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgogICAgICAgICAgICAgICAgICAgIDxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CiAgICAgICAgICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CiAgICAgICAgICAgICAgICAgICAgPGZlT2Zmc2V0IGR5PSIxIi8+CiAgICAgICAgICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMS41Ii8+CiAgICAgICAgICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0ib3V0Ii8+CiAgICAgICAgICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPgogICAgICAgICAgICAgICAgICAgIDxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzMwNV8xNTAyIi8+CiAgICAgICAgICAgICAgICAgICAgPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfMzA1XzE1MDIiIHJlc3VsdD0ic2hhcGUiLz4KICAgICAgICAgICAgICAgICAgICA8L2ZpbHRlcj4KICAgICAgICAgICAgICAgICAgICA8L2RlZnM+CiAgICAgICAgICAgICAgICAgICAgPC9zdmc+Cg==" />';
                var arrowRightSvg = '<img class="alan-btn__chat-response-imgs-wrapper-right-arrow '.concat(((_c = msg.images) === null || _c === void 0 ? void 0 : _c.length) > 1 ? "" : "invisible", '" src="data:image/svg+xml;base64,PHN2ZyAgd2lkdGg9IjMwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMzAgNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIj4KICAgICAgICAgICAgICAgICAgICA8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMF9kXzMwNV8xNDk3KSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI2LjI2MTcgMjIuNzkyNkw1LjkxMDQxIDIuNDk3NTdDNS4yNDM2MyAxLjgzMzAxIDQuMTY0MDkgMS44MzQxMyAzLjQ5ODQyIDIuNTAxQzIuODMzMjYgMy4xNjc3OSAyLjgzNDk4IDQuMjQ3OTQgMy41MDE4NSA0LjkxM0wyMi42NDE4IDI0LjAwMDFMMy41MDExNyA0My4wODcxQzIuODM0MzggNDMuNzUyMiAyLjgzMjY2IDQ0LjgzMTcgMy40OTc3MyA0NS40OTg2QzMuODMxNDIgNDUuODMyOCA0LjI2ODU5IDQ2IDQuNzA1NzUgNDZDNS4xNDE3OSA0NiA1LjU3NzI0IDQ1LjgzNCA1LjkxMDMzIDQ1LjUwMkwyNi4yNjE3IDI1LjIwNzVDMjYuNTgyOSAyNC44ODggMjYuNzYzMSAyNC40NTMxIDI2Ljc2MzEgMjQuMDAwMUMyNi43NjMxIDIzLjU0NyAyNi41ODIzIDIzLjExMjcgMjYuMjYxNyAyMi43OTI2WiIgZmlsbD0id2hpdGUiLz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPGRlZnM+CiAgICAgICAgICAgICAgICAgICAgPGZpbHRlciBpZD0iZmlsdGVyMF9kXzMwNV8xNDk3IiB4PSIwIiB5PSIwIiB3aWR0aD0iMjkuNzYzMSIgaGVpZ2h0PSI1MCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgogICAgICAgICAgICAgICAgICAgIDxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CiAgICAgICAgICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CiAgICAgICAgICAgICAgICAgICAgPGZlT2Zmc2V0IGR5PSIxIi8+CiAgICAgICAgICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMS41Ii8+CiAgICAgICAgICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0ib3V0Ii8+CiAgICAgICAgICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPgogICAgICAgICAgICAgICAgICAgIDxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzMwNV8xNDk3Ii8+CiAgICAgICAgICAgICAgICAgICAgPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfMzA1XzE0OTciIHJlc3VsdD0ic2hhcGUiLz4KICAgICAgICAgICAgICAgICAgICA8L2ZpbHRlcj4KICAgICAgICAgICAgICAgICAgICA8L2RlZnM+CiAgICAgICAgICAgICAgICAgICAgPC9zdmc+"/>');
                imgsBlock = '<div class="alan-btn__chat-response-imgs-wrapper" data-img-index="0" data-msg-req-id="'.concat(msg.reqId || ((_d = msg.ctx) === null || _d === void 0 ? void 0 : _d.reqId), '"><div class="alan-btn__chat-response-img-block">').concat(imgsHtml, "</div>").concat(arrowLeftSvg).concat(arrowRightSvg, "</div>");
              }
              return imgsBlock;
            }
            function buildLinksContent(msg) {
              var _a, _b;
              var linksBlock = "";
              var linksHtml = "";
              for (var i2 = 0; i2 < ((_a = msg.links) === null || _a === void 0 ? void 0 : _a.length); i2++) {
                var curLink = msg.links[i2];
                var target = getLinkTarget(curLink);
                linksHtml += '<a class="alan-btn__chat-response-link" href="'.concat(curLink.href, '" target="').concat(target, '">\n                   ').concat(getLinkIcon(curLink), '\n                    <span class="alan-btn__chat-response-link-title">').concat(curLink.title || curLink.href, "</span>\n                </a>");
              }
              if ((_b = msg.links) === null || _b === void 0 ? void 0 : _b.length) {
                linksBlock = '<div class="alan-btn__chat-response-links-wrapper">\n                <span style="margin-right: 10px;display: inline-block;">Read more: </span>\n                    '.concat(linksHtml, "\n            </div>");
              }
              return linksBlock;
            }
            function buildLikesContent(msg) {
              var likesBlock = "";
              if (msg.hasLikes) {
                likesBlock = '<div class="alan-btn__chat-response-likes-wrapper">\n                <span class="alan-btn__chat-response-like-btn">&#128078;</span>\n                <span class="alan-btn__chat-response-dislike-btn">&#128077;</span>\n            </div>';
              }
              return likesBlock;
            }
            function buildMsgTextContent(msg) {
              var _a;
              var result = "";
              if (!msg.text)
                return "";
              if (((_a = msg.ctx) === null || _a === void 0 ? void 0 : _a.format) === "markdown") {
                result = marked.parse(escapeHtml(msg.text), { mangle: false, headerIds: false });
              } else {
                result = escapeHtml(msg.text);
              }
              return result ? '<span class="alan-btn__chat-response-text-wrapper">'.concat(fixTargetForLinks(result), "</span>") : "";
            }
            function buildMsgContent(msg) {
              return "".concat(buildImagesContent(msg)).concat(buildMsgTextContent(msg)).concat(buildLinksContent(msg)).concat(buildLikesContent(msg)).concat(buildMsgIncommingLoader(msg));
            }
            function highlightCode() {
              if (window.hljs) {
                setTimeout(function() {
                  var msgHolder = document.getElementById("chatMessages");
                  if (msgHolder) {
                    msgHolder.querySelectorAll("pre code:not(.alan-btn__hljs-processed)").forEach(function(el) {
                      window.hljs.highlightElement(el);
                      el.classList.add("alan-btn__hljs-processed");
                    });
                  }
                });
              }
            }
            function loadHighlightJs() {
              var script = document.createElement("script");
              script.src = "https://studio.alan.app/js/hljs/highlight.min.js?v=1";
              script.async = true;
              script.onload = function() {
                highlightCode();
              };
              document.head.appendChild(script);
              var link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = "https://studio.alan.app/js/hljs/github.min.css?v=1";
              document.getElementsByTagName("head")[0].appendChild(link);
            }
            loadHighlightJs();
            function loadMathJax() {
              window.MathJax = {
                startup: {
                  pageReady: function() {
                    return window.MathJax.startup.defaultPageReady();
                  }
                },
                tex: {
                  inlineMath: [["$", "$"], ["\\(", "\\)"]],
                  processEscapes: true
                }
              };
              var script = document.createElement("script");
              script.src = "https://studio.alan.app/js/mathjax/tex-svg.js?v=1";
              script.async = true;
              script.setAttribute("id", "MathJax-script");
              script.onload = function() {
                processFormulasInMsgs();
              };
              document.head.appendChild(script);
            }
            loadMathJax();
            function processFormulas(msgInd) {
              var MathJax = window.MathJax;
              if (MathJax) {
                setTimeout(function() {
                  var output = document.getElementById("msg-" + msgInd).querySelectorAll(".alan-btn__chat-response-text-wrapper")[0];
                  if (output && MathJax.texReset) {
                    MathJax.texReset();
                    MathJax.typesetClear();
                    MathJax.typesetPromise([output])["catch"](function(err) {
                      console.error(err);
                    });
                  }
                });
              }
            }
            function processFormulasInMsgs() {
              for (var i2 = 0; i2 < textChatMessages.length; i2++) {
                processFormulas(i2);
              }
            }
            function renderMessageInTextChat(msg, noAnimation, immidiateScroll) {
              var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
              if (!textChatIsAvailable)
                return;
              var innerMsgPart = "";
              var msgHtml = "";
              var msgHolder = document.getElementById("chatMessages");
              if (msg.type === "response" && msg.name === "text") {
                if (window.fakeMsg) {
                  msg.text = ((_a = window.fakeMsg) === null || _a === void 0 ? void 0 : _a.text) || msg.text;
                  msg.images = ((_b = window.fakeMsg) === null || _b === void 0 ? void 0 : _b.images) || msg.images;
                  msg.links = ((_c = window.fakeMsg) === null || _c === void 0 ? void 0 : _c.links) || msg.links;
                  msg.hasLikes = ((_d = window.fakeMsg) === null || _d === void 0 ? void 0 : _d.hasLikes) || msg.hasLikes;
                  if ((_e = window.fakeMsg) === null || _e === void 0 ? void 0 : _e.text) {
                    if (msg.ctx) {
                      msg.ctx.format = "markdown";
                    } else {
                      msg.ctx = { format: "markdown" };
                    }
                  }
                  window.fakeMsg = null;
                }
              }
              if (msg.type === "chat") {
                msgHtml = '<div class="alan-btn__chat-popup">'.concat(msg.html, "</div>");
              } else {
                if (msg.name === "text" || msg.name === "parsed" || msg.name === "recognized") {
                  if (msg.type === "request") {
                    innerMsgPart = escapeHtml(msg.text);
                  } else {
                    innerMsgPart = buildMsgContent(msg);
                  }
                  msgHtml = '<div class="'.concat(msg.type === "request" ? "alan-btn__chat-request" : "alan-btn__chat-response", " ").concat(((_f = msg.images) === null || _f === void 0 ? void 0 : _f.length) > 0 ? "with-images" : "", '">').concat(innerMsgPart, "</div>");
                }
                if (msg.name === "loading") {
                  msgHtml = '<div class="alan-btn__chat-response animated alan-incoming-msg">'.concat(getMsgLoader(), "</div>");
                }
              }
              msg = __assign(__assign({}, msg), getMsgReadProp(msg, textChatIsHidden));
              var _p = processMessageForChat(msg, textChatMessages), isNew = _p.isNew, msgInd = _p.msgInd, replaceLoader = _p.replaceLoader, updateResponse = _p.updateResponse;
              if (isNew) {
                var div = document.createElement("div");
                div.id = "msg-" + msgInd;
                if (msg.type === "chat") {
                  addPopupStyle(msg, div);
                }
                div.innerHTML = msgHtml;
                msgHolder.appendChild(div);
                if (textChatIsAvailable && textChatIsHidden && msg.type === "response" && msg.read !== true) {
                  unreadChatMsgCount++;
                }
                if (immidiateScroll !== true) {
                  scrollTextChat(msgHolder, "smooth");
                } else {
                  scrollTextChat(msgHolder);
                }
                if (((_g = msg.ctx) === null || _g === void 0 ? void 0 : _g.final) !== false) {
                  processFormulas(msgInd);
                  highlightCode();
                }
              } else {
                var msgEl = document.getElementById("msg-" + msgInd);
                if (msgEl) {
                  if (replaceLoader) {
                    var innerEl = msgEl.children[0];
                    if (innerEl) {
                      innerEl.innerHTML = innerMsgPart;
                      innerEl.classList.remove("alan-incoming-msg");
                      if (msg.type !== "chat" && ((_h = msg.images) === null || _h === void 0 ? void 0 : _h.length) > 0) {
                        innerEl.classList.add("with-images");
                      }
                      scrollTextChat(msgHolder, "smooth");
                    }
                  } else if (updateResponse && msg.type !== "chat") {
                    var innerEl = msgEl.children[0];
                    var updatedMsg = textChatMessages[msgInd];
                    var imagesWrapper = innerEl.querySelector(".alan-btn__chat-response-imgs-wrapper");
                    if (((_j = updatedMsg.images) === null || _j === void 0 ? void 0 : _j.length) > 0 && !imagesWrapper) {
                      innerEl.insertAdjacentHTML("afterbegin", buildImagesContent(updatedMsg));
                      innerEl = msgEl.children[0];
                    }
                    if (((_k = updatedMsg.images) === null || _k === void 0 ? void 0 : _k.length) > 1 && imagesWrapper) {
                      imagesWrapper.querySelector(".alan-btn__chat-response-imgs-wrapper-right-arrow").classList.remove("invisible");
                    }
                    if (updatedMsg.type !== "chat" && ((_l = updatedMsg.images) === null || _l === void 0 ? void 0 : _l.length) > 0) {
                      innerEl.classList.add("with-images");
                    }
                    var msgParts = innerEl.children;
                    var stop_1 = ((_m = updatedMsg.images) === null || _m === void 0 ? void 0 : _m.length) === 0 ? 0 : 1;
                    while (msgParts.length > stop_1) {
                      msgParts[msgParts.length - 1].remove();
                    }
                    innerEl.insertAdjacentHTML("beforeend", buildMsgTextContent(updatedMsg));
                    innerEl.insertAdjacentHTML("beforeend", buildLinksContent(updatedMsg));
                    innerEl.insertAdjacentHTML("beforeend", buildLikesContent(updatedMsg));
                    innerEl.insertAdjacentHTML("beforeend", buildMsgIncommingLoader(msg));
                    setTimeout(function() {
                      scrollTextChat(msgHolder, "smooth");
                    });
                  } else {
                    msgEl.innerHTML = msgHtml;
                  }
                }
                if (((_o = msg.ctx) === null || _o === void 0 ? void 0 : _o.final) !== false) {
                  processFormulas(msgInd);
                  highlightCode();
                }
              }
              saveMessageHistory();
              if (textChatIsAvailable && textChatIsHidden) {
                showChatNotifications();
              }
              if (isFinalMessage(msg) && msg.type === "response" && textChatMessages.filter(function(m) {
                return !isFinalMessage(m);
              }).length === 0) {
                if (msg.name !== "loading") {
                  enableTextareaInTheChat();
                }
              }
            }
            function scrollTextChat(msgHolder, behavior) {
              var scrollOptions = {
                top: msgHolder.scrollHeight + 500,
                left: 0
              };
              if (textChatScrollPosition !== null)
                return;
              if (behavior) {
                scrollOptions.behavior = "smooth";
              }
              msgHolder.scroll(scrollOptions);
            }
            function onTextChatScroll(e) {
              var chatMessagesEl = document.getElementById("chatMessages");
              if (chatMessagesEl) {
                if (chatMessagesEl.scrollTop + chatMessagesEl.clientHeight >= chatMessagesEl.scrollHeight) {
                  textChatScrollPosition = null;
                } else {
                  textChatScrollPosition = chatMessagesEl.scrollTop;
                }
              }
            }
            function saveMessageHistory() {
              if (isLocalStorageAvailable && curDialogId) {
                localStorage.setItem(getKeyForSavingTextChatMessages(), JSON.stringify(textChatMessages));
              }
            }
            function getKeyForSavingTextChatMessages() {
              return "alan-btn-text-chat-msgs-for-dialogId-".concat(curDialogId);
            }
            function clearChat() {
              unreadChatMsgCount = 0;
              textChatMessages = [];
              if (textChatIsAvailable) {
                var msgHolder = document.getElementById("chatMessages");
                if (msgHolder) {
                  msgHolder.innerHTML = '<div class="alan-btn__chat-messages-empty-block"></div>';
                }
              }
            }
            function onClearChatClick() {
              clearDialogId();
              if (window.tutorProject) {
                window.tutorProject.close();
                window.tutorProject.off("scripts", onScriptsCb);
                window.tutorProject.off("text", onTextCbInMicBtn);
                window.tutorProject.off("parsed", onParsedCbInMicBtn);
                window.tutorProject.off("connectStatus", onConnectStatusChange);
                window.tutorProject.off("options", onOptionsReceived);
                alanAudio2.off("command", onCommandCbInMicBtn);
                alanAudio2.off("afterText", onAfterTextCbInMicBtn);
                btnIsReady = false;
                connectProject();
              }
              clearChatAndChatHistory();
            }
            function clearChatAndChatHistory() {
              clearChat();
              clearChatHistoryStorage();
            }
            function syncChatHistoryBetweenTabs() {
              tabActive = true;
              restoreMessageList(false);
            }
            function restoreMessageList(initLoad) {
              var savedMsgs;
              if (isLocalStorageAvailable) {
                if (curDialogId) {
                  savedMsgs = localStorage.getItem(getKeyForSavingTextChatMessages());
                  try {
                    if (savedMsgs === JSON.stringify(textChatMessages)) {
                      return;
                    }
                    savedMsgs = JSON.parse(savedMsgs);
                    clearChat();
                    if (Array.isArray(savedMsgs)) {
                      for (var i2 = 0; i2 < savedMsgs.length; i2++) {
                        if (initLoad === true) {
                          if (savedMsgs[i2].name !== "loading") {
                            savedMsgs[i2].initLoad = true;
                            renderMessageInTextChat(savedMsgs[i2], true, true);
                          }
                        } else {
                          renderMessageInTextChat(savedMsgs[i2], true, true);
                        }
                      }
                    }
                  } catch (e) {
                    console.warn("Alan: unable to restore text chat history");
                  }
                }
              }
            }
            function clearChatHistoryStorage() {
              console.info("Alan: clear messages history", curDialogId);
              for (var i2 = 0; i2 < localStorage.length; i2++) {
                var key = localStorage.key(i2);
                if (key.indexOf("alan-btn-text-chat-msgs-") > -1) {
                  localStorage.removeItem(key);
                }
              }
            }
            function _sendText(text) {
              return __awaiter(this, void 0, void 0, function() {
                var msg, res;
                return __generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      msg = { text, type: "request", name: "text" };
                      return [4, sendText(text)];
                    case 1:
                      res = _a.sent();
                      msg = __assign(__assign({}, msg), { reqId: res.reqId });
                      saveSentMessages(text);
                      renderMessageInTextChat(msg);
                      renderMessageInTextChat({
                        type: "response",
                        name: "loading",
                        text: "",
                        reqId: res.reqId
                      });
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            }
            var lastSendMsgTs = null;
            function enableTextareaInTheChat() {
              var textareaHolderEl = document.getElementById("textarea-holder");
              textareaHolderEl.classList.remove("alan-btn__inactive");
              clearTimeout(lastSendMsgTs);
              lastSendMsgTs = null;
            }
            var sendMessageToTextChat = throttle(function sendMessageToTextChat2() {
              return __awaiter(this, void 0, void 0, function() {
                var textareaEl, textareaHolderEl, text;
                return __generator(this, function(_a) {
                  textareaEl = getChatTextareaEl();
                  textareaHolderEl = document.getElementById("textarea-holder");
                  text = textareaEl.value;
                  if (lastSendMsgTs) {
                    return [
                      2
                      /*return*/
                    ];
                  }
                  lastSendMsgTs = setTimeout(function() {
                    enableTextareaInTheChat();
                  }, 5e3);
                  if (text.trim() === "")
                    return [
                      2
                      /*return*/
                    ];
                  textareaEl.value = "";
                  _sendText(text);
                  textareaHolderEl.classList.add("alan-btn__inactive");
                  textChatScrollPosition = null;
                  return [
                    2
                    /*return*/
                  ];
                });
              });
            }, 1e3);
            function addNewLine(textareaEl) {
              var curText = textareaEl.value;
              var newText;
              if (textareaEl.selectionStart === textareaEl.selectionEnd) {
                var textAsArr = curText.split("");
                textAsArr.splice(textareaEl.selectionStart, 0, "\n");
                newText = textAsArr.join("");
              } else {
                newText = curText + "\n";
              }
              textareaEl.value = newText;
            }
            function onChatTextAreaKeyUp(e) {
              var textareaHolder = document.getElementById("textarea-holder");
              var input = e.target;
              if (input.scrollWidth > input.clientWidth) {
                textareaHolder.classList.add("show-gradient");
              } else {
                textareaHolder.classList.remove("show-gradient");
              }
              if (textareaHolder) {
                if (input.value.length > 0) {
                  textareaHolder.classList.add("ready-to-send");
                } else {
                  textareaHolder.classList.remove("ready-to-send");
                }
              }
            }
            function getRestoreMsgsLsKey() {
              var projectId = getProjectId();
              return "alan-btn-chat-sent-history-".concat(projectId);
            }
            function restoreSentMessages() {
              var messages = [];
              if (isLocalStorageAvailable) {
                var key = getRestoreMsgsLsKey();
                try {
                  messages = JSON.parse(localStorage.getItem(key)) || [];
                } catch (e) {
                }
              }
              return messages;
            }
            function saveSentMessages(text) {
              if (isLocalStorageAvailable) {
                var maxSavedForHistoryMsgCount = 25;
                var key = getRestoreMsgsLsKey();
                sentMessages.push(text);
                if (sentMessages.length > 50) {
                  sentMessages = sentMessages.slice(Math.max(sentMessages.length - maxSavedForHistoryMsgCount, 0));
                }
                if (sentMessages.length > 0) {
                  localStorage.setItem(key, JSON.stringify(sentMessages));
                }
              }
            }
            function switchMessages(keyCode) {
              var messages = __spreadArray([], sentMessages, true);
              messages = messages.reverse();
              if (messages.length === 0) {
                return;
              }
              if (keyCode === 38) {
                if (sentMessageInd === null || sentMessageInd + 1 === messages.length) {
                  sentMessageInd = 0;
                } else {
                  sentMessageInd = sentMessageInd + 1;
                }
              }
              if (keyCode === 40) {
                if (sentMessageInd === null || sentMessageInd - 1 === -1) {
                  sentMessageInd = messages.length - 1;
                } else {
                  sentMessageInd = sentMessageInd - 1;
                }
              }
              var textareaEl = getChatTextareaEl();
              textareaEl.value = messages[sentMessageInd];
              moveCursorToEnd(textareaEl);
            }
            function moveCursorToEnd(el) {
              el.focus();
              if (typeof el.selectionStart == "number") {
                el.selectionStart = el.selectionEnd = el.value.length;
              } else if (typeof el.createTextRange != "undefined") {
                var range = el.createTextRange();
                range.collapse(false);
                range.select();
              }
            }
            function onChatTextAreaKeyDown(e) {
              var keyCode = e.keyCode || e.which;
              if (keyCode === 13 && e.shiftKey) {
                return;
              }
              if (keyCode === 13 && (e.ctrlKey || e.metaKey)) {
                addNewLine(e.target);
                return;
              }
              if (keyCode === 13) {
                sendMessageToTextChat();
                e.stopPropagation();
                e.preventDefault();
              }
              var goToPrev = keyCode === 38;
              var goToNext = keyCode === 40;
              if (goToPrev || goToNext) {
                switchMessages(keyCode);
                e.stopPropagation();
                e.preventDefault();
                return;
              }
            }
            function disableVoiceEnabledBtn() {
              var muteAlanBtn = document.getElementById("chat-unmute-btn");
              if (muteAlanBtn) {
                muteAlanBtn.classList.add("disabled");
                manageUnmuteAlanIcon(muteAlanBtn, true);
              }
              var clearChatBtn = document.getElementById("clear-chat-btn");
              if (clearChatBtn) {
                clearChatBtn.classList.add("disabled");
              }
            }
            function enableVoiceEnabledBtn() {
              var muteAlanBtn = document.getElementById("chat-unmute-btn");
              if (muteAlanBtn) {
                muteAlanBtn.classList.remove("disabled");
                manageUnmuteAlanIcon(muteAlanBtn, getVoiceEnabledFlag());
              }
              var clearChatBtn = document.getElementById("clear-chat-btn");
              if (clearChatBtn) {
                clearChatBtn.classList.remove("disabled");
              }
            }
            function enableAudio(manually) {
              var unmuteAlanBtn = document.getElementById("chat-unmute-btn");
              if (manually) {
                saveVoiceEnabledFlag(true);
              }
              textToSpeachVoiceEnabled = true;
              alanAudio2.enableVoice();
              manageUnmuteAlanIcon(unmuteAlanBtn, true);
            }
            function disableAudio(manually) {
              var unmuteAlanBtn = document.getElementById("chat-unmute-btn");
              alanAudio2.disableVoice();
              textToSpeachVoiceEnabled = false;
              manageUnmuteAlanIcon(unmuteAlanBtn, false);
              if (manually) {
                saveVoiceEnabledFlag(false);
              }
            }
            function hideKeyboard() {
              if (isMobile()) {
                var chatTextarea = getChatTextareaEl();
                if (chatTextarea) {
                  chatTextarea.blur();
                }
              }
            }
            function keyboardScrollFixListenerForChat(event) {
              if (event && event.target) {
                var el = event.target;
                var clickedEl = el.closest(".alan-btn__chat-send-btn") || el.closest(".alan-btn__chat-mic-btn");
                if (!clickedEl) {
                  hideKeyboard();
                }
              }
            }
            function onMessageClickListener(e) {
              var clickedEl = e.target;
              processClickByButtonInPopup(clickedEl, btnInstance, _sendText);
            }
            function getChatTextareaEl() {
              return document.getElementById("chatTextarea");
            }
            function initTextChat() {
              var _a, _b, _c;
              var textareaDiv = document.getElementById("textarea-holder");
              var chatTextarea = getChatTextareaEl();
              var chatMicBtn = document.getElementById("chat-mic-btn");
              var unmuteAlanBtn = document.getElementById("chat-unmute-btn");
              var chatSendBtn = document.getElementById("chat-send-btn");
              var headerDiv = document.getElementById("chat-header");
              var headerTille = document.getElementById("chat-header-title");
              if (!chatDiv.classList.contains("alan-btn__chat")) {
                document.addEventListener("touchstart", keyboardScrollFixListenerForChat, { passive: false });
                chatDiv.classList.add("alan-btn__chat");
                var messagesDiv = document.createElement("div");
                messagesDiv.id = "chatMessages";
                messagesDiv.classList.add("alan-btn__chat-messages");
                messagesDiv.removeEventListener("click", onMessageClickListener);
                messagesDiv.addEventListener("click", onMessageClickListener);
                var messagesWrapperDiv = document.createElement("div");
                messagesWrapperDiv.id = "chatMessagesWrapper";
                messagesWrapperDiv.classList.add("alan-btn__chat-messages-wrapper");
                messagesWrapperDiv.appendChild(messagesDiv);
                if (isMobile()) {
                  messagesWrapperDiv.addEventListener("touchmove", onTextChatScroll);
                } else {
                  messagesWrapperDiv.addEventListener("mousewheel", onTextChatScroll);
                }
                var messagesEmptyDiv = document.createElement("div");
                messagesEmptyDiv.classList.add("alan-btn__chat-messages-empty-block");
                messagesDiv.appendChild(messagesEmptyDiv);
                headerDiv = document.createElement("div");
                headerDiv.id = "chat-header";
                headerDiv.classList.add("alan-btn__chat-header");
                var headerDivGr = document.createElement("div");
                headerDivGr.classList.add("alan-btn__chat-header-gradient");
                var clearChatBtn = document.createElement("div");
                clearChatBtn.id = "clear-chat-btn";
                clearChatBtn.classList.add("alan-btn__chat-header-clear-btn");
                clearChatBtn.innerHTML = '<svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.33333 3.16667V2.63889C6.33333 1.93906 6.612 1.26772 7.10706 0.772667C7.60106 0.277611 8.27239 0 8.97222 0H10.0278C10.7276 0 11.399 0.277611 11.894 0.772667C12.3891 1.26772 12.6667 1.93906 12.6667 2.63889V3.16667H17.9444C18.5271 3.16667 19 3.63956 19 4.22222C19 4.80489 18.5271 5.27778 17.9444 5.27778H16.8889V16.8889C16.8889 19.2206 14.9994 21.1111 12.6667 21.1111C10.7329 21.1111 8.26817 21.1111 6.33333 21.1111C4.00161 21.1111 2.11111 19.2206 2.11111 16.8889V5.27778H1.05556C0.472889 5.27778 0 4.80489 0 4.22222C0 3.63956 0.472889 3.16667 1.05556 3.16667H6.33333ZM14.7778 5.27778H4.22222V16.8889C4.22222 18.0553 5.168 19 6.33333 19H12.6667C13.8331 19 14.7778 18.0553 14.7778 16.8889V5.27778ZM10.5556 8.44445V15.8333C10.5556 16.416 11.0284 16.8889 11.6111 16.8889C12.1938 16.8889 12.6667 16.416 12.6667 15.8333V8.44445C12.6667 7.86178 12.1938 7.38889 11.6111 7.38889C11.0284 7.38889 10.5556 7.86178 10.5556 8.44445ZM6.33333 8.44445V15.8333C6.33333 16.416 6.80622 16.8889 7.38889 16.8889C7.97156 16.8889 8.44444 16.416 8.44444 15.8333V8.44445C8.44444 7.86178 7.97156 7.38889 7.38889 7.38889C6.80622 7.38889 6.33333 7.86178 6.33333 8.44445ZM10.5556 3.16667V2.63889C10.5556 2.4985 10.5007 2.36444 10.4014 2.26522C10.3022 2.16706 10.1682 2.11111 10.0278 2.11111C9.68261 2.11111 9.31739 2.11111 8.97222 2.11111C8.83289 2.11111 8.69884 2.16706 8.59962 2.26522C8.50039 2.36444 8.44444 2.4985 8.44444 2.63889V3.16667H10.5556Z" fill="black"/>\n                </svg>\n                ';
                clearChatBtn.addEventListener("click", onClearChatClick);
                var leftResizer = document.createElement("div");
                leftResizer.classList.add("alan-btn__chat-header-left-resizer");
                leftResizer.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7266 0.273364C14.0911 0.63786 14.0911 1.22881 13.7266 1.59331L1.59331 13.7266C1.22881 14.0911 0.63786 14.0911 0.273364 13.7266C-0.0911215 13.3622 -0.0911215 12.7712 0.273364 12.4067L12.4067 0.273364C12.7712 -0.0911215 13.3622 -0.0911215 13.7266 0.273364ZM13.7266 6.80672C14.0911 7.17119 14.0911 7.76217 13.7266 8.12664L8.12664 13.7266C7.76217 14.0911 7.17119 14.0911 6.80672 13.7266C6.44225 13.3622 6.44225 12.7712 6.80672 12.4067L12.4067 6.80672C12.7712 6.44225 13.3622 6.44225 13.7266 6.80672Z" fill="#CCD4DD"/>\n                </svg>\n                ';
                var rightResizer = document.createElement("div");
                rightResizer.classList.add("alan-btn__chat-header-right-resizer");
                rightResizer.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7266 0.273364C14.0911 0.63786 14.0911 1.22881 13.7266 1.59331L1.59331 13.7266C1.22881 14.0911 0.63786 14.0911 0.273364 13.7266C-0.0911215 13.3622 -0.0911215 12.7712 0.273364 12.4067L12.4067 0.273364C12.7712 -0.0911215 13.3622 -0.0911215 13.7266 0.273364ZM13.7266 6.80672C14.0911 7.17119 14.0911 7.76217 13.7266 8.12664L8.12664 13.7266C7.76217 14.0911 7.17119 14.0911 6.80672 13.7266C6.44225 13.3622 6.44225 12.7712 6.80672 12.4067L12.4067 6.80672C12.7712 6.44225 13.3622 6.44225 13.7266 6.80672Z" fill="#CCD4DD"/>\n                </svg>\n                ';
                headerTille = document.createElement("span");
                headerTille.id = "chat-header-title";
                headerTille.classList.add("alan-btn__chat-header-title");
                headerDiv.appendChild(headerTille);
                headerDiv.appendChild(leftResizer);
                headerDiv.appendChild(rightResizer);
                headerDiv.appendChild(clearChatBtn);
                var closeChatBtnImg = document.createElement("div");
                closeChatBtnImg.innerHTML = '\n                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M0.342029 15.0105C-0.113105 15.4658 -0.113035 16.2036 0.34217 16.6587C0.797374 17.1138 1.53533 17.1138 1.99046 16.6586L8.50015 10.1482L15.0104 16.658C15.4655 17.1131 16.2035 17.1131 16.6586 16.658C17.1138 16.2029 17.1138 15.4649 16.6586 15.0098L10.1483 8.49998L16.6582 1.98944C17.1132 1.53427 17.1132 0.796371 16.6579 0.341282C16.2028 -0.113819 15.4648 -0.113749 15.0097 0.341421L8.49991 6.85183L1.98966 0.341981C1.5345 -0.113143 0.796535 -0.113143 0.341377 0.341981C-0.113792 0.797116 -0.113792 1.53502 0.341377 1.99016L6.85187 8.5001L0.342029 15.0105Z" fill="#080808"/>\n</svg>\n';
                closeChatBtnImg.classList.add("alan-btn__close-chat-btn");
                headerDiv.appendChild(closeChatBtnImg);
                closeChatBtnImg.addEventListener("click", closeTextChat);
                textareaDiv = document.createElement("div");
                textareaDiv.id = "textarea-holder";
                textareaDiv.classList.add("alan-btn__chat-textarea-holder");
                var textareaDivGr = document.createElement("div");
                textareaDivGr.classList.add("alan-btn__chat-textarea-holder-gradient");
                chatTextarea = document.createElement("input");
                chatTextarea.id = "chatTextarea";
                chatTextarea.setAttribute("autocomplete", "off");
                chatTextarea.classList.add("alan-btn__chat-textarea");
                chatTextarea.addEventListener("keydown", onChatTextAreaKeyDown);
                chatTextarea.addEventListener("keyup", onChatTextAreaKeyUp);
                var textareaGradient = document.createElement("div");
                textareaGradient.classList.add("alan-btn__chat-textarea-gradient");
                chatSendBtn = document.createElement("div");
                chatSendBtn.id = "chat-send-btn";
                chatSendBtn.classList.add("alan-btn__chat-send-btn");
                chatSendBtn.addEventListener("click", sendMessageToTextChat);
                chatSendBtn.innerHTML = sendChatIcon;
                textareaDiv.appendChild(chatTextarea);
                textareaDiv.appendChild(chatSendBtn);
                textareaDiv.appendChild(textareaGradient);
                textareaDiv.appendChild(textareaDivGr);
                chatDiv.appendChild(headerDiv);
                chatDiv.appendChild(messagesWrapperDiv);
                chatDiv.appendChild(textareaDiv);
                chatDiv.appendChild(headerDivGr);
                chatHolderDiv.classList.add("alan-btn__chat-holder");
              }
              if (headerTille) {
                var title = ((_a = textChatOptions === null || textChatOptions === void 0 ? void 0 : textChatOptions.header) === null || _a === void 0 ? void 0 : _a.label) || "Alan AI Copilot";
                headerTille.innerText = title;
                headerTille.setAttribute("title", title);
              }
              if (!unmuteAlanBtn) {
                unmuteAlanBtn = document.createElement("div");
                unmuteAlanBtn.classList.add("alan-btn__chat-unmute-btn");
                unmuteAlanBtn.id = "chat-unmute-btn";
                unmuteAlanBtn.addEventListener("click", function() {
                  if (!textToSpeachVoiceEnabled) {
                    enableAudio(true);
                  } else {
                    disableAudio(true);
                  }
                });
                if (isMobile()) {
                  disableAudio(true);
                } else {
                  if (textToSpeachVoiceEnabled) {
                    alanAudio2.enableVoice();
                  }
                }
                manageUnmuteAlanIcon(unmuteAlanBtn, textToSpeachVoiceEnabled);
                if (textareaDiv) {
                  textareaDiv.appendChild(unmuteAlanBtn);
                }
              }
              if (voiceEnabledInTextChat) {
                chatTextarea.setAttribute("placeholder", "Ask me anything...");
                chatHolderDiv.classList.add("alan-text-chat__voice-enabled");
                if (!chatMicBtn) {
                  chatMicBtn = document.createElement("div");
                  chatMicBtn.classList.add("alan-btn__chat-mic-btn");
                  chatMicBtn.id = "chat-mic-btn";
                  chatMicBtn.addEventListener("click", function() {
                    chatTextarea.value = "";
                    textareaDiv.classList.remove("show-gradient");
                    if (!isAlanActive) {
                      disableVoiceEnabledBtn();
                    } else {
                      textChatScrollPosition = null;
                    }
                    onBtnClickInTextChat();
                    if (state === NOT_SECURE_ORIGIN || state === NO_VOICE_SUPPORT) {
                      chatMicBtn.classList.add("alan-btn__disabled");
                    }
                  });
                  switch (state) {
                    case PERMISSION_DENIED:
                    case NO_VOICE_SUPPORT:
                    case NOT_SECURE_ORIGIN:
                      chatMicBtn.innerHTML = chatNoMicIcon;
                      if (state === PERMISSION_DENIED) {
                        chatMicBtn.classList.add("alan-btn__disabled");
                      }
                      break;
                    default:
                      chatMicBtn.innerHTML = chatMicIcon;
                      break;
                  }
                  if (textareaDiv) {
                    textareaDiv.appendChild(chatMicBtn);
                  }
                }
              } else {
                if (chatMicBtn) {
                  chatMicBtn.remove();
                }
                chatTextarea.setAttribute("placeholder", "Ask me anything...");
                chatTextarea.style.paddingTop = calculateTextareaTopPadding() + "px";
                chatHolderDiv.classList.remove("alan-text-chat__voice-enabled");
              }
              if (chatTextarea) {
                if ((_b = textChatOptions === null || textChatOptions === void 0 ? void 0 : textChatOptions.textarea) === null || _b === void 0 ? void 0 : _b.placeholder) {
                  chatTextarea.setAttribute("placeholder", (_c = textChatOptions === null || textChatOptions === void 0 ? void 0 : textChatOptions.textarea) === null || _c === void 0 ? void 0 : _c.placeholder);
                }
              }
            }
            function getOpenCloseTextChatLocalStorageKey() {
              return "alan-btn-text-chat-opened-for-projectId-".concat(getProjectId());
            }
            function fixPopupScrollOnMobileForTextChat(isOpened) {
              if (isMobile()) {
                var bodyEl = document.getElementsByTagName("body")[0];
                if (bodyEl) {
                  if (isOpened) {
                    bodyEl.style.top = "-".concat(window.scrollY, "px");
                    bodyEl.classList.add("no-scroll-for-popup");
                  } else {
                    bodyEl.classList.remove("no-scroll-for-popup");
                    var scrollY_1 = bodyEl.style.top;
                    bodyEl.style.top = "";
                    window.scrollTo(0, parseInt(scrollY_1 || "0") * -1);
                  }
                }
              }
            }
            function showTextChat(noAnimation) {
              fixPopupScrollOnMobileForTextChat(true);
              hideChatNotifications();
              hidePopup();
              chatHolderDiv.style.display = "flex";
              textChatIsHidden = false;
              if (noAnimation === true) {
                rootEl.classList.add("hide-alan-btn-when-text-chat-is-opened-immediately");
              } else {
                rootEl.classList.add("hide-alan-btn-when-text-chat-is-opened");
              }
              chatHolderDiv.classList.add("alan-text-chat__openning");
              if (isLocalStorageAvailable) {
                if (!isMobile()) {
                  localStorage.setItem(getOpenCloseTextChatLocalStorageKey(), "1");
                }
              }
            }
            function hideTextChat() {
              if (textChatIsHidden)
                return;
              deactivateAlanButton();
              chatHolderDiv.classList.add("alan-text-chat__closing");
              rootEl.classList.add("text-chat-is-closing");
              setTimeout(function() {
                chatHolderDiv.style.display = "none";
                chatHolderDiv.classList.remove("alan-text-chat__closing");
                rootEl.classList.remove("hide-alan-btn-when-text-chat-is-opened");
                rootEl.classList.remove("hide-alan-btn-when-text-chat-is-opened-immediately");
                rootEl.classList.remove("text-chat-is-closing");
                fixPopupScrollOnMobileForTextChat(false);
              }, textChatAppearAnimationMs);
              textChatIsHidden = true;
              if (isLocalStorageAvailable) {
                localStorage.removeItem(getOpenCloseTextChatLocalStorageKey());
              }
            }
            function isTextChatSavedStateOpened() {
              if (isLocalStorageAvailable) {
                if (!isMobile()) {
                  return localStorage.getItem(getOpenCloseTextChatLocalStorageKey());
                }
              }
              return false;
            }
            function closeTextChat() {
              hideTextChat();
            }
            function getVoiceEnabledFlagLocalStorageKey() {
              return "alan-btn-text-chat__text-to-speach-voice-enabled__for-projectId-".concat(getProjectId());
            }
            function getVoiceEnabledFlag() {
              if (isMobile()) {
                return false;
              }
              if (isLocalStorageAvailable) {
                var val = localStorage.getItem(getVoiceEnabledFlagLocalStorageKey());
                if (val === "true") {
                  return true;
                } else if (val === "false") {
                  return false;
                }
              }
              return null;
            }
            function saveVoiceEnabledFlag(enabled) {
              if (isLocalStorageAvailable) {
                localStorage.setItem(getVoiceEnabledFlagLocalStorageKey(), enabled);
              }
            }
            function showChatNotifications() {
              if (unreadChatMsgCount > 0) {
                chatNotificationsBubble.innerHTML = unreadChatMsgCount > 99 ? "99+" : "".concat(unreadChatMsgCount);
                chatNotificationsBubble.style.display = "flex";
              }
            }
            function manageUnmuteAlanIcon(iconEl, unmuted) {
              var muteIconSvg = '\n            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <g clip-path="url(#clip0_185_822)">\n                <path d="M2.96822 1.83729C2.5972 1.46626 2.04066 1.46626 1.66963 1.83729C1.2986 2.20832 1.2986 2.76486 1.66963 3.13589L16.5107 17.977C16.8818 18.348 17.4383 18.348 17.8093 17.977C18.1804 17.606 18.1804 17.0494 17.8093 16.6784L2.96822 1.83729Z" fill="#171717"/>\n                <path d="M14.2846 11.9477L15.5832 13.2463C17.0673 11.2984 16.9746 8.60848 15.4905 6.66059C15.2122 6.28956 14.5629 6.1968 14.1919 6.56783C13.8208 6.93886 13.7281 7.4954 14.0991 7.86643C15.1194 8.88675 15.1194 10.5564 14.2846 11.9477Z" fill="#171717"/>\n                <path d="M18.1804 9.90719C18.1804 11.3913 17.5311 12.8754 16.5107 13.9885L17.8093 15.2871C19.2007 13.803 19.9427 11.9478 20.0355 9.90719C20.0355 7.49551 18.8297 5.17659 16.8818 3.59972C16.5107 3.22869 15.7687 3.32145 15.5832 3.69248C15.3976 4.06351 15.3049 4.7128 15.6759 4.99107C17.2528 6.19691 18.1804 7.9593 18.1804 9.90719Z" fill="#171717"/>\n                <path d="M11.1308 15.6581L6.40023 12.4116C6.21471 12.3189 6.0292 12.2261 5.84368 12.2261H1.85514V7.77378H4.82336L2.96822 5.91864H0.927569C0.371028 5.91864 0 6.28967 0 6.84621V13.2464C0 13.803 0.371028 14.174 0.927569 14.174H5.56541L11.5019 18.2553C11.6874 18.3481 11.8729 18.4408 12.0584 18.4408C12.6149 18.4408 12.986 18.0698 12.986 17.5133V15.9364L11.1308 14.0812V15.6581Z" fill="#171717"/>\n                <path d="M11.1309 4.24897V8.7013L12.986 10.5564V2.48659C12.986 1.93005 12.615 1.55902 12.0584 1.55902C11.8729 1.55902 11.6874 1.65178 11.5019 1.74453L7.14233 4.71276L8.44093 6.01135L11.1309 4.24897Z" fill="#171717"/>\n                </g>\n                <defs>\n                <clipPath id="clip0_185_822">\n                <rect width="20" height="20" fill="white"/>\n                </clipPath>\n                </defs>\n                </svg>\n                ';
              var unmuteIconSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M15.5556 6.64349C15.2778 6.27312 14.6296 6.18053 14.2593 6.5509C13.8889 6.92127 13.7963 7.47682 14.1667 7.84719C15.0926 9.14348 15.0926 10.9027 14.1667 12.199C13.8889 12.5694 13.8889 13.2175 14.2593 13.4953C14.4445 13.5879 14.6296 13.6805 14.8148 13.6805C15.0926 13.6805 15.3704 13.5879 15.5556 13.3101C17.037 11.3657 17.037 8.58793 15.5556 6.64349Z" fill="#171717"/>\n            <path d="M16.7593 3.68063C16.3889 3.31026 15.7408 3.40285 15.463 3.77322C15.1852 4.14359 15.1852 4.79174 15.5556 5.06952C17.1297 6.27322 18.0556 8.03247 18.0556 9.97691C18.0556 11.9213 17.1297 13.6806 15.6482 14.7917C15.2778 15.1621 15.1852 15.7176 15.5556 16.088C15.7408 16.2732 16.0186 16.4584 16.2963 16.4584C16.4815 16.4584 16.7593 16.3658 16.8519 16.2732C18.7963 14.7917 19.9074 12.4769 20 9.97691C19.9074 7.56951 18.7037 5.2547 16.7593 3.68063Z" fill="#171717"/>\n            <path d="M12.5 1.73615C12.2222 1.55096 11.8518 1.55096 11.574 1.73615L5.55554 5.9028H0.925923C0.370369 5.9028 0 6.27317 0 6.82872V13.2176C0 13.7731 0.370369 14.1435 0.925923 14.1435H5.55554L11.4814 18.2176C11.6666 18.3102 11.8518 18.4028 12.037 18.4028C12.5926 18.4028 12.9629 18.0324 12.9629 17.4768V2.56948C12.9629 2.19911 12.7777 1.92133 12.5 1.73615ZM11.1111 15.625L6.38887 12.3843C6.20368 12.2917 6.0185 12.1991 5.83331 12.1991H1.85185V7.75465H5.83331C6.0185 7.75465 6.20368 7.66205 6.38887 7.56946L11.1111 4.32873V15.625Z" fill="#171717"/>\n            </svg>\n            ';
              if (iconEl) {
                if (unmuted) {
                  iconEl.innerHTML = unmuteIconSvg;
                } else {
                  iconEl.innerHTML = muteIconSvg;
                }
              }
            }
            function hideChatNotifications() {
              unreadChatMsgCount = 0;
              chatNotificationsBubble.style.display = "none";
              for (var i2 = 0; i2 < textChatMessages.length; i2++) {
                textChatMessages[i2].read = true;
              }
              saveMessageHistory();
            }
            function applyStylesForDefaultState() {
              btn.style.animation = "";
              micIconDiv.style.animation = "";
              roundedTriangleIconDiv.style.animation = "";
              btnBgDefault.classList.remove("super-hidden");
              btnBgDefault.style.opacity = onOpacity;
              btnOval1.style.animation = "";
              btnOval2.style.animation = "";
              btnOval1.style.opacity = "0";
              btnOval2.style.opacity = "0";
              changeBgColors(DEFAULT);
              micIconDiv.style.opacity = "1";
              roundedTriangleIconDiv.style.opacity = "0";
              disconnectedMicLoaderIconImg.style.opacity = "0";
              changeCustomLogoVisibility(defaultStateBtnIconImg, [
                listenStateBtnIconImg,
                processStateBtnIconImg,
                replyStateBtnIconImg
              ]);
              hideLayers([
                btnBgListening,
                btnBgSpeaking,
                btnBgIntermediate,
                btnBgUnderstood
              ]);
              lowVolumeMicIconImg.style.opacity = "0";
              noVoiceSupportMicIconImg.style.opacity = "0";
              rootEl.classList.remove("alan-btn-low-volume");
              rootEl.classList.remove("alan-btn-permission-denied");
              rootEl.classList.remove("alan-btn-disconnected");
              rootEl.classList.remove("alan-btn-offline");
              rootEl.classList.remove("alan-btn-no-voice-support");
            }
            window.switchState = switchState;
            function switchState(newState) {
              if (options2.onButtonState) {
                options2.onButtonState(btnStateMapping[newState]);
              }
              var tempLogoParts = [], i2 = 0;
              currentErrMsg = null;
              if (newState === DEFAULT) {
                applyStylesForDefaultState();
              }
              if (textChatIsHidden) {
                if (newState === LISTENING) {
                  btn.style.animation = pulsatingAnimation;
                  micIconDiv.style.animation = pulsatingMicAnimation;
                  btnBgListening.classList.remove("super-hidden");
                  btnBgListening.style.opacity = onOpacity;
                  btnOval1.style.opacity = "1";
                  btnOval2.style.opacity = "1";
                  changeBgColors(LISTENING);
                  micIconDiv.style.opacity = "1";
                  if (!listenStateBtnIconImg.src) {
                    roundedTriangleIconDiv.style.animation = pulsatingTriangleMicAnimation;
                    roundedTriangleIconDiv.style.opacity = "1";
                  }
                  changeCustomLogoVisibility(listenStateBtnIconImg, [
                    defaultStateBtnIconImg,
                    processStateBtnIconImg,
                    replyStateBtnIconImg
                  ]);
                  hideLayers([
                    btnBgSpeaking,
                    btnBgIntermediate,
                    btnBgUnderstood
                  ]);
                } else if (newState === SPEAKING) {
                  hideRecognisedText();
                  btn.style.animation = pulsatingAnimation;
                  btnBgSpeaking.classList.remove("super-hidden");
                  btnBgSpeaking.style.opacity = onOpacity;
                  btnOval1.style.opacity = "1";
                  btnOval2.style.opacity = "1";
                  changeBgColors(SPEAKING);
                  changeCustomLogoVisibility(replyStateBtnIconImg, [
                    defaultStateBtnIconImg,
                    listenStateBtnIconImg,
                    processStateBtnIconImg
                  ]);
                  hideLayers([
                    btnBgDefault,
                    btnBgListening,
                    btnBgIntermediate,
                    btnBgUnderstood
                  ]);
                } else if (newState === INTERMEDIATE) {
                  btn.style.animation = pulsatingAnimation;
                  btnBgIntermediate.classList.remove("super-hidden");
                  btnBgIntermediate.style.opacity = onOpacity;
                  btnOval1.style.opacity = "1";
                  btnOval2.style.opacity = "1";
                  changeBgColors(INTERMEDIATE);
                  micIconDiv.style.opacity = "1";
                  if (!processStateBtnIconImg.src) {
                    roundedTriangleIconDiv.style.opacity = "1";
                  }
                  hideLayers([
                    btnBgDefault,
                    btnBgListening,
                    btnBgSpeaking,
                    btnBgUnderstood
                  ]);
                  changeCustomLogoVisibility(processStateBtnIconImg, [
                    defaultStateBtnIconImg,
                    listenStateBtnIconImg,
                    replyStateBtnIconImg
                  ]);
                } else if (newState === UNDERSTOOD) {
                  btn.style.animation = pulsatingAnimation;
                  btnBgUnderstood.classList.remove("super-hidden");
                  btnBgUnderstood.style.opacity = onOpacity;
                  btnOval1.style.opacity = "1";
                  btnOval2.style.opacity = "1";
                  changeBgColors(UNDERSTOOD);
                  micIconDiv.style.opacity = "1";
                  if (!processStateBtnIconImg.src) {
                    roundedTriangleIconDiv.style.opacity = "1";
                  } else {
                    roundedTriangleIconDiv.style.opacity = "0";
                  }
                  changeCustomLogoVisibility(processStateBtnIconImg, [
                    defaultStateBtnIconImg,
                    listenStateBtnIconImg,
                    replyStateBtnIconImg
                  ]);
                  hideLayers([
                    btnBgDefault,
                    btnBgListening,
                    btnBgSpeaking,
                    btnBgIntermediate
                  ]);
                }
                if (newState === SPEAKING) {
                  roundedTriangleIconDiv.style.opacity = "0";
                  roundedTriangleIconDiv.style.backgroundSize = "0% 0%";
                  if (!replyStateBtnIconImg.src) {
                    circleIconDiv.style.opacity = "1";
                    circleIconDiv.style.backgroundSize = "100% 100%";
                  }
                } else {
                  circleIconDiv.style.opacity = "0";
                  circleIconDiv.style.backgroundSize = "0% 0%";
                  roundedTriangleIconDiv.style.backgroundSize = "100% 100%";
                }
                if (newState === DEFAULT) {
                  roundedTriangleIconDiv.classList.add("triangleMicIconBg-default");
                } else {
                  roundedTriangleIconDiv.classList.remove("triangleMicIconBg-default");
                }
                tempLogoParts = [
                  logoState1,
                  logoState2,
                  logoState3,
                  logoState4,
                  logoState5,
                  logoState6,
                  logoState7,
                  logoState8,
                  logoState9,
                  logoState10
                ];
                if (newState === LISTENING && !listenStateBtnIconImg.src || newState === INTERMEDIATE && !processStateBtnIconImg.src || newState === SPEAKING && !replyStateBtnIconImg.src || newState === UNDERSTOOD && !processStateBtnIconImg.src) {
                  if (logoState1.style.animationName === "") {
                    for (i2 = 0; i2 < tempLogoParts.length; i2++) {
                      if (i2 === 0) {
                        tempLogoParts[i2].style.opacity = 1;
                      } else {
                        tempLogoParts[i2].style.opacity = 0;
                      }
                      tempLogoParts[i2].style.animationName = "logo-state-" + (i2 + 1) + "-animation";
                    }
                  }
                  defaultStateBtnIconImg.style.opacity = "0";
                } else {
                  for (i2 = 0; i2 < tempLogoParts.length; i2++) {
                    tempLogoParts[i2].style.opacity = 0;
                    tempLogoParts[i2].style.animationName = "";
                  }
                }
              }
              if (newState === LOW_VOLUME || newState === PERMISSION_DENIED || newState === NO_VOICE_SUPPORT || newState === NOT_SECURE_ORIGIN) {
                if (textChatIsAvailable) {
                  applyStylesForDefaultState();
                } else {
                  if (newState === LOW_VOLUME) {
                    rootEl.classList.add("alan-btn-low-volume");
                    currentErrMsg = LOW_VOLUME_MSG;
                  } else if (newState === PERMISSION_DENIED) {
                    rootEl.classList.add("alan-btn-permission-denied");
                    currentErrMsg = MIC_BLOCKED_MSG;
                    console.warn(MIC_BLOCKED_MSG);
                  } else if (newState === NO_VOICE_SUPPORT || newState === NOT_SECURE_ORIGIN) {
                    rootEl.classList.add("alan-btn-no-voice-support");
                    if (newState === NO_VOICE_SUPPORT) {
                      currentErrMsg = NO_VOICE_SUPPORT_IN_BROWSER_MSG;
                    } else if (newState === NOT_SECURE_ORIGIN) {
                      currentErrMsg = NOT_SECURE_ORIGIN_MSG;
                    }
                  }
                  if (newState === NO_VOICE_SUPPORT) {
                    noVoiceSupportMicIconImg.style.opacity = "1";
                    lowVolumeMicIconImg.style.opacity = "0";
                  } else {
                    noVoiceSupportMicIconImg.style.opacity = "0";
                    lowVolumeMicIconImg.style.opacity = "1";
                  }
                  changeCustomLogoVisibility(null, [
                    defaultStateBtnIconImg,
                    listenStateBtnIconImg,
                    processStateBtnIconImg,
                    replyStateBtnIconImg
                  ]);
                  micIconDiv.style.opacity = "0";
                  roundedTriangleIconDiv.style.opacity = "0";
                  disconnectedMicLoaderIconImg.style.opacity = "0";
                  offlineIconImg.style.opacity = "0";
                  btnOval1.style.animation = "";
                  btnOval2.style.animation = "";
                  btnOval1.style.opacity = "0";
                  btnOval2.style.opacity = "0";
                }
              } else if (newState === DISCONNECTED || newState === OFFLINE) {
                if (textChatIsAvailable) {
                  applyStylesForDefaultState();
                } else {
                  if (newState === DISCONNECTED) {
                    rootEl.classList.add("alan-btn-disconnected");
                  }
                  if (newState === OFFLINE) {
                    rootEl.classList.add("alan-btn-offline");
                    currentErrMsg = OFFLINE_MSG;
                  }
                  roundedTriangleIconDiv.style.opacity = "0";
                  lowVolumeMicIconImg.style.opacity = "0";
                  btnOval1.style.animation = "";
                  btnOval2.style.animation = "";
                  btnOval1.style.opacity = "0";
                  btnOval2.style.opacity = "0";
                  changeCustomLogoVisibility(null, [
                    defaultStateBtnIconImg,
                    listenStateBtnIconImg,
                    processStateBtnIconImg,
                    replyStateBtnIconImg
                  ]);
                  if (newState === DISCONNECTED) {
                    micIconDiv.style.opacity = "0";
                    disconnectedMicLoaderIconImg.style.opacity = "1";
                  } else {
                    micIconDiv.style.opacity = "0";
                    disconnectedMicLoaderIconImg.style.opacity = "0";
                    offlineIconImg.style.opacity = "1";
                  }
                }
              } else {
                lowVolumeMicIconImg.style.opacity = "0";
                offlineIconImg.style.opacity = "0";
                disconnectedMicLoaderIconImg.style.opacity = "0";
                rootEl.classList.remove("alan-btn-low-volume");
                rootEl.classList.remove("alan-btn-permission-denied");
                rootEl.classList.remove("alan-btn-disconnected");
                rootEl.classList.remove("alan-btn-offline");
                rootEl.classList.remove("alan-btn-no-voice-support");
              }
              if (textChatIsAvailable) {
                var simpleAlanBtn = document.getElementById("chat-mic-btn");
                var sendBtn = document.getElementById("chat-send-btn");
                var textChatEl = document.getElementById("alan-text-chat");
                if (textChatEl) {
                  switch (newState) {
                    case OFFLINE:
                    case DISCONNECTED:
                      sendBtn.innerHTML = newState === OFFLINE ? noWiFiChatIcon : disconnectedChatIcon;
                      textChatEl.classList.add("alan-btn__disconnected");
                      break;
                    case LISTENING:
                    case INTERMEDIATE:
                    case SPEAKING:
                    case UNDERSTOOD:
                      textChatEl.classList.add("alan-btn__mic-active");
                      break;
                    default:
                      textChatEl.classList.remove("alan-btn__mic-active");
                      textChatEl.classList.remove("alan-btn__disconnected");
                      sendBtn.innerHTML = sendChatIcon;
                      break;
                  }
                  if (simpleAlanBtn) {
                    switch (newState) {
                      case LISTENING:
                      case INTERMEDIATE:
                      case SPEAKING:
                      case UNDERSTOOD:
                        simpleAlanBtn.classList.add("active");
                        simpleAlanBtn.style.animation = pulsatingAnimationForMicBtnInTextChat;
                        break;
                      case PERMISSION_DENIED:
                      case NO_VOICE_SUPPORT:
                      case NOT_SECURE_ORIGIN:
                        simpleAlanBtn.innerHTML = chatNoMicIcon;
                        if (state === PERMISSION_DENIED) {
                          simpleAlanBtn.classList.add("alan-btn__disabled");
                        }
                        break;
                      default:
                        simpleAlanBtn.classList.remove("active");
                        simpleAlanBtn.style.animation = "";
                        break;
                    }
                  }
                }
              }
              if (newState !== DISCONNECTED) {
                previousState = newState;
              }
              state = newState;
            }
            function applyBgStyles(el) {
              el.style.transition = "all 0.4s linear";
              el.style.position = "absolute";
              el.style.top = "0px";
              el.style.left = "0px";
              el.style.width = "100%";
              el.style.height = "100%";
              el.style.borderRadius = "50%";
              el.style.zIndex = btnBgLayerZIndex;
              el.style.backgroundPosition = "0 0";
              el.style.opacity = 0;
              el.style.opacity = 0;
              el.style.transition = "opacity 300ms ease-in-out";
              el.style.animation = gradientAnimation;
              el.style.display = "block";
            }
            function hideLayers(layers) {
              for (var i2 = 0; i2 < layers.length; i2++) {
                layers[i2].style.opacity = offOpacity;
                layers[i2].classList.add("super-hidden");
              }
            }
            function changeBgColors(state2) {
              var tempBgLayers = [btnOval1, btnOval2];
              var newStateName = state2 || DEFAULT;
              var tempBgLayerClasses = [
                "alanBtn-oval-bg-" + DEFAULT,
                "alanBtn-oval-bg-" + LISTENING,
                "alanBtn-oval-bg-" + INTERMEDIATE,
                "alanBtn-oval-bg-" + UNDERSTOOD,
                "alanBtn-oval-bg-" + SPEAKING
              ];
              for (var i2 = 0; i2 < tempBgLayers.length; i2++) {
                tempBgLayers[i2].classList.add("alanBtn-oval-bg-" + newStateName);
                for (var j = 0; j < tempBgLayerClasses.length; j++) {
                  tempBgLayers[i2].classList.remove(tempBgLayerClasses[j]);
                }
              }
            }
            function getStorageKey() {
              var key = "";
              if (options2 && options2.key) {
                key = options2.key;
              }
              return "alan-btn-options-" + key;
            }
            function isMobile() {
              if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true;
              }
              return false;
            }
            function isIpadOS() {
              return navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
            }
            function isOriginSecure() {
              var isSecure = false;
              var protocol2 = window.location.protocol;
              var hostname = window.location.hostname;
              if (protocol2 === "https:") {
                isSecure = true;
              }
              if (isFileProtocol()) {
                isSecure = true;
              }
              if (protocol2 === "http:" && (hostname.indexOf("localhost") > -1 || hostname.indexOf("127.0.0.1") > -1)) {
                isSecure = true;
              }
              return isSecure;
            }
            function isFileProtocol() {
              var protocol2 = window.location.protocol;
              return protocol2 === "file:";
            }
            function isAudioSupported() {
              var available = false, fakeGetUserMedia, fakeContext;
              fakeGetUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
              fakeContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
              if (fakeGetUserMedia && fakeContext) {
                available = true;
              }
              return available;
            }
            function showBtn() {
              rootEl.innerHTML = "";
              recognisedTextHolder.appendChild(recognisedTextContent);
              rootEl.appendChild(recognisedTextHolder);
              rootEl.appendChild(btn);
              rootEl.appendChild(chatHolderDiv);
              btn.appendChild(chatNotificationsBubble);
              btnDisabled = false;
            }
            function hideBtn() {
              if (!isTutorMode()) {
                alanAudio2.stop();
                rootEl.innerHTML = "";
                btnDisabled = true;
              }
            }
            function showSpeach2TextPanel() {
              hideS2TPanel = false;
            }
            function hideSpeach2TextPanel() {
              hideS2TPanel = true;
              hideRecognisedText();
            }
            function applyBtnOptions(webOptions) {
              if (webOptions) {
                createAlanStyleSheet(webOptions);
              } else {
                createAlanStyleSheet();
              }
            }
            function applyLogoOptions(data) {
              if (data && data.web) {
                if (data.web.logoUrl && !data.web.logoIdle && !data.web.logoListen && !data.web.logoProcess && !data.web.logoReply && !data.web.logoTextChat) {
                  listenStateBtnIconImg.src = data.web.logoUrl;
                  processStateBtnIconImg.src = data.web.logoUrl;
                  replyStateBtnIconImg.src = data.web.logoUrl;
                } else {
                  if (textChatIsAvailable) {
                    if (data.web.logoTextChat) {
                      defaultStateBtnIconImg.src = data.web.logoTextChat;
                    } else {
                      defaultStateBtnIconImg.src = alanLogoIconSrc;
                    }
                  } else {
                    if (data.web.logoIdle) {
                      defaultStateBtnIconImg.src = data.web.logoIdle;
                    } else {
                      defaultStateBtnIconImg.src = micIconSrc;
                    }
                    if (data.web.logoListen) {
                      listenStateBtnIconImg.src = data.web.logoListen;
                    } else {
                      listenStateBtnIconImg.removeAttribute("src");
                      listenStateBtnIconImg.style.opacity = "0";
                    }
                    if (data.web.logoProcess) {
                      processStateBtnIconImg.src = data.web.logoProcess;
                    } else {
                      processStateBtnIconImg.removeAttribute("src");
                      processStateBtnIconImg.style.opacity = "0";
                    }
                    if (data.web.logoReply) {
                      replyStateBtnIconImg.src = data.web.logoReply;
                    } else {
                      replyStateBtnIconImg.removeAttribute("src");
                      replyStateBtnIconImg.style.opacity = "0";
                    }
                  }
                }
              }
            }
            function applyPlayReadyToListenSoundOptions(playSound) {
              playReadyToListenSound = playSound;
            }
            rootEl.classList.add("alanBtn-root");
            rootEl.classList.add("alan-" + getProjectId());
            var alanBtnSavedOptions = null;
            if (isTutorMode()) {
              showBtn();
            } else {
              if (isLocalStorageAvailable) {
                try {
                  tryReadSettingsFromLocalStorage();
                } catch (e) {
                }
              }
            }
            function tryReadSettingsFromLocalStorage() {
              if (isLocalStorageAvailable) {
                try {
                  alanBtnSavedOptions = JSON.parse(localStorage.getItem(getStorageKey()));
                  if (alanBtnSavedOptions && alanBtnSavedOptions.web) {
                    if (alanBtnSavedOptions.web) {
                      applyBtnOptions(alanBtnSavedOptions.web);
                    }
                  }
                } catch (e) {
                }
              }
            }
            if (!options2.rootEl) {
              body.appendChild(rootEl);
            }
            if (!pinned) {
              btn.addEventListener("mousedown", onMouseDown, true);
              btn.addEventListener("touchstart", onMouseDown, { passive: false });
              document.addEventListener("mouseup", onMouseUp, true);
              document.addEventListener("touchend", onMouseUp, { passive: false });
              document.addEventListener("mousemove", onMouseMove, true);
              document.addEventListener("touchmove", onMouseMove, { passive: false });
            }
            function onMouseDown(e) {
              var posInfo = e.touches ? e.touches[0] : e, rootElClientRect;
              if (!posInfo)
                return;
              if (pageScrolled)
                return;
              if (!dndBackAnimFinished || e.buttons !== void 0 && e.buttons !== 1)
                return;
              dndIsDown = true;
              rootEl.style.transition = "0ms";
              rootElClientRect = rootEl.getBoundingClientRect();
              if (rootElClientRect) {
                var rootElPosX = rootElClientRect.x;
                if (!dndFinalHorPos) {
                  dndFinalHorPos = isLeftAligned ? rootElPosX : window.innerWidth - rootElPosX - btnSize - (window.innerWidth - document.documentElement.clientWidth);
                }
                dndBtnLeftPos = rootElPosX;
                dndInitMousePos = [
                  posInfo.clientX,
                  posInfo.clientY
                ];
                dndBtnTopPos = parseInt(rootElClientRect.top, 10);
              }
            }
            function onMouseMove(e) {
              var posInfo = e.touches ? e.touches[0] : e;
              var newLeftPos, newTopPos;
              if (!posInfo)
                return;
              if (!dragAndDropEnabled)
                return;
              if (dndIsDown) {
                togglePopupVisibility(false);
                hideRecognisedText(0, true);
                e.preventDefault();
                if (!afterMouseMove) {
                  rootEl.style.setProperty("left", dndBtnLeftPos + "px", "important");
                  rootEl.style.setProperty("right", "auto", "important");
                  rootEl.style.setProperty("top", dndBtnTopPos + "px", "important");
                  rootEl.style.setProperty("bottom", "auto", "important");
                }
                if (Math.abs(tempDeltaX) > 15 || Math.abs(tempDeltaY) > 15) {
                  hideTextChat();
                  afterMouseMove = true;
                }
                newLeftPos = dndBtnLeftPos + posInfo.clientX - dndInitMousePos[0];
                newTopPos = dndBtnTopPos + posInfo.clientY - dndInitMousePos[1];
                tempDeltaX = posInfo.clientX - dndInitMousePos[0];
                tempDeltaY = posInfo.clientY - dndInitMousePos[1];
                rootEl.style.setProperty("left", correctXPos(newLeftPos) + "px", "important");
                rootEl.style.setProperty("top", correctYPos(newTopPos) + "px", "important");
                e.preventDefault();
                return false;
              }
            }
            function onMouseUp(e) {
              var curX, curY;
              var posInfo;
              if (dndIsDown) {
                posInfo = e.changedTouches ? e.changedTouches[0] : e;
                if (!posInfo)
                  return;
                dndIsDown = false;
                rootEl.style.transition = dndAnimTransition;
                curX = parseInt(rootEl.style.left, 10);
                curY = parseInt(rootEl.style.top, 10);
                if (Math.abs(tempDeltaX) < 15 && Math.abs(tempDeltaY) < 15) {
                  setTimeout(function() {
                    afterMouseMove = false;
                    dndBackAnimFinished = true;
                  }, 300);
                  return;
                }
                if (curX <= window.innerWidth / 2) {
                  rootEl.style.setProperty("left", dndFinalHorPos + "px", "important");
                  changeBtnSide("to-left");
                  isLeftAligned = true;
                  isRightAligned = false;
                  setTextPanelPosition(recognisedTextHolder, curY);
                  setTextChatPosition(chatHolderDiv, curY);
                  btnWasMoved = true;
                  setTimeout(function() {
                    togglePopupVisibility(true);
                    saveBtnPosition("left", dndFinalHorPos, curY);
                  }, dndAnimDelay);
                } else {
                  rootEl.style.setProperty("left", window.innerWidth - dndFinalHorPos - btnSize - (window.innerWidth - document.documentElement.clientWidth) + "px", "important");
                  setTimeout(function() {
                    rootEl.style.setProperty("right", dndFinalHorPos + "px", "important");
                    changeBtnSide("to-right");
                    isLeftAligned = false;
                    isRightAligned = true;
                    setTextPanelPosition(recognisedTextHolder, curY);
                    setTextChatPosition(chatHolderDiv, curY);
                    saveBtnPosition("right", dndFinalHorPos, curY);
                    btnWasMoved = true;
                    dndBackAnimFinished = true;
                    togglePopupVisibility(true);
                  }, dndAnimDelay);
                }
                setTimeout(function() {
                  afterMouseMove = false;
                }, 300);
              }
            }
            function correctYPos(yPos) {
              var defDelta = 10;
              if (yPos < defDelta) {
                return defDelta;
              } else {
                if (yPos > window.innerHeight - btnSize - defDelta) {
                  return window.innerHeight - btnSize - defDelta;
                }
              }
              return yPos;
            }
            function correctXPos(xPos) {
              var defDelta = 10;
              if (xPos < defDelta) {
                return defDelta;
              } else if (xPos > window.innerWidth - btnSize - defDelta) {
                return window.innerWidth - btnSize - defDelta;
              }
              return xPos;
            }
            function changeBtnSide(side) {
              if (side === "to-left") {
                rootEl.style.setProperty("right", "auto", "important");
              } else {
                rootEl.style.setProperty("left", "auto", "important");
              }
              setStylesBasedOnSide();
            }
            function saveBtnPosition(orientation, x, y) {
              if (!keepButtonPositionAfterDnD)
                return;
              if (isSessionStorageAvailable) {
                var projectId = getProjectId();
                sessionStorage.setItem("alan-btn-saved-orientation-" + projectId, orientation);
                sessionStorage.setItem("alan-btn-saved-x-pos-" + projectId, Math.floor(x).toString());
                sessionStorage.setItem("alan-btn-saved-y-pos-" + projectId, Math.floor(y).toString());
              }
            }
            function clearSavedBtnPosition() {
              if (isSessionStorageAvailable) {
                var projectId = getProjectId();
                sessionStorage.removeItem("alan-btn-saved-orientation-" + projectId);
                sessionStorage.removeItem("alan-btn-saved-x-pos-" + projectId);
                sessionStorage.removeItem("alan-btn-saved-y-pos-" + projectId);
              }
            }
            function getSavedBtnPosition() {
              if (isSessionStorageAvailable) {
                var projectId = getProjectId();
                var savedOptions = {
                  orientation: sessionStorage.getItem("alan-btn-saved-orientation-" + projectId),
                };
                }
    });