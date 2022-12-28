import * as JotaiValtio from 'jotai-valtio';

const atomWithProxy = (...args) => {
  console.warn("[DEPRECATED] use `jotai-valtio` instead.");
  return JotaiValtio.atomWithProxy(...args);
};

export { atomWithProxy };
