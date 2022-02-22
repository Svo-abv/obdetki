import Link from 'next/link';
import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import classes from '../styles/MainLogoBlock.module.css'
import { Cart3 } from 'react-bootstrap-icons';


const MainLogoBlock = () => {
    return (
        <Container className={classes.container}>
            <Row style={{ minHeight: '100px' }}>
                <Col className={classes.colAuth}><Link href="/auth/">ВОЙТИ / РЕГИСТРАЦИЯ</Link></Col>
                <Col xs={6} className={classes.colLogo}>
                    <h1>ООО "ОбувьДетки"</h1>
                    <h2>Детская и взрослая обувь оптом, одежда, сумки</h2>
                </Col>
                <Col className={classes.colBasket}><Badge pill bg="secondary" className={classes.cartBadge}>9</Badge><Cart3 size={36} className="m-2"></Cart3><Link href="/basket/">КОРЗИНА</Link></Col>
            </Row>
        </Container >
    );
};

export default MainLogoBlock;