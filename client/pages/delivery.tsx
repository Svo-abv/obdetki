import { gql } from "@apollo/client";
import { observer } from "mobx-react";
import client from "../apollo-client";
import HeadPage from "../components/headPage";
import { getMenuPages, getPageData } from "../lib/globals";
import styles from '../styles/Home.module.css';

const Delivery = ({ headData }: any) => {
    return (
        <div>
            <HeadPage title={headData.title} description={headData.description} />
            <main className={styles.main}>
                <h2>{headData.title} </h2>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: headData.content }} ></div>
            </main>
        </div>
    )
};


export default observer(Delivery);

export async function getServerSideProps() {
    const pages = await getMenuPages();

    const { getPageById } = await getPageData(3);

    return {
        props: {
            Pages: pages,
            headData: { title: getPageById.title, description: getPageById.description, content: getPageById.content },
        },
    };
}