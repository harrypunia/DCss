var DCSS = function (domElement) {
    if (domElement == undefined) {
        this.domElement = document;
    } else {
        this.domElement = document.getElementById(domElement);
    }
    this.display = function (e) {
        let x = e.clientX,
            y = e.clientY;
        console.log(x, y);
    }
    this.gatherInfo = function () {

    }
    this.html = function () {}
    this.css = function () {}

    this.domElement.addEventListener('mousemove', this.display, false);
}
