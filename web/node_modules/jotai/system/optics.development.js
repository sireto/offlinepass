System.register(['jotai-optics'], (function (exports) {
  'use strict';
  var JotaiOptics;
  return {
    setters: [function (module) {
      JotaiOptics = module;
    }],
    execute: (function () {

      const focusAtom = exports('focusAtom', (...args) => {
        console.warn("[DEPRECATED] use `jotai-optics` instead.");
        return JotaiOptics.focusAtom(...args);
      });

    })
  };
}));
