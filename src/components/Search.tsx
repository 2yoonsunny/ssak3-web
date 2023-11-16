'use client';

import React, { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import styles from './Search.module.scss';
import Filter from './Filter';
import { makeQueryString } from '@/utils/querystring';

export default function Search() {
  const showFilter = true;
  const params = 'keyword';
  const [value, setValue] = useState<string>('');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onClickHandler = () => {
    const newParams = makeQueryString({
      params,
      value,
      searchParams,
      pathname,
    });
    router.push(newParams);
  };

  return (
    <div className={styles.search}>
      {showFilter && <Filter />}
      <input type='text' onChange={onChangeHandler} />
      <button type='button' onClick={onClickHandler}>
        검색
      </button>
    </div>
  );
}
