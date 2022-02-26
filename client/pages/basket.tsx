import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { Button, CloseButton, Col, Container, Row, Spinner } from "react-bootstrap";
import HeadPage from "../components/headPage";
import { deleteRowBasket, getCartRowsByUser, getMenuPages } from "../lib/globals";
import styles from '../styles/Home.module.css';
import { Context } from "./_app";
import classes from '../styles/Basket.module.css';
import Image from "next/image";
import CartRows from "../components/cartRows";
import ConfirmOrder from "../components/ConfirmOrder";

const Basket = ({ headData }: any) => {
    const { user } = useContext(Context);
    const [currentCartRows, setCurrentCartRows] = useState([Object()]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        user.isAuth && getCartRowsByUser(user.user.id).then((data) => {
            setCurrentCartRows(data);
            console.log("fetch data....")
        }).finally(() => setIsLoading(false));

    }, [user.inCart]);

    return (
        <div>
            <HeadPage title={headData.title} description={headData.description} />
            <main className={styles.main}>
                {
                    !user.isAuth && <h5>Вы не авторизованы, пожалуйста авторизуйтесь!</h5>
                }
                {
                    isLoading ? <Spinner className={classes.spiner} animation="border" role="status" /> :
                        <CartRows userId={user.user.id} currentCartRows={currentCartRows} />
                }
                {
                    currentCartRows.length > 0 ? <ConfirmOrder /> : <h5>Ваша корзина пуста!</h5>
                }
            </main>
        </div>
    )
};


export default observer(Basket);

export async function getServerSideProps() {
    const pages = await getMenuPages();
    return {
        props: {
            Pages: pages,
            headData: { title: "Корзина", description: "Описание страницы" },
        },
    };
}