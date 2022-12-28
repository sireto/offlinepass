import { AnyVariables, Client, OperationContext, OperationResult, TypedDocumentNode } from '@urql/core';
import { Getter } from 'jotai';
type MutationAction<Data, Variables extends AnyVariables> = {
    variables: Variables;
    context?: Partial<OperationContext>;
    callback?: (result: OperationResult<Data, Variables>) => void;
};
/**
 * @deprecated use `jotai-urql` instead
 */
export declare function atomWithMutation<Data, Variables extends AnyVariables>(createQuery: (get: Getter) => TypedDocumentNode<Data, Variables> | string, getClient?: (get: Getter) => Client): import("jotai").WritableAtom<OperationResult<Data, Variables>, MutationAction<Data, Variables>, Promise<void>>;
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;