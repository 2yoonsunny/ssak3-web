'use client';

import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import cx from 'classnames';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/apis/queryKeys';
import { fetchReviewDetail, updateReview } from '@/apis/review';
import { UpdateReviewRequestParams } from '@/types/review';
import commonStyles from '@/styles/Common.module.scss';
import Sidebar from '@/components/Sidebar';
import { REVIEW_STATUS } from '@/constants/status';
import { convertDate } from '@/utils/date';

type ReviewDetailProps = {
  params: { reviewId: string };
};

export default function ReviewDetail({ params }: ReviewDetailProps) {
  const [inputStatus, setInputStatus] = useState<string>('0');
  const [inputReason, setInputReason] = useState<string>('');
  const [inputErrorMessage, setInputErrorMessage] = useState<string>('');
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const router = useRouter();

  const queryClient = useQueryClient();
  const reviewDetailQuery = useQuery({
    queryKey: queryKeys.reviewDetail(params.reviewId),
    queryFn: () => fetchReviewDetail(params.reviewId),
    enabled: params.reviewId !== null,
  });
  const updateReviewMutate = useMutation({
    mutationFn: (reqParams: UpdateReviewRequestParams) => updateReview(reqParams),
  });

  const onChangeInputStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setInputStatus(e.target.value);
  };
  const onChangeInputReason = (e: ChangeEvent<HTMLInputElement>) => {
    setInputReason(e.target.value);
  };
  const onClickShowStatusModalButton = () => {
    if (showStatusModal) {
      setInputStatus('0');
      setInputReason('');
      setInputErrorMessage('');
    }
    setShowStatusModal(!showStatusModal);
  };
  const onClickSaveButton = () => {
    if (inputReason === '') {
      setInputErrorMessage('사유를 입력해주세요');
    } else {
      const reqParam = {
        reviewId: Number(params.reviewId),
        status: Number(inputStatus),
        reason: inputReason,
      };
      updateReviewMutate.mutate(reqParam, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: queryKeys.reviewDetail(params.reviewId),
          });
          setInputStatus('0');
          setInputReason('');
          setInputErrorMessage('');
          setShowStatusModal(false);
        },
      });
    }
  };
  const onClickListButton = () => {
    router.push('/review');
    router.refresh();
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
              <span>{reviewDetailQuery.data?.reviewId}</span>
            </li>
            <li>
              <p>회원ID</p>
              <span>
                {!reviewDetailQuery.isLoading && (
                  <Link href={`/member/${reviewDetailQuery.data?.memberId}`}>
                    M{reviewDetailQuery.data?.memberId}
                  </Link>
                )}
              </span>
            </li>
            <li>
              <p>수거ID</p>
              <span>
                {!reviewDetailQuery.isLoading && (
                  <Link href={`/product/${reviewDetailQuery.data?.productId}`}>
                    P{reviewDetailQuery.data?.productId}
                  </Link>
                )}
              </span>
            </li>
            <li>
              <p>제목</p>
              <span>{reviewDetailQuery.data?.title}</span>
            </li>
            <li>
              <p>내용</p>
              <span>{reviewDetailQuery.data?.content}</span>
            </li>
            <li>
              <p>작성일시</p>
              <span>{convertDate(reviewDetailQuery.data?.createdAt)}</span>
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
              {reviewDetailQuery.data?.history?.map((data) => (
                <tr key={data.id}>
                  <td>{REVIEW_STATUS.find((d) => d.value === data.status)?.name}</td>
                  <td>{data.historyReason}</td>
                  <td>{convertDate(data.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={cx(commonStyles.actionBtn, commonStyles.flex)}>
          <button type='button' className={commonStyles.center} onClick={onClickListButton}>
            목록 보기
          </button>
        </div>
        {showStatusModal && (
          <>
            <div className={commonStyles.dim} onClick={onClickShowStatusModalButton} role='none' />
            <div className={commonStyles.modal}>
              <h3>상태 변경</h3>
              <button
                type='button'
                aria-label='close'
                className={commonStyles.closeBtn}
                onClick={onClickShowStatusModalButton}
              />
              <h2 className={commonStyles.title}>상태</h2>
              <select defaultValue={REVIEW_STATUS[0].value} onChange={onChangeInputStatus}>
                {REVIEW_STATUS.map((data) => (
                  <option key={data.value} value={data.value}>
                    {data.name}
                  </option>
                ))}
              </select>
              <h2 className={commonStyles.title}>사유</h2>
              <input
                type='text'
                value={inputReason}
                placeholder='사유를 입력해주세요'
                onChange={onChangeInputReason}
              />
              <div className={commonStyles.actionBtn}>
                <button type='button' onClick={onClickSaveButton}>
                  저장하기
                </button>
                {inputErrorMessage && <p>{inputErrorMessage}</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
