import React from 'react';
import { Container } from 'react-bootstrap';
import classes from '../styles/staticIconsBlock.module.css'

const StaticIconsBlock = () => {
    return (
        <Container className={classes.adv} fluid>
            <div className={classes.item_adv}>
                <div className={classes.img}><img alt="" src="icons/money-bill-alt-regular.svg" /></div>
                <div className={classes.text}>Наличный и<br />безналичный расчёт</div>
            </div>
            <div className={classes.item_adv}>
                <div className={classes.img}><img alt="" src="icons/helicopter-solid.svg" /></div>
                <div className={classes.text}>Доставка<br />по России</div>
            </div>
            <div className={classes.item_adv}>
                <div className={classes.img}><img alt="" src="icons/headset-solid.svg" /></div>
                <div className={classes.text}>Грамотные<br />Консультанты</div>
            </div>
            <div className={classes.item_adv}>
                <div className={classes.img}><img alt="" src="icons/award-solid.svg" /></div>
                <div className={classes.text}>Гарантия низкой<br />цены</div>
            </div>
            <div className={classes.item_adv}>
                <div className={classes.img}><img alt="" src="icons/heart-regular.svg" /></div>
                <div className={classes.text}>Проверенные<br />бренды</div>
            </div>
        </Container>
    );
};

export default StaticIconsBlock;