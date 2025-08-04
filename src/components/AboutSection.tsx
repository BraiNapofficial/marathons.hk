import { Users, Target, Heart, Award, Zap } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Users,
      title: '1000+ 跑步愛好者',
      description: '已經加入我們的社群'
    },
    {
      icon: Target,
      title: '精準資訊',
      description: '提供最新、最準確的跑步活動資訊，讓你不錯過任何精彩賽事'
    },
    {
      icon: Heart,
      title: '社群連結',
      description: '連接香港跑步愛好者，建立活躍的跑步社群網絡'
    },
    {
      icon: Award,
      title: '專業服務',
      description: '專業的活動策劃和組織經驗，確保每場活動的品質'
    },
    {
      icon: Zap,
      title: '熱愛跑步',
      description: '由跑步愛好者為跑步愛好者打造的平台，分享跑步的快樂'
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
              關於我們
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              我們是一群熱愛跑步的香港人，致力於為本地跑步社群提供最完整的活動資訊平台
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                香港跑步社群的連結點
              </h3>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  香港馬拉松活動平台成立於2024年，我們深知香港跑步愛好者在尋找合適活動時面臨的挑戰。
                  分散的資訊、語言障礙、過時的網站設計，這些都阻礙了跑者們參與更多精彩活動。
                </p>
                
                <p>
                  因此，我們創建了這個以中文為主的專業平台，整合香港各類跑步活動資訊，
                  從馬拉松到越野跑，從初學者友善的5公里到挑戰性的超級馬拉松，
                  讓每位跑者都能輕鬆找到適合自己的活動。
                </p>
                
                <p>
                  我們不僅是資訊平台，更是香港跑步社群的連結點。
                  透過我們的平台，跑者們可以發現新的挑戰、結識志同道合的朋友、
                  分享跑步的喜悦，一起在香港這座美麗的城市中奔跑。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center p-6 rounded-lg bg-card border border-border card-hover">
                    <IconComponent className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mission Statement */}
          <div className="text-center bg-card border border-border rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">我們的使命</h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              讓每一位香港跑步愛好者都能輕鬆找到適合的活動，
              建立一個活躍、友善、互相支持的跑步社群，
              推動香港跑步文化的發展，讓更多人愛上跑步，享受運動帶來的快樂與健康。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

