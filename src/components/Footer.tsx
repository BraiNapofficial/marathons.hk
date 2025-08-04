import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { name: '首頁', href: '/' },
    { name: '活動', href: '/events' },
    { name: '關於我們', href: '/about' },
    { name: '聯絡我們', href: '/contact' }
  ];

  const eventCategories = [
    { name: '馬拉松', href: '/events?category=marathon' },
    { name: '半程馬拉松', href: '/events?category=half-marathon' },
    { name: '10公里跑', href: '/events?category=10k' },
    { name: '5公里跑', href: '/events?category=5k' },
    { name: '越野跑', href: '/events?category=trail' }
  ];

  const supportLinks = [
    { name: '常見問題', href: '/faq' },
    { name: '報名指南', href: '/guide' },
    { name: '活動條款', href: '/terms' },
    { name: '隱私政策', href: '/privacy' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' }
  ];

  const legalLinks = [
    { name: '使用條款', href: '/terms' },
    { name: '隱私政策', href: '/privacy' },
    { name: 'Cookie 政策', href: '/cookies' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-accent mb-4">香港馬拉松</h3>
            <p className="text-muted-foreground mb-6 text-sm">
              香港最完整的跑步活動資訊平台，連接跑步愛好者，分享跑步的快樂。
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-accent" />
                <span>info@marathonhk.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-accent" />
                <span>+852 1234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                <span>香港中環</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">平台導覽</h4>
            <ul className="space-y-2">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">活動分類</h4>
            <ul className="space-y-2">
              {eventCategories.map((category) => (
                <li key={category.name}>
                  <Link 
                    href={category.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">支援服務</h4>
            <ul className="space-y-2 mb-6">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h5 className="font-semibold text-foreground mb-3">關注我們</h5>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className={`text-muted-foreground ${social.color} transition-colors`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} 香港馬拉松活動平台. 版權所有.
            </p>
            
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

