import { SECRET_INTERNAL_getScopeContext as getScopeContext } from 'jotai';
import { WritableAtom } from 'jotai';
import { RESET } from './constants';
type Scope = NonNullable<Parameters<typeof getScopeContext>[0]>;
export declare function useResetAtom<Value>(anAtom: WritableAtom<Value, typeof RESET>, scope?: Scope): () => void;
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;