import { env } from 'process';
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
                    <Card className={classes.cardProduct} key={product.id} >
                        {
                            product.productImages ? <Card.Img variant="top" src={'http://localhost:5000' + product.productImages.url} />
                                : <Card.Img variant="top" src="/images/placeholder.png" />
                        }
                        <Card.Body>
                            <Card.Title>{product.code}</Card.Title>
                            <Card.Text>
                                {product.name}
                            </Card.Text>
                            <Card.Text>
                                {product.price}
                                <span> ₽</span>
                            </Card.Text>
                            <Button variant="primary">в корзину</Button>
                        </Card.Body>
                    </Card>))
            }
        </Container>
    );
};

export default ProductsList;