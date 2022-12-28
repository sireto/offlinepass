export { RESET } from './utils/constants.mjs';
export { atomWithReset } from './utils/atomWithReset.mjs';
export { useResetAtom } from './utils/useResetAtom.mjs';
export { useReducerAtom } from './utils/useReducerAtom.mjs';
export { atomWithReducer } from './utils/atomWithReducer.mjs';
export { atomFamily } from './utils/atomFamily.mjs';
export { selectAtom } from './utils/selectAtom.mjs';
export { useAtomCallback } from './utils/useAtomCallback.mjs';
export { freezeAtom, freezeAtomCreator } from './utils/freezeAtom.mjs';
export { splitAtom } from './utils/splitAtom.mjs';
export { atomWithDefault } from './utils/atomWithDefault.mjs';
export { waitForAll } from './utils/waitForAll.mjs';
export { NO_STORAGE_VALUE as unstable_NO_STORAGE_VALUE, atomWithStorage, atomWithHash, createJSONStorage, } from './utils/atomWithStorage.mjs';
export { atomWithObservable } from './utils/atomWithObservable.mjs';
export { useHydrateAtoms } from './utils/useHydrateAtoms.mjs';
export { loadable } from './utils/loadable.mjs';
export { abortableAtom } from './utils/abortableAtom.mjs';
import * as Jotai from 'jotai';
/**
 * @deprecated use `useAtomValue` from `jotai` instead
 */
export declare const useAtomValue: typeof Jotai.useAtomValue;
/**
 * @deprecated use `useSetAtom` from `jotai` instead
 */
export declare const useUpdateAtom: typeof Jotai.useSetAtom;
