(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jotai-zustand')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jotai-zustand'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jotaiZustand = {}, global.JotaiZustand));
})(this, (function (exports, JotaiZustand) { 'use strict';

  function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n.default = e;
    return Object.freeze(n);
  }

  var JotaiZustand__namespace = /*#__PURE__*/_interopNamespaceDefault(JotaiZustand);

  var atomWithStore = function atomWithStore() {
    console.warn('[DEPRECATED] use `jotai-zustand` instead.');
    return JotaiZustand__namespace.atomWithStore.apply(JotaiZustand__namespace, arguments);
  };

  exports.atomWithStore = atomWithStore;

}));
