import React from 'react';
import { Container, Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap';
import classes from '../styles/searchBlock.module.css'

const SearchBlock = () => {
    return (
        <Container className={classes.searchBlock}>
            <Row>
                <Col className={classes.searchCol} >
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="введите для поиска ..."
                            aria-label="введите для поиска ..."
                            aria-describedby="btnGroupAddon"
                        />
                        <Button variant="outline-secondary" id="button-addon1">найти</Button>
                    </InputGroup>
                </Col>
                <Col className={classes.socialIconsCol} xs lg="2">
                    <Row>
                        <Col><h5>СОЦ.СЕТИ:</h5></Col>
                        <Col>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default SearchBlock;