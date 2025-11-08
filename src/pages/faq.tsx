import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Mail } from 'lucide-react';
import Footer from '@/components/Footer';
import BackButton from '@/components/ui/back-button';

const FAQPage = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: '如何報名參加活動？',
      answer: '點擊活動卡片上的「立即報名」按鈕，您將被導向到主辦方的官方報名頁面。請按照主辦方的指示完成報名程序。'
    },
    {
      question: '活動資訊多久更新一次？',
      answer: '我們每天都會更新活動資訊，確保您獲得最新、最準確的活動詳情。如發現任何錯誤資訊，請立即聯絡我們。'
    },
    {
      question: '可以提交新的活動資訊嗎？',
      answer: '當然可以！如果您知道任何我們尚未收錄的跑步活動，歡迎透過聯絡表單或電子郵件告訴我們。'
    },
    {
      question: '是否提供活動提醒服務？',
      answer: '目前我們正在開發活動提醒功能，敬請期待。您可以關注我們的社交媒體獲取最新活動資訊。'
    }
  ];

  return (
    <>
      <Head>
        <title>常見問題 - 足•包 | marathons.hk</title>
        <meta name="description" content="查看香港馬拉松活動平台的常見問題，獲得活動報名、資訊更新等相關解答。" />
        <link rel="canonical" href="https://marathons.hk/faq/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marathons.hk/faq/" />
        <meta property="og:title" content="常見問題 - 足•包 | marathons.hk" />
        <meta property="og:description" content="查看香港馬拉松活動平台的常見問題，獲得活動報名、資訊更新等相關解答。" />
        <meta property="og:image" content="https://marathons.hk/hero-image.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="足•包 - 香港馬拉松活動平台常見問題頁面" />
        <meta property="og:site_name" content="足•包 marathons.hk" />
        <meta property="og:locale" content="zh_HK" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://marathons.hk/faq/" />
        <meta name="twitter:title" content="常見問題 - 足•包 | marathons.hk" />
        <meta name="twitter:description" content="查看香港馬拉松活動平台的常見問題，獲得活動報名、資訊更新等相關解答。" />
        <meta name="twitter:image" content="https://marathons.hk/hero-image.webp" />
        <meta name="twitter:image:alt" content="足•包 - 香港馬拉松活動平台常見問題頁面" />
        <meta name="twitter:domain" content="marathons.hk" />
        {/* Add your Twitter handle here when available */}
        {/* <meta name="twitter:site" content="@yourusername" /> */}
        {/* <meta name="twitter:creator" content="@yourusername" /> */}
      </Head>

      <main className="min-h-screen bg-background">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h1 className="text-3xl md:text-4xl font-display text-foreground mb-4">
                  常見問題
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  找不到您想要的答案？隨時透過我們的聯絡頁面與我們聯繫
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardHeader 
                      className="cursor-pointer"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-foreground">{faq.question}</CardTitle>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-accent" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-accent" />
                        )}
                      </div>
                    </CardHeader>
                    {expandedFaq === index && (
                      <CardContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                  還有其他問題？
                </p>
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 h-10 px-4 py-2 gap-2"
                >
                  <Mail className="w-4 h-4" />
                  聯絡我們
                </Link>
              </div>
              <BackButton />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default FAQPage;