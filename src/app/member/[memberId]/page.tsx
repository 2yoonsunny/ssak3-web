'use client';

import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import cx from 'classnames';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/apis/queryKeys';
import { fetchMemberDetail, addPoint } from '@/apis/member';
import commonStyles from '@/styles/Common.module.scss';
import Sidebar from '@/components/Sidebar';
import { PRODUCT_STATUS } from '@/constants/status';
import { addCommas } from '@/utils/number';
import { convertDate } from '@/utils/date';
import { AddPointRequestParams } from '@/types/common';

type MemberDetailProps = {
  params: { memberId: string };
};

export default function MemberDetail({ params }: MemberDetailProps) {
  const [inputPoint, setInputPoint] = useState<number>(0);
  const [inputReason, setInputReason] = useState<string>('');
  const [inputType, setInputType] = useState<string>('ADD');
  const [inputErrorMessage, setInputErrorMessage] = useState<string>('');
  const [showProduct, setShowProduct] = useState<boolean>(true);
  const [showPoint, setShowPoint] = useState<boolean>(true);
  const [showPointModal, setShowPointModal] = useState<boolean>(false);
  const router = useRouter();

  const queryClient = useQueryClient();
  const memberDetailQuery = useQuery({
    queryKey: queryKeys.memberDetail(params.memberId),
    queryFn: () => fetchMemberDetail(params.memberId),
    enabled: params.memberId !== null,
  });
  const addPointMutate = useMutation({
    mutationFn: (reqParams: AddPointRequestParams) => addPoint(reqParams),
  });

  const onChangeInputPoint = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPoint(Number(e.target.value));
  };
  const onChangeInputReason = (e: ChangeEvent<HTMLInputElement>) => {
    setInputReason(e.target.value);
  };
  const onChangeInputType = (e: ChangeEvent<HTMLInputElement>) => {
    setInputType(e.target.value);
  };
  const onClickShowProductButton = () => {
    setShowProduct(!showProduct);
  };
  const onClickShowPointButton = () => {
    setShowPoint(!showPoint);
  };
  const onClickShowPointModalButton = () => {
    if (showPointModal) {
      setInputPoint(0);
      setInputReason('');
      setInputType('ADD');
      setInputErrorMessage('');
    }
    setShowPointModal(!showPointModal);
  };
  const onClickSaveButton = async () => {
    if (inputPoint === 0) {
      setInputErrorMessage('금액을 입력해주세요');
    } else if (inputReason === '') {
      setInputErrorMessage('사유를 입력해주세요');
    } else {
      const reqParam = {
        memberId: Number(params.memberId),
        point: inputPoint,
        reason: inputReason,
        type: inputType,
      };

      addPointMutate.mutate(reqParam, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: queryKeys.memberDetail(params.memberId),
          });
          setInputPoint(0);
          setInputReason('');
          setInputType('ADD');
          setInputErrorMessage('');
          setShowPointModal(false);
        },
      });
    }
  };
  const onClickListButton = () => {
    router.push('/member');
  };

  return (
    <div className={commonStyles.section}>
      <Sidebar />
      <div className={cx(commonStyles.content, commonStyles.detail)}>
        <h1 className={commonStyles.header}>회원 관리 상세</h1>
        <div className={cx(commonStyles.card, commonStyles.flex)}>
          <ul>
            <li>
              <p>회원ID</p>
              <span>{memberDetailQuery.data?.memberId}</span>
            </li>
            <li>
              <p>이름</p>
              <span>{memberDetailQuery.data?.username}</span>
            </li>
            <li>
              <p>이메일</p>
              <span>{memberDetailQuery.data?.email}</span>
            </li>
            <li>
              <p>연락처</p>
              <span>{memberDetailQuery.data?.phoneNumber}</span>
            </li>
            <li>
              <p>주소</p>
              <span>{memberDetailQuery.data?.address}</span>
            </li>
            <li>
              <p>포인트</p>
              <span>{memberDetailQuery.data?.point}P</span>
            </li>
            <li>
              <p>월 이용 횟수</p>
              <span>
                {!memberDetailQuery.isLoading && `${memberDetailQuery.data?.monthlyCount}/5`}
              </span>
            </li>
            <li>
              <p>총 이용 횟수</p>
              <span>{memberDetailQuery.data?.totalCount}</span>
            </li>
            <li>
              <p>가입일시</p>
              <span>{convertDate(memberDetailQuery.data?.createdAt)}</span>
            </li>
          </ul>
        </div>
        <div className={commonStyles.card}>
          <div className={commonStyles.item}>
            <h2>수거내역</h2>
            <button
              type='button'
              aria-label='showProduct'
              className={!showProduct ? commonStyles.hide : ''}
              onClick={onClickShowProductButton}
            />
          </div>
          {showProduct && (
            <table className={commonStyles.dataTable}>
              <thead>
                <tr>
                  <th>수거ID</th>
                  <th>개수</th>
                  <th>상태</th>
                  <th>신청일시</th>
                  <th>수거일시</th>
                  <th>링크</th>
                </tr>
              </thead>
              <tbody>
                {memberDetailQuery.data?.products?.map((data) => (
                  <tr key={data.productId}>
                    <td>P{data.productId}</td>
                    <td>{data.count}</td>
                    <td>{PRODUCT_STATUS.find((d) => d.value === `STEP_${data.status}`)?.name}</td>
                    <td>{convertDate(data.requestTime)}</td>
                    <td>{convertDate(data.pickupTime)}</td>
                    <td>
                      <Link href={`/product/${data.productId}`}>상세보기</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className={commonStyles.card}>
          <div className={commonStyles.item}>
            <h2>적립금</h2>
            <button
              type='button'
              aria-label='showPoint'
              className={!showPoint ? commonStyles.hide : ''}
              onClick={onClickShowPointButton}
            />
          </div>
          {showPoint && (
            <>
              <button
                type='button'
                className={commonStyles.addBtn}
                style={{ margin: '15px 0 32px 0' }}
                onClick={onClickShowPointModalButton}
              >
                적립금 추가/제거
              </button>
              <table className={commonStyles.dataTable}>
                <thead>
                  <tr>
                    <th>수거ID</th>
                    <th>물품ID</th>
                    <th>금액</th>
                    <th>사유</th>
                    <th>처리일시</th>
                  </tr>
                </thead>
                <tbody>
                  {memberDetailQuery.data?.pointHistory?.map((data) => (
                    <tr key={data.id}>
                      <td>{data.productId ? `P${data.productId}` : '관리자'}</td>
                      <td>{data.itemId || '-'}</td>
                      <td>
                        {data.type === 'ADD' ? '+' : '-'}
                        {addCommas(data.point)}P
                      </td>
                      <td>{data.reason}</td>
                      <td>{convertDate(data.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <div className={cx(commonStyles.actionBtn, commonStyles.flex)}>
          <button type='button' className={commonStyles.center} onClick={onClickListButton}>
            목록 보기
          </button>
        </div>
        {showPointModal && (
          <>
            <div className={commonStyles.dim} onClick={onClickShowPointModalButton} role='none' />
            <div className={commonStyles.modal}>
              <h3>적립금 추가/제거</h3>
              <button
                type='button'
                aria-label='close'
                className={commonStyles.closeBtn}
                onClick={onClickShowPointModalButton}
              />
              <h2 className={commonStyles.title}>금액</h2>
              <input type='number' value={inputPoint} onChange={onChangeInputPoint} />
              <h2 className={commonStyles.title}>사유</h2>
              <input
                type='text'
                value={inputReason}
                placeholder='사유를 입력해주세요'
                onChange={onChangeInputReason}
              />
              <div className={commonStyles.entry}>
                <input
                  type='radio'
                  id='point-plus'
                  name='point'
                  value='ADD'
                  checked={inputType === 'ADD'}
                  onChange={onChangeInputType}
                />
                <label htmlFor='point-plus'>추가</label>
                <input
                  type='radio'
                  id='point-minus'
                  name='point'
                  value='MINUS'
                  checked={inputType === 'MINUS'}
                  onChange={onChangeInputType}
                />
                <label htmlFor='point-minus'>제거</label>
              </div>
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
