import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import classes from '../styles/newProductsBlock.module.css'
import ProductsList from './productsList';

const NewProductsBlock = ({ newProducts }: any) => {
    return (
        <Container className={classes.container} fluid >
            <h2>Новинки</h2>
            <hr />
            <ProductsList products={newProducts} className={classes.subContainer} />
        </Container>
    );
};

export default NewProductsBlock;