import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createOrder, getCargoList, getUserData, updateUserData } from '../lib/globals';
import { Context } from '../pages/_app';
import ModalAlert from './ModalAlert';

interface IConfirmOrder {
    //  userId: number;
}
const ConfirmOrder = (props: IConfirmOrder) => {
    const { user } = useContext(Context);
    const rout = useRouter();

    const [cargoItems, setCargoItems] = useState([{ id: 0 }]);
    const [cargoCurrent, setCargoCurrent] = useState(0);
    const [comment, setComment] = useState('');
    const [userData, setUserData] = useState({ town: '', telephone: '', name: '' });
    const [modalShow, setModalShow] = React.useState(false);
    const [titleMessage, setTitleMessage] = React.useState('');


    useEffect(() => {
        user.isAuth && getCargoList(user.user.id).then((data) => {
            setCargoItems(data);
        })

        user.isAuth && getUserData(user.user.id).then((data) => {
            setUserData(data);
        })

    }, [user.inCart]);

    const onSubmint = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateUserData({
            town: userData.town,
            name: userData.name,
            telephone: userData.telephone,
            id: user.user.id
        });

        createOrder({
            userId: user.user.id,
            cargoId: Number(cargoItems.at(cargoCurrent)?.id),
            comment: comment,
        }).then((data) => {
            setTitleMessage(`Заказ № ${data.number}, принят.`)
            setModalShow(true)
        });
    }

    const clouseAlertHandler = () => {
        setModalShow(false);
        rout.push("/");
    }

    return (
        <>
            <Form onSubmit={onSubmint}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Ваше имя:</Form.Label>
                    <Form.Control type="text" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} placeholder="введите имя" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Ваш город:</Form.Label>
                    <Form.Control type="text" value={userData.town} onChange={(e) => setUserData({ ...userData, town: e.target.value })} placeholder="введите город" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Ваш телефон:</Form.Label>
                    <Form.Control type="tel" value={userData.telephone} onChange={(e) => setUserData({ ...userData, telephone: e.target.value })} placeholder="введите телефон" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Выбирите ТК:</Form.Label>
                    <Form.Select aria-label="ТК" value={cargoCurrent} onChange={(e) => setCargoCurrent(Number(e.target.value))}>
                        {
                            cargoItems.map((item: any) => (<option key={item.id} value={item.id}>{item.name}</option>))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Комментарий:</Form.Label>
                    <Form.Control type='text' placeholder="Введите комментарий" value={comment} onChange={(e) => setComment(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Оформить заказ
                </Button>
            </Form>
            <ModalAlert show={modalShow} onHide={clouseAlertHandler} title={titleMessage} />
        </>
    );
};

export default observer(ConfirmOrder);