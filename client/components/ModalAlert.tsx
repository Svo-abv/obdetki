import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalAlert = (props: any) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Спасибо за Ваш заказ!</h4>
                <p>
                    Заказ сформирован и передан на обработку.
                    Ожидайте звонка менеджера на указанный номер телефона для дальнейшего
                    согласования оплаты заказа и последующей отгрузки.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Ok</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAlert;