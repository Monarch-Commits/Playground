import DesktopNavbar from './Desktop-Navbar';
import MobileNavbar from './Mobile-Navbar';

export function Navigation() {
  return (
    <div className="fixed top-0 z-40 flex w-full items-center justify-between border-b border-gray-100 bg-white/80 px-2 py-4 sm:px-8">
      <DesktopNavbar />
      <MobileNavbar />
    </div>
  );
}
