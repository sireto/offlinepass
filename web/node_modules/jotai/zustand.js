'use strict';

var JotaiZustand = require('jotai-zustand');

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
