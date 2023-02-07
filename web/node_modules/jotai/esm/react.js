import { jsx } from 'react/jsx-runtime';
import ReactExports, { createContext, useContext, useRef, useReducer, useEffect, useDebugValue, useCallback } from 'react';
import { getDefaultStore, createStore } from 'jotai/vanilla';

const StoreContext = createContext(void 0);
const useStore = (options) => {
  const store = useContext(StoreContext);
  return (options == null ? void 0 : options.store) || store || getDefaultStore();
};
const Provider = ({
  children,
  store
}) => {
  const storeRef = useRef();
  if (!store && !storeRef.current) {
    storeRef.current = createStore();
  }
  return /* @__PURE__ */ jsx(StoreContext.Provider, { value: store || storeRef.current, children });
};

const isPromise = (x) => x instanceof Promise;
const use = ReactExports.use || ((promise) => {
  if (promise.status === "pending") {
    throw promise;
  } else if (promise.status === "fulfilled") {
    return promise.value;
  } else if (promise.status === "rejected") {
    throw promise.reason;
  } else {
    promise.status = "pending";
    promise.then(
      (v) => {
        promise.status = "fulfilled";
        promise.value = v;
      },
      (e) => {
        promise.status = "rejected";
        promise.reason = e;
      }
    );
    throw promise;
  }
});
function useAtomValue(atom, options) {
  const store = useStore(options);
  const [[valueFromReducer, storeFromReducer, atomFromReducer], rerender] = useReducer(
    (prev) => {
      const nextValue = store.get(atom);
      if (Object.is(prev[0], nextValue) && prev[1] === store && prev[2] === atom) {
        return prev;
      }
      return [nextValue, store, atom];
    },
    void 0,
    () => [store.get(atom), store, atom]
  );
  let value = valueFromReducer;
  if (storeFromReducer !== store || atomFromReducer !== atom) {
    rerender();
    value = store.get(atom);
  }
  const delay = options == null ? void 0 : options.delay;
  useEffect(() => {
    const unsub = store.sub(atom, () => {
      if (typeof delay === "number") {
        setTimeout(rerender, delay);
        return;
      }
      rerender();
    });
    rerender();
    return unsub;
  }, [store, atom, delay]);
  useDebugValue(value);
  return isPromise(value) ? use(value) : value;
}

function useSetAtom(atom, options) {
  const store = useStore(options);
  const setAtom = useCallback(
    (...args) => {
      if (process.env.NODE_ENV !== "production" && !("write" in atom)) {
        throw new Error("not writable atom");
      }
      return store.set(atom, ...args);
    },
    [store, atom]
  );
  return setAtom;
}

function useAtom(atom, options) {
  return [
    useAtomValue(atom, options),
    // We do wrong type assertion here, which results in throwing an error.
    useSetAtom(atom, options)
  ];
}

export { Provider, useAtom, useAtomValue, useSetAtom, useStore };
