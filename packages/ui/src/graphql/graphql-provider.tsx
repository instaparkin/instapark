'use client';

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { apolloClient } from './apollo-client';

export const GraphQLProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
