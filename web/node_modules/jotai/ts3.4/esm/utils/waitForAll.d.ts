import { Atom } from 'jotai';
type ResolveAtom<T> = T extends Atom<infer V> ? V : T;
type AwaitedAtom<T> = Awaited<ResolveAtom<T>>;
export declare function waitForAll<Atoms extends Atom<unknown>[]>(atoms: readonly [
    ...Atoms
]): Atom<{
    [K in keyof Atoms]: AwaitedAtom<Atoms[K]>;
}>;
export declare function waitForAll<Atoms extends Record<string, Atom<unknown>>>(atoms: Atoms): Atom<{
    [K in keyof Atoms]: AwaitedAtom<Atoms[K]>;
}>;
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;