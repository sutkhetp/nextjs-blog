import '../styles/global.css';
import Script from 'next/script'
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

export default function App({ Component, pageProps }) {

    return (
      <Layout home>
      <Component {...pageProps} />
      </Layout>
    );
  }