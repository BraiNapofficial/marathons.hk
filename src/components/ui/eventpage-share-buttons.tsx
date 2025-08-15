import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EventDetail } from '@/types/event';
import { Share2, Copy, Facebook, Twitter, MessageCircle, Check } from 'lucide-react';

interface ShareButtonsProps {
  event: EventDetail;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ event }) => {
  const [copied, setCopied] = useState(false);

  const eventUrl = typeof window !== 'undefined' ? window.location.href : '';
  const eventTitle = `${event.title_zh} - ${event.date}`;
  const eventDescription = `參加${event.title_zh}，地點：${event.location}`;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(eventTitle)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${eventTitle} ${eventUrl}`)}`
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <Card className="glass-effect border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          分享活動
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Social Media Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('facebook')}
              className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-blue-500/10 hover:border-blue-500/30"
            >
              <Facebook className="w-4 h-4 text-blue-500" />
              <span className="text-xs">Facebook</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('twitter')}
              className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-blue-400/10 hover:border-blue-400/30"
            >
              <Twitter className="w-4 h-4 text-blue-400" />
              <span className="text-xs">Twitter</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('whatsapp')}
              className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-green-500/10 hover:border-green-500/30"
            >
              <MessageCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs">WhatsApp</span>
            </Button>
          </div>

          {/* Copy Link Button */}
          <Button
            variant="outline"
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span>已複製連結</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>複製連結</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareButtons;