'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import cx from 'classnames';
import dayjs from 'dayjs';
import { useDaumPostcodePopup, Address } from 'react-daum-postcode';
import commonStyles from '@/styles/Common.module.scss';
import Sidebar from '@/components/Sidebar';
import Attachment from '@/components/Attachment';
import { PRODUCT_STATUS, PRODUCT_ITEM_STATUS } from '@/constants/status';
import { addCommas } from '@/utils/number';

type ProductDetailProps = {
  params: { productId: string };
};

export default function ProductDetail({ params }: ProductDetailProps) {
  const [address, setAddress] = useState<string>('서울 강남구 테헤란로 231');
  const [showItem, setShowItem] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const router = useRouter();
  const openDaumPostcodePopup = useDaumPostcodePopup();

  const onClickShowItemButton = () => {
    setShowItem(!showItem);
  };
  const onClickModeButton = () => {
    setIsDisabled(!isDisabled);
  };
  const onClickListButton = () => {
    router.push('/product');
  };
  const onCompletePostcodePopup = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
  };
  const onClickPostcodeButton = () => {
    openDaumPostcodePopup({ onComplete: onCompletePostcodePopup });
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
        <div className={cx(commonStyles.actionBtn, commonStyles.flex)}>
          <button
            type='button'
            className={commonStyles.right}
            onClick={onClickModeButton}
          >
            {isDisabled ? '수정하기' : '저장하기'}
          </button>
        </div>
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
              <Link href='/member/1'>
                <span>one@naver.com</span>
              </Link>
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
          <button
            type='button'
            className={commonStyles.address}
            onClick={onClickPostcodeButton}
            disabled={isDisabled}
          >
            {address}
          </button>
          <input type='text' placeholder='상세주소' disabled={isDisabled} />
          <div className={commonStyles.divider} />

          <h2 className={commonStyles.title}>공동 현관 출입 방법</h2>
          <input type='text' value='경비실 호출' disabled={isDisabled} />
          <div className={commonStyles.divider} />

          <h2 className={commonStyles.title}>수거 시 요청 사항</h2>
          <input type='text' value='없음' disabled={isDisabled} />
          <div className={commonStyles.divider} />

          <h2 className={commonStyles.title}>수거일시</h2>
          <input
            type='datetime-local'
            value='2023-11-11T12:00'
            disabled={isDisabled}
            min={dayjs('2023.11.01 22:00:00', 'YYYY-MM-DD HH;mm:ss').format(
              'YYYY-MM-DDTHH:mm',
            )}
          />
        </div>
        <div className={commonStyles.card}>
          <h2 className={commonStyles.title}>상태</h2>
          <select defaultValue={PRODUCT_STATUS[0].value} disabled={isDisabled}>
            {PRODUCT_STATUS.map((data) => (
              <option key={data.value} value={data.value}>
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
                onClick={onClickShowItemButton}
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
                      <input
                        type='text'
                        value={addCommas(32000)}
                        disabled={isDisabled}
                      />
                    </li>
                    <li>
                      <p>가격(일반판매)</p>
                      <input
                        type='text'
                        value={addCommas(28000)}
                        disabled={isDisabled}
                      />
                    </li>
                    <li>
                      <p>가격(바로판매)</p>
                      <input
                        type='text'
                        value={addCommas(21000)}
                        disabled={isDisabled}
                      />
                    </li>
                  </ul>
                </div>
                <div className={commonStyles.divider} />

                <h2 className={commonStyles.title}>사진</h2>
                <input
                  type='file'
                  id='add-image'
                  disabled={isDisabled}
                  accept='image/*'
                  multiple
                  className={commonStyles.none}
                />
                <label htmlFor='add-image' className={commonStyles.addImageBtn}>
                  Add image
                </label>
                <Attachment
                  src='/images/mockup.jpg'
                  filename='filename.jpg'
                  showDelete
                  disabled={isDisabled}
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
                  <input
                    type='date'
                    value='2023-11-21'
                    disabled={isDisabled}
                    min={dayjs('2023-11-11T12:00', 'YYYY-MM-DDTHH;mm').format(
                      'YYYY-MM-DD',
                    )}
                  />
                  <p>-</p>
                  <input
                    type='date'
                    value='2023-11-30'
                    disabled={isDisabled}
                    min='2023-11-21'
                  />
                </div>
                <div className={commonStyles.divider} />

                <h2 className={commonStyles.title}>상태</h2>
                <select
                  defaultValue={PRODUCT_STATUS[0].value}
                  disabled={isDisabled}
                >
                  {PRODUCT_ITEM_STATUS.map((data) => (
                    <option key={data.value} value={data.value}>
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
        <div className={cx(commonStyles.actionBtn, commonStyles.flex)}>
          <button
            type='button'
            className={commonStyles.center}
            onClick={onClickListButton}
          >
            목록 보기
          </button>
        </div>
      </div>
    </div>
  );
}
