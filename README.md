# DCSS
A JS Library that makes debugging CSS and JavaScript easier.

### Functionality
The library brings your console into your webpage. It creates a temporary html wrapper that follows your cursor, so you can preview all your logs as you navigate across the webpage.

### Usage
> Download the minified version of the library from the dist folder named **dcss.min.js** and include it in your HTML file.

```html
<script src="js/dcss.min.js"></script>
```
> Now create an instance of the class DCSS as follows

```javascript
var dcss = new DCSS();
```

# Documentation

```Javascript
  * var dcss = new DCSS('id'); //Add name of the id as a string to limit dcss to a specific dom element.
  //Default passes the entire html document
  
  * dcss.snap(x, y); //Turns of following mode, and snaps the dcss viewer on the page at specified cordinates x and y
  //Also takes in one parameter as dcss.snap(x) which dictates x and y as the same value.
  
  * dcss.setTheme('red'); //Change colour palette of the dcss viewer. The function expects a string. List of themes:
  //'red', 'dark'
  //Default theme is 'red'
```
