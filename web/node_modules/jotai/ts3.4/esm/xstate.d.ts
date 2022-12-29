export { RESTART } from 'jotai-xstate';
import * as JotaiXstate from 'jotai-xstate';
/**
 * @deprecated use `jotai-xstate` instead
 */
export declare const atomWithMachine: typeof JotaiXstate.atomWithMachine;
declare type Awaited<T> = T extends Promise<infer V> ? V : T;