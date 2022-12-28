System.register(['jotai-xstate'], (function (exports) {
  'use strict';
  var JotaiXstate;
  return {
    setters: [function (module) {
      JotaiXstate = module;
      exports('RESTART', module.RESTART);
    }],
    execute: (function () {

      const atomWithMachine = exports('atomWithMachine', (...args) => {
        console.warn("[DEPRECATED] use `jotai-xstate` instead.");
        return JotaiXstate.atomWithMachine(...args);
      });

    })
  };
}));
