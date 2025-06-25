'use client';

import { SquareCheckBig } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ButtonWithCheckBox() {
  const pathname = usePathname();
  const isActive = pathname === '/todos';

  return (
    <Link href="/todos">
      <Button
        variant={isActive ? 'default' : 'secondary'}
        className="flex items-center gap-2 cursor-pointer"
      >
        <SquareCheckBig className="w-4 h-4" />
        Today’s To-Dos
      </Button>
    </Link>
  );
}
