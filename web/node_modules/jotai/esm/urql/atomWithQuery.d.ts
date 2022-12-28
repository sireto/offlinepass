import type { AnyVariables, Client, OperationContext, OperationResult, RequestPolicy, TypedDocumentNode } from '@urql/core';
import type { Getter, WritableAtom } from 'jotai';
type DeprecatedAtomWithQueryAction = {
    type: 'reexecute';
    opts?: Partial<OperationContext>;
} | {
    type: 'refetch';
    opts?: Partial<OperationContext>;
};
type AtomWithQueryAction = {
    type: 'refetch';
} | DeprecatedAtomWithQueryAction;
type OperationResultWithData<Data, Variables extends AnyVariables> = Omit<OperationResult<Data, Variables>, 'data'> & {
    data: Data;
};
type QueryArgs<Data, Variables extends AnyVariables> = {
    query: TypedDocumentNode<Data, Variables> | string;
    variables: Variables;
    requestPolicy?: RequestPolicy;
    context?: Partial<OperationContext>;
};
type QueryArgsWithPause<Data, Variables extends AnyVariables> = QueryArgs<Data, Variables> & {
    pause: boolean;
};
/**
 * @deprecated use `jotai-urql` instead
 */
export declare function atomWithQuery<Data, Variables extends AnyVariables>(createQueryArgs: (get: Getter) => QueryArgs<Data, Variables>, getClient?: (get: Getter) => Client): WritableAtom<OperationResultWithData<Data, Variables>, AtomWithQueryAction>;
/**
 * @deprecated use `jotai-urql` instead
 */
export declare function atomWithQuery<Data, Variables extends AnyVariables>(createQueryArgs: (get: Getter) => QueryArgsWithPause<Data, Variables>, getClient?: (get: Getter) => Client): WritableAtom<OperationResultWithData<Data, Variables> | null, AtomWithQueryAction>;
export {};
