import React from 'react';
import commonStyles from '@/styles/Common.module.scss';
import Sidebar from '@/components/Sidebar';
import Filter from '@/components/Filter';
import Search from '@/components/Search';
import { PRODUCT_STATUS } from '@/constants/status';
import { OptionType } from '@/types/common';

const FILTER_DATA: OptionType[] = [
  { index: 0, name: '수거ID', value: 'productId' },
  { index: 1, name: '회원이름', value: 'username' },
  { index: 2, name: '회원이메일', value: 'email' },
];

export default function Product() {
  return (
    <div className={commonStyles.section}>
      <Sidebar />
      <div className={commonStyles.content}>
        <h1 className={commonStyles.header}>수거 관리 목록</h1>
        <div className={commonStyles.condition}>
          <Filter param='status' data={PRODUCT_STATUS} />
          <Search filterData={FILTER_DATA} />
        </div>
      </div>
    </div>
  );
}
