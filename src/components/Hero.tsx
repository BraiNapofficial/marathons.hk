import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const Hero = () => {
  const [eventCount, setEventCount] = useState(50);
  const [loading, setLoading] = useState(true);

  // Log viewport info for debugging responsiveness
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Determine active breakpoint based on Tailwind defaults
      let breakpoint = 'xs';
      if (width >= 640) breakpoint = 'sm';
      if (width >= 768) breakpoint = 'md';
      if (width >= 1024) breakpoint = 'lg';
      if (width >= 1280) breakpoint = 'xl';
      if (width >= 1536) breakpoint = '2xl';
      
      console.log(`[Hero Responsiveness] Viewport: ${width}x${height}, Breakpoint: ${breakpoint}`);
      console.log('[Hero Responsiveness] Applied classes:', {
        h1: 'text-4xl md:text-5xl lg:text-6xl',
        subtitle: 'text-lg md:text-xl',
        description: 'text-base md:text-lg'
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchEventCount();
  }, []);

  const fetchEventCount = async () => {
    try {
      const { count } = await supabase
        .from('marathons.hk')
        .select('*', { count: 'exact', head: true });
      
      if (count) setEventCount(count);
    } catch (error) {
      console.error('Error fetching event count:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[50vh] md:min-h-[80vh] flex items-start md:items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-image.webp"
          alt="Running marathon in Hong Kong"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col justify-center items-center h-full pt-8 md:pt-0 pb-16 md:pb-0">
        <div className="max-w-4xl mx-auto w-full">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-2 md:mb-6 text-shadow-md animate-fade-in-up">
            香港馬拉松活動
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-4 md:mb-8 font-body leading-relaxed text-shadow-md animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            探索香港最完整的跑步活動資訊平台
          </p>
          
          {/* Description */}
          <p className="text-sm md:text-lg text-white/80 mb-6 md:mb-12 max-w-2xl mx-auto font-body leading-normal text-shadow-md animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            從馬拉松到越野跑，從初學者到專業選手，找到最適合你的跑步活動。
            立即加入香港跑步社群，開始你的跑步旅程。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 md:mb-12 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const el = document.getElementById('events');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  // Fallback: navigate to anchor if element not found (SSR hydration edge)
                  window.location.hash = 'events';
                }
              }}
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg transition-colors btn-hover"
            >
              瀏覽活動
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <div className="glass-effect rounded-lg p-3 sm:p-4 text-center card-hover">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-1 sm:mb-3" />
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                {loading ? '...' : `${eventCount}+`}
              </div>
              <div className="text-xs sm:text-sm text-white/80">即將舉行的活動</div>
            </div>
            
            <div className="glass-effect rounded-lg p-3 sm:p-4 text-center card-hover">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-1 sm:mb-3" />
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">全港</div>
              <div className="text-xs sm:text-sm text-white/80">覆蓋各區域</div>
            </div>
            
            <div className="glass-effect rounded-lg p-3 sm:p-4 text-center card-hover">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-1 sm:mb-3" />
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">1000+</div>
              <div className="text-xs sm:text-sm text-white/80">跑步愛好者</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - centered using flex and positioned near bottom */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="absolute bottom-2 md:bottom-8 animate-bounce pointer-events-auto">
          <div className="w-4 h-6 md:w-6 md:h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-1.5 md:w-1 md:h-3 bg-white/50 rounded-full mt-1 md:mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
