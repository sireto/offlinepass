import * as JotaiDevtools from 'jotai-devtools';

const useAtomsDebugValue = (...args) => {
  console.warn("[DEPRECATED]: use `jotai-devtools` instead.");
  return JotaiDevtools.useAtomsDebugValue(...args);
};
const useAtomDevtools = (...args) => {
  console.warn("[DEPRECATED]: use `jotai-devtools` instead.");
  return JotaiDevtools.useAtomDevtools(...args);
};
const useAtomsSnapshot = (...args) => {
  console.warn("[DEPRECATED]: use `jotai-devtools` instead.");
  return JotaiDevtools.useAtomsSnapshot(...args);
};
const useGotoAtomsSnapshot = (...args) => {
  console.warn("[DEPRECATED]: use `jotai-devtools` instead.");
  return JotaiDevtools.useGotoAtomsSnapshot(...args);
};
const useAtomsDevtools = (...args) => {
  console.warn("[DEPRECATED]: use `jotai-devtools` instead.");
  return JotaiDevtools.useAtomsDevtools(...args);
};

export { useAtomDevtools, useAtomsDebugValue, useAtomsDevtools, useAtomsSnapshot, useGotoAtomsSnapshot };
