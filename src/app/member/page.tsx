import React from 'react';
import Link from 'next/link';
import cx from 'classnames';
import dayjs from 'dayjs';
import commonStyles from '@/styles/Common.module.scss';
import Sidebar from '@/components/Sidebar';
import Search from '@/components/Search';
import { OptionType } from '@/types/common';
import { MemberType } from '@/types/member';

const FILTER_DATA: OptionType[] = [
  { index: 0, name: '회원ID', value: 'memberId' },
  { index: 1, name: '이름', value: 'username' },
  { index: 2, name: '이메일', value: 'email' },
  { index: 3, name: '연락처', value: 'phoneNumber' },
];

const fetchData = async (querystring: string): Promise<MemberType[]> => {
  const response = await fetch(
    `${process.env.API_URL}/user/list?${querystring}`,
    {
      cache: 'no-cache',
    },
  );
  const { result } = await response.json();
  return result || [];
};

export default async function Member({
  searchParams,
}: {
  searchParams?: URLSearchParams;
}) {
  const querystring = new URLSearchParams(searchParams).toString();
  const memberData = await fetchData(querystring);

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
            {memberData.map((data: MemberType) => (
              <tr key={data.memberId}>
                <td>{data.memberId}</td>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>{data.phoneNumber}</td>
                <td>
                  {dayjs(data.createdAt, 'YYYY-MM-DDTHH:mm:ss').format(
                    'YYYY-MM-DD HH:mm:ss',
                  )}
                </td>
                <td>
                  <Link href={`member/${data.memberId}`}>상세보기</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={commonStyles.pageIndicator}>
          <button
            type='button'
            aria-label='prevList'
            className={cx(commonStyles.prev, commonStyles.disabled)}
          />
          <button
            type='button'
            aria-label='nextList'
            className={commonStyles.next}
          />
        </div>
      </div>
    </div>
  );
}
