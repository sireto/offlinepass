import { QueryKey, QueryObserverOptions } from '@tanstack/query-core';
import { WritableAtom } from 'jotai';
import { CreateQueryOptions, GetQueryClient } from './types';
type AtomWithQueryAction = {
    type: 'refetch';
};
export interface AtomWithQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey extends QueryKey> extends QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey> {
    queryKey: TQueryKey;
}
export interface AtomWithQueryOptionsWithEnabled<TQueryFnData, TError, TData, TQueryData, TQueryKey extends QueryKey> extends Pick<AtomWithQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>, Exclude<keyof AtomWithQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>, 'enabled'>> {
    enabled: boolean;
}
/**
 * @deprecated use `jotai-tanstack-query` instead
 */
export declare function atomWithQuery<TQueryFnData, TError, TData = TQueryFnData, TQueryData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(createQuery: CreateQueryOptions<AtomWithQueryOptionsWithEnabled<TQueryFnData, TError, TData, TQueryData, TQueryKey>>, getQueryClient?: GetQueryClient): WritableAtom<TData | undefined, AtomWithQueryAction>;
/**
 * @deprecated use `jotai-tanstack-query` instead
 */
export declare function atomWithQuery<TQueryFnData, TError, TData = TQueryFnData, TQueryData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(createQuery: CreateQueryOptions<AtomWithQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>>, getQueryClient?: GetQueryClient): WritableAtom<TData, AtomWithQueryAction>;
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;