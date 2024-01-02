'use client';

import React, { useState, useEffect } from 'react';
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
      isResetPage: true,
    });
    router.push(newParams);
  };

  useEffect(() => {
    if (searchParams.get('keyword')) {
      setValue(searchParams.get('keyword'));
    }
  }, []);
  useEffect(() => {
    if (!searchParams.get('keyword')) {
      setValue('');
    }
  }, [searchParams]);

  return (
    <div className={styles.search}>
      {filterData && <Filter param='property' data={filterData} />}
      <input
        type='text'
        value={value}
        placeholder='검색어를 입력해주세요'
        onChange={onChangeHandler}
      />
      <button
        type='button'
        onClick={onClickHandler}
        disabled={searchParams.get('property') === null}
      >
        검색
      </button>
    </div>
  );
}
