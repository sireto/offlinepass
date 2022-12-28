import { useSetAtom } from 'jotai/react';
import { WritableAtom } from 'jotai/vanilla';
import { RESET } from 'jotai/vanilla/utils';
type Options = Parameters<typeof useSetAtom>[1];
export declare function useResetAtom(anAtom: WritableAtom<unknown, [
    typeof RESET
], unknown>, options?: Options): () => unknown;
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;