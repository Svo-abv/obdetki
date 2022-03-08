import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import classes from '../styles/ContactsTopBlock.module.css'
const ContactsTopBlock = () => {
    return (
        <Container className={classes.contactsTopBlock}>
            <Row>
                <Col>Оптовая продажа детской обуви и одежды в РФ</Col>
                <Col className={classes.colRight}> Тел.: <b>8 (800) 511-59-92</b>, WhatsApp, Viber: <b>+7 (902) 150-01-99</b></Col>
            </Row>
        </Container>
    );
};

export default ContactsTopBlock;