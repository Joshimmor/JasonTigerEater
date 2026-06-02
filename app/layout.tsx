import CornerNav from '@/components/CornerNav';
import localFont from 'next/font/local';
import Nav from '@/components/Nav';

const virtualRealm = localFont({
  src: '../public/fonts/VirtualRealm.ttf',
  variable: '--font-virtual-realm',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={virtualRealm.variable}>
      <head>
        <style>{`html, body { margin: 0; padding: 0; }`}</style>
      </head>
      <body>
        <Nav />   
        {children}
      </body>
    </html>
  );
}