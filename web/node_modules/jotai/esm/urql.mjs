import { atomsWithQuery, clientAtom, atomsWithMutation, atomsWithSubscription } from 'jotai-urql';
export { clientAtom } from 'jotai-urql';
import { atom } from 'jotai';

function atomWithQuery(createQueryArgs, getClient = (get) => get(clientAtom)) {
  console.warn("[DEPRECATED] use `jotai-urql` instead.");
  const getArgs = (get) => {
    const queryArgs = createQueryArgs(get);
    return [
      queryArgs.query,
      queryArgs.variables,
      {
        ...queryArgs.requestPolicy && {
          requestPolicy: queryArgs.requestPolicy
        },
        ...queryArgs.context
      }
    ];
  };
  const [dataAtom, statusAtom] = atomsWithQuery(getArgs, getClient);
  return atom(
    (get) => {
      const queryArgs = createQueryArgs(get);
      if (queryArgs.pause) {
        return null;
      }
      const status = get(statusAtom);
      if (status.error) {
        throw status.error;
      }
      if ("data" in status) {
        return status;
      }
      get(dataAtom);
      return status;
    },
    (_get, set, action) => {
      if (action.type === "reexecute") {
        console.warn(
          "DEPRECATED [atomWithQuery] use refetch instead of reexecute"
        );
        action.type = "refetch";
      }
      if ("opts" in action) {
        console.warn("DEPRECATED [atomWithQuery] action.opts is no longer used");
      }
      switch (action.type) {
        case "refetch": {
          return set(statusAtom, action);
        }
      }
    }
  );
}

function atomWithMutation(createQuery, getClient = (get) => get(clientAtom)) {
  console.warn("[DEPRECATED] use `jotai-urql` instead.");
  const [, statusAtom] = atomsWithMutation(getClient);
  return atom(
    (get) => {
      const status = get(statusAtom);
      return status;
    },
    async (get, set, action) => {
      const args = [
        createQuery(get),
        action.variables,
        action.context || {}
      ];
      await set(statusAtom, args);
      return Promise.resolve(get(statusAtom, { unstable_promise: true })).then(
        (status) => {
          var _a;
          (_a = action.callback) == null ? void 0 : _a.call(action, status);
          if (status.error) {
            throw status.error;
          }
        }
      );
    }
  );
}

function atomWithSubscription(createSubscriptionArgs, getClient = (get) => get(clientAtom)) {
  console.warn("[DEPRECATED] use `jotai-urql` instead.");
  const getArgs = (get) => {
    const subscriptionArgs = createSubscriptionArgs(get);
    return [
      subscriptionArgs.query,
      subscriptionArgs.variables,
      subscriptionArgs.context || {}
    ];
  };
  const [dataAtom, statusAtom] = atomsWithSubscription(getArgs, getClient);
  return atom(
    (get) => {
      const subscriptionArgs = createSubscriptionArgs(get);
      if (subscriptionArgs.pause) {
        return null;
      }
      const status = get(statusAtom);
      if (status.error) {
        throw status.error;
      }
      if ("data" in status) {
        return status;
      }
      get(dataAtom);
      return status;
    },
    (_get, set, action) => {
      switch (action.type) {
        case "refetch": {
          return set(statusAtom, action);
        }
      }
    }
  );
}

export { atomWithMutation, atomWithQuery, atomWithSubscription };
