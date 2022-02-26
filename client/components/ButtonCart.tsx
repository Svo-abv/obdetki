import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { insertIntoBasket } from '../lib/globals';
import { Context } from '../pages/_app';
import classes from '../styles/ButtonCart.module.css'

interface IButtonCart {
    product: any;
    count?: number;
}

const ButtonCart = (props: IButtonCart) => {
    const { product, count } = props;
    const { user } = useContext(Context);
    const [state, setState] = useState({ type: "primary", text: "в корзину" });

    const addCartHandler = (e: any, product: any, count?: number) => {
        insertIntoBasket(user.user.id, product, count).then((data) => {
            user.inCart = data.count;
            setState({ type: "success", text: "Добавлено!" });
        }).catch(() => setState({ type: "danger", text: "Ошибка!" }))
    }


    return (

        <Button variant={state.type} className={classes.btn} onClick={(e) => addCartHandler(e, product, count)}>{state.text}</Button>

    );
};

export default observer(ButtonCart);