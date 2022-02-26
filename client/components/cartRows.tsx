import Image from 'next/image';
import React, { useContext } from 'react';
import { Row, Col, CloseButton, Container } from 'react-bootstrap';
import Link from "next/link";
import { deleteRowBasket } from '../lib/globals';
import { Context } from '../pages/_app';
import { observer } from 'mobx-react';
interface ICartRows {
    userId: number;
    currentCartRows: any;
}
const CartRows = (props: ICartRows) => {
    const { userId, currentCartRows } = props;
    const { user } = useContext(Context);

    const removItemHandler = (item: any) => {
        deleteRowBasket(userId, item.id).then((res: any) => {
            user.inCart = res.count;
        })
    }

    return (
        <Container><h5>Ваш заказ:</h5><hr /><Row>
            <Col sm>Изображение:</Col>
            <Col sm>Артикул:</Col>
            <Col sm>Наименование:</Col>
            <Col sm>Количество:</Col>
            <Col sm>Цена:</Col>
            <Col sm>Сумма:</Col>
        </Row>
            {
                currentCartRows.map((item: any) => (
                    <Row key={item.id}>
                        <Col sm><Image src={item.product.productImages.url} width={70} height={70} /></Col>
                        <Col sm>{item.product.code}</Col>
                        <Col sm><Link href={`/product/${item.product.id}`}>{item.product.name}</Link></Col>
                        <Col sm>{item.count}</Col>
                        <Col sm>{item.price}</Col>
                        <Col sm>{item.price * item.count}</Col>
                        <Col sm><CloseButton onClick={() => removItemHandler(item)} /></Col>
                    </Row>
                ))
            }
            <hr />
        </Container>
    );
};

export default observer(CartRows);