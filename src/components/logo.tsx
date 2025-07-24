
import Link from 'next/link';
import { Pill } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  textClassName?: string;
}

const Logo = ({ className, textClassName }: LogoProps) => {
  return (
    <Link href="/" passHref>
      <div className={cn("flex items-center gap-2 cursor-pointer", className)}>
        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
          <Pill className="h-6 w-6" />
        </div>
        <span className={cn(
          "text-2xl font-bold font-headline text-primary hidden sm:inline",
          textClassName
        )}>
          E-parma
        </span>
      </div>
    </Link>
  );
};

export default Logo;
