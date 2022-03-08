import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import HeadPage from "../components/headPage";
import { getMenuPages } from "../lib/globals";
import styles from '../styles/Contacts.module.css';
import { Context } from "./_app";

const UserPanel = ({ headData }: any) => {
    const navi = useRouter();
    const { user } = useContext(Context);
    const logoutHandler = async () => {
        localStorage.removeItem("JwtKey");
        user.isAuth = false;
        user.user = {};
        navi.push("/");
    }

    return (
        <div>
            <HeadPage title={headData.title} description={headData.description} />
            <main className={styles.main}>
                <Button onClick={logoutHandler}>Выйти</Button>
            </main>
        </div>
    )
};

export default observer(UserPanel);

export async function getServerSideProps() {
    const pages = await getMenuPages();

    return {
        props: {
            Pages: pages,
            headData: { title: "Кабинет", description: "Описание кабинета" },
        },
    };
}