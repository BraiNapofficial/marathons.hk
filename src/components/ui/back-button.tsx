import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className="flex justify-center mt-12 mb-8">
      <Button
        size="lg"
        variant="outline"
        onClick={handleClick}
        className="px-8 py-3 text-lg font-semibold transition-all duration-300 border-accent text-accent hover:bg-accent hover:text-white btn-hover"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        返回首頁
      </Button>
    </div>
  );
};

export default BackButton;