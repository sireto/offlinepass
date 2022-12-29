import { SECRET_INTERNAL_getScopeContext as getScopeContext } from 'jotai';
import { Atom } from '../core/atom';
type Scope = NonNullable<Parameters<typeof getScopeContext>[0]>;
export declare function useHydrateAtoms(values: Iterable<readonly [
    Atom<unknown>,
    unknown
]>, scope?: Scope): void;
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;