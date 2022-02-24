import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import classes from '../styles/MainLogoBlock.module.css'
import { Cart3 } from 'react-bootstrap-icons';
import { observer } from 'mobx-react';
import { checkAuth } from '../lib/globals';
import { Context } from '../pages/_app';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';


const MainLogoBlock = () => {
    const { user } = useContext(Context);
    const rout = useRouter();

    useEffect(() => {
        checkAuth().then(({ data }) => {
            localStorage.setItem("JwtKey", data.checkAuth.JWTKey);
            user.isAuth = true;
            user.user = jwtDecode(data.checkAuth.JWTKey);

        }).catch((e) => console.log(e))
        // .finally(() => setIsLoading(false));
        // console.log("add...");
    }, [rout])

    return (
        <Container className={classes.container}>
            <Row style={{ minHeight: '100px' }}>
                <Col className={classes.colAuth}>
                    {
                        user.isAuth ?
                            <Link href="/panel/">КАБИНЕТ</Link> :
                            <Link href="/auth/">ВОЙТИ / РЕГИСТРАЦИЯ</Link>
                    }
                </Col>
                <Col xs={6} className={classes.colLogo}>
                    <h1>ООО "ОбувьДетки"</h1>
                    <h2>Детская и взрослая обувь оптом, одежда, сумки</h2>
                </Col>
                <Col className={classes.colBasket}><Badge pill bg="secondary" className={classes.cartBadge}>0</Badge><Cart3 size={36} className="m-2"></Cart3><Link href="/basket/">КОРЗИНА</Link></Col>
            </Row>
        </Container >
    );
};

export default observer(MainLogoBlock);