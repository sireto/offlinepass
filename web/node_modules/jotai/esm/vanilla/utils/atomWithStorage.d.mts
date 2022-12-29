import type { WritableAtom } from 'jotai/vanilla';
import { RESET } from './constants.mjs';
export declare const NO_STORAGE_VALUE: unique symbol;
type Unsubscribe = () => void;
type SetStateActionWithReset<Value> = Value | typeof RESET | ((prev: Value) => Value | typeof RESET);
export interface AsyncStorage<Value> {
    getItem: (key: string) => Promise<Value | typeof NO_STORAGE_VALUE>;
    setItem: (key: string, newValue: Value) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
    subscribe?: (key: string, callback: (value: Value) => void) => Unsubscribe;
}
export interface SyncStorage<Value> {
    getItem: (key: string) => Value | typeof NO_STORAGE_VALUE;
    setItem: (key: string, newValue: Value) => void;
    removeItem: (key: string) => void;
    subscribe?: (key: string, callback: (value: Value) => void) => Unsubscribe;
}
export interface AsyncStringStorage {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, newValue: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
}
export interface SyncStringStorage {
    getItem: (key: string) => string | null;
    setItem: (key: string, newValue: string) => void;
    removeItem: (key: string) => void;
}
export declare function createJSONStorage<Value>(getStringStorage: () => AsyncStringStorage): AsyncStorage<Value>;
export declare function createJSONStorage<Value>(getStringStorage: () => SyncStringStorage): SyncStorage<Value>;
export declare function atomWithStorage<Value>(key: string, initialValue: Value, storage?: SyncStorage<Value> | AsyncStorage<Value>): WritableAtom<Value, [SetStateActionWithReset<Value>], void>;
export {};
