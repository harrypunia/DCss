var DCSS = function (domElement, toggle) {
    this.toggle = toggle;
    domElement == undefined ? this.domElement = document : this.domElement = document.getElementById(domElement);
    this.offsetX = 50;
    this.offsetY = 40;
    this.onElement;
    this.snapViewer = false;
    this.width = 400;
    this.height = 400;
    let scope = this,
        view,
        css;

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
        css.cssText = 'display: none; width: ' + this.width + 'px; height: ' + this.height + 'px; background: rgb(255, 255, 255); border-radius: 5px; box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 50px; padding: 20px; position: absolute; z-index: 99999999;';
    }
    this.updateCss = e => {
        css.display = 'block';
        let x = e.clientX + window.pageXOffset,
            y = e.clientY + window.pageYOffset,
            switchX = e.clientX > (window.innerWidth / 2),
            switchY = e.clientY > (window.innerHeight / 2),
            switchMobile = window.innerWidth < (this.width + this.offsetX) * 2,
            scrollingSnap = {
                sX: x,
                sy: y
            };
        if (switchMobile) {
            css.left = (window.innerWidth / 2) - (this.width / 2) + 'px';
            switchY ? css.top = css.top = y - this.offsetY - this.width + 'px' : !switchY ? css.top = y + this.offsetY + 'px' : 0;
        } else {
            switchX ? css.left = (x - scope.offsetX - this.width) + 'px' : !switchX ? css.left = x + scope.offsetX + 'px' : 0;
            switchY ? css.top = (y - scope.offsetY - this.height) + 'px' : !switchY ? css.top = y + scope.offsetY + 'px' : 0;
        }
    }

    //user Function
    this.view = userView => {
        view = document.getElementById(userView);
        css = view.style;
    }

    this.display();
    this.domElement.addEventListener('mouseout', () => css.display = 'none', false);
    window.onkeydown = e => {
        let key = e.keyCode ? e.which : e.which;
        key == 83 ? this.snapViewer = true : 0;
    };
    this.domElement.addEventListener('scroll', scope.updateCss, false);
    this.domElement.addEventListener('mousemove', scope.updateCss, false);
}
