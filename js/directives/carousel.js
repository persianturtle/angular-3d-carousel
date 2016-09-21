(function() {

  'use strict';

  angular
    .module('app')
    .directive('carousel', carousel);

  function carousel() {
    return {
      restrict: 'E',
      template: '<div id="carousel"><figure ng-repeat="side in sides track by $index"><img ng-src="{{ side.image }}"><div><h1>{{ side.title }}</h1><hr><ul><li ng-repeat="li in side.listItems track by $index">{{ li }}</li></ul><br><button ng-click="play(current);" ng-show="current === $index">GET STARTED</button></div></figure></div>',
      link: function(scope, element, attributes) {
        scope.sides = [
          {
            image: 'img/guest.png',
            title: 'Frank1',
            listItems: ['Male', '21 years old', 'test']
          },
          {
            image: 'img/guest.png',
            title: 'Frank2',
            listItems: ['Male', '21 years old', 'test']
          },
          {
            image: 'img/guest.png',
            title: 'Frank3',
            listItems: ['Male', '21 years old', 'test']
          },
          {
            image: 'img/guest.png',
            title: 'Frank4',
            listItems: ['Male', '21 years old', 'test']
          },
          {
            image: 'img/guest.png',
            title: 'Frank5',
            listItems: ['Male', '21 years old', 'test']
          },
          {
            image: 'img/guest.png',
            title: 'Frank6',
            listItems: ['Male', '21 years old', 'test']
          }
        ];

        scope.play = play;

        var carousel = element[0].querySelector('#carousel');

        /**
         * i: initial
         * f: final
         * c: current
         * p: previous
         */

        /**
         * Position of user's action
         */
        var position = {
          i: null,
          f: null,
          c: null,
          p: null
        };

        /**
         * Time of user's action
         */
        var time = {
          i: null,
          f: null,
          c: null,
          p: null
        };

        /**
         * Rotation of carousel
         */
        var rotation = {
          i: 0,
          c: 0,
          p: 0
        };

        var properties = {
          positions: [],
          velocities: [],
          angularVelocity: null
        };

        var calculate = {
          angularVelocity: angularVelocity
        };

        var isMouseDown = false;

        var requestID;

        var container = document.getElementById('container');

        container.addEventListener('mousedown', onStart);
        container.addEventListener('mousemove', onMove);
        container.addEventListener('mouseup', onEnd);

        container.addEventListener('touchstart', onStart);
        container.addEventListener('touchmove', onMove);
        container.addEventListener('touchend', onEnd);

        function onStart(e) {
          reset();

          isMouseDown = true;

          position.c = typeof e.clientX === 'undefined' ? e.touches[0].clientX : e.clientX;
          position.p = position.c;
          time.i = performance.now();

        }

        function onMove(e) {
          e.preventDefault();

          if (isMouseDown) {

            if (time.c === null) {
                time.c = performance.now();
                position.c = (typeof e.clientX === 'undefined' ? e.touches[0].clientX : e.clientX) / 2;
                return;
            }

            var now = performance.now();
            var dt =  now - time.c;
            var dx = (typeof e.clientX === 'undefined' ? e.touches[0].clientX - position.c : e.clientX - position.c) / 2;
            properties.velocities.push(dx / dt * 100);

            time.c = now;
            position.c = (typeof e.clientX === 'undefined' ? e.touches[0].clientX : e.clientX) / 2;

            carousel.removeAttribute('style');

            position.c = typeof e.clientX === 'undefined' ? e.touches[0].clientX : e.clientX;
            rotation.c -= ((position.p - position.c) / 12);
            position.p = position.c;

            var css = 'transform: translate3d(0, 0, -43.30127vw) rotateY(' + rotation.c + 'deg);';

            carousel.setAttribute(
              'style', css
            );
          }
        }

        function onEnd(e) {
          isMouseDown = false;

          position.f = (typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX) / 2;

          time.f = performance.now();

          calculate.angularVelocity();
        }

        function angularVelocity() {
          if (properties.velocities.length < 3) {
            return;
          }

          removeValueFromArray(properties.velocities, 0);

          var tail = properties.velocities.slice(properties.velocities.length - 3);
          properties.angularVelocity = tail.reduce(add, 0) / tail.length;

          if (properties.angularVelocity > 500) {
            properties.angularVelocity = 500;
          }

          if (properties.angularVelocity < -500) {
            properties.angularVelocity = -500;
          }

          predict();
        }

        function predict() {
          if (properties.angularVelocity < 0) {
            predict.iterations = Math.floor(properties.angularVelocity);
          } else {
            predict.iterations = Math.ceil(properties.angularVelocity);
          }

          predict.angularVelocity = properties.angularVelocity;
          predict.rotation = rotation.c;

          for (var i = Math.abs(predict.iterations); i > 0; i--) {
            if (properties.angularVelocity < 0) {
              predict.rotation += ((predict.angularVelocity + i) / 60);
            } else {
              predict.rotation += ((predict.angularVelocity - i) / 60);
            }
          }

          predict.rounded = Math.round(predict.rotation / 60) * 60;
          predict.offset = (predict.rotation - predict.rounded) / predict.iterations;

          requestAnimationFrame(assignVelocity);
        }

        function friction() {
          if (Math.abs(properties.angularVelocity) > 1) {
            if (properties.angularVelocity < 0) {
              properties.angularVelocity++;
            } else {
              properties.angularVelocity--;
            }
          } else {
            properties.angularVelocity = 0;
            cancelAnimationFrame(requestID);

            var numberOfSides = 6;    
            var currentSide;

            if (rotation.c < 0) {
              currentSide = (Math.round(Math.abs(rotation.c)) / (360 / numberOfSides)) % numberOfSides;
            } else {
              currentSide = (numberOfSides - ((Math.round(rotation.c) / (360 / numberOfSides))) % numberOfSides) % numberOfSides;
            }

            scope.$apply(function() {
              scope.current = currentSide;
            });

            scope.$broadcast('start', scope.sides[currentSide].title);
          }

          return properties.angularVelocity / 60;
        }

        function assignVelocity() {
          requestID = requestAnimationFrame(assignVelocity);

          carousel.removeAttribute('style');

          if (properties.angularVelocity < 0) {
            rotation.c += predict.offset;
          } else {
            rotation.c -= predict.offset;
          }

          rotation.c += friction();

          var css = 'transform: translate3d(0, 0, -43.30127vw) rotateY(' + rotation.c + 'deg);';

          carousel.setAttribute(
            'style', css
          );
        }

        function reset() {
          cancelAnimationFrame(requestID);
          properties.velocities = [];

          position = {
            i: null,
            f: null,
            c: null,
            p: null
          };

          time = {
            i: performance.now(),
            f: null,
            c: null,
            p: null
          };

          rotation.i = rotation.c;
          rotation.p = rotation.c;
          rotation.c = rotation.c;
        }

        function removeValueFromArray(array, value) {
          array.forEach(function(v, i) {
            if (v === value) {
              array.splice(i, 1);
              removeValueFromArray(array, value);
            }
          });
        }

        function add(a, b) {
          return a + b;
        }

        function play(index) {
          scope.$broadcast('play', index);
        }
      }
    };
  }
})();
