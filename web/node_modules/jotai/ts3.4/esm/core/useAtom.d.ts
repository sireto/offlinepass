import { Atom, SetAtom, WritableAtom } from './atom';
import { ExtractAtomResult, ExtractAtomUpdate, ExtractAtomValue } from './typeUtils';
import { useAtomValue } from './useAtomValue';
type Scope = NonNullable<Parameters<typeof useAtomValue>[1]>;
export declare function useAtom<Value, Update, Result extends void | Promise<void>>(atom: WritableAtom<Promise<Value>, Update, Result>, scope?: Scope): [
    Value,
    SetAtom<Update, Result>
];
export declare function useAtom<Value>(atom: Atom<Promise<Value>>, scope?: Scope): [
    Value,
    never
];
export declare function useAtom<Value, Update, Result extends void | Promise<void>>(atom: WritableAtom<Value, Update, Result>, scope?: Scope): [
    Awaited<Value>,
    SetAtom<Update, Result>
];
export declare function useAtom<Value>(atom: Atom<Value>, scope?: Scope): [
    Awaited<Value>,
    never
];
export declare function useAtom<AtomType extends WritableAtom<any, any, void | Promise<void>>>(atom: AtomType, scope?: Scope): [
    Awaited<ExtractAtomValue<AtomType>>,
    SetAtom<ExtractAtomUpdate<AtomType>, ExtractAtomResult<AtomType>>
];
export declare function useAtom<AtomType extends Atom<any>>(atom: AtomType, scope?: Scope): [
    Awaited<ExtractAtomValue<AtomType>>,
    never
];
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;