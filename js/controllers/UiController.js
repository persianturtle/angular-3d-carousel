(function() {

  'use strict';

  angular
    .module('app')
    .controller('UiController', UiController);

  UiController.$inject = ['$scope'];

  function UiController($scope) {
    var vm = this;

    vm.sides = [];

    for (var i = 0; i < 8; i++) {
      vm.sides.push({
        image: 'img/guest.png',
        title: 'Side' + (i + 1),
        listItems: ['Attribute 1', 'Attribute 2', 'Attribute 3']
      });
    }

    vm.controls = {
      increase: increase,
      decrease: decrease
    };

    function increase() {
      vm.sides.push({
        image: 'img/guest.png',
        title: 'Side' + (vm.sides.length + 1),
        listItems: ['Attribute 1', 'Attribute 2', 'Attribute 3']
      });
    }

    function decrease() {
      vm.sides.splice(vm.sides.length - 1, 1);
    }
  }

})();
