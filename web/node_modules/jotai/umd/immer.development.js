(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jotai-immer')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jotai-immer'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jotaiImmer = {}, global.JotaiImmer));
})(this, (function (exports, JotaiImmer) { 'use strict';

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

  var JotaiImmer__namespace = /*#__PURE__*/_interopNamespaceDefault(JotaiImmer);

  var atomWithImmer = function atomWithImmer() {
    console.warn('[DEPRECATED]: use `jotai-immer` instead.');
    return JotaiImmer__namespace.atomWithImmer.apply(JotaiImmer__namespace, arguments);
  };
  var useImmerAtom = function useImmerAtom() {
    console.warn('[DEPRECATED]: use `jotai-immer` instead.');
    return JotaiImmer__namespace.useImmerAtom.apply(JotaiImmer__namespace, arguments);
  };
  var withImmer = function withImmer() {
    console.warn('[DEPRECATED]: use `jotai-immer` instead.');
    return JotaiImmer__namespace.withImmer.apply(JotaiImmer__namespace, arguments);
  };

  exports.atomWithImmer = atomWithImmer;
  exports.useImmerAtom = useImmerAtom;
  exports.withImmer = withImmer;

}));
