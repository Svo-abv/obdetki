import { observer } from "mobx-react";
import { getMenuPages, getProductsByIdCategory, getAllChildresnProductsCategoriesByParent, getProductsFiltersByIdCategory, getProductsFiltersByIdCategoryOnClient, getProductsByIdCategoryOnClient, getFiltredProducts } from "../../lib/globals";
import styles from '../../styles/Home.module.css';
import HeadPage from "../../components/headPage";
import { gql } from "@apollo/client";
import { Container, Form, ListGroup, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProductsList from "../../components/productsList";
import SearchBlock from "../../components/searchBlock";
import classes from '../../styles/Magazine.module.css'
import clientSsr from "../../apollo-client-ssr";

interface ISelectedFilter {
    name: string;
    value: string;
}

const CtegoriesItem = ({ headData, brandId, products, categories, filters }: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFilter, setIsLoadingFilter] = useState(true);
    const [productList, setProductList] = useState(products);
    const [productCategoryList, setProductCategoryList] = useState(categories);
    const [currentFilters, setCurrentFilters] = useState(filters);
    const [currentSelectedFilter, setCurrentSelectedFilter] = useState<ISelectedFilter[]>([]);
    const [currentCategory, setCurrentCategory] = useState(brandId);

    useEffect(() => {
        setIsLoading(false)
        setIsLoadingFilter(false);
    }, []);

    const onClikHandle = (category: any) => {
        setIsLoading(true);
        setIsLoadingFilter(true);
        setCurrentSelectedFilter([]);
        getProductsByIdCategoryOnClient(category.id)
            .then((p) => {
                getProductsFiltersByIdCategoryOnClient(category.id).then((f) => {
                    setCurrentFilters(f);
                    setCurrentCategory(category.id);
                }).finally(() => setIsLoadingFilter(false));
                setProductList(p.getProductsByProductCtatalogeId);
            })
            .finally(() => setIsLoading(false));
    }

    const onSelectHandler = (e: any, name: any) => {
        setIsLoading(true);
        const currValue = e.target.value;
        let curr = [{ name: "", value: "" }];
        if (currValue == "") {
            curr = currentSelectedFilter.filter((item => item.name != name));
        } else {
            curr = [...currentSelectedFilter, { name: name, value: currValue }];
        }
        if (curr.length > 0) {
            getFiltredProducts(currentCategory, curr).then((data) => {
                setProductList(data);
            }).finally(() => {
                setIsLoading(false);
                setIsLoadingFilter(false);
            });
        } else {
            setCurrentSelectedFilter([]);
            getProductsByIdCategoryOnClient(currentCategory)
                .then((p) => {
                    getProductsFiltersByIdCategoryOnClient(currentCategory).then((f) => {
                        setCurrentFilters(f);
                        setCurrentCategory(currentCategory);
                    });
                    setProductList(p.getProductsByProductCtatalogeId);
                })
                .finally(() => setIsLoading(false));
        }
        setCurrentSelectedFilter(curr);
    }

    let currName = "";
    return (
        <div>
            <HeadPage title={headData.title} description={headData.description} />
            <SearchBlock />
            <main className={styles.main}>
                <h2>{headData.title} </h2>
                <hr />
                <Container className={classes.mainContainer} fluid>
                    <Container fluid className={classes.subContainer}>
                        <h4 className={'mb-3 w-auto'}>Категории:</h4>
                        <ListGroup horizontal className='ms-3 w-auto'>
                            {
                                !isLoading && (productCategoryList.map((category: any) => (
                                    <ListGroup.Item key={category.id} variant="light" className='p-2 w-auto' action onClick={() => onClikHandle(category)}>
                                        {category.name}
                                    </ListGroup.Item>
                                )))
                            }
                        </ListGroup>
                        {
                            isLoading ? <Spinner className={classes.spiner} animation="border" role="status" /> :
                                <ProductsList products={productList} className={classes.subSubContainer} />
                        }
                    </Container>
                    <div className={classes.filters}>
                        <h5>Фильтр:</h5>
                        {
                            !isLoadingFilter ? (currentFilters.map((filter: any) => {
                                if (currName !== filter.name) {
                                    currName = filter.name;
                                    const curr = currentFilters.filter((currFilter: any) => currFilter.name == filter.name);
                                    return (
                                        <div key={filter.name}>
                                            <Form.Label>{filter.name}</Form.Label>
                                            <Form.Select aria-label={filter.name} onChange={(e) => onSelectHandler(e, filter.name)}>
                                                <option></option>
                                                {
                                                    curr.map((currOption: any) => (<option key={currOption.value}>{currOption.value}</option>))
                                                }
                                            </Form.Select>
                                        </div>
                                    )
                                }
                            }))
                                : <Spinner className={classes.spiner} animation="border" role="status" />
                        }
                        <Form.Label>Цена</Form.Label>
                        <Form.Range />
                    </div>
                </Container>
            </main>
        </div>
    )
};


export default CtegoriesItem;

export async function getServerSideProps({ params }: any) {
    const { id } = params;
    const pages = await getMenuPages();

    const { data } = await clientSsr.query({
        query: gql`
        query{
        getProductCategoriesById(id:  ${id}) {
            name
            }
        }
    `,
    });

    const { getProductsByProductCtatalogeId } = await getProductsByIdCategory(id);
    const products = getProductsByProductCtatalogeId;// ? rawProducts.getAllChildresnProductsCategoriesByParent : [];

    const filters = await getProductsFiltersByIdCategory(id);

    const rawCategories = await getAllChildresnProductsCategoriesByParent(id);
    const categories = rawCategories.getAllChildresnProductsCategoriesByParent;// ? rawCategories.getProductsByProductCtatalogeId : [];

    return {
        props: {
            Pages: pages,
            headData: { title: data.getProductCategoriesById.name, description: "Описание страницы" },
            brandId: id,
            products: products,
            categories: categories,
            filters: filters,
        },
    };
}