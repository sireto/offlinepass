import * as JotaiImmer from 'jotai-immer';

const atomWithImmer = (...args) => {
  console.warn("[DEPRECATED]: use `jotai-immer` instead.");
  return JotaiImmer.atomWithImmer(...args);
};
const useImmerAtom = (...args) => {
  console.warn("[DEPRECATED]: use `jotai-immer` instead.");
  return JotaiImmer.useImmerAtom(...args);
};
const withImmer = (...args) => {
  console.warn("[DEPRECATED]: use `jotai-immer` instead.");
  return JotaiImmer.withImmer(...args);
};

export { atomWithImmer, useImmerAtom, withImmer };
