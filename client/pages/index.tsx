import type { NextPage } from 'next'
import styles from '../styles/Home.module.css';
import HeadPage from '../components/headPage';
import SliderMainPage from '../components/sliderMainPage';
import SearchBlock from '../components/searchBlock';
import StaticIconsBlock from '../components/staticIconsBlock';
import MiniBannersBlock from '../components/miniBannersBlock';
import NewProductsBlock from '../components/newProductsBlock';
import client from '../apollo-client';
import { gql } from '@apollo/client';
import { useStore } from '../stores/StoreProvider';
import { observer } from 'mobx-react';

const Home = ({ headData }: any) => {
  return (
    <div>
      <HeadPage title={headData.title} description={headData.description} />
      <main className={styles.main}>
        <SliderMainPage />
        <SearchBlock />
        <StaticIconsBlock />
        <MiniBannersBlock />
        <NewProductsBlock />
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
      headData: { title: "Главная", description: "Описание страницы" },
    },
  };
}