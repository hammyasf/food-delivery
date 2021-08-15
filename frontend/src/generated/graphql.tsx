import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Meal = {
  __typename?: 'Meal';
  id: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  restaurant: Restaurant;
  orders?: Maybe<Array<Order>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
};

export type MealInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  restaurantId: Scalars['Float'];
};

export type MealUpdateInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  id: Scalars['Float'];
};

export type MealsOnOrder = {
  __typename?: 'MealsOnOrder';
  order: Order;
  meal?: Maybe<Meal>;
  quantity: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  addRestaurant: Restaurant;
  updateRestaurant: Restaurant;
  deleteRestaurant: Restaurant;
  addMeal: Meal;
  updateMeal: Meal;
  deleteMeal: Meal;
  cancelOrder?: Maybe<Order>;
  updateOrder?: Maybe<Order>;
  placeOrder?: Maybe<Order>;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordTypeInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationAddRestaurantArgs = {
  options: RestaurantInput;
};


export type MutationUpdateRestaurantArgs = {
  options: RestaurantUpdateInput;
};


export type MutationDeleteRestaurantArgs = {
  id: Scalars['Float'];
};


export type MutationAddMealArgs = {
  options: MealInput;
};


export type MutationUpdateMealArgs = {
  options: MealUpdateInput;
};


export type MutationDeleteMealArgs = {
  id: Scalars['Float'];
};


export type MutationCancelOrderArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateOrderArgs = {
  id: Scalars['Float'];
};


export type MutationPlaceOrderArgs = {
  options: OrderMeals;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Float'];
  user: User;
  restaurant: Restaurant;
  statuses?: Maybe<Array<OrderStatus>>;
  meals?: Maybe<Array<MealsOnOrder>>;
  total: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type OrderMeals = {
  meals: Array<Scalars['Float']>;
  restaurantId: Scalars['Float'];
  total: Scalars['Float'];
};

export type OrderStatus = {
  __typename?: 'OrderStatus';
  id: Scalars['Float'];
  status: Scalars['String'];
  order: Order;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type PaginationOptions = {
  page: Scalars['Float'];
  perPage: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  currentUser: User;
  restaurants?: Maybe<Array<Restaurant>>;
  restaurant?: Maybe<Restaurant>;
  orders?: Maybe<Array<Order>>;
};


export type QueryRestaurantArgs = {
  id: Scalars['Float'];
};


export type QueryOrdersArgs = {
  options: PaginationOptions;
};

export type Restaurant = {
  __typename?: 'Restaurant';
  id: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  orders?: Maybe<Array<Order>>;
  meals?: Maybe<Array<Meal>>;
  user: User;
  blockedUser?: Maybe<Array<User>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
};

export type RestaurantInput = {
  name: Scalars['String'];
  description: Scalars['String'];
};

export type RestaurantUpdateInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newOrder?: Maybe<Order>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  type: Scalars['String'];
  orders?: Maybe<Array<Order>>;
  restaurants?: Maybe<Array<Restaurant>>;
  blockedBy?: Maybe<Array<Restaurant>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  accessToken?: Maybe<Scalars['String']>;
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UsernamePasswordTypeInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  restaurant: Scalars['Boolean'];
};

export type AddMealMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  restaurantId: Scalars['Float'];
}>;


export type AddMealMutation = { __typename?: 'Mutation', addMeal: { __typename?: 'Meal', id: number } };

export type AddRestaurantMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type AddRestaurantMutation = { __typename?: 'Mutation', addRestaurant: { __typename?: 'Restaurant', id: number } };

export type CancelOrderMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type CancelOrderMutation = { __typename?: 'Mutation', cancelOrder?: Maybe<{ __typename?: 'Order', id: number }> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: number, username: string, type: string, orders?: Maybe<Array<{ __typename?: 'Order', statuses?: Maybe<Array<{ __typename?: 'OrderStatus', status: string }>>, meals?: Maybe<Array<{ __typename?: 'MealsOnOrder', meal?: Maybe<{ __typename?: 'Meal', name: string, price: number }> }>> }>>, restaurants?: Maybe<Array<{ __typename?: 'Restaurant', name: string, description: string, meals?: Maybe<Array<{ __typename?: 'Meal', name: string, price: number }>> }>> } };

