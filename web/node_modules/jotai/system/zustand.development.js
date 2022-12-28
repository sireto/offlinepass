System.register(['jotai-zustand'], (function (exports) {
  'use strict';
  var JotaiZustand;
  return {
    setters: [function (module) {
      JotaiZustand = module;
    }],
    execute: (function () {

      const atomWithStore = exports('atomWithStore', (...args) => {
        console.warn("[DEPRECATED] use `jotai-zustand` instead.");
        return JotaiZustand.atomWithStore(...args);
      });

    })
  };
}));
