import { gql } from "@apollo/client";
import { observer } from "mobx-react";
import client from "../apollo-client";
import HeadPage from "../components/headPage";
import { getMenuPages } from "../lib/globals";
import styles from '../styles/Home.module.css';

const Auth = ({ headData }: any) => {
    return (
        <div>
            <HeadPage title={headData.title} description={headData.description} />
            <main className={styles.main}>

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