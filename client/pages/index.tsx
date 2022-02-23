import type { NextPage } from 'next'
import styles from '../styles/Home.module.css';
import HeadPage from '../components/headPage';
import SliderMainPage from '../components/sliderMainPage';
import SearchBlock from '../components/searchBlock';
import StaticIconsBlock from '../components/staticIconsBlock';
import MiniBannersBlock from '../components/miniBannersBlock';
import NewProductsBlock from '../components/newProductsBlock';
import { getLatest20Products, getMenuPages } from '../lib/globals';

const Home = ({ headData, newProducts }: any) => {
  return (
    <div>
      <HeadPage title={headData.title} description={headData.description} />
      <main className={styles.main}>
        <SliderMainPage />
        <SearchBlock />
        <StaticIconsBlock />
        <MiniBannersBlock />
        <NewProductsBlock newProducts={newProducts} />
      </main>
    </div>
  )
};


export default Home;

export async function getServerSideProps() {

  const pages = await getMenuPages();

  const products = await getLatest20Products();

  return {
    props: {
      Pages: pages,
      headData: { title: "Главная", description: "Описание страницы" },
      newProducts: products.getLastNewsProducts,
    },
  };
}