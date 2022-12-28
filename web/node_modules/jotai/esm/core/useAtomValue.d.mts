import type { Atom } from './atom.mjs';
import { getScopeContext } from './contexts.mjs';
import type { ExtractAtomValue } from './typeUtils.mjs';
type Scope = NonNullable<Parameters<typeof getScopeContext>[0]>;
export declare function useAtomValue<Value>(atom: Atom<Promise<Value>>, scope?: Scope): Value;
export declare function useAtomValue<Value>(atom: Atom<Value>, scope?: Scope): Awaited<Value>;
export declare function useAtomValue<AtomType extends Atom<any>>(atom: AtomType, scope?: Scope): Awaited<ExtractAtomValue<AtomType>>;
export {};
