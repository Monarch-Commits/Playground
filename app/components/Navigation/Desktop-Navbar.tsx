'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pages } from '@/Constant/ConstantLink';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from '@kinde-oss/kinde-auth-nextjs';

export default function DesktopNavbar() {
  const { user, isLoading } = useKindeBrowserClient(); // add signIn & signOut
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = pages.map((p) =>
      document.getElementById(p.href.replace('#', '')),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.6 },
    );

    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="relative flex w-full items-center justify-between">
      <div>
        <Link href="/">
          <Image
            src="https://drive.google.com/uc?export=view&id=1czPtHOnb06NAo-awhCgsOgO_uHXNEUVU"
            width={40}
            height={40}
            alt="Logo"
          />
        </Link>
      </div>

      {/* Navigation links */}
      <div className="hidden items-center gap-3 md:flex">
        {pages.map((p, index) => {
          const Icon = p.icon;
          const isActive = activeSection === p.href;

          return (
            <Link key={index} href={p.href}>
              <Button
                variant="ghost"
                className={`font-medium transition-all duration-300 ${
                  isActive
                    ? 'scale-105 bg-pink-700 text-white'
                    : 'text-gray-700 hover:text-pink-400'
                }`}
              >
                <Icon /> {p.name}
              </Button>
            </Link>
          );
        })}
      </div>

      {/* User / Cart / Wishlist */}
      <div className="flex items-center gap-4">
        {/* Conditional User / Sign In */}
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="rounded-full bg-pink-50 p-2 text-pink-500"
            >
              <ShoppingBag size={20} />
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
