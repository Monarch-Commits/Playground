import { LuHouse } from 'react-icons/lu';
// import {
//   IoBriefcaseOutline,
//   IoCodeSlash,
// } from 'react-icons/io5';
import type { IconType } from 'react-icons';
import { GoBriefcase } from 'react-icons/go';
export interface PageItem {
  name: string;
  href: string;
  icon: IconType;
}

export const pages: PageItem[] = [
  { name: 'Home', href: '/', icon: LuHouse },
  { name: 'Seller Dashboard', href: '/SellerDashboard', icon: GoBriefcase },
  // { name: 'Skills', href: '#Skills', icon: IoCodeSlash },
  // { name: 'Experience', href: '#Experience', icon: IoBriefcaseOutline },
];