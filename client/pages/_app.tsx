import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import styles from '../styles/app.module.css'
import FooterPage from '../components/footerPage';
import ContactsTopBlock from '../components/contactsTopBlock';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLogoBlock from '../components/mainLogoBlock';
import NavigationMenu from '../components/navigationMenu';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import React, { createContext, } from 'react';
import UserStore from '../stores/userStore';


export const Context = createContext({
  user: new UserStore(),
});

//
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <SSRProvider>
        <ApolloProvider client={client}>
          <Context.Provider value={{ user: new UserStore(), }}>
            <Head>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <ContactsTopBlock />
            <MainLogoBlock />
            <NavigationMenu props={pageProps} />
            <Component {...pageProps} />
            <FooterPage />
          </Context.Provider>
        </ApolloProvider>
      </SSRProvider>
    </div >
  );
}

export default MyApp

