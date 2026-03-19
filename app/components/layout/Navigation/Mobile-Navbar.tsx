'use client';
import Link from 'next/link';
import { IoMenuSharp } from 'react-icons/io5';
import { ShoppingBag, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from '@kinde-oss/kinde-auth-nextjs';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { pages } from '@/Constant/ConstantLink';

export default function MobileNavbar() {
  const { user } = useKindeBrowserClient();

  return (
    <div className="flex items-center justify-center md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg p-2 transition-colors hover:bg-pink-50 hover:text-pink-600"
            aria-label="Open menu"
          >
            <IoMenuSharp size={24} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="flex w-52 flex-col rounded-xl border border-gray-100 p-2 shadow-lg md:hidden">
          {pages.map((p, idx) => (
            <DropdownMenuItem key={idx} asChild>
              <Link
                href={p.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-pink-50 hover:text-pink-600"
              >
                <p.icon className="h-5 w-5" />
                <span className="font-medium">{p.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}

          <div className="mt-3 flex flex-col items-start gap-3 border-t border-gray-100 pt-3">
            {user ? (
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-3">
                  <Link
                    href="/cart"
                    className="rounded-full bg-pink-50 p-2 text-pink-500 transition-colors hover:bg-pink-100"
                  >
                    <ShoppingBag size={20} />
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <Link href="/profile">
                    <Avatar className="h-7 w-7 ring-1 ring-pink-300 md:h-10 md:w-10">
                      <AvatarImage
                        src={user.picture || 'https://github.com/shadcn.png'}
                        alt={user.given_name || 'User Avatar'}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>

                  <LogoutLink>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-orange-600 transition-colors hover:bg-orange-50 hover:text-orange-700"
                    >
                      <LogOut size={16} /> Logout
                    </Button>
                  </LogoutLink>
                </div>
              </div>
            ) : (
              <LoginLink>
                <Button
                  variant="default"
                  size="sm"
                  className="w-full bg-orange-500 text-white transition-colors hover:bg-orange-600"
                >
                  Sign In
                </Button>
              </LoginLink>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
