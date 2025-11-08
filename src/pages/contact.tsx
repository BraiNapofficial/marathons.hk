import Head from 'next/head';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BackButton from '@/components/ui/back-button';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>聯絡我們 - 足•包 | marathons.hk</title>
        <meta name="description" content="有任何問題或建議？我們很樂意聽到您的聲音，讓我們一起讓香港跑步社群更加精彩" />
        <link rel="canonical" href="https://marathons.hk/contact/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marathons.hk/contact/" />
        <meta property="og:title" content="聯絡我們 - 足•包 | marathons.hk" />
        <meta property="og:description" content="有任何問題或建議？我們很樂意聽到您的聲音，讓我們一起讓香港跑步社群更加精彩" />
        <meta property="og:image" content="https://marathons.hk/hero-image.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="足•包 - 香港馬拉松活動平台聯絡我們頁面" />
        <meta property="og:site_name" content="足•包 marathons.hk" />
        <meta property="og:locale" content="zh_HK" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://marathons.hk/contact/" />
        <meta name="twitter:title" content="聯絡我們 - 足•包 | marathons.hk" />
        <meta name="twitter:description" content="有任何問題或建議？我們很樂意聽到您的聲音，讓我們一起讓香港跑步社群更加精彩" />
        <meta name="twitter:image" content="https://marathons.hk/hero-image.webp" />
        <meta name="twitter:image:alt" content="足•包 - 香港馬拉松活動平台聯絡我們頁面" />
        <meta name="twitter:domain" content="marathons.hk" />
        {/* Add your Twitter handle here when available */}
        {/* <meta name="twitter:site" content="@yourusername" /> */}
        {/* <meta name="twitter:creator" content="@yourusername" /> */}
      </Head>

      <main className="min-h-screen bg-background">
        <ContactSection />
        <BackButton />
      </main>
      
      <Footer />
    </>
  );
}