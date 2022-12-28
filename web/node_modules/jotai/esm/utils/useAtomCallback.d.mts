import { useSetAtom } from 'jotai';
import type { Setter, WritableAtom } from 'jotai';
type Scope = NonNullable<Parameters<typeof useSetAtom>[1]>;
type WriteGetter = Parameters<WritableAtom<unknown, unknown>['write']>[0];
type Callback<Result, Arg> = undefined extends Arg ? (arg?: Arg) => Result : (arg: Arg) => Result;
export declare function useAtomCallback<Result, Arg>(callback: (get: WriteGetter, set: Setter, arg: Arg) => Promise<Result>, scope?: Scope): Callback<Promise<Result>, Arg>;
export declare function useAtomCallback<Result, Arg>(callback: (get: WriteGetter, set: Setter, arg: Arg) => Result, scope?: Scope): Callback<Result | Promise<Result>, Arg>;
export {};
