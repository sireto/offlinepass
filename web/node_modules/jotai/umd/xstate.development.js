(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jotai-xstate')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jotai-xstate'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jotaiXstate = {}, global.JotaiXstate));
})(this, (function (exports, JotaiXstate) { 'use strict';

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

  var JotaiXstate__namespace = /*#__PURE__*/_interopNamespaceDefault(JotaiXstate);

  var atomWithMachine = function atomWithMachine() {
    console.warn('[DEPRECATED] use `jotai-xstate` instead.');
    return JotaiXstate__namespace.atomWithMachine.apply(JotaiXstate__namespace, arguments);
  };

  Object.defineProperty(exports, 'RESTART', {
    enumerable: true,
    get: function () { return JotaiXstate.RESTART; }
  });
  exports.atomWithMachine = atomWithMachine;

}));
