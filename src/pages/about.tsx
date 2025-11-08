import Head from 'next/head';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import BackButton from '@/components/ui/back-button';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>關於我們 | 香港馬拉松 - marathons.hk</title>
        <meta name="description" content="我們是一群熱愛跑步的香港人，致力於為本地跑步社群提供最完整的活動資訊平台，連結香港跑步愛好者，建立活躍的跑步社群網絡。" />
        <link rel="canonical" href="https://marathons.hk/about/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marathons.hk/about/" />
        <meta property="og:title" content="關於我們 | 香港馬拉松 - marathons.hk" />
        <meta property="og:description" content="我們是一群熱愛跑步的香港人，致力於為本地跑步社群提供最完整的活動資訊平台，連結香港跑步愛好者，建立活躍的跑步社群網絡。" />
        <meta property="og:image" content="https://marathons.hk/hero-image.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="足•包 - 香港馬拉松活動平台關於我們頁面" />
        <meta property="og:site_name" content="足•包 marathons.hk" />
        <meta property="og:locale" content="zh_HK" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://marathons.hk/about/" />
        <meta name="twitter:title" content="關於我們 | 香港馬拉松 - marathons.hk" />
        <meta name="twitter:description" content="我們是一群熱愛跑步的香港人，致力於為本地跑步社群提供最完整的活動資訊平台，連結香港跑步愛好者，建立活躍的跑步社群網絡。" />
        <meta name="twitter:image" content="https://marathons.hk/hero-image.webp" />
        <meta name="twitter:image:alt" content="足•包 - 香港馬拉松活動平台關於我們頁面" />
        <meta name="twitter:domain" content="marathons.hk" />
        {/* Add your Twitter handle here when available */}
        {/* <meta name="twitter:site" content="@yourusername" /> */}
        {/* <meta name="twitter:creator" content="@yourusername" /> */}
      </Head>

      <main className="min-h-screen bg-background">
        <AboutSection />
        <BackButton />
      </main>
      
      <Footer />
    </>
  );
}