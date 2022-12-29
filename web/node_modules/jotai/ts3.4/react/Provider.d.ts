import { ReactNode } from 'react';
import { createStore } from 'jotai/vanilla';
type Store = ReturnType<typeof createStore>;
type Options = {
    store?: Store;
};
export declare const useStore: (options?: Options) => {
    get: <Value>(atom: import("jotai/vanilla").Atom<Value>) => Value;
    set: <Value_1, Args extends unknown[], Result>(atom: import("jotai/vanilla").WritableAtom<Value_1, Args, Result>, ...args: Args) => Result;
    sub: (atom: import("jotai/vanilla").Atom<unknown>, listener: () => void) => () => void;
    dev_subscribe_state: (l: () => void) => () => void;
    dev_get_mounted_atoms: () => IterableIterator<import("jotai/vanilla").Atom<unknown>>;
    dev_get_atom_state: (a: import("jotai/vanilla").Atom<unknown>) => ({
        d: Map<import("jotai/vanilla").Atom<unknown>, any & ({
            e: unknown;
        } | {
            v: unknown;
        })>;
    } & ({
        e: unknown;
    } | {
        v: unknown;
    })) | undefined;
    dev_get_mounted: (a: import("jotai/vanilla").Atom<unknown>) => {
        l: Set<() => void>;
        t: Set<import("jotai/vanilla").Atom<unknown>>;
        u?: () => void;
    } | undefined;
    dev_restore_atoms: (values: Iterable<readonly [
        import("jotai/vanilla").Atom<unknown>,
        unknown
    ]>) => void;
} | {
    get: <Value>(atom: import("jotai/vanilla").Atom<Value>) => Value;
    set: <Value_1, Args extends unknown[], Result>(atom: import("jotai/vanilla").WritableAtom<Value_1, Args, Result>, ...args: Args) => Result;
    sub: (atom: import("jotai/vanilla").Atom<unknown>, listener: () => void) => () => void;
    dev_subscribe_state?: never;
    dev_get_mounted_atoms?: never;
    dev_get_atom_state?: never;
    dev_get_mounted?: never;
    dev_restore_atoms?: never;
};
export declare const Provider: ({ children, store, }: {
    children?: ReactNode;
    store?: Store;
}) => JSX.Element;
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;