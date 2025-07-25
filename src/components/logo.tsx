
import Link from 'next/link';
import { Pill } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  textClassName?: string;
  iconSize?: string;
  textSize?: string;
  center?: boolean;
}

const Logo = ({ className, textClassName, iconSize = 'h-6 w-6', textSize = 'text-2xl', center = false }: LogoProps) => {
  return (
    <Link href="/" passHref>
      <div className={cn(
        "flex items-center gap-2 cursor-pointer",
        center && 'justify-center',
        className
      )}>
        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
          <Pill className={cn(iconSize)} />
        </div>
        <span className={cn(
          "font-bold font-headline text-primary hidden sm:inline",
          textSize,
          textClassName
        )}>
          Medfast
        </span>
      </div>
    </Link>
  );
};

export default Logo;
