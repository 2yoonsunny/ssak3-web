'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Sidebar.module.scss';
import { menu, MenuType } from '@/constants/menu';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Image
          src='/images/logo.png'
          alt='ssak3 logo'
          priority
          width={80}
          height={48}
        />
      </div>
      <ul className={styles.menu}>
        {menu.map((data: MenuType) => (
          <li
            key={data.index}
            className={pathname === data.path ? styles.active : ''}
          >
            <Link href={data.path}>{data.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
