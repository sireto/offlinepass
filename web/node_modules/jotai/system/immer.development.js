System.register(['jotai-immer'], (function (exports) {
  'use strict';
  var JotaiImmer;
  return {
    setters: [function (module) {
      JotaiImmer = module;
    }],
    execute: (function () {

      const atomWithImmer = exports('atomWithImmer', (...args) => {
        console.warn("[DEPRECATED]: use `jotai-immer` instead.");
        return JotaiImmer.atomWithImmer(...args);
      });
      const useImmerAtom = exports('useImmerAtom', (...args) => {
        console.warn("[DEPRECATED]: use `jotai-immer` instead.");
        return JotaiImmer.useImmerAtom(...args);
      });
      const withImmer = exports('withImmer', (...args) => {
        console.warn("[DEPRECATED]: use `jotai-immer` instead.");
        return JotaiImmer.withImmer(...args);
      });

    })
  };
}));
