import React from 'react';
import { Container, Row, Col, Button, FormControl, InputGroup, Form } from 'react-bootstrap';
import { Envelope, Instagram } from 'react-bootstrap-icons';
import classes from '../styles/searchBlock.module.css'

const SearchBlock = () => {
    return (
        <Container className={classes.searchBlock}>
            <Row>
                <Col className={classes.searchCol} >
                    <Form action='/magazine' method='GET'>
                        <InputGroup>
                            <FormControl
                                name='search'
                                type="text"
                                placeholder="введите для поиска ..."
                                aria-label="введите для поиска ..."
                                aria-describedby="btnGroupAddon"
                            />
                            <Button variant="outline-secondary" id="button-addon1" type='submit'>найти</Button>
                        </InputGroup>
                    </Form>
                </Col>
                <Col className={classes.socialIconsCol} xs lg="3">
                    <Row>
                        <Col><h5>СОЦ.СЕТИ:</h5></Col>
                        <Col>
                            <a href="mailto:master@obdetki.ru"><Envelope size={24} /></a>
                        </Col>
                        <Col>
                            <a href="https://www.instagram.com/obdetki.ru/"><Instagram size={24} /></a>
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default SearchBlock;