import React from 'react';
import type { Metadata } from 'next';
import '@/styles/reset.css';
import '@/styles/globals.css';
import Providers from '@/app/providers';

export const metadata: Metadata = {
  title: '싹쓰리 백오피스',
  description: '중고 물품 처리 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = children?.props?.childProp?.segment
  return (
    <html lang='ko'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
