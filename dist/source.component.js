(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "core-js/modules/es6.function.name", "core-js/modules/es7.symbol.async-iterator", "core-js/modules/es6.symbol", "core-js/modules/web.dom.iterable", "core-js/modules/es7.promise.finally", "./data.service.js", "./alert.service.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("core-js/modules/es6.function.name"), require("core-js/modules/es7.symbol.async-iterator"), require("core-js/modules/es6.symbol"), require("core-js/modules/web.dom.iterable"), require("core-js/modules/es7.promise.finally"), require("./data.service.js"), require("./alert.service.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.es6Function, global.es7Symbol, global.es6, global.webDom, global.es7Promise, global.dataService, global.alertService);
    global.sourceComponent = mod.exports;
  }
})(this, function (_exports, _es6Function, _es7Symbol, _es, _webDom, _es7Promise, _dataService, _alertService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _dataService = _interopRequireDefault(_dataService);
  _alertService = _interopRequireDefault(_alertService);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var SourceComponent =
  /*#__PURE__*/
  function () {
    function SourceComponent(datacontainer, alertcontainer, apikey) {
      _classCallCheck(this, SourceComponent);

      this.datacontainer = datacontainer;
      this.alertService = new _alertService.default(alertcontainer);
      this.dataService = new _dataService.default(apikey);
      this.loadingMessage = "Loading of the sources...";
      this.exceptionMessage = "Unfortunately, we have gotten an exception during retrieving list of sources :(";
      this.completionMessage = "Loading of the sourses has been completed!";
    }

    _createClass(SourceComponent, [{
      key: "clearContainer",
      value: function clearContainer() {
        var container = document.getElementById(this.datacontainer);

        while (container.hasChildNodes()) {
          container.removeChild(container.firstChild);
        }
      }
    }, {
      key: "loadSources",
      value: function loadSources() {
        var _this = this;

        this.clearContainer();
        this.alertService.clearContainer();
        this.alertService.displayLoading(this.loadingMessage);
        this.dataService.getSources().then(function (sources) {
          _this.displaySources(sources);
        }).catch(function () {
          _this.alertService.displayException(_this.exceptionMessage);
        }).finally(function () {
          _this.alertService.displayCompletion(_this.completionMessage);
        });
      }
    }, {
      key: "displaySources",
      value: function displaySources(sources) {
        var cards = document.createElement("div");
        cards.classList.add("card-columns");
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var source = _step.value;
            var card = this.renderSource(source);
            cards.appendChild(card);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        document.getElementById(this.datacontainer).appendChild(cards);
      }
    }, {
      key: "renderSource",
      value: function renderSource(source) {
        var _this2 = this;

        var string = "\n            <div class=\"card\">\n                <div class=\"card-body\">\n                    <h5 class=\"card-title\">".concat(source.name, "</h5>\n                    <p class=\"card-text\">").concat(source.description, "</p>\n                    <a id=\"").concat(source.id, "\" class=\"btn btn-primary\" href=\"#\">See more..</a>\n                </div>\n            </div>");
        var wrapper = document.createElement("div");
        wrapper.innerHTML = string;
        var card = wrapper.firstElementChild;

        if (this.onClick) {
          card.querySelector("#".concat(source.id)).onclick = function () {
            return _this2.onClick(source);
          };
        }

        return card;
      }
    }]);

    return SourceComponent;
  }();

  var _default = SourceComponent;
  _exports.default = _default;
});