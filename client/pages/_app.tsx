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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <SSRProvider>
        <ApolloProvider client={client}>
          {/* <StoreProvider {...pageProps}> */}
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ContactsTopBlock />
          <MainLogoBlock />
          <NavigationMenu props={pageProps} />
          <Component {...pageProps} />
          <FooterPage />
          {/* </StoreProvider> */}
        </ApolloProvider>
      </SSRProvider>
    </div>
  );
}

export default MyApp

