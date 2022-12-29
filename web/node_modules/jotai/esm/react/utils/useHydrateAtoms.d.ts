import { useStore } from 'jotai/react';
import type { WritableAtom } from 'jotai/vanilla';
type Options = Parameters<typeof useStore>[0];
type AnyWritableAtom = WritableAtom<unknown, any[], any>;
export declare function useHydrateAtoms(values: Iterable<readonly [AnyWritableAtom, unknown]>, options?: Options): void;
export {};
