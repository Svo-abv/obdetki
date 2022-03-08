import { observer } from "mobx-react";
import HeadPage from "../components/headPage";
import { getMenuPages, getPageData } from "../lib/globals";
import styles from '../styles/Contacts.module.css';

const Contacts = ({ headData }: any) => {
    return (
        <div>
            <HeadPage title={headData.title} description={headData.description} />
            <main className={styles.main}>
                <h2>{headData.title} </h2>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: headData.content }} ></div>
                <script type="text/javascript" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?sid=9m8cvaWEencGK-DdTk02Z_cSoOJfvc8m&amp;width=100%25&amp;height=400&amp;lang=ru_RU&amp;sourceType=constructor&amp;scroll=true"></script>
            </main>
        </div>
    )
};


export default observer(Contacts);

export async function getServerSideProps() {
    const pages = await getMenuPages();

    const { getPageById } = await getPageData(4);

    return {
        props: {
            Pages: pages,
            headData: { title: getPageById.title, description: getPageById.description, content: getPageById.content },
        },
    };
}