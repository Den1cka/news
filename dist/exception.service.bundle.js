(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{93:function(n,e,i){var t,a,o;a=[e,i(95)],void 0===(o="function"==typeof(t=function(n,e){"use strict";function a(n,e){for(var i=0;i<e.length;i++){var t=e[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i,t,o,c=function(){function n(){if(function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),n.instance)return n.instance;this.container="exception-container",n.instance=this}return e=n,(i=[{key:"clearContainer",value:function(){for(var n=document.getElementById(this.container);n.hasChildNodes();)n.removeChild(n.firstChild)}},{key:"displayPopup",value:function(n){var e=this,i='\n        <div class="modal">\n            <div class="modal-dialog">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <h5 class="modal-title">Oops! Something went wrong...</h5>\n                        <span id="close" class="close">&times;</span>\n                    </div>\n                    <div class="modal-body">\n                        '.concat(n,"\n                    </div>\n                </div>\n            </div>\n        </div>"),t=document.createElement("div");t.innerHTML=i;var a=t.firstElementChild,o=a.querySelector("#close");o.onclick=function(){return e.clearContainer()},window.onclick=function(n){n.target===a&&e.clearContainer()},document.getElementById(this.container).appendChild(a)}}])&&a(e.prototype,i),t&&a(e,t),n;var e,i,t}();o=void 0,(t="instance")in(i=c)?Object.defineProperty(i,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):i[t]=o;var r=c;n.default=r})?t.apply(e,a):t)||(n.exports=o)},95:function(n,e,i){}}]);