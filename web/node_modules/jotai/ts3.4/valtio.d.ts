import * as JotaiValtio from 'jotai-valtio';
/**
 * @deprecated use `jotai-valtio` instead
 */
export declare const atomWithProxy: typeof JotaiValtio.atomWithProxy;
declare type Awaited<T> = T extends Promise<infer V> ? V : T;