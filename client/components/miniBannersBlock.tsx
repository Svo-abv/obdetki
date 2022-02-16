import Image from 'next/image';
import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import classes from '../styles/miniBannersBlock.module.css'

class MiniBannersBlock extends Component {
    render() {
        return (
            <Container className={classes.container}>
                <div className={classes.card} style={{ width: '21%', height: 278 }}>
                    <Image src="/images/mini1.jpg" layout='fill' />
                </div>
                <div className={classes.card} style={{ backgroundColor: 'green', width: '26%', height: 278 }}>
                    <Image src="/images/mini2.jpg" layout='fill' />
                </div>
                <div className={classes.card} style={{ backgroundColor: 'green', width: '47%', height: 278 }}>
                    <Image src="/images/mini3.jpg" layout='fill' />
                </div>
                <div className={classes.card} style={{ backgroundColor: 'green', width: '21%', height: 278 }}>
                    <Image src="/images/mini4.jpg" layout='fill' />
                </div>
                <div className={classes.card} style={{ backgroundColor: 'green', width: '52%', height: 278 }}>
                    <Image src="/images/mini5.jpg" layout='fill' />
                </div>
                <div className={classes.card} style={{ backgroundColor: 'green', width: '21%', height: 278 }}>
                    <Image src="/images/mini6.jpg" layout='fill' />
                </div>
                <div className={classes.card} style={{ backgroundColor: 'green', width: '21%', height: 278 }}>
                    <Image src="/images/mini7.jpg" layout='fill' />
                </div>
                <div className={classes.card} style={{ backgroundColor: 'green', width: '52%', height: 278 }}>
                    <Image src="/images/mini8.png" layout='fill' />
                </div>
                <div className={classes.card} style={{ backgroundColor: 'green', width: '21%', height: 278 }}>
                    <Image src="/images/mini9.jpg" layout='fill' />
                </div>

            </Container>
        );
    }
}

export default MiniBannersBlock;