'use strict';

var JotaiValtio = require('jotai-valtio');

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

var JotaiValtio__namespace = /*#__PURE__*/_interopNamespaceDefault(JotaiValtio);

var atomWithProxy = function atomWithProxy() {
  console.warn('[DEPRECATED] use `jotai-valtio` instead.');
  return JotaiValtio__namespace.atomWithProxy.apply(JotaiValtio__namespace, arguments);
};

exports.atomWithProxy = atomWithProxy;
