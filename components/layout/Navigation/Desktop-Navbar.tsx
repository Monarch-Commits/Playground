'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LogOut, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pages } from '@/Constant/ConstantLink';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from '@kinde-oss/kinde-auth-nextjs';
import { usePathname } from 'next/navigation';

interface DesktopNavbarProps {
  totalItems: number;
}

export default function DesktopNavbar({ totalItems }: DesktopNavbarProps) {
  const { user } = useKindeBrowserClient(); // add signIn & signOut
  const pathname = usePathname();
  const isActive = pathname === '/Cart';

  return (
    <div className="relative flex w-full items-center justify-between">
      <div>
        <Link href="/">
          <Image
            src="/logo/Rose.svg"
            alt="Logo"
            width={180}
            height={100}
            className="h-12 w-auto" // h-12 = 48px, width adjusts automatically
          />
        </Link>
      </div>

      {/* Navigation links */}
      <div className="hidden items-center gap-3 md:flex">
        {pages.map((p, index) => {
          const Icon = p.icon;
          const isActive = pathname === p.href;

          return (
            <Button
              key={index}
              className={`font-medium transition-all duration-300 ${
                isActive
                  ? 'scale-105 bg-pink-700 text-white'
                  : 'hover:text-pink-400'
              }`}
              variant="ghost"
            >
              <Link className="flex items-center gap-2" href={p.href}>
                <Icon /> {p.name}
              </Link>
            </Button>
          );
        })}
      </div>

      {/* User / Cart / Wishlist */}
      <div className="hidden items-center gap-4 md:flex">
        {/* Conditional User / Sign In */}
        {user ? (
          <div className="flex items-center gap-6">
            <Link
              href="/Cart"
              className="relative rounded-full p-2 transition-all hover:text-pink-400"
            >
              <ShoppingCart size={20} />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-700 text-xs text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link href="/profile">
              <Avatar className="h-10 w-10 ring-2 ring-pink-300">
                <AvatarImage
                  src={user.picture || 'https://github.com/shadcn.png'}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
            <LogoutLink>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 hover:bg-orange-50 hover:text-orange-600"
              >
                <LogOut size={16} /> Logout
              </Button>
            </LogoutLink>
          </div>
        ) : (
          <LoginLink>
            <Button
              variant="default"
              size="sm"
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              Sign In
            </Button>
          </LoginLink>
        )}
      </div>
    </div>
  );
}
