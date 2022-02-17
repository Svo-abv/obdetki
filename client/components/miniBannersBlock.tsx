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
                    <span className={classes.name}>ТМ Леопард</span>
                    <span className={classes.name2}>Пляжная обувь</span>
                </div>
                <div className={classes.card} style={{ width: '26%', height: 278 }}>
                    <Image src="/images/mini2.jpg" layout='fill' />
                    <span className={classes.name}>Сумки</span>
                    <span className={classes.name2}>от 1440р.</span>
                </div>
                <div className={classes.card} style={{ width: '47%', height: 278 }}>
                    <Image src="/images/mini3.jpg" layout='fill' />
                    <span className={classes.name}>Meitesi</span>
                    <span className={classes.name2}>Туфли от 375р.</span>
                </div>
                <div className={classes.card} style={{ width: '21%', height: 278 }}>
                    <Image src="/images/mini4.jpg" layout='fill' />
                    <span className={classes.name}>Дутыши мужские</span>
                    <span className={classes.name2}>От 720р.</span>
                </div>
                <div className={classes.card} style={{ width: '52%', height: 278 }}>
                    <Image src="/images/mini5.jpg" layout='fill' />
                    <span className={classes.name}>Зима TOM&amp;MIKI</span>
                    <span className={classes.name2}>от 585р.</span>
                </div>
                <div className={classes.card} style={{ width: '21%', height: 278 }}>
                    <Image src="/images/mini6.jpg" layout='fill' />
                    <span className={classes.name}>Дутыши женские</span>
                    <span className={classes.name2}>Зима 2019-2020</span>
                </div>
                <div className={classes.card} style={{ width: '21%', height: 278 }}>
                    <Image src="/images/mini7.jpg" layout='fill' />
                    <span className={classes.name}>Доставка до терминала</span>
                    <span className={classes.name2}>От трех коробов*</span>
                </div>
                <div className={classes.card} style={{ width: '52%', height: 278 }}>
                    <Image src="/images/mini8.png" layout='fill' />
                    <span className={classes.name}>Обувь для любой зимы</span>
                    <span className={classes.name2}>TM Tom.M.</span>
                </div>
                <div className={classes.card} style={{ width: '21%', height: 278 }}>
                    <Image src="/images/mini0.jpg" layout='fill' />
                    <span className={classes.name}>Валенки</span>
                    <span className={classes.name2}>От 600р.</span>
                </div>
            </Container>
        );
    }
}

export default MiniBannersBlock;