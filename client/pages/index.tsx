import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import HeadPage from '../components/headPage';
import SliderMainPage from '../components/sliderMainPage';
import SearchBlock from '../components/searchBlock';
import StaticIconsBlock from '../components/staticIconsBlock';
import MiniBannersBlock from '../components/miniBannersBlock';
import NewProductsBlock from '../components/newProductsBlock';

export default function Home({ countries, headData }: any) {
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
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries.slice(0, 4),
      headData: { title: "Главная", description: "Описание страницы" }
    },
  };
}