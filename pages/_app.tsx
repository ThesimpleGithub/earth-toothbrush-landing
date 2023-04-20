import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import Head from 'next/head';
import structuredData from '../datas/structuredData';
import { useEffect } from 'react';
import { StyledEngineProvider } from '@mui/styled-engine-sc';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any) {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-6GM14X0QZW');
  }, []);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/favicon/지구칫솔_파비콘-removebg-preview.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/favicon/지구칫솔_파비콘-removebg-preview.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/favicon/지구칫솔_파비콘-removebg-preview.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/favicon/지구칫솔_파비콘-removebg-preview.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/favicon/지구칫솔_파비콘-removebg-preview.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/favicon/지구칫솔_파비콘-removebg-preview.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/favicon/지구칫솔_파비콘-removebg-preview.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/favicon/지구칫솔_파비콘-removebg-preview.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/지구칫솔_파비콘-removebg-preview.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/favicon/지구칫솔_파비콘-removebg-preview.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/지구칫솔_파비콘-removebg-preview.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon/지구칫솔_파비콘-removebg-preview.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/지구칫솔_파비콘-removebg-preview.ico"
          />
          <link rel="manifest" href="/favicon/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/favicon/지구칫솔_파비콘-removebg-preview.ico"
          />
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>지구를 구하는 지구 칫솔</title>
          <meta name="twitter:card" content="summary" />

          <meta name="twitter:title" content="지구를 구하는 지구칫솔입니다" />

          <meta
            name="twitter:description"
            content="지구를 구하는 소비습관 지구칫솔로 시작해보세요! 대나무 칫솔과 고체 치약으로 플라스틱 소비를 줄여 제로웨이스트를 실천해보세요!"
          />
          <meta
            name="twitter:image"
            content="https://thesimplegithub.github.io/earth-toothbrush-landing/images/thumbnail.png"
          />

          <meta name="twitter:site" content="https://earthbrush.kr" />
          <meta
            property="og:image"
            content="https://thesimplegithub.github.io/earth-toothbrush-landing/images/thumbnail.png"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="지구를 구하는 지구칫솔입니다" />
          <meta
            property="og:description"
            content="지구를 구하는 소비습관 지구칫솔로 시작해보세요! 대나무 칫솔과 고체 치약으로 플라스틱 소비를 줄여 제로웨이스트를 실천해보세요!"
          />
          <meta
            property="og:site_name"
            content="지구를 구하는 지구칫솔입니다"
          />
          <link rel="canonical" href="https://earthbrush.kr" />
          <meta
            name="description"
            content="지구를 구하는 소비습관 지구칫솔로 시작해보세요! 대나무 칫솔과 고체 치약으로 플라스틱 소비를 줄여 제로웨이스트를 실천해보세요!"
          />
          <meta
            name="naver-site-verification"
            content="3b357b2719ca9e382717d9cb15f7ea88c34dd91e"
          />
          <meta
            name="google-site-verification"
            content="sDYaqe1BQJNdTd6rUSqo6P9IesuKm9pXC9gZAUYJI24"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        </Head>
        <GlobalStyle />
        <div id="modal-root"></div>
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
