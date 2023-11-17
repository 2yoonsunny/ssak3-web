'use client';

import React from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import styles from './Filter.module.scss';
import { makeQueryString } from '@/utils/querystring';
import { OptionType } from '@/types/common';

type FilterProps = {
  param: string;
  data: OptionType[];
  defaultIndex?: number;
};

export default function Filter({ param, data, defaultIndex = 0 }: FilterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = makeQueryString({
      param,
      value: e.target.value,
      searchParams,
      pathname,
    });
    router.push(newParams);
  };

  return (
    <div className={styles.filter}>
      <select
        defaultValue={data[defaultIndex].value}
        onChange={onChangeHandler}
      >
        {data.map((d) => (
          <option key={d.value} value={d.value}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
  );
}
