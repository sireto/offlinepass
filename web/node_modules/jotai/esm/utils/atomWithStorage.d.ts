import type { WritableAtom } from 'jotai';
import { unstable_NO_STORAGE_VALUE as NO_STORAGE_VALUE } from 'jotai/vanilla/utils';
import { RESET } from './constants';
export { unstable_NO_STORAGE_VALUE as NO_STORAGE_VALUE } from 'jotai/vanilla/utils';
type Unsubscribe = () => void;
type SetStateActionWithReset<Value> = Value | typeof RESET | ((prev: Value) => Value | typeof RESET);
export interface AsyncStorage<Value> {
    getItem: (key: string) => Promise<Value | typeof NO_STORAGE_VALUE>;
    setItem: (key: string, newValue: Value) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
    delayInit?: boolean;
    subscribe?: (key: string, callback: (value: Value) => void) => Unsubscribe;
}
export interface SyncStorage<Value> {
    getItem: (key: string) => Value | typeof NO_STORAGE_VALUE;
    setItem: (key: string, newValue: Value) => void;
    removeItem: (key: string) => void;
    delayInit?: boolean;
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
export declare function atomWithStorage<Value>(key: string, initialValue: Value, storage: AsyncStorage<Value> & {
    delayInit: true;
}): WritableAtom<Value, SetStateActionWithReset<Value>, Promise<void>>;
export declare function atomWithStorage<Value>(key: string, initialValue: Value, storage: AsyncStorage<Value>): WritableAtom<Promise<Value>, SetStateActionWithReset<Value>, Promise<void>>;
export declare function atomWithStorage<Value>(key: string, initialValue: Value, storage: SyncStorage<Value>): WritableAtom<Value, SetStateActionWithReset<Value>>;
export declare function atomWithStorage<Value>(key: string, initialValue: Value): WritableAtom<Value, SetStateActionWithReset<Value>>;
/**
 * @deprecated Please `import { atomWithHash } from 'jotai-location'`
 */
export declare function atomWithHash<Value>(key: string, initialValue: Value, options?: {
    serialize?: (val: Value) => string;
    deserialize?: (str: string | null) => Value | typeof NO_STORAGE_VALUE;
    delayInit?: boolean;
    replaceState?: boolean;
    subscribe?: (callback: () => void) => () => void;
}): WritableAtom<Value, SetStateActionWithReset<Value>>;
