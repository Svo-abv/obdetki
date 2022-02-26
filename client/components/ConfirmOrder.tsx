import React from 'react';
import { Button, Form } from 'react-bootstrap';

const ConfirmOrder = () => {

    const onSubmint = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <Form onSubmit={onSubmint}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ваш город:</Form.Label>
                <Form.Control type="email" placeholder="введите город" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ваш телефон:</Form.Label>
                <Form.Control type="password" placeholder="введите телефон" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Выбирите ТК:</Form.Label>
                <Form.Select aria-label="ТК">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Оформить заказ
            </Button>
        </Form>
    );
};

export default ConfirmOrder;