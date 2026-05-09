import DesktopNavbar from './Desktop-Navbar';
import MobileNavbar from './Mobile-Navbar';

export function Navigation() {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-white/80 px-6 py-2 transition-all duration-300 md:px-16 md:py-4">
      <DesktopNavbar />
      <MobileNavbar />
    </nav>
  );
}
