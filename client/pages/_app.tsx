import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import Header from "../src/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

const GlobalStyle = createGlobalStyle`
    html, body, #__next {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        min-height: 100%;
        box-sizing: border-box;
        overflow: hidden;
    }
    * {
        box-sizing: border-box;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
  `;
