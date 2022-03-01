import jwtDecode from 'jwt-decode';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Button, Modal, Form, InputGroup, Row, Alert } from 'react-bootstrap';
import { registerUser } from '../lib/globals';
import { Context } from '../pages/_app';

const RegisterForm = (props: any) => {
    const [validated, setValidated] = useState(false);
    const [regData, setRegData] = useState({
        name: '', email: '', town: '', telephone: ''
    });
    const { user } = useContext(Context);

    const navi = useRouter();
    //const [Row, setRow] = useState(4);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            registerUser(regData).then((data) => {
                localStorage.setItem("JwtKey", data.JWTKey);
                user.isAuth = true;
                user.user = jwtDecode(data.JWTKey);
                props.onHide();
                navi.push("/");
            }).catch((e) => alert(e));
        }
        setValidated(true);
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Регистрация пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} className="m-3" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="validationCustom01">
                        <Form.Label className="w-auto">Полное имя или название организации:</Form.Label>
                        <Form.Control
                            value={regData.name} required type="text" placeholder="имя" maxLength={50}
                            onChange={(e) => setRegData({ ...regData, name: e.currentTarget.value })}
                        />
                        <Form.Control.Feedback type="invalid">Обязательно!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="validationCustomUsername">
                        <Form.Label>Электронный адрес:</Form.Label>
                        <Form.Control
                            value={regData.email} type="email" placeholder="e-mail" aria-describedby="inputGroupPrepend" required maxLength={50}
                            onChange={(e) => setRegData({ ...regData, email: e.currentTarget.value })}
                        />
                        <Form.Control.Feedback type="invalid">Введите Ваш e-mail</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="validationCustom03">
                        <Form.Label>Контактный телефон:</Form.Label>
                        <Form.Control
                            value={regData.telephone} type="tel" placeholder="телефон" aria-describedby="inputGroupPrepend" required maxLength={15}
                            onChange={(e) => setRegData({ ...regData, telephone: e.currentTarget.value })}
                        />
                        <Form.Control.Feedback type="invalid">Введите Ваш контактный телефон</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="validationCustom03">
                        <Form.Label>Город:</Form.Label>
                        <Form.Control
                            value={regData.town} type="text" placeholder="город" required maxLength={50}
                            onChange={(e) => setRegData({ ...regData, town: e.currentTarget.value })}
                        />
                        <Form.Control.Feedback type="invalid">Введите Ваш город</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Check
                            required
                            label="Cоглаcен(а) c правилами использования сайта"
                            feedback="Вы должны согласиться что-бы продолжить регистрацию"
                            feedbackType="invalid"
                        />
                    </Form.Group>
                    <Form.Label className="mb-3">Внимание! Пароль будет сгенерирован автоматически и выслан на указанный при регистрации электронный адрес.</Form.Label>
                    <Form.Group className="d-flex flex-row-reverse">
                        <Button type="submit">Зарегистрироваться</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default observer(RegisterForm);