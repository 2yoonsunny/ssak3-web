import React from 'react';
import Link from 'next/link';
import cx from 'classnames';
import commonStyles from '@/styles/Common.module.scss';
import Sidebar from '@/components/Sidebar';
import Filter from '@/components/Filter';
import Search from '@/components/Search';
import { REVIEW_STATUS } from '@/constants/status';
import { OptionType } from '@/types/common';

const FILTER_DATA: OptionType[] = [
  { index: 0, name: '리뷰ID', value: 'reviewId' },
  { index: 1, name: '회원ID', value: 'memberId' },
  { index: 2, name: '수거ID', value: 'productId' },
];

export default function Review() {
  return (
    <div className={commonStyles.section}>
      <Sidebar />
      <div className={commonStyles.content}>
        <h1 className={commonStyles.header}>리뷰 관리 목록</h1>
        <div className={commonStyles.condition}>
          <Filter param='status' data={REVIEW_STATUS} hasTotal />
          <Search filterData={FILTER_DATA} />
        </div>
        <table className={commonStyles.dataTable}>
          <thead>
            <tr>
              <th>리뷰ID</th>
              <th>회원ID</th>
              <th>수거ID</th>
              <th>제목</th>
              <th className={commonStyles.long}>내용</th>
              <th>상태</th>
              <th>작성일시</th>
              <th>링크</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>R1</td>
              <td>M1</td>
              <td>P1</td>
              <td>제목</td>
              <td className={commonStyles.long}>내용</td>
              <td>게시</td>
              <td>2023.11.01 22:03:00</td>
              <td>
                <Link href='review/1'>상세보기</Link>
              </td>
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
