var DCSS = function (domElement) {
    //Constructors
    if (domElement == undefined) {
        this.domElement = document;
    } else {
        this.domElement = document.getElementById(domElement);
    }
    this.offsetX = 50;
    this.offsetY = 20;
    let scope = this,
        view,
        css;

    //Methods
    this.display = function () {
        this.information();
        this.html();
    }
    this.information = function () {

    }
    this.html = function () {
        view = document.createElement('div');
        let test = document.createTextNode('Im a DCSS viewer');
        view.appendChild(test);
        document.body.appendChild(view);
        css = view.style;
        this.initCss();
    }
    this.initCss = function () {
        css.width = '20px';
        css.height = '10px';
        css.top = '0px';
        css.left = '0px';
        css.cssText = 'width: 20px; height: 10px; transition: width 0.15s, height 0.15s; background: rgb(239, 239, 239); border-radius: 5px; box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 50px; padding: 20px; position: absolute; z-index: 99999999;';
    }
    this.updateCss = function (e) {
        let x = e.clientX,
            y = e.clientY,
            switchX = x > (window.innerWidth / 2),
            switchY = y > (window.innerHeight / 2);

        if (switchX == true) {
            css.left = (x - scope.offsetX - parseInt(css.width)) + 'px';
        } else if (switchX == false) {
            css.left = x + scope.offsetX + 'px';
        }
        if (switchY == true) {
            css.top = (y - scope.offsetY - parseInt(css.height)) + 'px';
        } else if (switchY == false) {
            css.top = y + scope.offsetY + 'px';
        }
        console.log(css.top + scope.offsetY);
    }
    this.hideView = function () {
        css.width = '20px';
        css.height = '10px';
        css.top = '-100vh';
        css.left = '-100vw';
        css.transition = 'width .3s, height .3s';
    }
    this.showView = function () {
        css.width = '500px';
        css.height = '700px';
        css.transition = 'width .3s, height .3s';
    }

    this.holdView = function () {
        let snapX = css.left,
            snapY = css.top;
        css.left = snapX + 'px !important';
        css.top = snapX + 'px !important';
    }

    //user Function
    this.view = function (userView) {
        view = document.getElementById(userView);
        css = view.style;
    }

    this.display();
    this.domElement.addEventListener('mouseout', scope.hideView, false);
    this.domElement.addEventListener('mouseover', scope.showView, false);
    this.domElement.addEventListener('keydown', e => {
        let key = e.code || e.which;
        console.log(e);
    })
    this.domElement.addEventListener('mousemove', scope.updateCss, false);
}
