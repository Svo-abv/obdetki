import { observer } from "mobx-react";
import { getMenuPages, getProductsByIdCategory, getAllChildresnProductsCategoriesByParent, getProductById, getProductImagesByProductId, getPairsInBox } from "../../lib/globals";
import styles from '../../styles/Home.module.css';
import client from "../../apollo-client";
import HeadPage from "../../components/headPage";
import { gql } from "@apollo/client";
import { Button, Col, Container, Form, FormGroup, ListGroup, Row, Spinner, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProductsList from "../../components/productsList";
import SearchBlock from "../../components/searchBlock";
import classes from '../../styles/Product.module.css'
import Image from "next/image";

const ProductItem = ({ headData, productId, product, images, pairs }: any) => {
    const [mainImage, setMainImage] = useState(product.productImages.url);
    // const [isLoading, setIsLoading] = useState(true);
    // const [productList, setProductList] = useState(products);
    // const [productCategoryList, setProductCategoryList] = useState(categories);

    //useEffect(() => {

    // getAllChildresnProductsCategoriesByParent(brandId).then((data) =>
    //     setProductCategoryList(data.getAllChildresnProductsCategoriesByParent));

    // getProductsByIdCategory(brandId)
    //     .then((data) => { setProductList(data.getProductsByProductCtatalogeId); })
    //     .finally(() => setIsLoading(false));
    //     setIsLoading(false)
    // }, []);

    // const onClikHandle = (category: any) => {
    //     setIsLoading(true);
    //     console.log(category.id);
    //     getProductsByIdCategory(category.id)
    //         .then((data) => { setProductList(data.getProductsByProductCtatalogeId); })
    //         .finally(() => setIsLoading(false));
    // }

    return (
        <div>
            <HeadPage title={headData.title} description={headData.description} />
            <SearchBlock />
            <main className={styles.main}>
                <Container>
                    <Row>
                        <Col>
                            <Image src={mainImage} width={500} height={500} />
                            <Container>
                                <Row>
                                    {
                                        images.map((img: any) => (<Col key={img.url} className={classes.preview}>
                                            <Image src={img.url} width={150} height={150} onClick={() => setMainImage(img.url)} />
                                        </Col>))
                                    }
                                </Row>
                            </Container>
                        </Col>
                        <Col>
                            <h2>{headData.title}</h2>
                            <hr />
                            <h5>Артикул: {product.code}</h5>
                            <h5>Цена: {product.price}<span>.00 ₽</span> за пару</h5>
                            <h5>Цена: {product.price * pairs}<span>.00 ₽</span> за короб</h5>
                            <Form.Group className={classes.formGroup}>
                                <Form.Control type="number" defaultValue={pairs} min={pairs} step={pairs} className={classes.input} />
                                <Button className={classes.btn}>в корзину</Button>
                            </Form.Group>
                            {
                                product.productPropertiesRows.length > 0 && (
                                    <Table responsive size="xl">
                                        <thead>
                                            <tr>
                                                <th>Свойство</th>
                                                <th>Значение</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                product.productPropertiesRows.map((property: any) => (
                                                    <tr key={property.property.name}>
                                                        <td>{property.property.name}</td>
                                                        <td>{property.value}</td>
                                                    </tr>))
                                            }
                                        </tbody>
                                    </Table>)
                            }
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    )
};

export default ProductItem;

export async function getServerSideProps({ params }: any) {
    const { id } = params;

    const pages = await getMenuPages();


    const product = await getProductById(id);
    const images = await getProductImagesByProductId(id);
    const rawPairs = await getPairsInBox(id, Number(process.env.PAIR_IN_BOX_ID));
    const pairs = rawPairs.getProductPropertyRowByProductIdAndProperyId ? rawPairs.getProductPropertyRowByProductIdAndProperyId.value : 1;

    // const products = getProductsByProductCtatalogeId;

    // const { getProductsByProductCtatalogeId } = await getProductsByIdCategory(id);
    // const products = getProductsByProductCtatalogeId;

    // const rawCategories = await getAllChildresnProductsCategoriesByParent(id);
    // const categories = rawCategories.getAllChildresnProductsCategoriesByParent;

    return {
        props: {
            Pages: pages,
            headData: { title: product.getProductById.name, description: "Описание страницы" },
            productId: id,
            product: product.getProductById,
            images: images.getImagesByProductId,
            pairs: pairs,

            // categories: categories,
        },
    };
}