'use client';

import React, { useState } from 'react';
import cx from 'classnames';
import commonStyles from '@/styles/Common.module.scss';
import Sidebar from '@/components/Sidebar';
import Attachment from '@/components/Attachment';
import { PRODUCT_STATUS, PRODUCT_ITEM_STATUS } from '@/constants/status';

type ProductDetailProps = {
  params: { productId: string };
};

export default function ProductDetail({ params }: ProductDetailProps) {
  const [showItem, setShowItem] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const onClickShowItem = () => {
    setShowItem(!showItem);
  };
  const onClickIsDisabled = () => {
    setIsDisabled(!isDisabled);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className={commonStyles.section}>
      <Sidebar />
      {isDisabled ? (
        <div className={commonStyles.notice}>읽기 모드</div>
      ) : (
        <div className={cx(commonStyles.notice, commonStyles.edit)}>
          편집 모드
        </div>
      )}
      <div
        className={cx(
          commonStyles.content,
          commonStyles.detail,
          isDisabled ? commonStyles.disabled : '',
        )}
      >
        <h1 className={commonStyles.header}>수거 관리 상세</h1>
        <div className={cx(commonStyles.card, commonStyles.flex)}>
          <ul>
            <li>
              <p>수거ID</p>
              <span>{params.productId}</span>
            </li>
            <li>
              <p>회원 이름</p>
              <span>석슬일</span>
            </li>
            <li>
              <p>회원 이메일</p>
              <span>one@naver.com</span>
            </li>
            <li>
              <p>신청일시</p>
              <span>2023.11.01 22:00:00</span>
            </li>
          </ul>
        </div>
        <div className={commonStyles.card}>
          <h2 className={commonStyles.title}>개수</h2>
          <input type='text' value={8} disabled={isDisabled} />
          <div className={commonStyles.divider} />

          <h2 className={commonStyles.title}>사진</h2>
          <Attachment src='/images/mockup.jpg' filename='filename.jpg' />
          <div className={commonStyles.divider} />

          <h2 className={commonStyles.title}>주소</h2>
          <input
            type='text'
            value='서울 강남구 테헤란로 231'
            disabled={isDisabled}
          />
          <div className={commonStyles.divider} />

          <h2 className={commonStyles.title}>공동 현관 출입 방법</h2>
          <input type='text' value='경비실 호출' disabled={isDisabled} />
          <div className={commonStyles.divider} />

          <h2 className={commonStyles.title}>수거 시 요청 사항</h2>
          <input type='text' value='없음' disabled={isDisabled} />
          <div className={commonStyles.divider} />

          <h2 className={commonStyles.title}>수거일시</h2>
          <input
            type='text'
            value='2023.11.11 12:00:00'
            disabled={isDisabled}
          />
        </div>
        <div className={commonStyles.card}>
          <h2 className={commonStyles.title}>상태</h2>
          <select defaultValue={PRODUCT_STATUS[0].value}>
            {PRODUCT_STATUS.map((data) => (
              <option key={data.value} value={data.value} disabled={isDisabled}>
                {data.name}
              </option>
            ))}
          </select>
        </div>
        <div className={commonStyles.card}>
          <h2 className={commonStyles.title}>물품</h2>
          <button
            type='button'
            className={commonStyles.addBtn}
            disabled={isDisabled}
          >
            물품 추가
          </button>
          <div className={commonStyles.card}>
            <div className={commonStyles.item}>
              <h2>P1-1</h2>
              <button
                type='button'
                aria-label='showItem'
                className={!showItem ? commonStyles.hide : ''}
                onClick={onClickShowItem}
              />
            </div>
            {showItem && (
              <>
                <div className={commonStyles.divider} />

                <h2 className={commonStyles.title}>감정 내용</h2>
                <div className={commonStyles.valuation}>
                  <ul>
                    <li>
                      <p>카테고리</p>
                      <input
                        type='text'
                        value='PC / 마우스'
                        disabled={isDisabled}
                      />
                    </li>
                    <li>
                      <p>구성품</p>
                      <input
                        type='text'
                        value='마우스, 충전 케이블, 박스'
                        disabled={isDisabled}
                      />
                    </li>
                    <li>
                      <p>기능작동</p>
                      <input type='text' value='정상' disabled={isDisabled} />
                    </li>
                    <li>
                      <p>코멘트</p>
                      <textarea
                        rows={5}
                        value='사용감이 적고 양호한 컨디션이나, 박스 모서리 부분 손상(찌그러짐)과 충전 케이블의 오염이 확인됩니다.'
                        disabled={isDisabled}
                      />
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p>등급</p>
                      <input type='text' value='B' disabled={isDisabled} />
                    </li>
                    <li>
                      <p>평균시세</p>
                      <input type='text' value='32,000' disabled={isDisabled} />
                    </li>
                    <li>
                      <p>가격(일반판매)</p>
                      <input type='text' value='28,000' disabled={isDisabled} />
                    </li>
                    <li>
                      <p>가격(바로판매)</p>
                      <input type='text' value='21,000' disabled={isDisabled} />
                    </li>
                  </ul>
                </div>
                <div className={commonStyles.divider} />

                <h2 className={commonStyles.title}>사진</h2>
                <button
                  type='button'
                  className={commonStyles.addImageBtn}
                  disabled={isDisabled}
                >
                  Add image
                </button>
                <Attachment
                  src='/images/mockup.jpg'
                  filename='filename.jpg'
                  showDelete
                />
                <div className={commonStyles.divider} />

                <div className={commonStyles.entry}>
                  <h2 className={commonStyles.title}>처리방법</h2>
                  <input
                    type='checkbox'
                    id='processing-public'
                    name='processing'
                    value='public'
                    defaultChecked
                    disabled={isDisabled}
                  />
                  <label htmlFor='processing-public'>일반판매</label>
                  <input
                    type='checkbox'
                    id='processing-quick'
                    name='processing'
                    value='quick'
                    disabled={isDisabled}
                  />
                  <label htmlFor='processing-quick'>바로판매</label>
                  <input
                    type='checkbox'
                    id='processing-disuse'
                    name='processing'
                    value='disuse'
                    disabled={isDisabled}
                  />
                  <label htmlFor='processing-disuse'>폐기</label>
                </div>
                <div className={commonStyles.entry}>
                  <h2 className={commonStyles.title}>회수여부</h2>
                  <input
                    type='radio'
                    id='recovery-no'
                    name='recovery'
                    value='no'
                    defaultChecked
                    disabled={isDisabled}
                  />
                  <label htmlFor='recovery-no'>미신청</label>
                  <input
                    type='radio'
                    id='recovery-yes'
                    name='recovery'
                    value='yes'
                    disabled={isDisabled}
                  />
                  <label htmlFor='recovery-yes'>신청</label>
                </div>
                <div className={commonStyles.divider} />

                <h2 className={commonStyles.title}>판매기간</h2>
                <div className={commonStyles.date}>
                  <input type='text' value='2023.11.21' disabled={isDisabled} />
                  <p>-</p>
                  <input type='text' value='2023.11.30' disabled={isDisabled} />
                </div>
                <div className={commonStyles.divider} />

                <h2 className={commonStyles.title}>상태</h2>
                <select defaultValue={PRODUCT_STATUS[0].value}>
                  {PRODUCT_ITEM_STATUS.map((data) => (
                    <option
                      key={data.value}
                      value={data.value}
                      disabled={isDisabled}
                    >
                      {data.name}
                    </option>
                  ))}
                </select>
                <div className={commonStyles.deleteBtn}>
                  <button type='button' disabled={isDisabled}>
                    삭제
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={commonStyles.actionBtn}>
          <button type='button' onClick={onClickIsDisabled}>
            {isDisabled ? '수정하기' : '저장하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
