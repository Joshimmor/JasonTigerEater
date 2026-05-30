import CornerNav from '@/components/CornerNav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>{`html, body { margin: 0; padding: 0; }`}</style>
      </head>
      <body>
        <CornerNav />   
        {children}
      </body>
    </html>
  );
}