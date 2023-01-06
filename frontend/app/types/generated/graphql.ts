import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
import { ClientError } from 'graphql-request/dist/types';
import useSWR, { SWRConfiguration as SWRConfigInterface, Key as SWRKeyInterface } from 'swr';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Drink = {
  __typename?: 'Drink';
  id: Scalars['ID'];
  name: Scalars['String'];
  flavour: Scalars['String'];
  price?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  mL: Scalars['Int'];
  imageBase64: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  drinkID?: Maybe<Drink>;
  drinks: Array<Maybe<Drink>>;
};


export type QueryDrinkIdArgs = {
  id: Scalars['ID'];
};

export type NewDrink = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  flavour: Scalars['String'];
  mL: Scalars['Int'];
  type: Scalars['String'];
  price?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  upsertDrink: Drink;
};


export type MutationUpsertDrinkArgs = {
  input: NewDrink;
};

export type GetDrinksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDrinksQuery = { __typename?: 'Query', drinks: Array<{ __typename?: 'Drink', id: string, name: string, flavour: string, price?: number | null, type: string, mL: number, imageBase64: string, createdAt?: string | null } | null> };

export type GetDrinkIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetDrinkIdQuery = { __typename?: 'Query', drinkID?: { __typename?: 'Drink', id: string, name: string, flavour: string, price?: number | null, type: string, mL: number, imageBase64: string, createdAt?: string | null } | null };

export type UpsertDrinkMutationVariables = Exact<{
  name: Scalars['String'];
  flavour: Scalars['String'];
  type: Scalars['String'];
  mL: Scalars['Int'];
  price?: InputMaybe<Scalars['Int']>;
}>;


export type UpsertDrinkMutation = { __typename?: 'Mutation', upsertDrink: { __typename?: 'Drink', id: string, name: string, flavour: string, price?: number | null, type: string, imageBase64: string, mL: number } };


export const GetDrinksDocument = gql`
    query getDrinks {
  drinks {
    id
    name
    flavour
    price
    type
    mL
    imageBase64
    createdAt
  }
}
    `;
export const GetDrinkIdDocument = gql`
    query getDrinkID($id: ID!) {
  drinkID(id: $id) {
    id
    name
    flavour
    price
    type
    mL
    imageBase64
    createdAt
  }
}
    `;
export const UpsertDrinkDocument = gql`
    mutation upsertDrink($name: String!, $flavour: String!, $type: String!, $mL: Int!, $price: Int) {
  upsertDrink(
    input: {name: $name, flavour: $flavour, type: $type, mL: $mL, price: $price}
  ) {
    id
    name
    flavour
    price
    type
    imageBase64
    mL
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getDrinks(variables?: GetDrinksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDrinksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDrinksQuery>(GetDrinksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDrinks', 'query');
    },
    getDrinkID(variables: GetDrinkIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDrinkIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDrinkIdQuery>(GetDrinkIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDrinkID', 'query');
    },
    upsertDrink(variables: UpsertDrinkMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertDrinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertDrinkMutation>(UpsertDrinkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'upsertDrink', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export function getSdkWithHooks(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  const sdk = getSdk(client, withWrapper);
  return {
    ...sdk,
    useGetDrinks(key: SWRKeyInterface, variables?: GetDrinksQueryVariables, config?: SWRConfigInterface<GetDrinksQuery, ClientError>) {
      return useSWR<GetDrinksQuery, ClientError>(key, () => sdk.getDrinks(variables), config);
    },
    useGetDrinkId(key: SWRKeyInterface, variables: GetDrinkIdQueryVariables, config?: SWRConfigInterface<GetDrinkIdQuery, ClientError>) {
      return useSWR<GetDrinkIdQuery, ClientError>(key, () => sdk.getDrinkID(variables), config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;