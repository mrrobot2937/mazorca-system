import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import config from '../../env.config.js';

// URL del backend GraphQL desde configuración o environment variable
const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || config.GRAPHQL_URL;

console.log('🔗 GraphQL URL configurado:', GRAPHQL_URL);

// Link HTTP para conectar con el servidor GraphQL
const httpLink = createHttpLink({
    uri: GRAPHQL_URL,
});

// Link de autenticación (por si necesitas agregar headers en el futuro)
const authLink = setContext((_, { headers }) => {
    // Aquí puedes agregar tokens de autenticación si los necesitas
    return {
        headers: {
            ...headers,
            // authorization: token ? `Bearer ${token}` : "",
        }
    }
});

// Type guard para errores con statusCode
function hasStatusCode(error: unknown): error is { statusCode: number } {
    return (
        typeof error === "object" &&
        error !== null &&
        "statusCode" in error &&
        typeof (error as { statusCode?: unknown }).statusCode === "number"
    );
}

// Link de manejo de errores
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    }

    if (networkError) {
        console.error(`[Network error]: ${networkError}`);

        // Retry logic could be added here
        if (hasStatusCode(networkError) && networkError.statusCode === 500) {
            console.log('Server error - retrying...');
            return forward(operation);
        }
    }
});

// Configuración del cache
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                products: {
                    // Cache productos por restaurant_id
                    keyArgs: ["restaurantId"],
                },
                orders: {
                    // Cache pedidos por restaurant_id y status
                    keyArgs: ["restaurantId", "status"],
                },
            },
        },
        Product: {
            fields: {
                variants: {
                    merge: false, // Reemplazar array completo en lugar de merger
                },
            },
        },
        Order: {
            fields: {
                products: {
                    merge: false,
                },
            },
        },
    },
});

// Cliente Apollo
export const apolloClient = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache,
    defaultOptions: {
        watchQuery: {
            errorPolicy: 'all',
        },
        query: {
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
});

export default apolloClient; 
