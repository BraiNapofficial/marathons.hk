import Head from 'next/head';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import BackButton from '@/components/ui/back-button';

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>隱私政策｜marathons.hk</title>
        <meta name="description" content="marathons.hk 尊重並保障你的個人資料安全，遵守香港《個人資料(私隱)條例》，詳細說明資料收集與使用方式。" />
        <link rel="canonical" href="https://marathons.hk/privacy/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marathons.hk/privacy/" />
        <meta property="og:title" content="隱私政策｜marathons.hk" />
        <meta property="og:description" content="marathons.hk 尊重並保障你的個人資料安全，遵守香港《個人資料(私隱)條例》，詳細說明資料收集與使用方式。" />
        <meta property="og:image" content="https://marathons.hk/hero-image.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="足•包 - 香港馬拉松活動平台隱私政策頁面" />
        <meta property="og:site_name" content="足•包 marathons.hk" />
        <meta property="og:locale" content="zh_HK" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://marathons.hk/privacy/" />
        <meta name="twitter:title" content="隱私政策｜marathons.hk" />
        <meta name="twitter:description" content="marathons.hk 尊重並保障你的個人資料安全，遵守香港《個人資料(私隱)條例》，詳細說明資料收集與使用方式。" />
        <meta name="twitter:image" content="https://marathons.hk/hero-image.webp" />
        <meta name="twitter:image:alt" content="足•包 - 香港馬拉松活動平台隱私政策頁面" />
        <meta name="twitter:domain" content="marathons.hk" />
        {/* Add your Twitter handle here when available */}
        {/* <meta name="twitter:site" content="@yourusername" /> */}
        {/* <meta name="twitter:creator" content="@yourusername" /> */}
      </Head>

      <main className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display text-foreground mb-8 text-center">
              隱私政策
            </h1>
            
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="space-y-6 text-muted-foreground">
                  <p>
                    marathons.hk 非常重視你的私隱。我們依照香港《個人資料(私隱)條例》(PDPO) 處理所有用戶資料。
                  </p>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">1. 收集的資料</h2>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>訪問者的瀏覽紀錄（如頁面流量、裝置資訊）</li>
                      <li>Google Analytics 提供的匿名數據</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">2. 資料用途</h2>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>改善網站使用體驗</li>
                      <li>分析訪問量與熱門活動</li>
                      <li>優化內容及SEO</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">3. 資料保護</h2>
                    <p>
                      所有數據均透過安全連線（HTTPS）傳輸，我們不會出售、出租或洩露你的個人資料。
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">4. Cookie 使用</h2>
                    <p>
                      本站使用 Cookie 以記錄訪問偏好與流量統計。你可於瀏覽器中關閉 Cookie 功能。
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">5. 聯絡我們</h2>
                    <p>
                      如對本政策有任何疑問，請電郵至：<a href="mailto:support@marathons.hk" className="text-accent hover:underline">support@marathons.hk</a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <BackButton />
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}