export type DeleteMealMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteMealMutation = { __typename?: 'Mutation', deleteMeal: { __typename?: 'Meal', id: number } };

export type DeleteRestaurantMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteRestaurantMutation = { __typename?: 'Mutation', deleteRestaurant: { __typename?: 'Restaurant', id: number, name: string, deleted: boolean } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', accessToken?: Maybe<string>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, type: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, type: string }> };

export type NewOrdersSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewOrdersSubscription = { __typename?: 'Subscription', newOrder?: Maybe<{ __typename?: 'Order', id: number, createdAt: any, meals?: Maybe<Array<{ __typename?: 'MealsOnOrder', quantity: number, meal?: Maybe<{ __typename?: 'Meal', name: string }> }>> }> };

export type OrdersQueryVariables = Exact<{
  page: Scalars['Float'];
  perPage: Scalars['Float'];
}>;


export type OrdersQuery = { __typename?: 'Query', orders?: Maybe<Array<{ __typename?: 'Order', id: number, total: number, createdAt: any, statuses?: Maybe<Array<{ __typename?: 'OrderStatus', status: string, createdAt: any }>>, meals?: Maybe<Array<{ __typename?: 'MealsOnOrder', quantity: number, meal?: Maybe<{ __typename?: 'Meal', name: string, price: number }> }>>, restaurant: { __typename?: 'Restaurant', id: number, name: string, description: string } }>> };

export type PlaceOrderMutationVariables = Exact<{
  meals: Array<Scalars['Float']> | Scalars['Float'];
  restaurantId: Scalars['Float'];
  total: Scalars['Float'];
}>;


export type PlaceOrderMutation = { __typename?: 'Mutation', placeOrder?: Maybe<{ __typename?: 'Order', id: number }> };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  restaurant: Scalars['Boolean'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, type: string }> } };

export type RestaurantQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type RestaurantQuery = { __typename?: 'Query', restaurant?: Maybe<{ __typename?: 'Restaurant', id: number, name: string, description: string, meals?: Maybe<Array<{ __typename?: 'Meal', id: number, name: string, description: string, price: number }>> }> };

export type RestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type RestaurantsQuery = { __typename?: 'Query', restaurants?: Maybe<Array<{ __typename?: 'Restaurant', id: number, name: string, description: string, meals?: Maybe<Array<{ __typename?: 'Meal', id: number, name: string, description: string, price: number }>> }>> };

export type UpdateMealMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  id: Scalars['Float'];
}>;


export type UpdateMealMutation = { __typename?: 'Mutation', updateMeal: { __typename?: 'Meal', id: number } };

export type UpdateOrderMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type UpdateOrderMutation = { __typename?: 'Mutation', updateOrder?: Maybe<{ __typename?: 'Order', id: number }> };

export type UpdateRestaurantMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Float'];
}>;


export type UpdateRestaurantMutation = { __typename?: 'Mutation', updateRestaurant: { __typename?: 'Restaurant', id: number } };


export const AddMealDocument = gql`
    mutation AddMeal($name: String!, $description: String!, $price: Float!, $restaurantId: Float!) {
  addMeal(
    options: {name: $name, description: $description, price: $price, restaurantId: $restaurantId}
  ) {
    id
  }
}
    `;
export type AddMealMutationFn = Apollo.MutationFunction<AddMealMutation, AddMealMutationVariables>;

/**
 * __useAddMealMutation__
 *
 * To run a mutation, you first call `useAddMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMealMutation, { data, loading, error }] = useAddMealMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      price: // value for 'price'
 *      restaurantId: // value for 'restaurantId'
 *   },
 * });
 */
export function useAddMealMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddMealMutation, AddMealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddMealMutation, AddMealMutationVariables>(AddMealDocument, options);
      }
