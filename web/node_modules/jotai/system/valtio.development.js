System.register(['jotai-valtio'], (function (exports) {
  'use strict';
  var JotaiValtio;
  return {
    setters: [function (module) {
      JotaiValtio = module;
    }],
    execute: (function () {

      const atomWithProxy = exports('atomWithProxy', (...args) => {
        console.warn("[DEPRECATED] use `jotai-valtio` instead.");
        return JotaiValtio.atomWithProxy(...args);
      });

    })
  };
}));
