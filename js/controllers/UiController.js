(function() {

  'use strict';

  angular
    .module('app')
    .controller('UiController', UiController);

  UiController.$inject = ['$scope'];

  function UiController($scope) {
    var vm = this;

    vm.patient = {
      neededDose: 35,
      currentDose: 0
    };

    vm.message = 'Using as few as possible, drag and drop the dose strengths into the empty boxes to achieve the patient\'s dose.';

    window.allowDrop = allowDrop;
    window.drag = drag;
    window.drop = drop;
    window.remove = remove;

    $scope.$on('start', function(event, title) {
      vm.start = true;
      vm.title = title;
      $scope.$apply();
    });

    $scope.$on('play', function(event, index) {
      vm.play = true;
    });

    function allowDrop(e) {
      e.preventDefault();
    }

    function drag(e) {
      e.dataTransfer.setData('text', e.target.id);
    }

    function drop(e) {
      e.preventDefault();
      var data = e.dataTransfer.getData('text');
      e.target.appendChild(document.getElementById(data));

      console.log(e.target);

      addDose(data.replace('dose', ''));
    }

    function remove(e) {
      e.preventDefault();
      var data = e.dataTransfer.getData('text');
      e.target.appendChild(document.getElementById(data));

      subtractDose(data.replace('dose', ''));
    }

    function addDose(dose) {
      $scope.$apply(function() {
        vm.patient.currentDose += Number(dose);
      });
    }

    function subtractDose(dose) {
      $scope.$apply(function() {
        vm.patient.currentDose -= Number(dose);
      });
    }

    $scope.$watch('vm.patient.currentDose', function(newVal) {
      if (newVal) {
        if (vm.patient.currentDose > vm.patient.neededDose) {
          vm.message = 'You went over the required dose! Give it another try.';
          vm.error = true;
          return;
        }

        if (vm.patient.currentDose < vm.patient.neededDose) {
          vm.message = 'You are under the required dose! Give it another try.';
          vm.error = true;
          return;
        }

        vm.error = false;
        vm.message = 'Congrats!!!';

      }
    })
  }

})();
