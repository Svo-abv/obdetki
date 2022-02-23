
import Link from 'next/link';
import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import classes from '../styles/ProductsList.module.css'

interface IProductsList {
    products: any
    className?: string | undefined;
}
const ProductsList = (newProducts: IProductsList) => {
    return (
        <Container className={newProducts.className} fluid>
            {
                newProducts && newProducts.products.map((product: any) => (
                    <Card className={classes.cardProduct} key={product.id} ><Link href={`/product/${product.id}`}><Card className={classes.subCard}>
                        {
                            product.productImages ? <Card.Img variant="top" src={product.productImages.url} height={180} width={180} />
                                : <Card.Img variant="top" src="/images/placeholder.png" />
                        }
                        <Card.Body>
                            <Card.Title>{product.code}</Card.Title>
                            <Card.Text className={classes.text}>
                                {product.name}
                            </Card.Text>
                            <Card.Title className={classes.price}>
                                {product.price}
                                <span>.00 ₽</span>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                    </Link>
                        <Button className={classes.btn}>в корзину</Button>
                    </Card>))
            }
        </Container>
    );
};

export default ProductsList;