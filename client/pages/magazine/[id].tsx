import { observer } from "mobx-react";
import { getMenuPages, getProductsByIdCategory, getAllChildresnProductsCategoriesByParent } from "../../lib/globals";
import styles from '../../styles/Home.module.css';
import client from "../../apollo-client";
import HeadPage from "../../components/headPage";
import { gql } from "@apollo/client";
import { Container, Form, ListGroup, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProductsList from "../../components/productsList";
import SearchBlock from "../../components/searchBlock";
import classes from '../../styles/Magazine.module.css'

const CtegoriesItem = ({ headData, brandId, products, categories }: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [productList, setProductList] = useState(products);
    const [productCategoryList, setProductCategoryList] = useState(categories);

    useEffect(() => {

        // getAllChildresnProductsCategoriesByParent(brandId).then((data) =>
        //     setProductCategoryList(data.getAllChildresnProductsCategoriesByParent));

        // getProductsByIdCategory(brandId)
        //     .then((data) => { setProductList(data.getProductsByProductCtatalogeId); })
        //     .finally(() => setIsLoading(false));
        setIsLoading(false)
    }, []);

    const onClikHandle = (category: any) => {
        setIsLoading(true);
        console.log(category.id);
        getProductsByIdCategory(category.id)
            .then((data) => { setProductList(data.getProductsByProductCtatalogeId); })
            .finally(() => setIsLoading(false));
    }

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
                        <Form.Label>Бренд</Form.Label>
                        <Form.Select aria-label="Бренд">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Form.Label>Вид</Form.Label>
                        <Form.Select aria-label="Вид">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Form.Label>Внутренний материал</Form.Label>
                        <Form.Select aria-label="Внутренний материал">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Form.Label>Внешний материал</Form.Label>
                        <Form.Select aria-label="Внешний материал">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
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

    const { data } = await client.query({
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

    const rawCategories = await getAllChildresnProductsCategoriesByParent(id);
    const categories = rawCategories.getAllChildresnProductsCategoriesByParent;// ? rawCategories.getProductsByProductCtatalogeId : [];

    return {
        props: {
            Pages: pages,
            headData: { title: data.getProductCategoriesById.name, description: "Описание страницы" },
            brandId: id,
            products: products,
            categories: categories,
        },
    };
}