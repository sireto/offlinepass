(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jotai-devtools')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jotai-devtools'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jotaiDevtools = {}, global.JotaiDevtools));
})(this, (function (exports, JotaiDevtools) { 'use strict';

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

  var JotaiDevtools__namespace = /*#__PURE__*/_interopNamespaceDefault(JotaiDevtools);

  var useAtomsDebugValue = function useAtomsDebugValue() {
    console.warn('[DEPRECATED]: use `jotai-devtools` instead.');
    return JotaiDevtools__namespace.useAtomsDebugValue.apply(JotaiDevtools__namespace, arguments);
  };
  var useAtomDevtools = function useAtomDevtools() {
    console.warn('[DEPRECATED]: use `jotai-devtools` instead.');
    return JotaiDevtools__namespace.useAtomDevtools.apply(JotaiDevtools__namespace, arguments);
  };
  var useAtomsSnapshot = function useAtomsSnapshot() {
    console.warn('[DEPRECATED]: use `jotai-devtools` instead.');
    return JotaiDevtools__namespace.useAtomsSnapshot.apply(JotaiDevtools__namespace, arguments);
  };
  var useGotoAtomsSnapshot = function useGotoAtomsSnapshot() {
    console.warn('[DEPRECATED]: use `jotai-devtools` instead.');
    return JotaiDevtools__namespace.useGotoAtomsSnapshot.apply(JotaiDevtools__namespace, arguments);
  };
  var useAtomsDevtools = function useAtomsDevtools() {
    console.warn('[DEPRECATED]: use `jotai-devtools` instead.');
    return JotaiDevtools__namespace.useAtomsDevtools.apply(JotaiDevtools__namespace, arguments);
  };

  exports.useAtomDevtools = useAtomDevtools;
  exports.useAtomsDebugValue = useAtomsDebugValue;
  exports.useAtomsDevtools = useAtomsDevtools;
  exports.useAtomsSnapshot = useAtomsSnapshot;
  exports.useGotoAtomsSnapshot = useGotoAtomsSnapshot;

}));
