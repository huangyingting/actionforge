import type { Metadata, Viewport } from 'next';
import '../styles/base.css';
import '../styles/library.css';

export const metadata: Metadata = {
  title: 'ActionForge – Character Animation in Your Browser',
  description: 'Edit, blend, rig and export game-ready character animations in your browser.',
  manifest: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/manifest.webmanifest`,
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/assets/app-icons/icon-32.png`,
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/assets/app-icons/icon-180.png`,
  },
};

export const viewport: Viewport = { themeColor: '#0a0a0a' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
