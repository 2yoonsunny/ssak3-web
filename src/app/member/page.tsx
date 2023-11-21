import React from 'react';
import Link from 'next/link';
import cx from 'classnames';
import commonStyles from '@/styles/Common.module.scss';
import Sidebar from '@/components/Sidebar';
import Search from '@/components/Search';
import { OptionType } from '@/types/common';

const FILTER_DATA: OptionType[] = [
  { index: 0, name: '회원ID', value: 'memberId' },
  { index: 1, name: '이름', value: 'username' },
  { index: 2, name: '이메일', value: 'email' },
  { index: 3, name: '연락처', value: 'phoneNumber' },
];

export default function Member() {
  return (
    <div className={commonStyles.section}>
      <Sidebar />
      <div className={commonStyles.content}>
        <h1 className={commonStyles.header}>회원 관리 목록</h1>
        <div className={commonStyles.condition}>
          <div />
          <Search filterData={FILTER_DATA} />
        </div>
        <table className={commonStyles.dataTable}>
          <thead>
            <tr>
              <th>회원ID</th>
              <th>이름</th>
              <th>이메일</th>
              <th>연락처</th>
              <th>가입일시</th>
              <th>링크</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>M1</td>
              <td>석슬일</td>
              <td>one@naver.com</td>
              <td>010-1234-5678</td>
              <td>2023.11.01 22:03:00</td>
              <td>
                <Link href='member/1'>상세보기</Link>
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
