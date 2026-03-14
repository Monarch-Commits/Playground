import type { IconType } from 'react-icons';
import { LuHouse } from 'react-icons/lu';
import { GoBriefcase } from 'react-icons/go';
import { MdLocalFlorist } from 'react-icons/md';

export interface PageItem {
  name: string;
  href: string;
  icon: IconType;
}

export const pages: PageItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: LuHouse,
  },
  {
    name: 'Shop',
    href: '/shop',
    icon: MdLocalFlorist,
  },
  {
    name: 'Occasions',
    href: '/occasions',
    icon: MdLocalFlorist,
  },

  {
    name: 'Seller Dashboard',
    href: '/SellerDashboard',
    icon: GoBriefcase,
  },
];
