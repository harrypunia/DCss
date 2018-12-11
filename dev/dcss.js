//author = @harryPunia
var DCSS = function (domElement) {
    domElement == undefined ? this.domElement = window : domElement == document ? this.domElement = document : this.domElement = document.getElementById(domElement);
    this.offsetX = 20;
    this.offsetY = 20;
    this.snapStatus = false;
    this.minimizeViewer = false;
    this.width = 400;
    this.height = 400;
    this.view;
    this.console;
    this.html = '<div id="dcssView__console"></div>';
    this.css = {};
    let scope = this,
        logRepeat = 0;
    var toString = x => typeof x === 'string' ? x : JSON.stringify(x);
    this.init = () => {
        this.initHTML();
        this.initCss();
        this.initConsole();
    }
    this.initCss = () => {
        'use strict'
        this.css.view.cssText = 'display: none; width: ' + this.width + 'px; height: ' + this.height + 'px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 50px; position: fixed; z-index: 99999999; overflow: hidden; left: 0x; top: 0px; transition: transform .2s, background .2s, border-radius .2s';
        this.css.head.cssText = 'position: fixed; width:' + this.width + 'px; text-align: center; height: 40px; line-height: 40px; background: #333; border-bottom: 5px solid #f86666; color: white;';
        this.css.dcssConsole.cssText = 'margin-left: 25px; margin-top: 50px; height: ' + (this.height - 75) + 'px; width: 350px; overflow: scroll'
    }
    this.initHTML = () => {
        'use strict'
        this.view = document.createElement('div');
        this.view.id = 'dcssView';
        document.body.appendChild(this.view);
        this.view.innerHTML = this.html;
        this.css.view = this.view.style;
        this.head = document.createElement('div');
        this.head.id = 'dcssHead';
        this.head.innerHTML = '<p>Console</p>'
        this.view.insertBefore(this.head, this.view.firstChild);
        this.css.head = this.head.style;
        this.console = document.getElementById('dcssView__console');
        this.css.dcssConsole = this.console.style;
    }
    this.followView = e => {
        'use strict'
        this.css.view.display = 'block';
        let x = e.clientX,
            y = e.clientY;
        if (this.snapStatus == false || this.minimizeViewer) {
            let switchX = e.clientX > (window.innerWidth / 2),
                switchY = e.clientY > (window.innerHeight / 2),
                switchMobile = window.innerWidth < (this.width + this.offsetX) * 2;
            if (switchMobile) {
                this.css.view.left = (window.innerWidth / 2) - (this.width / 2) + 'px';
                switchY ? this.css.view.top = this.css.view.top = y - this.offsetY - this.width + 'px' : !switchY ? this.css.view.top = y + this.offsetY + 'px' : 0;
            } else {
                if (switchX) {
                    this.css.view.left = (x - scope.offsetX - this.width) + 'px';
                } else if (!switchX) {
                    this.css.view.left = x + scope.offsetX + 'px';
                }
                if (switchY) {
                    this.css.view.top = (y - scope.offsetY - this.height) + 'px';
                    switchX ? this.css.view.transformOrigin = '100% 100%' : this.css.view.transformOrigin = '0 100%';
                } else if (!switchY) {
                    this.css.view.top = y + scope.offsetY + 'px';
                    switchX ? this.css.view.transformOrigin = '100% 0' : this.css.view.transformOrigin = '0 0';
                }
            }
        } else if (this.snapStatus && !this.minimizeViewer) {
            console.log('snapping');
        }
    }
    this.initConsole = () => {
        'use strict'
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
            if (prevMessage == message) {
                let prevLog = this.console.lastChild,
                    times = document.createTextNode(logRepeat);
            } else {
                message.toString();
                let log = document.createElement('div'),
                    logMessage = document.createTextNode(message);
                //log.style.borderBottom = '1px solid #efefef';
                log.style.cssText = 'border-bottom: 1px solid #efefef';
                log.append(logMessage);
                this.console.append(log);
                //dcss__console.firstChild.style.marginTop = '75px';
                this.console.scrollTop = this.console.scrollHeight - this.console.clientHeight;
                prevMessage = message;
            }
        }
        console.warn = console.error = console.info = console.info = console.log;
    }
    this.snap = (x, y) => {
        'use strict'
        y == undefined ? y = x : 0;
        this.snapStatus = true;
        this.css.view.left = x + 'vw';
        this.css.view.top = y + 'vh';
    }
    this.minimize = () => {
        'use strict'
        if (this.minimizeViewer == true) {
            this.css.view.transform = 'scale3d(.05, .05, 1)';
            this.css.view.background = 'red';
            this.css.view.borderRadius = '50%';
        } else {
            this.css.view.transform = 'scale3d(1, 1, 1)';
            this.css.view.background = 'white';
            this.css.view.borderRadius = '0px';
        }
    }
    this.init();
    (function mapConsole() {
        'use strict';

        let log = console.log.bind(console),
            error = console.error.bind(console),
            warn = console.warn.bind(console),
            table = console.table ? console.table.bind(console) : null;

        //        var logTo = (function createLogDiv() {
        //            let div = document.createElement('div');
        //            div.id = 'console-log-text';
        //            scope.view.appendChild(div);
        //            return div;
        //        }());

        function printToDiv() {
            let msg = Array.prototype.slice.call(arguments, 0)
                .map(toString)
                .join(' '),
                item = document.createElement('div');
            item.textContent = msg;
            logTo.appendChild(item);
        }
        //        console.error = function errorWithCopy() {
        //            error.apply(null, arguments);
        //            var args = Array.prototype.slice.call(arguments, 0);
        //            args.unshift('ERROR:');
        //            printToDiv.apply(null, args);
        //        };
        //        console.warn = function logWarning() {
        //            warn.apply(null, arguments);
        //            var args = Array.prototype.slice.call(arguments, 0);
        //            args.unshift('WARNING:');
        //            printToDiv.apply(null, args);
        //        };
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
        window.addEventListener('error', err => {
            printToDiv('EXCEPTION:', err.message + '\n  ' + err.filename, err.lineno + ':' + err.colno);
        });
    }());
    //-----------------------------------------------------------------
    //-----------------------------------------------------------------
    this.domElement.addEventListener('mouseout', () => {
        !this.snapStatus ? this.css.view.display = 'none' : 0
    }, false);
    this.domElement.addEventListener('mousemove', scope.followView, false);
    window.onkeydown = e => {
        console.log('test');
        let key = e.keyCode ? e.which : e.which;
        if (key == 77 && this.snapStatus == false) {
            this.minimizeViewer == false ? this.minimizeViewer = true : this.minimizeViewer = false;
            this.minimize();
        }
    }
}
