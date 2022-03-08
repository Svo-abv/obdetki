import { observer } from "mobx-react";
import { getMenuPages, getProductById, getProductImagesByProductId, getPairsInBox, insertIntoBasket } from "../../lib/globals";
import styles from '../../styles/Home.module.css';
import HeadPage from "../../components/headPage";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { useContext, useState } from "react";
import SearchBlock from "../../components/searchBlock";
import classes from '../../styles/Product.module.css'
import Image from "next/image";
import { Context } from "../_app";
import ButtonCart from "../../components/ButtonCart";

const ProductItem = ({ headData, productId, product, images, pairs }: any) => {
    const [currentPairs, setCurrentPairs] = useState(pairs);
    const [mainImage, setMainImage] = useState(product.productImages.url);
    const { user } = useContext(Context);

    const addCartHandler = (e: any, product: any, count: number) => {
        insertIntoBasket(user.user.id, product, count).then((data) => {
            user.inCart = data.count;
        });
    }


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
                                <Form.Control type="number" min={pairs} step={pairs} className={classes.input} value={currentPairs}
                                    onChange={(e) => setCurrentPairs(e.target.value)} />
                                {
                                    user.isAuth && (<ButtonCart product={{ id: product.id, price: product.price }} count={currentPairs} />)
                                    //(<Button className={classes.btn} onClick={(e) => addCartHandler(e, { id: product.id, price: product.price }, currentPairs)}>в корзину</Button>)
                                }
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

export default observer(ProductItem);

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