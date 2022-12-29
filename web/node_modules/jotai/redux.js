'use strict';

var JotaiRedux = require('jotai-redux');

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

var JotaiRedux__namespace = /*#__PURE__*/_interopNamespaceDefault(JotaiRedux);

var atomWithStore = function atomWithStore() {
  console.warn('[DEPRECATED] use `jotai-redux` instead.');
  return JotaiRedux__namespace.atomWithStore.apply(JotaiRedux__namespace, arguments);
};

exports.atomWithStore = atomWithStore;
