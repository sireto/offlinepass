import { Context } from 'react';
import { Atom } from './atom';
import { createStoreForExport } from './store';
import { Store } from './store';
type Scope = symbol | string | number;
type VersionedWrite = (write: (version?: object) => void) => void;
type RetryFromError = (fn: () => void) => void;
export interface ScopeContainer {
    s: Store;
    w?: VersionedWrite;
    v?: object;
    r?: RetryFromError;
}
export declare const createScopeContainer: (initialValues?: Iterable<readonly [
    Atom<unknown>,
    unknown
]>, unstable_createStore?: typeof createStoreForExport) => ScopeContainer;
type ScopeContext = Context<ScopeContainer>;
export declare const getScopeContext: (scope?: Scope) => ScopeContext;
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;