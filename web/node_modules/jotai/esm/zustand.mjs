import * as JotaiZustand from 'jotai-zustand';

const atomWithStore = (...args) => {
  console.warn("[DEPRECATED] use `jotai-zustand` instead.");
  return JotaiZustand.atomWithStore(...args);
};

export { atomWithStore };
