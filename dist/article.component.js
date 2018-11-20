(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "core-js/modules/es6.promise", "regenerator-runtime/runtime", "core-js/modules/es7.symbol.async-iterator", "core-js/modules/es6.symbol", "./data.service.js", "./alert.service.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("core-js/modules/es6.promise"), require("regenerator-runtime/runtime"), require("core-js/modules/es7.symbol.async-iterator"), require("core-js/modules/es6.symbol"), require("./data.service.js"), require("./alert.service.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.es6, global.runtime, global.es7Symbol, global.es6, global.dataService, global.alertService);
    global.articleComponent = mod.exports;
  }
})(this, function (_exports, _es, _runtime, _es7Symbol, _es2, _dataService, _alertService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _dataService = _interopRequireDefault(_dataService);
  _alertService = _interopRequireDefault(_alertService);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _asyncIterator(iterable) { var method; if (typeof Symbol === "function") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

  var ArticleComponent =
  /*#__PURE__*/
  function () {
    function ArticleComponent(datacontainer, alertcontainer, apikey, sourceId) {
      _classCallCheck(this, ArticleComponent);

      this.datacontainer = datacontainer;
      this.alertService = new _alertService.default(alertcontainer);
      this.dataService = new _dataService.default(apikey);
      this.sourceId = sourceId;
      this.loadingMessage = "Loading of the articles...";
      this.exceptionMessage = "Unfortunately, we have gotten an exception during retrieving list of articles :(";
      this.completionMessage = "Loading of the articles has been completed!";
    }

    _createClass(ArticleComponent, [{
      key: "clearContainer",
      value: function clearContainer() {
        var container = document.getElementById(this.datacontainer);

        while (container.hasChildNodes()) {
          container.removeChild(container.firstChild);
        }
      }
    }, {
      key: "loadArticlesAsync",
      value: function () {
        var _loadArticlesAsync = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var cards, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, article, card;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  this.clearContainer();
                  this.alertService.clearContainer();
                  this.alertService.displayLoading(this.loadingMessage);
                  cards = document.createElement("div");
                  cards.classList.add("card-columns");
                  document.getElementById(this.datacontainer).appendChild(cards);
                  _context.prev = 6;
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _context.prev = 9;
                  _iterator = _asyncIterator(this.dataService.getArticlesAsync(this.sourceId));

                case 11:
                  _context.next = 13;
                  return _iterator.next();

                case 13:
                  _step = _context.sent;
                  _iteratorNormalCompletion = _step.done;
                  _context.next = 17;
                  return _step.value;

                case 17:
                  _value = _context.sent;

                  if (_iteratorNormalCompletion) {
                    _context.next = 25;
                    break;
                  }

                  article = _value;
                  card = this.renderArticle(article);
                  cards.appendChild(card);

                case 22:
                  _iteratorNormalCompletion = true;
                  _context.next = 11;
                  break;

                case 25:
                  _context.next = 31;
                  break;

                case 27:
                  _context.prev = 27;
                  _context.t0 = _context["catch"](9);
                  _didIteratorError = true;
                  _iteratorError = _context.t0;

                case 31:
                  _context.prev = 31;
                  _context.prev = 32;

                  if (!(!_iteratorNormalCompletion && _iterator.return != null)) {
                    _context.next = 36;
                    break;
                  }

                  _context.next = 36;
                  return _iterator.return();

                case 36:
                  _context.prev = 36;

                  if (!_didIteratorError) {
                    _context.next = 39;
                    break;
                  }

                  throw _iteratorError;

                case 39:
                  return _context.finish(36);

                case 40:
                  return _context.finish(31);

                case 41:
                  _context.next = 46;
                  break;

                case 43:
                  _context.prev = 43;
                  _context.t1 = _context["catch"](6);
                  this.alertService.displayException(this.exceptionMessage);

                case 46:
                  this.alertService.displayCompletion(this.completionMessage);

                case 47:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[6, 43], [9, 27, 31, 41], [32,, 36, 40]]);
        }));

        return function loadArticlesAsync() {
          return _loadArticlesAsync.apply(this, arguments);
        };
      }() // This should be method of the class
      // eslint-disable-next-line class-methods-use-this

    }, {
      key: "renderArticle",
      value: function renderArticle(article) {
        var string = "\n        <div class=\"card\">\n            ".concat(article.urlToImage ? "<img class=\"card-img-top\" src=\"".concat(article.urlToImage, "\">") : "", "\n            <div class=\"card-body\">\n                <h5 class=\"card-title\">").concat(article.title, "</h5>\n                <p class=\"card-text\">").concat(article.description, "</p>\n            </div>\n            <div class=\"card-footer text-muted text-center\">Published - ").concat(new Date(article.publishedAt).toLocaleString(), "</div>\n        </div>");
        var wrapper = document.createElement("div");
        wrapper.innerHTML = string;
        var card = wrapper.firstElementChild;
        return card;
      }
    }]);

    return ArticleComponent;
  }();

  var _default = ArticleComponent;
  _exports.default = _default;
});