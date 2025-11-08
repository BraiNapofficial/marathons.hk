import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const siteUrl = 'https://marathons.hk'
  const siteTitle = '足•包 - 香港馬拉松 | marathons.hk'
  const siteDescription =
    '足•包是香港最全面的馬拉松和跑步活動資訊平台。提供最新香港馬拉松賽事、半程馬拉松、10K跑步活動資訊及即時報名連結。'

  const organizationJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '足•包 marathons.hk',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@marathons.hk',
    },
    sameAs: [],
  }

  return (
    <React.Fragment>
      <Head>
        <title>{String(siteTitle)}</title>
        <meta name="description" content={siteDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="香港馬拉松,馬拉松活動,跑步比賽,半程馬拉松,10K跑,香港跑步,馬拉松報名,足包"
        />
        <meta name="author" content="足•包 marathons.hk" />


        {/* Hreflang */}
        <meta httpEquiv="content-language" content="zh-HK" />
        <link rel="alternate" hrefLang="zh-HK" href={`${siteUrl}/`} />
        <link rel="alternate" hrefLang="zh-CN" href={`${siteUrl}/`} />
        <link rel="alternate" hrefLang="zh-TW" href={`${siteUrl}/`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta property="og:title" content="足•包 - 香港馬拉松" />
        <meta property="og:site_name" content="足•包 marathons.hk" />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={`${siteUrl}/hero-image.webp`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="足•包 - 香港馬拉松活動平台主圖" />
        <meta property="og:locale" content="zh_HK" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${siteUrl}/`} />
        <meta property="twitter:title" content="足•包 - 香港馬拉松" />
        <meta property="twitter:description" content={siteDescription} />
        <meta property="twitter:image" content={`${siteUrl}/hero-image.webp`} />
        <meta property="twitter:image:alt" content="足•包 - 香港馬拉松活動平台主圖" />
        <meta property="twitter:domain" content="marathons.hk" />
        {/* Add your Twitter handle here when available */}
        {/* <meta property="twitter:site" content="@yourusername" /> */}
        {/* <meta property="twitter:creator" content="@yourusername" /> */}

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* PNG links removed until logo assets are ready to avoid 404s */}
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> */}
        {/* <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}

        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          // Ensure consistent canonical domain only
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  )
}

