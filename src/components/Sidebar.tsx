'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname);
  return <div>Sidebar</div>;
}
