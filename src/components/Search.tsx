'use client';

import React, { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import styles from './Search.module.scss';
import Filter from './Filter';
import { makeQueryString } from '@/utils/querystring';
import { OptionType } from '@/types/common';

type SearchProps = {
  filterData?: OptionType[];
};

export default function Search({ filterData }: SearchProps) {
  const param = 'keyword';
  const [value, setValue] = useState<string>('');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onClickHandler = () => {
    const newParams = makeQueryString({
      param,
      value,
      searchParams,
      pathname,
    });
    router.push(newParams);
  };

  return (
    <div className={styles.search}>
      {filterData && <Filter param='property' data={filterData} />}
      <input
        type='text'
        placeholder='검색어를 입력해주세요'
        onChange={onChangeHandler}
      />
      <button type='button' onClick={onClickHandler}>
        검색
      </button>
    </div>
  );
}
