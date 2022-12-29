import type { Atom, WritableAtom } from 'jotai';
type Getter = Parameters<Atom<unknown>['read']>[0];
type WriteGetter = Parameters<WritableAtom<unknown, unknown>['write']>[0];
type Setter = Parameters<WritableAtom<unknown, unknown>['write']>[1];
type Read<Value> = (get: Getter, options: {
    signal: AbortSignal;
}) => Value;
type Write<Update, Result extends void | Promise<void>> = (get: WriteGetter, set: Setter, update: Update) => Result;
export declare function abortableAtom<Value, Update, Result extends void | Promise<void> = void>(read: Read<Value>, write: Write<Update, Result>): WritableAtom<Value, Update, Result>;
export declare function abortableAtom<Value>(read: Read<Value>): Atom<Value>;
export {};
