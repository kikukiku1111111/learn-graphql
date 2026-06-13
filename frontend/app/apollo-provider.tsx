"use client";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "http://localhost:3000/graphql",
  }),
  cache: new InMemoryCache(),
});

export function AppApolloProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
