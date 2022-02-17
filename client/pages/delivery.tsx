import { gql } from "@apollo/client";
import { observer } from "mobx-react";
import client from "../apollo-client";
import HeadPage from "../components/headPage";
import styles from '../styles/Home.module.css';

const Home = ({ headData }: any) => {
    return (
        <div>
            <HeadPage title={headData.title} description={headData.description} />
            <main className={styles.main}>

            </main>
        </div>
    )
};


export default observer(Home);

export async function getServerSideProps() {
    const { data } = await client.query({
        query: gql`
        query Pages{
            getAllPages {
                id
                title
                url
            }
        }
    `,
    });
    return {
        props: {
            Pages: data.getAllPages,
            headData: { title: "Доставка", description: "Описание страницы" },
        },
    };
}