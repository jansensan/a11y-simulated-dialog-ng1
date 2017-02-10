(function () {

  'use strict';

  angular
    .module('a11y.components.Veil', [
      'a11y.models.VeilModel',
      'a11y.resources.Templates'
    ])
    .directive('veil', Directive);

  function Directive() {
    return {
      restrict: 'E',
      scope: {},
      controller: Controller,
      controllerAs: 'vm',
      templateUrl: '/scripts/components/veil/veil-template.html',
    };
  }

  function Controller(VeilModel) {
    // public api
    var vm = this;
    vm.isHidden = isHidden;
    vm.dismiss = dismiss;

    // auto activation
    activate();

    // methods definitions
    function activate() {
      // event/signals handlers
      document.addEventListener('keydown', onKeyPressed);
    }

    function dismiss() {
      VeilModel.requestDismissal();
    }

    function isHidden() {
      return !VeilModel.isVisible;
    }

    function onKeyPressed(event) {
      // exit if veil not visible
      if (!VeilModel.isVisible) {
        return;
      }

      // exit if not esc
      if (event.keyCode !== 27) {
        return;
      }

      VeilModel.requestDismissal();
    }
  }
  Controller.$inject = ['VeilModel'];

})();
