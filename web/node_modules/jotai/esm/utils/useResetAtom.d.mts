import { SECRET_INTERNAL_getScopeContext as getScopeContext } from 'jotai';
import type { WritableAtom } from 'jotai';
import { RESET } from './constants.mjs';
type Scope = NonNullable<Parameters<typeof getScopeContext>[0]>;
export declare function useResetAtom<Value>(anAtom: WritableAtom<Value, typeof RESET>, scope?: Scope): () => void;
export {};
