/**
 * These APIs are still unstable.
 * See: https://github.com/pmndrs/jotai/discussions/1514
 */
export { useResetAtom } from './utils/useResetAtom';
export { useReducerAtom } from './utils/useReducerAtom';
export { useAtomCallback } from './utils/useAtomCallback';
export { useHydrateAtoms } from './utils/useHydrateAtoms';
declare type Awaited<T> = T extends Promise<infer V> ? V : T;