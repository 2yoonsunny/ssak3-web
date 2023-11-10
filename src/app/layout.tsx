import React from 'react';
import type { Metadata } from 'next';
import '../styles/globals.css';

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
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
