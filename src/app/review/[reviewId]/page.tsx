'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import cx from 'classnames';
import commonStyles from '@/styles/Common.module.scss';
import Sidebar from '@/components/Sidebar';
import { REVIEW_STATUS } from '@/constants/status';

type ReviewDetailProps = {
  params: { reviewId: string };
};

export default function ReviewDetail({ params }: ReviewDetailProps) {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const router = useRouter();

  const onClickShowStatusModalButton = () => {
    setShowStatusModal(!showStatusModal);
  };
  const onClickSaveButton = () => {
    setShowStatusModal(false);
  };
  const onClickListButton = () => {
    router.push('/review');
  };

  return (
    <div className={commonStyles.section}>
      <Sidebar />
      <div className={cx(commonStyles.content, commonStyles.detail)}>
        <h1 className={commonStyles.header}>리뷰 관리 상세</h1>
        <div className={commonStyles.card}>
          <ul style={{ width: '100%' }}>
            <li>
              <p>리뷰ID</p>
              <span>{params.reviewId}</span>
            </li>
            <li>
              <p>회원ID</p>
              <span>
                <Link href='/member/1'>M1</Link>
              </span>
            </li>
            <li>
              <p>수거ID</p>
              <span>
                <Link href='/product/1'>P1</Link>
              </span>
            </li>
            <li>
              <p>제목</p>
              <span>제목</span>
            </li>
            <li>
              <p>내용</p>
              <span>내용</span>
            </li>
            <li>
              <p>작성일시</p>
              <span>2023.11.01 22:03:00</span>
            </li>
          </ul>
        </div>
        <div className={commonStyles.card}>
          <h2>상태</h2>
          <button
            type='button'
            className={commonStyles.addBtn}
            style={{ margin: '15px 0 32px 0' }}
            onClick={onClickShowStatusModalButton}
          >
            상태 변경
          </button>
          <table className={commonStyles.dataTable}>
            <thead>
              <tr>
                <th>상태</th>
                <th>사유</th>
                <th>변경일시</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>게시</td>
                <td>-</td>
                <td>2023.11.01 22:03:00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={cx(commonStyles.actionBtn, commonStyles.flex)}>
          <button
            type='button'
            className={commonStyles.center}
            onClick={onClickListButton}
          >
            목록 보기
          </button>
        </div>
        {showStatusModal && (
          <>
            <div
              className={commonStyles.dim}
              onClick={onClickShowStatusModalButton}
              role='none'
            />
            <div className={commonStyles.modal}>
              <h3>상태 변경</h3>
              <button
                type='button'
                aria-label='close'
                className={commonStyles.closeBtn}
                onClick={onClickShowStatusModalButton}
              />
              <h2 className={commonStyles.title}>상태</h2>
              <select defaultValue={REVIEW_STATUS[0].value}>
                {REVIEW_STATUS.map((data) => (
                  <option key={data.value} value={data.value}>
                    {data.name}
                  </option>
                ))}
              </select>
              <h2 className={commonStyles.title}>사유</h2>
              <input type='text' />
              <div className={commonStyles.actionBtn}>
                <button type='button' onClick={onClickSaveButton}>
                  저장하기
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
