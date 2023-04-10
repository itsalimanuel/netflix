import { Html, Head, Main, NextScript } from 'next/document'
import Header from './components/header/page'
import Footer from './components/footer'

export const metadata = {
  title: "Blog",
  openGraph: {
    title: "Blog",
  },
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Header/>
        <Main />
        <Footer/>
        <NextScript />
      </body>
    </Html>
  )
}
