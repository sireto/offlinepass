'use strict';

var JotaiOptics = require('jotai-optics');

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

var JotaiOptics__namespace = /*#__PURE__*/_interopNamespaceDefault(JotaiOptics);

var focusAtom = function focusAtom() {
  console.warn('[DEPRECATED] use `jotai-optics` instead.');
  return JotaiOptics__namespace.focusAtom.apply(JotaiOptics__namespace, arguments);
};

exports.focusAtom = focusAtom;
