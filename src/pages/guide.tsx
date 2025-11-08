import Head from 'next/head';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, AlertCircle, Lightbulb, CheckCircle } from 'lucide-react';
import BackButton from '@/components/ui/back-button';

export default function GuidePage() {
  return (
    <>
      <Head>
        <title>馬拉松報名指南｜香港跑步活動報名教學</title>
        <meta name="description" content="一文了解如何報名香港各大馬拉松及跑步活動，包括報名流程、注意事項、常見問題及官方連結。" />
        <link rel="canonical" href="https://marathons.hk/guide/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://marathons.hk/guide/" />
        <meta property="og:title" content="馬拉松報名指南｜香港跑步活動報名教學" />
        <meta property="og:description" content="一文了解如何報名香港各大馬拉松及跑步活動，包括報名流程、注意事項、常見問題及官方連結。" />
        <meta property="og:image" content="https://marathons.hk/hero-image.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="足•包 - 香港馬拉松報名指南頁面" />
        <meta property="og:site_name" content="足•包 marathons.hk" />
        <meta property="og:locale" content="zh_HK" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://marathons.hk/guide/" />
        <meta name="twitter:title" content="馬拉松報名指南｜香港跑步活動報名教學" />
        <meta name="twitter:description" content="一文了解如何報名香港各大馬拉松及跑步活動，包括報名流程、注意事項、常見問題及官方連結。" />
        <meta name="twitter:image" content="https://marathons.hk/hero-image.webp" />
        <meta name="twitter:image:alt" content="足•包 - 香港馬拉松報名指南頁面" />
        <meta name="twitter:domain" content="marathons.hk" />
        {/* Add your Twitter handle here when available */}
        {/* <meta name="twitter:site" content="@yourusername" /> */}
        {/* <meta name="twitter:creator" content="@yourusername" /> */}
      </Head>

      <main className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display text-foreground mb-8 text-center">
              馬拉松報名指南
            </h1>
            
            <div className="text-center mb-12">
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                無論你是初次挑戰馬拉松的新手，還是經驗豐富的跑手，本指南將帶你一步步了解如何報名香港的跑步活動。
              </p>
            </div>
            
            <div className="space-y-8">
              {/* Registration Process */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-accent" />
                    報名流程
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent font-semibold text-sm">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">瀏覽活動列表</h3>
                        <p className="text-muted-foreground">前往 <Link href="/events/" className="text-accent hover:underline">馬拉松活動頁面</Link>，選擇你想參加的賽事。</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent font-semibold text-sm">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">查看詳情</h3>
                        <p className="text-muted-foreground">點擊活動名稱了解日期、地點及距離。</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent font-semibold text-sm">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">前往官方報名網站</h3>
                        <p className="text-muted-foreground">按下「立即報名」按鈕，我們會引導你至主辦單位的官方報名頁面。</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent font-semibold text-sm">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">完成報名及付款</h3>
                        <p className="text-muted-foreground">按照主辦方指示完成登記及付款。</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Important Notes */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-amber-500" />
                    注意事項
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>請確保所有個人資料正確無誤。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>名額有限，建議提前報名。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>如報名後需取消，請參考主辦單位條款。</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Tips */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-amber-500" />
                    小貼士
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>追蹤我們的最新活動更新，掌握早鳥優惠。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>建議先檢查你的健康狀況，選擇合適距離。</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <BackButton />
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}