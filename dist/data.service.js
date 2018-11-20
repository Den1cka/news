(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "core-js/modules/web.dom.iterable", "regenerator-runtime/runtime", "core-js/modules/es7.symbol.async-iterator", "core-js/modules/es6.symbol", "core-js/modules/es6.promise"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("core-js/modules/web.dom.iterable"), require("regenerator-runtime/runtime"), require("core-js/modules/es7.symbol.async-iterator"), require("core-js/modules/es6.symbol"), require("core-js/modules/es6.promise"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.webDom, global.runtime, global.es7Symbol, global.es6, global.es6);
    global.dataService = mod.exports;
  }
})(this, function (_exports, _webDom, _runtime, _es7Symbol, _es, _es2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

  function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

  function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

  function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume("next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } }

  if (typeof Symbol === "function" && Symbol.asyncIterator) { _AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; }

  _AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

  _AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };

  _AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };

  function _AwaitValue(value) { this.wrapped = value; }

  var DataService =
  /*#__PURE__*/
  function () {
    function DataService(apikey) {
      _classCallCheck(this, DataService);

      this.apikey = apikey;
    }

    _createClass(DataService, [{
      key: "getSources",
      value: function getSources() {
        var url = "https://newsapi.org/v2/sources?apiKey=".concat(this.apikey);
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (_ref) {
          var sources = _ref.sources;
          return sources;
        });
      }
    }, {
      key: "getArticlesAsync",
      value: function getArticlesAsync(sourceId) {
        var _this = this;

        return _wrapAsyncGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var i, url, response, json, _json$articles, article;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  i = 1;

                case 1:
                  if (!(i <= 10)) {
                    _context.next = 15;
                    break;
                  }

                  url = "https://newsapi.org/v2/everything?sources=".concat(sourceId, "&apiKey=").concat(_this.apikey, "&pageSize=1&page=").concat(i); // eslint-disable-next-line no-await-in-loop

                  _context.next = 5;
                  return _awaitAsyncGenerator(fetch(url));

                case 5:
                  response = _context.sent;
                  _context.next = 8;
                  return _awaitAsyncGenerator(response.json());

                case 8:
                  json = _context.sent;
                  _json$articles = _slicedToArray(json.articles, 1), article = _json$articles[0];
                  _context.next = 12;
                  return article;

                case 12:
                  i += 1;
                  _context.next = 1;
                  break;

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }))();
      }
    }]);

    return DataService;
  }();

  var _default = DataService;
  _exports.default = _default;
});