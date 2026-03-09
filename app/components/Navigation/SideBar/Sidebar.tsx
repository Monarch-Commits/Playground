"use server";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import syncUser from "@/app/actions/User/syncUser.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import Image from "next/image";

import { pages } from "@/Constant/ConstantLink";
import CreateOrEditProduct from "../../Seller/Create/Create";

export async function AppSidebar() {
  const user = await syncUser();

  return (
    <Sidebar>
      {/* Logo */}
      <SidebarHeader className="p-4">
        <Link href="/">
          <Image
            src="https://drive.google.com/uc?export=view&id=1czPtHOnb06NAo-awhCgsOgO_uHXNEUVU"
            width={40}
            height={40}
            alt="Logo"
          />
        </Link>
      </SidebarHeader>

      {/* Menu Items */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {/* Create button only if logged in */}
            {user && <CreateOrEditProduct />}

            {/* Map pages */}
            {pages.map((p) => {
              const Icon = p.icon;

              // Logged-out user → show only Home
              if (!user && p.name !== "Home") return null;

              return (
                <SidebarMenuItem key={p.name}>
                  <SidebarMenuButton asChild>
                    <Link href={p.href} className="flex items-center gap-2">
                      <Icon /> <span>{p.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* User Footer */}
      <SidebarFooter className="border-t p-4">
        {user ? (
          <div className="flex flex-col gap-4">
            {/* User Info */}
            <div className="flex items-center gap-3 px-2">
              <Avatar className="h-9 w-9 border">
                <AvatarImage src={user.imageUrl ?? ""} alt={user.name || "User"} />
                <AvatarFallback>{user.email?.[0].toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate">{user.name?.toLowerCase()}</span>
                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
              </div>
            </div>

            {/* Logout button */}
            <LogoutLink>
              <Button variant="destructive" size="sm" className="w-full">
                Logout
              </Button>
            </LogoutLink>
          </div>
        ) : (
          <LoginLink className="w-full">
            <Button variant="default" size="sm" className="w-full">
              Login
            </Button>
          </LoginLink>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}