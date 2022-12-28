import type { ExtractAtomArgs, ExtractAtomResult, WritableAtom } from 'jotai/vanilla';
import { useStore } from './Provider.mjs';
type SetAtom<Args extends unknown[], Result> = (...args: Args) => Result;
type Store = ReturnType<typeof useStore>;
type Options = {
    store?: Store;
};
export declare function useSetAtom<Value, Args extends unknown[], Result>(atom: WritableAtom<Value, Args, Result>, options?: Options): SetAtom<Args, Result>;
export declare function useSetAtom<AtomType extends WritableAtom<unknown, unknown[], unknown>>(atom: AtomType, options?: Options): SetAtom<ExtractAtomArgs<AtomType>, ExtractAtomResult<AtomType>>;
export {};
