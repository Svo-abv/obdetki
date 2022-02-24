import { gql } from "@apollo/client";
import client from "../apollo-client";

interface IMenuPages {
    getAllPages: any;
    getAllRootProductsCategories: any;
}

export async function getMenuPages(): Promise<IMenuPages> {
    const Pages = await client.query({
        query: gql`
        query Pages{
            getAllPages {
                id
                title
                url
            }
        }`,
    });

    const Categories = await client.query({
        query: gql`query Categories {
            getAllRootProductsCategories {
                                            id
                                            name
                                            children {
                                                        id
                                                        name
                                                        children { 
                                                                    id
                                                                    name
                                                                }
                                                            }
                                                        }
                                                    } `,
    });
    const data = { ...Categories.data, ...Pages.data };
    return data;
}

export async function getProductsByIdCategory(id: number): Promise<any> {
    const { data } = await client.query({
        query: gql`
        query{
            getProductsByProductCtatalogeId(id: ${id}) {
                name
                code
                price
                uuid_1c
                deleted
                id
                productImages {
                                url
                }
            }
        }`,
    });
    return data;
}

export async function getProductById(id: number): Promise<any> {
    const { data } = await client.query({
        query: gql`
        query{
            getProductById(id: ${id}) {
                id
                deleted
                name
                code
                price
                productPropertiesRows {
                        value
                        property {
                            name
                        }
                    }
                
                productImages {
                    url
                }
            }
            }`,
    });
    return data;
}

export async function getProductImagesByProductId(id: number): Promise<any> {
    const { data } = await client.query({
        query: gql`
        query{
            getImagesByProductId(id: ${id}) {
                url 
                }
            }`,
    });
    return data;
}

export async function getPairsInBox(productId: number, propertyId: number): Promise<any> {
    const { data } = await client.query({
        query: gql`
       query{
            getProductPropertyRowByProductIdAndProperyId(productId: ${productId}, propertyId: ${propertyId}) {
                value
                property {
                    name
                }
            }
        }`,
    });
    return data;
}

export async function getSearchProducts(search: string | string[]): Promise<any> {
    const { data } = await client.query({
        query: gql`
        query{
            getSearchProducts(search: "${search}") {
                name
                code
                price
                uuid_1c
                deleted
                id
                productImages {url}
            }
        }`,
    });
    return data;
}
interface IgetLatest20Product {
    getLastNewsProducts: any;
}
export async function getLatest20Products(): Promise<IgetLatest20Product> {
    const { data } = await client.query({
        query: gql`
        query Products{
            getLastNewsProducts {
                name
                code
                price
                id
                productImages {url}
            }
        }
    `,
    });
    return data;
}

export async function getAllChildresnProductsCategoriesByParent(id: number): Promise<any> {
    const { data } = await client.query({
        query: gql`
        query{
            getAllChildresnProductsCategoriesByParent(id: ${id}) {
                id
                name
            }
        }`,
    });
    return data;
}

export async function getAuthUser(email: string, password: string): Promise<any> {
    return await client.query({
        variables: { data: { email: email, password: password } },
        query: gql`
        query Login($data: LoginUserInput!) {
            login(data: $data) {
                    JWTKey
                }
        }`,
    });
}

export async function checkAuth(): Promise<any> {
    return await client.query({
        fetchPolicy: 'no-cache',
        query: gql`
        query{
            checkAuth {
                JWTKey
            }
        }`,
    });
}

interface IgetPageData {
    getPageById: any;
}
export async function getPageData(id: number): Promise<IgetPageData> {
    const { data } = await client.query({
        query: gql`
        query{
        getPageById(id:${id} ) {
                title
                description
                content
            }
        }`,
    });
    return data;
}