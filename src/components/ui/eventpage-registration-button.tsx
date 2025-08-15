import { Button } from '@/components/ui/button';
import { EventDetail } from '@/types/event';
import { ExternalLink, Clock, CheckCircle, XCircle } from 'lucide-react';

interface RegistrationButtonProps {
  event: EventDetail;
}

const RegistrationButton: React.FC<RegistrationButtonProps> = ({ event }) => {
  const getButtonConfig = () => {
    switch (event.status) {
      case 'registration_open':
        return {
          text: '立即報名',
          variant: 'default' as const,
          icon: <ExternalLink className="w-4 h-4 ml-2" />,
          disabled: false,
          className: 'bg-accent hover:bg-accent/90 text-white'
        };
      case 'registration_closed':
        return {
          text: '報名已截止',
          variant: 'outline' as const,
          icon: <Clock className="w-4 h-4 ml-2" />,
          disabled: true,
          className: 'border-muted text-muted-foreground'
        };
      case 'completed':
        return {
          text: '活動已結束',
          variant: 'outline' as const,
          icon: <CheckCircle className="w-4 h-4 ml-2" />,
          disabled: true,
          className: 'border-muted text-muted-foreground'
        };
      case 'cancelled':
        return {
          text: '活動已取消',
          variant: 'outline' as const,
          icon: <XCircle className="w-4 h-4 ml-2" />,
          disabled: true,
          className: 'border-destructive text-destructive'
        };
      default:
        return {
          text: '即將開始報名',
          variant: 'outline' as const,
          icon: <Clock className="w-4 h-4 ml-2" />,
          disabled: true,
          className: 'border-muted text-muted-foreground'
        };
    }
  };

  const config = getButtonConfig();

  const handleClick = () => {
    if (event.registration_url && !config.disabled) {
      window.open(event.registration_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Button
      size="lg"
      variant={config.variant}
      disabled={config.disabled}
      onClick={handleClick}
      className={`w-full sm:w-auto px-8 py-3 text-lg font-semibold transition-all duration-300 ${config.className} ${
        !config.disabled ? 'btn-hover' : ''
      }`}
    >
      {config.text}
      {config.icon}
    </Button>
  );
};

export default RegistrationButton;