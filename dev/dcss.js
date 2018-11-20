var DCSS = function (domElement) {
    domElement == undefined || null || window || document ? this.domElement = document : this.domElement = document.getElementById(domElement);
    this.offsetX = 50;
    this.offsetY = 40;
    this.snapViewer = false;
    this.width = 400;
    this.height = 400;
    let scope = this,
        view,
        css;

    this.display = () => {
        this.html();
        this.consolePanel();
    }
    this.consolePanel = () => {
        if (typeof console != "undefined") {
            if (typeof console.log != 'undefined') {
                console.olog = console.log;
            } else {
                console.olog = function () {};
            }
            console.log = function (message) {
                console.olog(message);
                $(view).append('<div class="consoleLog">' + message + '</div>');
            };
            console.error = console.debug = console.info = console.log
        }
    }
    this.html = function () {
        view = document.createElement('div');
        document.body.appendChild(view);
        css = view.style;
        this.initCss();
    }
    this.initCss = () => {
        css.cssText = 'display: none; width: ' + this.width + 'px; height: ' + this.height + 'px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 50px; padding: 20px; position: fixed; z-index: 99999999; overflow: scroll;';
    }
    this.updateCss = e => {
        css.display = 'block';
        let x = e.clientX,
            y = e.clientY;
        console.log(this.snapViewer);

        if (!this.snapViewer) {
            let switchX = e.clientX > (window.innerWidth / 2),
                switchY = e.clientY > (window.innerHeight / 2),
                switchMobile = window.innerWidth < (this.width + this.offsetX) * 2;

            if (switchMobile) {
                css.left = (window.innerWidth / 2) - (this.width / 2) + 'px';
                switchY ? css.top = css.top = y - this.offsetY - this.width + 'px' : !switchY ? css.top = y + this.offsetY + 'px' : 0;
            } else {
                switchX ? css.left = (x - scope.offsetX - this.width) + 'px' : !switchX ? css.left = x + scope.offsetX + 'px' : 0;
                switchY ? css.top = (y - scope.offsetY - this.height) + 'px' : !switchY ? css.top = y + scope.offsetY + 'px' : 0;
            }
        } else {}
    }

    //user Function
    this.view = userView => {
        view = document.getElementById(userView);
        css = view.style;
    }

    this.display();
    this.domElement.addEventListener('mouseout', () => {
        !this.snapViewer ? css.display = 'none' : 0
    }, false);
    window.onkeydown = e => {
        let key = e.keyCode ? e.which : e.which;
        (key == 83 && !this.snapViewer) ? this.snapViewer = true: (key == 83 && this.snapViewer) ? this.snapViewer = false : 0;
    };
    this.domElement.addEventListener('mousemove', scope.updateCss, false);
}
