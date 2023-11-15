'use client';

import React, { useState } from 'react';
import styles from './Search.module.scss';
import Filter from './Filter';

export default function Search() {
  const showFilter = true;
  const [value, setValue] = useState<string>('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onClickHandler = () => {
    console.log(value);
  };

  return (
    <div className={styles.search}>
      {showFilter && <Filter />}
      <input type='text' onChange={onChangeHandler} />
      <button onClick={onClickHandler}>검색</button>
    </div>
  );
}
