/**
 * These APIs are still unstable.
 * See: https://github.com/pmndrs/jotai/discussions/1514
 */
export { atom } from './vanilla/atom';
export { Atom, WritableAtom, PrimitiveAtom } from './vanilla/atom';
export { createStore, getDefaultStore } from './vanilla/store';
export { Getter, Setter, ExtractAtomValue, ExtractAtomArgs, ExtractAtomResult, SetStateAction, } from './vanilla/typeUtils';
declare type Awaited<T> = T extends Promise<infer V> ? V : T;