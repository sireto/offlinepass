import type { Atom } from 'jotai/vanilla';
export declare function selectAtom<Value, Slice>(anAtom: Atom<Promise<Value>>, selector: (v: Awaited<Value>) => Slice, equalityFn?: (a: Slice, b: Slice) => boolean): Atom<Promise<Slice>>;
export declare function selectAtom<Value, Slice>(anAtom: Atom<Value>, selector: (v: Awaited<Value>) => Slice, equalityFn?: (a: Slice, b: Slice) => boolean): Atom<Slice>;
