(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.alertService = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var AlertService =
  /*#__PURE__*/
  function () {
    function AlertService(container) {
      _classCallCheck(this, AlertService);

      this.container = container;
    }

    _createClass(AlertService, [{
      key: "clearContainer",
      value: function clearContainer() {
        var container = document.getElementById(this.container);

        while (container.hasChildNodes()) {
          container.removeChild(container.firstChild);
        }
      }
    }, {
      key: "displayLoading",
      value: function displayLoading(loadingMessage) {
        var alert = "\n            <div class='alert alert-primary'>\n                ".concat(loadingMessage, "\n            </div>");
        document.getElementById(this.container).innerHTML += alert;
      }
    }, {
      key: "displayException",
      value: function displayException(exceptionMessage) {
        var alert = "\n            <div class='alert alert-danger'>\n                ".concat(exceptionMessage, "\n            </div>");
        document.getElementById(this.container).innerHTML += alert;
      }
    }, {
      key: "displayCompletion",
      value: function displayCompletion(completionMessage) {
        var alert = "\n            <div class='alert alert-success'>\n                ".concat(completionMessage, "\n            </div>");
        document.getElementById(this.container).innerHTML += alert;
      }
    }]);

    return AlertService;
  }();

  var _default = AlertService;
  _exports.default = _default;
});