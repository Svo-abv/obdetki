import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import HeadPage from "../../components/headPage";
import ProductsList from "../../components/productsList";
import SearchBlock from "../../components/searchBlock";
import { getMenuPages, getSearchProducts } from "../../lib/globals";
import styles from '../../styles/Home.module.css';
import classes from '../../styles/Magazine.module.css'

const Product = ({ headData }: any) => {
    // const [isLoading, setIsLoading] = useState(true);
    // const { query } = useRouter();
    // const [productList, setProductList] = useState([]);

    // useEffect(() => {
    //     query.search && getSearchProducts(query.search)
    //         .then((data) => (setProductList(data.getSearchProducts)))
    //         .finally(() => setIsLoading(false));
    // }, []);

    return (
        <div>
            <HeadPage title={headData.title} description={headData.description} />
            <SearchBlock />
            <main className={styles.main}>

            </main>
        </div>
    )
};


export default Product;

export async function getServerSideProps() {
    const pages = await getMenuPages();

    return {
        props: {
            Pages: pages,
            headData: { title: "Продукт", description: "Описание страницы" },
        },
    };
}