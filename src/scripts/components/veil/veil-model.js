(function () {

  'use strict';

  angular
    .module('a11y.models.VeilModel', [])
    .factory('VeilModel', VeilModel);

  function VeilModel() {
    var _model = {
      // properties
      isVisible: false,

      // signals
      // (should be used as read-only)
      dismissalRequested: new signals.Signal(),
      displayRequested: new signals.Signal(),

      // methods
      requestDismissal: requestDismissal,
      requestDisplay: requestDisplay
    };
    return _model;

    // methods definitions
    function requestDismissal() {
      if (!_model.isVisible) {
        return;
      }

      _model.isVisible = false;
      _model.dismissalRequested.dispatch();
    }

    function requestDisplay() {
      if (_model.isVisible) {
        return;
      }

      _model.isVisible = true;
      _model.displayRequested.dispatch();
    }
  }

})();
