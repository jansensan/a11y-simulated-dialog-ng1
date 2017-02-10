(function () {

  'use strict';

  angular
    .module('a11y.components.Modal', [
      'a11y.models.ModalModel',
      'a11y.resources.Templates'
    ])
    .directive('modal', Directive);

  function Directive() {
    return {
      restrict: 'E',
      scope: {},
      controller: Controller,
      controllerAs: 'vm',
      templateUrl: '/scripts/components/modal/modal-template.html',
    };
  }

  function Controller($document, $rootScope, ModalModel) {
    // vars
    var _element;
    var _firstElement;
    var _lastElement;
    var _activeElement;

    // public api
    var vm = this;
    vm.isHidden = isHidden;
    vm.dismiss = dismiss;

    // auto activation
    activate();

    // methods definitions
    function activate() {
      // dom elements
      _element = document.getElementById('modal');
      _firstElement = document.getElementById('modalCancelButton');
      _lastElement = document.getElementById('modalCloseButton');
      _activeElement = null;

      // event/signals handlers
      document.addEventListener('keydown', onKeyPressed);
      ModalModel.dismissalRequested.add(onDismissalRequested);
      ModalModel.displayRequested.add(onDisplayRequested);
    }

    function dismiss() {
      ModalModel.requestDismissal();
    }

    function isHidden() {
      return !ModalModel.isVisible;
    }

    function onDismissalRequested() {
      // set aria-hidden for accessibility
      _element.setAttribute('aria-hidden', true);

      // hack
      // changes done only in data-only models (not linked to templates),
      // thus angular is unable to update the display.
      try {
        if (!$rootScope.$$phase) {
          $rootScope.$apply();
        }
      } catch (error) {
        // ignore error:
        // $apply cycle already in progress
      }
    }

    function onDisplayRequested() {
      // set aria-hidden for accessibility
      _element.setAttribute('aria-hidden', false);

      // set focus to modal element
      setFocus(_element);
      updateActiveElement();
    }

    function onKeyPressed(event) {
      // exit if modal not visible
      if (!ModalModel.isVisible) {
        return;
      }

      // exit if not tab
      if (event.keyCode !== 9) {
        return;
      }

      if (!event.shiftKey) {
        // tabbing forwards
        if (_activeElement === _lastElement) {
          event.preventDefault();
          event.stopPropagation();
          setFocus(_element);
        }

      } else {
        // tabbing backwards
        if (_activeElement === _firstElement) {
          event.preventDefault();
          event.stopPropagation();
          setFocus(_element);

        } else if (_activeElement === _element) {
          event.preventDefault();
          event.stopPropagation();
          setFocus(_lastElement);
        }
      }

      updateActiveElement();
    }

    function setFocus(element) {
      // hack:
      // it seems that focus is not applied immediately in the angular context,
      // probably something to do with the apply cycle
      setTimeout(
        function () {
          element.focus()
        },
        1
      );
    }

    function updateActiveElement() {
      // hack:
      // document.activeElement is not set as soon as focus is set,
      // a small delay is required, hence the use of setTimeout.
      setTimeout(
        function () {
          _activeElement = document.activeElement;
        },
        2
      );
    }
  }
  Controller.$inject = ['$document', '$rootScope', 'ModalModel'];

})();
