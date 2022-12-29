import { SetAtom, WritableAtom } from './atom';
import { getScopeContext } from './contexts';
import { ExtractAtomResult, ExtractAtomUpdate } from './typeUtils';
type Scope = NonNullable<Parameters<typeof getScopeContext>[0]>;
export declare function useSetAtom<Value, Update, Result extends void | Promise<void>>(atom: WritableAtom<Value, Update, Result>, scope?: Scope): SetAtom<Update, Result>;
export declare function useSetAtom<AtomType extends WritableAtom<any, any, void | Promise<void>>>(atom: AtomType, scope?: Scope): SetAtom<ExtractAtomUpdate<AtomType>, ExtractAtomResult<AtomType>>;
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;