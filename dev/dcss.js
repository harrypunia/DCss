var DCSS = function (domElement) {
    //Constructors
    this.offsetX = 50;
    this.offsetY = 20;
    this.onElement;
    domElement == undefined ? this.domElement = document : this.domElement = document.getElementById(domElement);
    let scope = this,
        view,
        css;

    //Methods
    this.display = () => {
        this.information();
        this.html();
    }
    this.information = () => {

    }
    this.html = function () {
        view = document.createElement('div');
        let test = document.createTextNode('Im a DCSS viewer');
        view.appendChild(test);
        document.body.appendChild(view);
        css = view.style;
        this.initCss();
    }
    this.initCss = () => {
        css.top = '0px';
        css.left = '0px';
        css.cssText = 'width: 500px; height: 700px; background: rgb(239, 239, 239); border-radius: 5px; box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 50px; padding: 20px; position: absolute; z-index: 99999999;';
    }
    this.updateCss = e => {
        let x = e.clientX,
            y = e.clientY,
            switchX = x > (window.innerWidth / 2),
            switchY = y > (window.innerHeight / 2),
            scrollingSnap = {
                sX: x,
                sy: y
            };
        if (switchX) {
            css.left = (x - scope.offsetX + window.pageXOffset - parseInt(css.width)) + 'px';
        } else if (!switchX) {
            css.left = x + scope.offsetX + window.pageXOffset + 'px';
        }
        if (switchY) {
            css.top = (y - scope.offsetY + window.pageYOffset - parseInt(css.height)) + 'px';
        } else if (!switchY) {
            css.top = y + scope.offsetY + window.pageYOffset + 'px';
        }
    }
    this.hideView = () => {
        css.top = '-100vh';
        css.left = '-100vw';
    }
    this.showView = () => {}

    this.holdView = () => {
        let snapX = css.left,
            snapY = css.top;
        css.left = snapX + 'px !important';
        css.top = snapX + 'px !important';
    }

    //user Function
    this.view = userView => {
        //Work on this
        view = document.getElementById(userView);
        css = view.style;
    }

    this.display();
    this.domElement.addEventListener('mouseout', scope.hideView, false);
    this.domElement.addEventListener('mouseover', scope.showView, false);
    window.onkeydown = e => {
        let key = e.keyCode ? e.which : e.which;
        console.log(key);
    };
    this.domElement.addEventListener('scroll', scope.updateCss, false);
    this.domElement.addEventListener('mousemove', scope.updateCss, false);
}
