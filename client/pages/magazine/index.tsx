import { observer } from "mobx-react";
import HeadPage from "../../components/headPage";
import SearchBlock from "../../components/searchBlock";
import { getMenuPages } from "../../lib/globals";
import styles from '../../styles/Home.module.css';

const Magazine = ({ headData }: any) => {
    return (
        <div>
            <HeadPage title={headData.title} description={headData.description} />
            <SearchBlock />
            <main className={styles.main}>


            </main>
        </div>
    )
};


export default observer(Magazine);

export async function getServerSideProps() {
    const pages = await getMenuPages();

    return {
        props: {
            Pages: pages,
            headData: { title: "Магазин", description: "Описание страницы" },
        },
    };
}