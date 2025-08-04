import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const Hero = () => {
  const [eventCount, setEventCount] = useState(50);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventCount();
  }, []);

  const fetchEventCount = async () => {
    try {
      const { count } = await supabase
        .from('events')
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-6 text-shadow animate-fade-in-up">
            香港馬拉松活動
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-body text-shadow animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            探索香港最完整的跑步活動資訊平台
          </p>
          
          {/* Description */}
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto font-body text-shadow animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            從馬拉松到越野跑，從初學者到專業選手，找到最適合你的跑步活動。
            立即加入香港跑步社群，開始你的跑步旅程。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 text-lg transition-all btn-hover"
            >
              瀏覽活動
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg transition-colors btn-hover"
            >
              了解更多
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <div className="glass-effect rounded-lg p-6 text-center card-hover">
              <Calendar className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">
                {loading ? '...' : `${eventCount}+`}
              </div>
              <div className="text-white/80">即將舉行的活動</div>
            </div>
            
            <div className="glass-effect rounded-lg p-6 text-center card-hover">
              <MapPin className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">全港</div>
              <div className="text-white/80">覆蓋各區域</div>
            </div>
            
            <div className="glass-effect rounded-lg p-6 text-center card-hover">
              <Users className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">1000+</div>
              <div className="text-white/80">跑步愛好者</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

