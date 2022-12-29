/**
 * These APIs are still unstable.
 * See: https://github.com/pmndrs/jotai/discussions/1514
 */
export { Provider, useStore } from './react/Provider';
export { useAtomValue } from './react/useAtomValue';
export { useSetAtom } from './react/useSetAtom';
export { useAtom } from './react/useAtom';
declare type Awaited<T> = T extends Promise<infer V> ? V : T;