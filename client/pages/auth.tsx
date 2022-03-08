import { gql } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import react, { FormEvent, useContext, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import client from "../apollo-client-ssr";
import HeadPage from "../components/headPage";
import RegisterForm from "../components/RegisterForm";
import { getAuthUser, getMenuPages } from "../lib/globals";
import styles from '../styles/Home.module.css';
import { Context } from "./_app";

const Auth = ({ headData }: any) => {
    const [email, setEmail] = useState("");
    const [showRegister, setShowRegister] = useState(false);
    const [password, setPassword] = useState("");
    const { user } = useContext(Context);
    const navi = useRouter();

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await getAuthUser(email, password).then(({ data }) => {
            localStorage.setItem("JwtKey", data.login.JWTKey);
            user.isAuth = true;
            user.user = jwtDecode(data.login.JWTKey);
            navi.push("/");
        }).catch((e) => (alert(e)));

    }

    const registerHandler = async (e: react.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowRegister(true);
    }

    const clouseHandler = () => {
        setShowRegister(false);
    }

    return (
        <div>
            <HeadPage title={headData.title} description={headData.description} />
            <main className={styles.main}>
                <h2>{headData.title} </h2>
                <hr />
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email адрес</Form.Label>
                        <Form.Control type="email" value={email} placeholder="Выедите email" onChange={(e) => setEmail(e.currentTarget.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Войти
                    </Button> <Button variant="primary" onClick={registerHandler}>
                        Зарегестрироваться
                    </Button>
                </Form>
                {showRegister && < RegisterForm show={showRegister} onHide={clouseHandler} />}
            </main>
        </div>
    )
};


export default observer(Auth);

export async function getServerSideProps() {
    const pages = await getMenuPages();

    return {
        props: {
            Pages: pages,
            headData: { title: "Авторизация", description: "Описание страницы" },
        },
    };
}