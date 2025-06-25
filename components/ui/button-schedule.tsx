'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function ButtonWithSchedule() {
  const pathname = usePathname();
  const isActive = pathname === '/schedule';

  return (
    <Link href="/schedule" passHref>
      <Button
        variant={isActive ? 'default' : 'secondary'}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Calendar className="w-4 h-4" />
        Scheduled To-Dos
      </Button>
    </Link>
  );
}
