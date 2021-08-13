import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { ApolloProvider } from "@apollo/react-hooks";
import { getAccessToken, setAccessToken } from "./accessToken";
import { App } from "./App";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

const cache = new InMemoryCache({});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((oper) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            oper.setContext({
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  //@ts-ignore
  link: ApolloLink.from([
    //@ts-ignore
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();

        if (!token) {
          return true;
        }

        try {
          const { exp }: any = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch("http://localhost:4000/refresh_token", {
          method: "POST",
          credentials: "include",
        });
      },
      handleFetch: (accessToken) => {
        setAccessToken(accessToken);
      },
      handleError: (err) => {
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
      },
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    requestLink,
    new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
    }),
  ]),
  //@ts-ignore
  cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client as any}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
