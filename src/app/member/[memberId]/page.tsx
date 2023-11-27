'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import cx from 'classnames';
import commonStyles from '@/styles/Common.module.scss';
import Sidebar from '@/components/Sidebar';
import { addCommas } from '@/utils/number';

type MemberDetailProps = {
  params: { memberId: string };
};

export default function MemberDetail({ params }: MemberDetailProps) {
  const [showProduct, setShowProduct] = useState<boolean>(true);
  const [showPoint, setShowPoint] = useState<boolean>(true);
  const [showPointModal, setShowPointModal] = useState<boolean>(false);
  const router = useRouter();

  const onClickShowProductButton = () => {
    setShowProduct(!showProduct);
  };
  const onClickShowPointButton = () => {
    setShowPoint(!showPoint);
  };
  const onClickShowPointModalButton = () => {
    setShowPointModal(!showPointModal);
  };
  const onClickSaveButton = () => {
    setShowPointModal(false);
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
              <span>{params.memberId}</span>
            </li>
            <li>
              <p>이름</p>
              <span>석슬일</span>
            </li>
            <li>
              <p>이메일</p>
              <span>one@naver.com</span>
            </li>
            <li>
              <p>연락처</p>
              <span>010-1234-5678</span>
            </li>
            <li>
              <p>주소</p>
              <span>서울 강남구 테헤란로 231</span>
            </li>
            <li>
              <p>월 이용 횟수</p>
              <span>1/5</span>
            </li>
            <li>
              <p>총 이용 횟수</p>
              <span>1</span>
            </li>
            <li>
              <p>가입일시</p>
              <span>2023.11.01 22:03:00</span>
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
                <tr>
                  <td>P1</td>
                  <td>8</td>
                  <td>정산완료</td>
                  <td>2023.11.01 22:00:00</td>
                  <td>2023.11.11 12:00:00</td>
                  <td>
                    <Link href='/product/1'>상세보기</Link>
                  </td>
                </tr>
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
                  <tr>
                    <td>P1</td>
                    <td>P1-1</td>
                    <td>{`+${addCommas(21000)}P`}</td>
                    <td>바로적립</td>
                    <td>2023.11.10 12:00:00</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
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
        {showPointModal && (
          <>
            <div
              className={commonStyles.dim}
              onClick={onClickShowPointModalButton}
              role='none'
            />
            <div className={commonStyles.modal}>
              <h3>적립금 추가/제거</h3>
              <h2 className={commonStyles.title}>금액</h2>
              <input type='text' value={addCommas(1000)} />
              <h2 className={commonStyles.title}>사유</h2>
              <input type='text' value='이벤트' />
              <div className={commonStyles.entry}>
                <input
                  type='radio'
                  id='point-plus'
                  name='point'
                  value='plus'
                  defaultChecked
                />
                <label htmlFor='point-plus'>추가</label>
                <input
                  type='radio'
                  id='point-minus'
                  name='point'
                  value='minus'
                />
                <label htmlFor='point-minus'>제거</label>
              </div>
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
