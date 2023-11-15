import React from 'react';
import Sidebar from '@/components/Sidebar';
import Filter from '@/components/Filter';
import Search from '@/components/Search';
import commonStyles from '../../styles/Common.module.scss';

export default function Product() {
  return (
    <div className={commonStyles.section}>
      <Sidebar />
      <div className={commonStyles.content}>
        <h1 className={commonStyles.header}>수거 관리 목록</h1>
        <div className={commonStyles.condition}>
          <Filter />
          <Search />
        </div>
      </div>
    </div>
  );
}
