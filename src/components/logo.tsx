import Link from 'next/link';
import { Pill } from 'lucide-react';

const Logo = () => {
  return (
    <Link href="/" passHref>
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
          <Pill className="h-6 w-6" />
        </div>
        <span className="text-2xl font-bold font-headline text-primary">
          E-pharma
        </span>
      </div>
    </Link>
  );
};

export default Logo;
