'use client';

import React, { useState } from 'react';
import styles from './Filter.module.scss';

export default function Filter() {
  const data = [{ value: 'all', label: '전체' }];
  const [value, setValue] = useState<string>('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    console.log(value);
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
