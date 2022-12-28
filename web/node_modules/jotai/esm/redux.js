import * as JotaiRedux from 'jotai-redux';

const atomWithStore = (...args) => {
  console.warn("[DEPRECATED] use `jotai-redux` instead.");
  return JotaiRedux.atomWithStore(...args);
};

export { atomWithStore };
