import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { name: '首頁', href: '/' },
    { name: '活動', href: '/events' },
    { name: '關於我們', href: '/about' },
    { name: '聯絡我們', href: '/contact' }
  ];


  const supportLinks = [
    { name: '常見問題', href: '/faq' },
    { name: '報名指南', href: '/guide' },
    { name: '使用條款', href: '/terms' },
    { name: '隱私政策', href: '/privacy' }
  ];


  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Company Info - takes first column */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-accent mb-4">香港馬拉松</h3>
            <p className="text-muted-foreground mb-6 text-sm">
              香港最完整的跑步活動資訊平台，連接跑步愛好者，分享跑步的快樂。
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-accent" />
                <span>support@marathons.hk</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Instagram className="w-4 h-4 text-accent" />
                <a
                  href="https://www.instagram.com/marathonshk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  marathonshk
                </a>
              </div>
            </div>
          </div>

          {/* Right side container with Platform and Support Links */}
          <div className="flex flex-col md:flex-row lg:justify-end gap-8 lg:gap-12">
            {/* Platform Links */}
            <div className="lg:text-right">
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

            {/* Support Links */}
            <div className="lg:text-right">
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
              {/*
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
              */}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} 香港馬拉松活動平台. 版權所有.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

