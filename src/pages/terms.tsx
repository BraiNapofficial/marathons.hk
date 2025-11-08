import Head from 'next/head';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import BackButton from '@/components/ui/back-button';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>活動條款｜marathons.hk 香港馬拉松資訊平台</title>
        <meta name="description" content="marathons.hk 活動條款與免責聲明，保障用戶及主辦單位權益，確保所有資訊公開透明。" />
        <link rel="canonical" href="https://marathons.hk/terms/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marathons.hk/terms/" />
        <meta property="og:title" content="活動條款｜marathons.hk 香港馬拉松資訊平台" />
        <meta property="og:description" content="marathons.hk 活動條款與免責聲明，保障用戶及主辦單位權益，確保所有資訊公開透明。" />
        <meta property="og:image" content="https://marathons.hk/hero-image.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="足•包 - 香港馬拉松活動平台條款頁面" />
        <meta property="og:site_name" content="足•包 marathons.hk" />
        <meta property="og:locale" content="zh_HK" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://marathons.hk/terms/" />
        <meta name="twitter:title" content="活動條款｜marathons.hk 香港馬拉松資訊平台" />
        <meta name="twitter:description" content="marathons.hk 活動條款與免責聲明，保障用戶及主辦單位權益，確保所有資訊公開透明。" />
        <meta name="twitter:image" content="https://marathons.hk/hero-image.webp" />
        <meta name="twitter:image:alt" content="足•包 - 香港馬拉松活動平台條款頁面" />
        <meta name="twitter:domain" content="marathons.hk" />
        {/* Add your Twitter handle here when available */}
        {/* <meta name="twitter:site" content="@yourusername" /> */}
        {/* <meta name="twitter:creator" content="@yourusername" /> */}
      </Head>

      <main className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display text-foreground mb-8 text-center">
              活動條款與免責聲明
            </h1>
            
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="space-y-6 text-muted-foreground">
                  <p>
                    感謝你使用 marathons.hk。本網站旨在提供香港馬拉松活動的資訊與報名連結。使用本網站即表示你同意以下條款：
                  </p>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">1. 活動資訊</h2>
                    <p>
                      所有活動資料均由官方或公開渠道提供，我們會盡力確保資訊準確，但不保證即時或完整。
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">2. 外部連結</h2>
                    <p>
                      marathons.hk 可能包含指向第三方網站的連結。這些網站並非我們所控制，對其內容或報名流程不承擔責任。
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">3. 免責聲明</h2>
                    <p>
                      本網站僅作為資訊平台，不參與任何活動主辦、報名或金錢交易。使用者需自行承擔報名風險與責任。
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">4. 內容更新</h2>
                    <p>
                      我們保留隨時修改或更新網站內容及條款的權利，恕不另行通知。
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