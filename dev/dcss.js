//author = @harryPunia

var DCSS = function (domElement) {
    domElement == undefined ? (this.domElement = document, console.warn('Missing target, DCss will use the entire document as a fallback. Pass document/id as a parameter.')) : domElement == document ? this.domElement = document : this.domElement = document.getElementById(domElement);
    this.offsetX = 50;
    this.offsetY = 40;
    this.snapViewer = false;
    this.hoverViewer = false;
    this.snapping = false;
    this.width = 400;
    this.height = 400;
    this.view;
    this.html = {};
    this.css = {};
    this.dConsole;
    let scope = this;

    this.init = function () {
        this.view = document.createElement('div');
        this.view.id = 'viewer';
        document.body.appendChild(this.view);
        this.css.view = this.view.style;
        //---------------------------------
        this.consolePanel();
        this.initCss();
    }
    this.initCss = () => {
        this.css.view.cssText = 'display: none; width: ' + this.width + 'px; height: ' + this.height + 'px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 50px; padding: 20px; position: fixed; z-index: 99999999; overflow: scroll; left: 0x; top: 0px';
    }
    this.followView = e => {
        this.hoverViewer = true;
        this.css.view.display = 'block';
        let x = e.clientX,
            y = e.clientY;
        if (this.snapViewer == false) {
            let switchX = e.clientX > (window.innerWidth / 2),
                switchY = e.clientY > (window.innerHeight / 2),
                switchMobile = window.innerWidth < (this.width + this.offsetX) * 2;
            if (switchMobile) {
                this.css.view.left = (window.innerWidth / 2) - (this.width / 2) + 'px';
                switchY ? this.css.view.top = this.css.view.top = y - this.offsetY - this.width + 'px' : !switchY ? this.css.view.top = y + this.offsetY + 'px' : 0;
            } else {
                switchX ? this.css.view.left = (x - scope.offsetX - this.width) + 'px' : !switchX ? this.css.view.left = x + scope.offsetX + 'px' : 0;
                switchY ? this.css.view.top = (y - scope.offsetY - this.height) + 'px' : !switchY ? this.css.view.top = y + scope.offsetY + 'px' : 0;
            }
        }
    }
    this.consolePanel = () => {
        let prevMessage;
        if (typeof console != "undefined") {
            if (typeof console.log != 'undefined') {
                console.olog = console.log;
            } else {
                console.olog = () => {};
            }
        }

        console.log = message => {
            console.olog(message);
            if (prevMessage == message) {} else {
                message.toString();
                this.dConsole = document.createElement('pre');
                let dConsoleLog = document.createTextNode(message);
                this.dConsole.classList.add('__viewLog__');
                this.dConsole.append(dConsoleLog);
                this.view.append(this.dConsole);
                this.view.scrollTop = this.view.scrollHeight - this.view.clientHeight;
                prevMessage = message;
            }
        }
        console.warn = console.error = console.info = console.info = console.log;
    }
    this.snapView = e => {
        if (this.snapping && this.snapViewer) {
            this.css.view.left = e.clientX - (this.width / 2) + 'px';
            this.css.view.top = e.clientY - 10 + 'px';
        }
    }
    //init
    this.init();

    (function initConsoleLogDiv() {
        'use strict';
        if (console.log.toDiv) {
            return;
        }

        function toString(x) {
            return typeof x === 'string' ? x : JSON.stringify(x);
        }

        var log = console.log.bind(console);
        var error = console.error.bind(console);
        var warn = console.warn.bind(console);
        var table = console.table ? console.table.bind(console) : null;

        var logTo = (function createLogDiv() {
            var legend = document.createElement('div');
            legend.id = "legend";
            document.getElementById('viewer').appendChild(legend);
            var div = document.createElement('div');
            div.id = 'console-log-text';
            document.getElementById('viewer').appendChild(div);
            return div;
        }());

        function printToDiv() {
            var msg = Array.prototype.slice.call(arguments, 0)
                .map(toString)
                .join(' ');
            var item = document.createElement('div');
            item.textContent = msg;
            logTo.appendChild(item);
        }

        console.log.toDiv = true;

        console.error = function errorWithCopy() {
            error.apply(null, arguments);
            var args = Array.prototype.slice.call(arguments, 0);
            args.unshift('ERROR:');
            printToDiv.apply(null, args);
        };
        console.warn = function logWarning() {
            warn.apply(null, arguments);
            var args = Array.prototype.slice.call(arguments, 0);
            args.unshift('WARNING:');
            printToDiv.apply(null, args);
        };

        function printTable(objArr, keys) {
            var numCols = keys.length;
            var len = objArr.length;
            var $table = document.createElement('table');
            $table.style.width = '100%';
            $table.setAttribute('border', '1');
            var $head = document.createElement('thead');
            var $tdata = document.createElement('td');
            $tdata.innerHTML = 'Index';
            $head.appendChild($tdata);
            for (var k = 0; k < numCols; k++) {
                $tdata = document.createElement('td');
                $tdata.innerHTML = keys[k];
                $head.appendChild($tdata);
            }
            $table.appendChild($head);
            for (var i = 0; i < len; i++) {
                var $line = document.createElement('tr');
                $tdata = document.createElement('td');
                $tdata.innerHTML = i;
                $line.appendChild($tdata);

                for (var j = 0; j < numCols; j++) {
                    $tdata = document.createElement('td');
                    $tdata.innerHTML = objArr[i][keys[j]];
                    $line.appendChild($tdata);
                }
                $table.appendChild($line);
            }
            var div = document.getElementById('console-log-text');
            div.appendChild($table);

        }

        console.table = function logTable() {
            if (typeof table === 'function') {
                table.apply(null, arguments);
            }
            var objArr = arguments[0];
            var keys;
            if (typeof objArr[0] !== 'undefined') {
                keys = Object.keys(objArr[0]);
            }
            printTable(objArr, keys);
        };

        window.addEventListener('error', function (err) {
            printToDiv('EXCEPTION:', err.message + '\n  ' + err.filename, err.lineno + ':' + err.colno);
        });
    }());
    this.domElement.addEventListener('mouseout', () => {
        !this.snapViewer ? this.css.view.display = 'none' : 0
        this.hoverViewer = false;
    }, false);
    this.domElement.addEventListener('mousemove', scope.followView, false);
    window.addEventListener('mousemove', scope.snapView, false);
    window.onmousedown = () => {
        this.snapping = true;
    }
    window.onmouseup = () => {
        this.snapping = false;
    }
    window.onkeydown = e => {
        let key = e.keyCode ? e.which : e.which;
        if (this.snapViewer && key == 83) {
            (key == 83 && !this.snapViewer) ? this.snapViewer = true: (key == 83 && this.snapViewer) ? this.snapViewer = false : 0;
        } else if (this.hoverViewer) {
            key == 83 ? this.snapViewer = true : 0;
        }
    }
}
