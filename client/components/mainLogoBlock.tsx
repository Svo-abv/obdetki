import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../styles/MainLogoBlock.module.css'

const MainLogoBlock = () => {
    return (
        <Container className={classes.container}>
            <Row style={{ minHeight: '100px' }}>
                <Col className={classes.colAuth}>ВОЙТИ / РЕГИСТРАЦИЯ</Col>
                <Col xs={6} className={classes.colLogo}>
                    <h1>ООО "ОбувьДетки"</h1>
                    <h2>Детская и взрослая обувь оптом, одежда, сумки</h2>
                </Col>
                <Col className={classes.colBasket}>КОРЗИНА </Col>

            </Row>
        </Container>
    );
};

export default MainLogoBlock;