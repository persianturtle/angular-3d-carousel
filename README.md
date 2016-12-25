# Angular 3D Carousel

Angular is the only dependency (no jQuery).

## Example

Check out the [live demo](https://persianturtle.github.io/angular-3d-carousel/) or the [source code](https://github.com/persianturtle/angular-3d-carousel/blob/master/index.html).

## Usage

Include both the CSS and the JS files,
```html
<link rel="stylesheet" href="path/to/angular-3d-carousel.css">
```

```html
<script src="path/to/angular-3d-carousel.js"></script>
```

and add the `angular-3d-carousel` as a dependency.

```js
angular.module('app', ['angular-3d-carousel']);
```

Then use the `<carousel sides="vm.sides.all" current="vm.sides.current"></carousel>` directive where you would like to use it.

Note: The `sides` attribute expects an array of objects. Currently, the each object should have the following properties:
  - image (path to image)
  - title (string)
  - listItems (array of strings)

Change the template for your project's needs.

## Features
  - Will always land exactly on one side.
  - Uses `requestAnimationFrame` for a smooth animation.
  - Dynamically add or remove sides.

## TODO
  - Add unit tests.
  - Add an API for accelerating and decelerating the carousel.
  - Add keyboard events.

## License

Copyright (c) 2016 Raphael Rafatpanah

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.