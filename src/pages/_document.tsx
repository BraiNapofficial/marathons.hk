import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh-HK">
      <Head>
        {/* Google Fonts - Noto Sans TC for Chinese */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/hero-image.webp" as="image" />
        
        {/* Additional meta tags */}
        <meta name="theme-color" content="#262626" />
        <meta name="msapplication-TileColor" content="#262626" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://marathons.hk/" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

