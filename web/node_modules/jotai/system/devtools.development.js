System.register(['jotai-devtools'], (function (exports) {
  'use strict';
  var JotaiDevtools;
  return {
    setters: [function (module) {
      JotaiDevtools = module;
    }],
    execute: (function () {

      const useAtomsDebugValue = exports('useAtomsDebugValue', (...args) => {
        console.warn("[DEPRECATED]: use `jotai-devtools` instead.");
        return JotaiDevtools.useAtomsDebugValue(...args);
      });
      const useAtomDevtools = exports('useAtomDevtools', (...args) => {
        console.warn("[DEPRECATED]: use `jotai-devtools` instead.");
        return JotaiDevtools.useAtomDevtools(...args);
      });
      const useAtomsSnapshot = exports('useAtomsSnapshot', (...args) => {
        console.warn("[DEPRECATED]: use `jotai-devtools` instead.");
        return JotaiDevtools.useAtomsSnapshot(...args);
      });
      const useGotoAtomsSnapshot = exports('useGotoAtomsSnapshot', (...args) => {
        console.warn("[DEPRECATED]: use `jotai-devtools` instead.");
        return JotaiDevtools.useGotoAtomsSnapshot(...args);
      });
      const useAtomsDevtools = exports('useAtomsDevtools', (...args) => {
        console.warn("[DEPRECATED]: use `jotai-devtools` instead.");
        return JotaiDevtools.useAtomsDevtools(...args);
      });

    })
  };
}));
