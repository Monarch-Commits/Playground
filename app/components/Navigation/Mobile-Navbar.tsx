'use client';
import Link from 'next/link';
import { IoMenuSharp } from 'react-icons/io5';

import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { pages } from '@/Constant/ConstantLink';

export default function MobileNavbar() {
  return (
    <div className="flex items-center justify-center md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Open menu" size="icon">
            <IoMenuSharp />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48">
          {pages.map((p, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={p.href} className="flex w-full items-center gap-2">
                <p.icon />
                <span>{p.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
