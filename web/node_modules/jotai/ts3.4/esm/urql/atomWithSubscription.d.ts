import { AnyVariables, Client, OperationContext, OperationResult, TypedDocumentNode } from '@urql/core';
import { Getter, WritableAtom } from 'jotai';
type AtomWithSubscriptionAction = {
    type: 'refetch';
};
type OperationResultWithData<Data, Variables extends AnyVariables> = Pick<OperationResult<Data, Variables>, Exclude<keyof OperationResult<Data, Variables>, 'data'>> & {
    data: Data;
};
type SubscriptionArgs<Data, Variables extends AnyVariables> = {
    query: TypedDocumentNode<Data, Variables> | string;
    variables: Variables;
    context?: Partial<OperationContext>;
};
type SubscriptionArgsWithPause<Data, Variables extends AnyVariables> = SubscriptionArgs<Data, Variables> & {
    pause: boolean;
};
/**
 * @deprecated use `jotai-urql` instead
 */
export declare function atomWithSubscription<Data, Variables extends AnyVariables>(createSubscriptionArgs: (get: Getter) => SubscriptionArgs<Data, Variables>, getClient?: (get: Getter) => Client): WritableAtom<OperationResultWithData<Data, Variables>, AtomWithSubscriptionAction>;
/**
 * @deprecated use `jotai-urql` instead
 */
export declare function atomWithSubscription<Data, Variables extends AnyVariables>(createSubscriptionArgs: (get: Getter) => SubscriptionArgsWithPause<Data, Variables>, getClient?: (get: Getter) => Client): WritableAtom<OperationResultWithData<Data, Variables> | null, AtomWithSubscriptionAction>;
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;