import { ApolloClient, Context, createHttpLink, DefaultOptions, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: `${process.env.API_HOST}/graphql`,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const isServer = typeof window === "undefined";
    if (!isServer) {
        const token = localStorage.getItem('JwtKey');

        //console.log("token: " + token);
        //console.log("isServer: " + isServer);
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    }
});

// const defaultOptions: DefaultOptions = {
//     watchQuery: {
//         fetchPolicy: 'no-cache',
//         errorPolicy: 'ignore',
//     },
//     query: {
//         fetchPolicy: 'no-cache',
//         errorPolicy: 'all',
//     },
// }


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: true,
    //defaultOptions: defaultOptions,
});

export default client;
