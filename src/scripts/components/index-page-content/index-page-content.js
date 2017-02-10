(function () {

  'use strict';

  angular
    .module('a11y.components.IndexPageContent', [
      'a11y.models.ModalModel',
      'a11y.models.VeilModel',
      'a11y.resources.Templates'
    ])
    .directive('indexPageContent', Directive);

  function Directive() {
    return {
      restrict: 'E',
      scope: {},
      controller: Controller,
      controllerAs: 'vm',
      templateUrl: '/scripts/components/index-page-content/index-page-content-template.html',
    };
  }

  function Controller($document, ModalModel, VeilModel) {
    // vars
    var _inlineModalButton = null;
    var _modalButton = null;

    // public api
    var vm = this;
    vm.showModal = showModal;

    // auto activation
    activate();

    // methods definitions
    function activate() {
      // dom elements
      _inlineModalButton = document.getElementById('showModalInlineButton');
      _modalButton = document.getElementById('showModalButton');

      // event/signals handlers
      ModalModel.dismissalRequested.add(onDismissalRequested);
      VeilModel.dismissalRequested.add(onDismissalRequested);
    }

    function displayModal() {
      // add class to prevent scrolling
      document.body.classList.add('has-veil');

      VeilModel.requestDisplay();
      ModalModel.requestDisplay();
    }

    function onButtonClicked() {
      ModalModel.triggerElement = _modalButton;
      displayModal();
    }

    function onDismissalRequested() {
      // remove class to allow scrolling
      document.body.classList.remove('has-veil');

      ModalModel.requestDismissal();
      VeilModel.requestDismissal();

      // return focus
      ModalModel.triggerElement.focus();
    }

    function onInlineButtonClicked() {
      ModalModel.triggerElement = _inlineModalButton;
      displayModal();
    }

    function showModal(event) {
      ModalModel.triggerElement = event.target;
      displayModal();
    }
  }
  Controller.$inject = ['$document', 'ModalModel', 'VeilModel'];

})();
