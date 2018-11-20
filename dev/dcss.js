//author = @harryPunia

var DCSS = function (domElement) {
    domElement == undefined ? this.domElement = document : domElement == document ? this.domElement = document : this.domElement = document.getElementById(domElement);
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
            console.log = message => {
                console.olog(message);
                if (prevMessage == message) {} else {
                    this.dConsole = document.createElement('pre');
                    let dConsoleLog = document.createTextNode(message);
                    this.dConsole.classList.add('__viewLog__');
                    this.dConsole.append(dConsoleLog);
                    this.view.append(this.dConsole);
                    this.view.scrollTop = this.view.scrollHeight - this.view.clientHeight;
                }
                prevMessage = message;
            };
            console.error = console.debug = console.info = console.log;
        }
    }
    this.snapView = e => {
        if (this.snapping && this.snapViewer) {
            this.css.view.left = e.clientX - (this.width / 2) + 'px';
            this.css.view.top = e.clientY - 10 + 'px';
        }
    }

    //init
    this.init();
    //Additional
    this.domElement.addEventListener('mouseout', () => {
        !this.snapViewer ? this.css.view.display = 'none' : 0
        this.hoverViewer = false;
    }, false);
    this.domElement.addEventListener('mousemove', scope.followView, false);
    this.domElement.addEventListener('mousemove', scope.snapView, false);
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
