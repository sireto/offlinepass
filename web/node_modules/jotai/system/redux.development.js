System.register(['jotai-redux'], (function (exports) {
  'use strict';
  var JotaiRedux;
  return {
    setters: [function (module) {
      JotaiRedux = module;
    }],
    execute: (function () {

      const atomWithStore = exports('atomWithStore', (...args) => {
        console.warn("[DEPRECATED] use `jotai-redux` instead.");
        return JotaiRedux.atomWithStore(...args);
      });

    })
  };
}));
