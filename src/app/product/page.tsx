import React from 'react';
import cx from 'classnames';
import commonStyles from '@/styles/Common.module.scss';
import Sidebar from '@/components/Sidebar';
import Filter from '@/components/Filter';
import Search from '@/components/Search';
import { PRODUCT_STATUS } from '@/constants/status';
import { OptionType } from '@/types/common';

const FILTER_DATA: OptionType[] = [
  { index: 0, name: '수거ID', value: 'productId' },
  { index: 1, name: '회원 이름', value: 'username' },
  { index: 2, name: '회원 이메일', value: 'email' },
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
        <table className={commonStyles.dataTable}>
          <thead>
            <tr>
              <th>번호</th>
              <th>회원 이름</th>
              <th>회원 이메일</th>
              <th>개수</th>
              <th>상태</th>
              <th>신청일시</th>
              <th>수거일시</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P1</td>
              <td>석슬일</td>
              <td>one@naver.com</td>
              <td>8</td>
              <td>정산완료</td>
              <td>2023.11.01 22:00:00</td>
              <td>2023.11.11 12:00:00</td>
            </tr>
            <tr>
              <td>P1</td>
              <td>석슬일</td>
              <td>one@naver.com</td>
              <td>8</td>
              <td>정산완료</td>
              <td>2023.11.01 22:00:00</td>
              <td>2023.11.11 12:00:00</td>
            </tr>
            <tr>
              <td>P1</td>
              <td>석슬일</td>
              <td>one@naver.com</td>
              <td>8</td>
              <td>정산완료</td>
              <td>2023.11.01 22:00:00</td>
              <td>2023.11.11 12:00:00</td>
            </tr>
          </tbody>
        </table>
        <div className={commonStyles.pageIndicator}>
          <div className={cx(commonStyles.prev, commonStyles.disabled)} />
          <div className={commonStyles.next} />
        </div>
      </div>
    </div>
  );
}
