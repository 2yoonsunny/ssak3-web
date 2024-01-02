'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import styles from './Filter.module.scss';
import { makeQueryString } from '@/utils/querystring';
import { OptionType } from '@/types/common';

type FilterProps = {
  param: string;
  data: OptionType[];
  hasTotal?: boolean;
};

export default function Filter({ param, data, hasTotal = false }: FilterProps) {
  const [value, setValue] = useState<string>('');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    const newParams = makeQueryString({
      param,
      value: e.target.value,
      searchParams,
      pathname,
    });
    router.push(newParams);
  };

  useEffect(() => {
    if (searchParams.get(param)) {
      setValue(searchParams.get(param));
    } else if (hasTotal) {
      setValue('total');
    }
  }, []);
  useEffect(() => {
    if (!searchParams.get(param)) {
      setValue('');
    }
  }, [searchParams]);

  return (
    <div className={styles.filter}>
      <select value={value} onChange={onChangeHandler}>
        {hasTotal ? (
          <option value='total'>전체</option>
        ) : (
          <option value='' disabled>
            구분
          </option>
        )}
        {data.map((d) => (
          <option key={d.value} value={d.value}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
  );
}
