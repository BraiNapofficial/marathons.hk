import Head from 'next/head'
import Hero from '@/components/Hero'
import EventsSection from '@/components/EventsSection'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>香港馬拉松活動 - Hong Kong Marathon Events</title>
        <meta name="description" content="探索香港最完整的跑步活動資訊平台。從馬拉松到越野跑，從初學者到專業選手，找到最適合你的跑步活動。" />
        <meta name="keywords" content="馬拉松, 香港, 跑步, 活動, 報名, 半程馬拉松, 10公里, 5公里, 越野跑" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "香港馬拉松活動平台",
              "description": "香港最完整的馬拉松和跑步活動資訊平台",
              "url": "https://marathonhk.com",
              "logo": "https://marathonhk.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+852-1234-5678",
                "contactType": "customer service",
                "email": "info@marathonhk.com"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Hong Kong",
                "addressCountry": "HK"
              },
              "sameAs": [
                "https://www.facebook.com/marathonhk",
                "https://www.instagram.com/marathonhk",
                "https://twitter.com/marathonhk"
              ]
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-background">
        <Hero />
        <EventsSection />
        <AboutSection />
        <ContactSection />
      </main>
      
      <Footer />
    </>
  )
}

