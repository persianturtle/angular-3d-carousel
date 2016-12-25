(function() {

  'use strict';

  angular
    .module('app')
    .controller('UiController', UiController);

  UiController.$inject = ['$scope'];

  function UiController($scope) {
    var vm = this;

    vm.sides = {
      all: [],
      current: 0
    };

    for (var i = 0; i < 8; i++) {
      vm.sides.all.push({
        image: 'img/guest.png',
        title: 'Side' + (i + 1),
        listItems: ['Attribute 1', 'Attribute 2', 'Attribute 3']
      });
    }

    vm.controls = {
      increase: increase,
      decrease: decrease
    };

    $scope.$watch('vm.sides.current', function() {
      console.log('Current Index:', vm.sides.current);
    });

    function increase() {
      vm.sides.all.push({
        image: 'img/guest.png',
        title: 'Side' + (vm.sides.all.length + 1),
        listItems: ['Attribute 1', 'Attribute 2', 'Attribute 3']
      });
    }

    function decrease() {
      vm.sides.all.splice(vm.sides.all.length - 1, 1);
    }
  }

})();
