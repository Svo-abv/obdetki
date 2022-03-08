import { gql } from "@apollo/client";
import clientSsr from "../apollo-client-ssr";
import client from "../apollo-client";

interface IMenuPages {
    getAllPages: any;
    getAllRootProductsCategories: any;
}

export async function getMenuPages(): Promise<IMenuPages> {
    const Pages = await clientSsr.query({
        query: gql`
        query Pages{
            getAllPages {
                id
                title
                url
            }
        }`,
    });

    const Categories = await clientSsr.query({
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
    const { data } = await clientSsr.query({
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

export async function getProductsByIdCategoryOnClient(id: number): Promise<any> {
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

export async function getFiltredProducts(id: number, filters: any): Promise<any> {
    const { data } = await client.query({
        fetchPolicy: "no-cache",
        variables: { filters: filters },
        query: gql`
        query($filters: [FilterProductInput!]!) {
        getFiltredProducts(id: ${id}, filters: $filters) {
                        name
                        code
                        price
                        uuid_1c
                        deleted
                        id
                        productImages { url } 
                    }
        }`,
    });
    return data.getFiltredProducts;
}

export async function getProductsFiltersByIdCategory(id: number): Promise<any> {
    const { data } = await clientSsr.query({
        query: gql`
            query {
                getProductsFiltersByProductCtatalogeId(id: ${id}) {
                    name
                    value
                }
            }`,
    });
    return data.getProductsFiltersByProductCtatalogeId;
}

export async function getProductsFiltersByIdCategoryOnClient(id: number): Promise<any> {
    const { data } = await client.query({
        query: gql`
            query {
                getProductsFiltersByProductCtatalogeId(id: ${id}) {
                    name
                    value
                }
            }`,
    });
    return data.getProductsFiltersByProductCtatalogeId;
}
export async function getProductById(id: number): Promise<any> {
    const { data } = await clientSsr.query({
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
    const { data } = await clientSsr.query({
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
    const { data } = await clientSsr.query({
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
    const { data } = await clientSsr.query({
        fetchPolicy: 'no-cache',
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
    const { data } = await clientSsr.query({
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
    const { data } = await clientSsr.query({
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


export async function insertIntoBasket(userId: number, product: any, count?: number): Promise<any> {

    const rawPairs = await getPairsInBox(product.id, Number(process.env.PAIR_IN_BOX_ID));
    let pairs = 0;
    if (!count) {
        pairs = rawPairs.getProductPropertyRowByProductIdAndProperyId ? rawPairs.getProductPropertyRowByProductIdAndProperyId.value : 1;
    }
    else {
        pairs = count;
    }


    const { data } = await client.mutate({
        variables: { data: { count: Number(pairs), price: Number(product.price), productId: Number(product.id) }, userId: userId },
        mutation: gql`
        mutation CreateProductBasketRow($data: BasketRowInput!, $userId: Float!) {
            createProductBasketRow(data: $data, userId: $userId) {
                id
                count
            }
        }`,
    });
    return data.createProductBasketRow;
}

export async function deleteRowBasket(userId: number, id: number): Promise<any> {
    const { data } = await client.mutate({
        variables: { userId: Number(userId), id: Number(id) },
        mutation: gql`
        mutation DeleteProductBasketRowById($userId: Float!, $id: Float!) {
                deleteProductBasketRowById(userId: $userId, id: $id) {
                        count
                        sum
                    }
                } `});
    return data.deleteProductBasketRowById;
}

interface IUpdateUserData {
    id: number;
    name?: string;
    town?: string;
    telephone?: string;

}
export async function updateUserData(vals: IUpdateUserData): Promise<any> {
    const { data } = await client.mutate({
        variables: { data: vals },
        mutation: gql`
        mutation Update($data: UserUpdateInput!) {
            update(data: $data) {
                    updated
                }
            }`});
    return data.update;
}

interface ICreateOrder {
    cargoId?: number;
    userId?: number;
    comment?: string;
}

export async function createOrder(vals: ICreateOrder): Promise<any> {
    const { data } = await client.mutate({
        variables: { data: vals },
        mutation: gql`
        mutation CreateOrder($data: CreateOrderInput!) {
            createOrder(data: $data) {
                    id
                    number
                }
            }`});
    return data.createOrder;
}
interface IRegisterUser {
    name: string;
    email: string;
    town: string;
    telephone: string;
}

export async function registerUser(user: IRegisterUser): Promise<any> {
    const { data } = await client.mutate({
        variables: { data: user },
        mutation: gql`
        mutation Registration($data: UserInput!) {
            registration(data: $data) {
                JWTKey
            }
        }`});
    return data.registration;
}

export async function getCountRowsInCartByUser(userId: number): Promise<any> {
    const { data } = await client.query({
        fetchPolicy: 'no-cache',
        query: gql`
        query {
            getCountsRowsAndSumByUserId(userId: ${userId}) {
                count
                sum
            }
        } `,
    });
    return data.getCountsRowsAndSumByUserId;
}

export async function getCargoList(userId: number): Promise<any> {
    const { data } = await client.query({
        query: gql`query {
            getCargoByBasketRowsSum(userId: ${userId}) {
                id
                name
            }
        }`,
    });
    return data.getCargoByBasketRowsSum;
}

export async function getUserData(userId: number): Promise<any> {
    const { data } = await client.query({
        query: gql`query {
              getUserById(id: ${userId}) {
                    name    
                    town
                    telephone
                }
            }`,
    });
    delete data.getUserById.____typename;
    return data.getUserById;
}

export async function getCartRowsByUser(userId: number): Promise<any> {
    const { data } = await client.query({
        fetchPolicy: 'no-cache',
        query: gql`
        query {
    getBasketRowsByUserId(id: ${userId}) {
        count
        id
        price
                product {
            id
            code
            name
                        productImages {
                url
            }
        }
    }
} `,
    });
    return data.getBasketRowsByUserId;
}