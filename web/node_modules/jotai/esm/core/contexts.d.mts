import type { Context } from 'react';
import type { Atom } from './atom.mjs';
import { createStoreForExport } from './store.mjs';
import type { Store } from './store.mjs';
type Scope = symbol | string | number;
type VersionedWrite = (write: (version?: object) => void) => void;
type RetryFromError = (fn: () => void) => void;
export interface ScopeContainer {
    s: Store;
    w?: VersionedWrite;
    v?: object;
    r?: RetryFromError;
}
export declare const createScopeContainer: (initialValues?: Iterable<readonly [Atom<unknown>, unknown]>, unstable_createStore?: typeof createStoreForExport) => ScopeContainer;
type ScopeContext = Context<ScopeContainer>;
export declare const getScopeContext: (scope?: Scope) => ScopeContext;
export {};
