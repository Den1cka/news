(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./source.component.js", "./article.component.js", "./config.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("./source.component.js"), require("./article.component.js"), require("./config.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.sourceComponent, global.articleComponent, global.config);
    global.index = mod.exports;
  }
})(this, function (_sourceComponent, _articleComponent, _config) {
  "use strict";

  _sourceComponent = _interopRequireDefault(_sourceComponent);
  _articleComponent = _interopRequireDefault(_articleComponent);
  _config = _interopRequireDefault(_config);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var apikey = _config.default.apikey;

  function loadArticle(sourceId) {
    var article = new _articleComponent.default("data-container", "alert-container", apikey, sourceId);
    article.loadArticlesAsync();
  }

  function loadSource() {
    var source = new _sourceComponent.default("data-container", "alert-container", apikey);

    source.onClick = function (item) {
      loadArticle(item.id);
    };

    source.loadSources();
  }

  var body = document.getElementById("body");

  body.onload = function () {
    loadSource();
  };

  var home = document.getElementById("home");

  home.onclick = function () {
    loadSource();
  };
});