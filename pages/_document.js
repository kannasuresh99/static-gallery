import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from '@material-ui/styles';
import flush from 'styled-jsx/server';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href="/img/brand/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/img/brand/apple-icon.png"
          />
          <link href='https://fonts.googleapis.com/css?family=Aclonica' rel='stylesheet'></link>
          <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet'></link>
        </Head>
        <body className="text-blueGray-700 antialiased">
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {

  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
      originalRenderPage({
          enhanceApp: App => props => sheets.collect(<App {...props} />),
      });

  const initialProps = await Document.getInitialProps(ctx);

  return {
      ...initialProps,
      styles: (
          <React.Fragment>
              {sheets.getStyleElement()}
              {flush() || null}
          </React.Fragment>
      ),
  };
};

export default MyDocument;
