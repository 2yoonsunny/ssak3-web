'use client';

import React from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import styles from './Filter.module.scss';
import { makeQueryString } from '@/utils/querystring';

export default function Filter() {
  const data = [{ value: 'all', label: '전체' }];
  const params = 'status';
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = makeQueryString({
      params,
      value: e.target.value,
      searchParams,
      pathname,
    });
    router.push(newParams);
  };

  return (
    <div className={styles.filter}>
      <select defaultValue='all' onChange={onChangeHandler}>
        {data.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label}
          </option>
        ))}
      </select>
    </div>
  );
}
