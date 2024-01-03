import React from 'react';
import Link from 'next/link';
import commonStyles from '@/styles/Common.module.scss';
import Sidebar from '@/components/Sidebar';
import Filter from '@/components/Filter';
import Search from '@/components/Search';
import { PRODUCT_STATUS } from '@/constants/status';
import { OptionType, PageInfoType } from '@/types/common';
import { ProductType } from '@/types/product';
import { convertDate } from '@/utils/date';
import Pagination from '@/components/Pagination';

type ProductResponseType = {
  pageInfo: PageInfoType;
  result: ProductType[];
};

const FILTER_DATA: OptionType[] = [
  { index: 0, name: '수거ID', value: 'productId' },
  { index: 1, name: '회원ID', value: 'memberId' },
];

const fetchData = async (querystring: string): Promise<ProductResponseType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/list?${querystring}`,
    {
      cache: 'no-cache',
    },
  );
  const data = await response.json();
  return data;
};

export default async function Product({ searchParams }: { searchParams?: URLSearchParams }) {
  const querystring = new URLSearchParams(searchParams).toString();
  const { result = [], pageInfo } = await fetchData(querystring);

  return (
    <div className={commonStyles.section}>
      <Sidebar />
      <div className={commonStyles.content}>
        <h1 className={commonStyles.header}>수거 관리 목록</h1>
        <div className={commonStyles.condition}>
          <Filter param='status' data={PRODUCT_STATUS} hasTotal />
          <Search filterData={FILTER_DATA} />
        </div>
        <table className={commonStyles.dataTable}>
          <thead>
            <tr>
              <th>수거ID</th>
              <th>회원ID</th>
              <th>회원 이름</th>
              <th>회원 이메일</th>
              <th>개수</th>
              <th>상태</th>
              <th>신청일시</th>
              <th>수거일시</th>
              <th>링크</th>
            </tr>
          </thead>
          <tbody>
            {result.map((data: ProductType) => (
              <tr key={data.productId}>
                <td>{data.productId}</td>
                <td>M{data.memberId}</td>
                <td>{data.user?.username}</td>
                <td>{data.user?.email}</td>
                <td>{data.count}</td>
                <td>{PRODUCT_STATUS.find((d) => d.value === data.status)?.name}</td>
                <td>{convertDate(data.requestTime)}</td>
                <td>{convertDate(data.pickupTime)}</td>
                <td>
                  <Link href={`product/${data.productId}`}>상세보기</Link>
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
