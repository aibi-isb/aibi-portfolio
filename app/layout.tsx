import type { Metadata } from 'next';
import { createPageMetadata } from '../src/lib/metadata';
import { site } from '../src/content/site';
import '../src/index.css';

export const metadata: Metadata = {
  ...createPageMetadata(site.title, site.description),
  title: {
    default: site.title,
    template: `%s | ${site.brand}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
