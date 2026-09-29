import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'IB Studio — Ibrahim Bangura\'s Design and Development Portfolio',
  description: 'Portfolio of Ibrahim Bangura, showcasing design, frontend development, systems analysis, and data modelling work.',
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
