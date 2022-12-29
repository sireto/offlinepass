import { useAtom } from 'jotai';
import { PrimitiveAtom } from 'jotai';
type Scope = NonNullable<Parameters<typeof useAtom>[1]>;
export declare function useReducerAtom<Value, Action>(anAtom: PrimitiveAtom<Value>, reducer: (v: Value, a?: Action) => Value, scope?: Scope): [
    Value,
    (action?: Action) => void
];
export declare function useReducerAtom<Value, Action>(anAtom: PrimitiveAtom<Value>, reducer: (v: Value, a: Action) => Value, scope?: Scope): [
    Value,
    (action: Action) => void
];
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;