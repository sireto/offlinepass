import * as JotaiXstate from 'jotai-xstate';
export { RESTART } from 'jotai-xstate';

const atomWithMachine = (...args) => {
  console.warn("[DEPRECATED] use `jotai-xstate` instead.");
  return JotaiXstate.atomWithMachine(...args);
};

export { atomWithMachine };
