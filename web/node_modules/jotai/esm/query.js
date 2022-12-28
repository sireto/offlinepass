import { atomsWithQuery, queryClientAtom, atomsWithInfiniteQuery } from 'jotai-tanstack-query';
export { queryClientAtom } from 'jotai-tanstack-query';
import { atom } from 'jotai';

function atomWithQuery(createQuery, getQueryClient = (get) => get(queryClientAtom)) {
  console.warn("[DEPRECATED] use `jotai-tanstack-query` instead.");
  const getOptions = (get) => ({
    staleTime: 200,
    ...typeof createQuery === "function" ? createQuery(get) : createQuery
  });
  const [dataAtom] = atomsWithQuery(getOptions, getQueryClient);
  return atom(
    (get) => {
      const options = getOptions(get);
      if (options.enabled === false) {
        const queryClient = getQueryClient(get);
        return queryClient.getQueryData(options.queryKey);
      }
      return get(dataAtom);
    },
    (_get, set, action) => {
      if (action.type === "refetch") {
        return set(dataAtom, { type: "refetch", force: true });
      }
    }
  );
}

function atomWithInfiniteQuery(createQuery, getQueryClient = (get) => get(queryClientAtom)) {
  console.warn("[DEPRECATED] use `jotai-tanstack-query` instead.");
  const getOptions = (get) => ({
    staleTime: 200,
    ...typeof createQuery === "function" ? createQuery(get) : createQuery
  });
  const [dataAtom] = atomsWithInfiniteQuery(getOptions, getQueryClient);
  return atom(
    (get) => {
      const options = getOptions(get);
      if (options.enabled === false) {
        const queryClient = getQueryClient(get);
        return queryClient.getQueryData(options.queryKey);
      }
      return get(dataAtom);
    },
    (_get, set, action) => {
      if (action.type === "refetch") {
        return set(dataAtom, {
          type: "refetch",
          force: true,
          options: action.payload
        });
      }
      return set(dataAtom, action);
    }
  );
}

export { atomWithInfiniteQuery, atomWithQuery };
