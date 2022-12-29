import * as JotaiOptics from 'jotai-optics';

const focusAtom = (...args) => {
  console.warn("[DEPRECATED] use `jotai-optics` instead.");
  return JotaiOptics.focusAtom(...args);
};

export { focusAtom };