export type AddMealMutationHookResult = ReturnType<typeof useAddMealMutation>;
export type AddMealMutationResult = Apollo.MutationResult<AddMealMutation>;
export type AddMealMutationOptions = Apollo.BaseMutationOptions<AddMealMutation, AddMealMutationVariables>;
export const AddRestaurantDocument = gql`
    mutation AddRestaurant($name: String!, $description: String!) {
  addRestaurant(options: {name: $name, description: $description}) {
    id
  }
}
    `;
export type AddRestaurantMutationFn = Apollo.MutationFunction<AddRestaurantMutation, AddRestaurantMutationVariables>;

/**
 * __useAddRestaurantMutation__
 *
 * To run a mutation, you first call `useAddRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRestaurantMutation, { data, loading, error }] = useAddRestaurantMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useAddRestaurantMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddRestaurantMutation, AddRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddRestaurantMutation, AddRestaurantMutationVariables>(AddRestaurantDocument, options);
      }
export type AddRestaurantMutationHookResult = ReturnType<typeof useAddRestaurantMutation>;
export type AddRestaurantMutationResult = Apollo.MutationResult<AddRestaurantMutation>;
export type AddRestaurantMutationOptions = Apollo.BaseMutationOptions<AddRestaurantMutation, AddRestaurantMutationVariables>;
export const CancelOrderDocument = gql`
    mutation CancelOrder($id: Float!) {
  cancelOrder(id: $id) {
    id
  }
}
    `;
export type CancelOrderMutationFn = Apollo.MutationFunction<CancelOrderMutation, CancelOrderMutationVariables>;

/**
 * __useCancelOrderMutation__
 *
 * To run a mutation, you first call `useCancelOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelOrderMutation, { data, loading, error }] = useCancelOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCancelOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelOrderMutation, CancelOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CancelOrderMutation, CancelOrderMutationVariables>(CancelOrderDocument, options);
      }
export type CancelOrderMutationHookResult = ReturnType<typeof useCancelOrderMutation>;
export type CancelOrderMutationResult = Apollo.MutationResult<CancelOrderMutation>;
export type CancelOrderMutationOptions = Apollo.BaseMutationOptions<CancelOrderMutation, CancelOrderMutationVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    id
    username
    type
    orders {
      statuses {
        status
      }
      meals {
        meal {
          name
          price
        }
      }
    }
    restaurants {
      name
      description
      meals {
        name
        price
      }
    }
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const DeleteMealDocument = gql`
    mutation DeleteMeal($id: Float!) {
  deleteMeal(id: $id) {
    id
  }
}
    `;
export type DeleteMealMutationFn = Apollo.MutationFunction<DeleteMealMutation, DeleteMealMutationVariables>;

/**
 * __useDeleteMealMutation__
 *
 * To run a mutation, you first call `useDeleteMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMealMutation, { data, loading, error }] = useDeleteMealMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMealMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMealMutation, DeleteMealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteMealMutation, DeleteMealMutationVariables>(DeleteMealDocument, options);
      }
export type DeleteMealMutationHookResult = ReturnType<typeof useDeleteMealMutation>;
export type DeleteMealMutationResult = Apollo.MutationResult<DeleteMealMutation>;
export type DeleteMealMutationOptions = Apollo.BaseMutationOptions<DeleteMealMutation, DeleteMealMutationVariables>;
export const DeleteRestaurantDocument = gql`
    mutation DeleteRestaurant($id: Float!) {
  deleteRestaurant(id: $id) {
    id
    name
    deleted
  }
}
    `;
export type DeleteRestaurantMutationFn = Apollo.MutationFunction<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>;

/**
 * __useDeleteRestaurantMutation__
 *
 * To run a mutation, you first call `useDeleteRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRestaurantMutation, { data, loading, error }] = useDeleteRestaurantMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRestaurantMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>(DeleteRestaurantDocument, options);
      }
export type DeleteRestaurantMutationHookResult = ReturnType<typeof useDeleteRestaurantMutation>;
export type DeleteRestaurantMutationResult = Apollo.MutationResult<DeleteRestaurantMutation>;
export type DeleteRestaurantMutationOptions = Apollo.BaseMutationOptions<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
      type
    }
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    type
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NewOrdersDocument = gql`
    subscription NewOrders {
  newOrder {
    id
    createdAt
    meals {
      meal {
        name
      }
      quantity
    }
  }
}
    `;

/**
 * __useNewOrdersSubscription__
 *
 * To run a query within a React component, call `useNewOrdersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewOrdersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewOrdersSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewOrdersSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewOrdersSubscription, NewOrdersSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<NewOrdersSubscription, NewOrdersSubscriptionVariables>(NewOrdersDocument, options);
      }
export type NewOrdersSubscriptionHookResult = ReturnType<typeof useNewOrdersSubscription>;
export type NewOrdersSubscriptionResult = Apollo.SubscriptionResult<NewOrdersSubscription>;
export const OrdersDocument = gql`
    query Orders($page: Float!, $perPage: Float!) {
  orders(options: {page: $page, perPage: $perPage}) {
    id
    total
    createdAt
    statuses {
      status
      createdAt
    }
    meals {
      meal {
        name
        price
      }
      quantity
    }
    restaurant {
      id
      name
      description
    }
  }
}
    `;

/**
 * __useOrdersQuery__
 *
 * To run a query within a React component, call `useOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useOrdersQuery(baseOptions: ApolloReactHooks.QueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
      }
export function useOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
        }
export type OrdersQueryHookResult = ReturnType<typeof useOrdersQuery>;
export type OrdersLazyQueryHookResult = ReturnType<typeof useOrdersLazyQuery>;
export type OrdersQueryResult = Apollo.QueryResult<OrdersQuery, OrdersQueryVariables>;
export const PlaceOrderDocument = gql`
    mutation PlaceOrder($meals: [Float!]!, $restaurantId: Float!, $total: Float!) {
  placeOrder(options: {meals: $meals, restaurantId: $restaurantId, total: $total}) {
    id
  }
}
    `;
export type PlaceOrderMutationFn = Apollo.MutationFunction<PlaceOrderMutation, PlaceOrderMutationVariables>;

/**
 * __usePlaceOrderMutation__
 *
 * To run a mutation, you first call `usePlaceOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlaceOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [placeOrderMutation, { data, loading, error }] = usePlaceOrderMutation({
 *   variables: {
 *      meals: // value for 'meals'
 *      restaurantId: // value for 'restaurantId'
 *      total: // value for 'total'
 *   },
 * });
 */
