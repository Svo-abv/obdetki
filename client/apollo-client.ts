import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://countries.trevorblades.com",
    cache: new InMemoryCache(),
});

export default client;