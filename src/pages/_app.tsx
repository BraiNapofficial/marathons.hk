import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  const siteUrl = 'https://marathons.hk'
  const siteTitle = '足•包 - 香港馬拉松 | marathons.hk'
  const siteDescription =
    '足•包是香港最全面的馬拉松和跑步活動資訊平台。提供最新香港馬拉松賽事、半程馬拉松、10K跑步活動資訊及即時報名連結。'

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="香港馬拉松,馬拉松活動,跑步比賽,半程馬拉松,10K跑,香港跑步,馬拉松報名,足包"
        />
        <meta name="author" content="足•包 marathons.hk" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta property="og:title" content="足•包 - 香港馬拉松" />
        <meta property="og:site_name" content="足•包 marathons.hk" />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content="/hero-image.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${siteUrl}/`} />
        <meta property="twitter:title" content="足•包 - 香港馬拉松" />
        <meta property="twitter:description" content={siteDescription} />
        <meta property="twitter:image" content="/hero-image.webp" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Language */}
        <meta httpEquiv="content-language" content="zh-HK" />
        <link rel="alternate" hrefLang="zh-HK" href={`${siteUrl}/`} />
        <link rel="alternate" hrefLang="zh-CN" href={`${siteUrl}/`} />
        <link rel="alternate" hrefLang="zh-TW" href={`${siteUrl}/`} />
        <link rel="canonical" href={`${siteUrl}/`} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

