import React from 'react';
import Link from 'next/link';
import commonStyles from '@/styles/Common.module.scss';
import Sidebar from '@/components/Sidebar';
import Filter from '@/components/Filter';
import Search from '@/components/Search';
import { REVIEW_STATUS } from '@/constants/status';
import { OptionType, PageInfoType } from '@/types/common';
import { ReviewType } from '@/types/review';
import { convertDate } from '@/utils/date';
import Pagination from '@/components/Pagination';

type ReviewResponseType = {
  pageInfo: PageInfoType;
  result: ReviewType[];
};

const FILTER_DATA: OptionType[] = [
  { index: 0, name: '리뷰ID', value: 'reviewId' },
  { index: 1, name: '회원ID', value: 'memberId' },
  { index: 2, name: '수거ID', value: 'productId' },
];

const fetchData = async (querystring: string): Promise<ReviewResponseType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/review/list?${querystring}`,
    {
      cache: 'no-cache',
    },
  );
  const data = await response.json();
  return data;
};

export default async function Review({ searchParams }: { searchParams?: URLSearchParams }) {
  const querystring = new URLSearchParams(searchParams).toString();
  const { result, pageInfo } = await fetchData(querystring);

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
            {result.map((data: ReviewType) => (
              <tr key={data.reviewId}>
                <td>{data.reviewId}</td>
                <td>M{data.memberId}</td>
                <td>P{data.productId}</td>
                <td>{data.title}</td>
                <td className={commonStyles.long}>{data.content}</td>
                <td>{REVIEW_STATUS.find((d) => d.value === `STEP_${data.status}`)?.name}</td>
                <td>{convertDate(data.createdAt)}</td>
                <td>
                  <Link href={`review/${data.reviewId}`}>상세보기</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination pageInfo={pageInfo} />
      </div>
    </div>
  );
}
