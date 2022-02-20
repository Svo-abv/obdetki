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
        }
    `,
    });

    const Categories = await client.query({
        query: gql`
        query Categories {
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
        }
        `,
    });
    return data;
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
        }
        `,
    });
    return data;
}