export function usePlaceOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PlaceOrderMutation, PlaceOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<PlaceOrderMutation, PlaceOrderMutationVariables>(PlaceOrderDocument, options);
      }
export type PlaceOrderMutationHookResult = ReturnType<typeof usePlaceOrderMutation>;
export type PlaceOrderMutationResult = Apollo.MutationResult<PlaceOrderMutation>;
export type PlaceOrderMutationOptions = Apollo.BaseMutationOptions<PlaceOrderMutation, PlaceOrderMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $restaurant: Boolean!) {
  register(
    options: {username: $username, password: $password, restaurant: $restaurant}
  ) {
    errors {
      field
      message
    }
    user {
      id
      username
      type
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      restaurant: // value for 'restaurant'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RestaurantDocument = gql`
    query Restaurant($id: Float!) {
  restaurant(id: $id) {
    id
    name
    description
    meals {
      id
      name
      description
      price
    }
  }
}
    `;

/**
 * __useRestaurantQuery__
 *
 * To run a query within a React component, call `useRestaurantQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestaurantQuery(baseOptions: ApolloReactHooks.QueryHookOptions<RestaurantQuery, RestaurantQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<RestaurantQuery, RestaurantQueryVariables>(RestaurantDocument, options);
      }
export function useRestaurantLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RestaurantQuery, RestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<RestaurantQuery, RestaurantQueryVariables>(RestaurantDocument, options);
        }
export type RestaurantQueryHookResult = ReturnType<typeof useRestaurantQuery>;
export type RestaurantLazyQueryHookResult = ReturnType<typeof useRestaurantLazyQuery>;
export type RestaurantQueryResult = Apollo.QueryResult<RestaurantQuery, RestaurantQueryVariables>;
export const RestaurantsDocument = gql`
    query Restaurants {
  restaurants {
    id
    name
    description
    meals {
      id
      name
      description
      price
    }
  }
}
    `;

/**
 * __useRestaurantsQuery__
 *
 * To run a query within a React component, call `useRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRestaurantsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RestaurantsQuery, RestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<RestaurantsQuery, RestaurantsQueryVariables>(RestaurantsDocument, options);
      }
export function useRestaurantsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RestaurantsQuery, RestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<RestaurantsQuery, RestaurantsQueryVariables>(RestaurantsDocument, options);
        }
export type RestaurantsQueryHookResult = ReturnType<typeof useRestaurantsQuery>;
export type RestaurantsLazyQueryHookResult = ReturnType<typeof useRestaurantsLazyQuery>;
export type RestaurantsQueryResult = Apollo.QueryResult<RestaurantsQuery, RestaurantsQueryVariables>;
export const UpdateMealDocument = gql`
    mutation UpdateMeal($name: String!, $description: String!, $price: Float!, $id: Float!) {
  updateMeal(
    options: {name: $name, description: $description, price: $price, id: $id}
  ) {
    id
  }
}
    `;
export type UpdateMealMutationFn = Apollo.MutationFunction<UpdateMealMutation, UpdateMealMutationVariables>;

/**
 * __useUpdateMealMutation__
 *
 * To run a mutation, you first call `useUpdateMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMealMutation, { data, loading, error }] = useUpdateMealMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      price: // value for 'price'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateMealMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMealMutation, UpdateMealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateMealMutation, UpdateMealMutationVariables>(UpdateMealDocument, options);
      }
export type UpdateMealMutationHookResult = ReturnType<typeof useUpdateMealMutation>;
export type UpdateMealMutationResult = Apollo.MutationResult<UpdateMealMutation>;
export type UpdateMealMutationOptions = Apollo.BaseMutationOptions<UpdateMealMutation, UpdateMealMutationVariables>;
export const UpdateOrderDocument = gql`
    mutation UpdateOrder($id: Float!) {
  updateOrder(id: $id) {
    id
  }
}
    `;
export type UpdateOrderMutationFn = Apollo.MutationFunction<UpdateOrderMutation, UpdateOrderMutationVariables>;

/**
 * __useUpdateOrderMutation__
 *
 * To run a mutation, you first call `useUpdateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderMutation, { data, loading, error }] = useUpdateOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOrderMutation, UpdateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(UpdateOrderDocument, options);
      }
export type UpdateOrderMutationHookResult = ReturnType<typeof useUpdateOrderMutation>;
export type UpdateOrderMutationResult = Apollo.MutationResult<UpdateOrderMutation>;
export type UpdateOrderMutationOptions = Apollo.BaseMutationOptions<UpdateOrderMutation, UpdateOrderMutationVariables>;
export const UpdateRestaurantDocument = gql`
    mutation UpdateRestaurant($name: String!, $description: String!, $id: Float!) {
  updateRestaurant(options: {name: $name, description: $description, id: $id}) {
    id
  }
}
    `;
export type UpdateRestaurantMutationFn = Apollo.MutationFunction<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>;

/**
 * __useUpdateRestaurantMutation__
 *
 * To run a mutation, you first call `useUpdateRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRestaurantMutation, { data, loading, error }] = useUpdateRestaurantMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateRestaurantMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>(UpdateRestaurantDocument, options);
      }
export type UpdateRestaurantMutationHookResult = ReturnType<typeof useUpdateRestaurantMutation>;
export type UpdateRestaurantMutationResult = Apollo.MutationResult<UpdateRestaurantMutation>;
export type UpdateRestaurantMutationOptions = Apollo.BaseMutationOptions<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>;