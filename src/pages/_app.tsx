import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>香港馬拉松活動 - Hong Kong Marathon Events</title>
        <meta name="description" content="香港最完整的馬拉松和跑步活動資訊，提供活動詳情、報名連結和相關資訊。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="馬拉松, 香港, 跑步, 活動, 報名, marathon, hong kong, running, events" />
        <meta name="author" content="香港馬拉松活動平台" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marathonhk.com/" />
        <meta property="og:title" content="香港馬拉松活動 - Hong Kong Marathon Events" />
        <meta property="og:description" content="香港最完整的馬拉松和跑步活動資訊，提供活動詳情、報名連結和相關資訊。" />
        <meta property="og:image" content="/hero-image.webp" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://marathonhk.com/" />
        <meta property="twitter:title" content="香港馬拉松活動 - Hong Kong Marathon Events" />
        <meta property="twitter:description" content="香港最完整的馬拉松和跑步活動資訊，提供活動詳情、報名連結和相關資訊。" />
        <meta property="twitter:image" content="/hero-image.webp" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Language */}
        <meta httpEquiv="content-language" content="zh-HK" />
        <link rel="alternate" hrefLang="zh-HK" href="https://marathonhk.com/" />
        <link rel="alternate" hrefLang="zh-CN" href="https://marathonhk.com/" />
        <link rel="alternate" hrefLang="zh-TW" href="https://marathonhk.com/" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

