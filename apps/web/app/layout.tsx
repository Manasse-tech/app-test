import './globals.css';
import type { ReactNode } from 'react';
import { NavBar } from './components/NavBar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
