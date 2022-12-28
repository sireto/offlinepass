import { PropsWithChildren } from 'react';
import { Atom } from './atom';
import { getScopeContext } from './contexts';
import { ScopeContainer } from './contexts';
import { createStoreForExport } from './store';
type Scope = NonNullable<Parameters<typeof getScopeContext>[0]>;
export declare const Provider: ({ children, initialValues, scope, unstable_createStore, unstable_enableVersionedWrite, }: PropsWithChildren<{
    initialValues?: Iterable<readonly [
        Atom<unknown>,
        unknown
    ]>;
    scope?: Scope;
    /**
     * This is an unstable feature to use exported createStore.
     */
    unstable_createStore?: typeof createStoreForExport;
    /**
     * This is an unstable experimental feature for React 18.
     * When this is enabled, a) write function must be pure
     * (read function must be pure regardless of this),
     * b) React will show warning in DEV mode,
     * c) then state branching works.
     */
    unstable_enableVersionedWrite?: boolean;
}>) => import("react").FunctionComponentElement<import("react").ProviderProps<ScopeContainer>>;
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;