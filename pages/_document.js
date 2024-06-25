import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from './compontes/Navbar'





export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="معلمك المثالي" />
        <meta name="author" content="سالم صلاح بن سواد" />
        <title>معلمك المثالي</title>

      <body>
        <Navbar/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
