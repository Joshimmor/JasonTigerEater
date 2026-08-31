'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MobileNav = dynamic(() => import('./Nav'));
const DesktopNav = dynamic(() => import('./DesktopNav'));

export default function NavController() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Render nothing until viewport is known to avoid hydration mismatch
  if (isDesktop === null) return null;

  return isDesktop ? <DesktopNav /> : <MobileNav />;
}
