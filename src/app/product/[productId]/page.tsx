'use client';

import React, { ChangeEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import cx from 'classnames';
import dayjs from 'dayjs';
import { useDaumPostcodePopup, Address } from 'react-daum-postcode';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/apis/queryKeys';
import { fetchProductDetail } from '@/apis/product';
import commonStyles from '@/styles/Common.module.scss';
import Sidebar from '@/components/Sidebar';
import Attachment from '@/components/Attachment';
import { PRODUCT_STATUS, PRODUCT_ITEM_STATUS } from '@/constants/status';
import { addCommas } from '@/utils/number';
import { convertDate } from '@/utils/date';

type ProductDetailProps = {
  params: { productId: string };
};

export default function ProductDetail({ params }: ProductDetailProps) {
  const [count, setCount] = useState<number>(0);
  const [address, setAddress] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');
  const [accessMemo, setAccessMemo] = useState<string>('');
  const [pickupMemo, setPickupMemo] = useState<string>('');
  const [pickupTime, setPickupTime] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [showItemId, setShowItemId] = useState<string>('1');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const router = useRouter();
  const openDaumPostcodePopup = useDaumPostcodePopup();

  const productDetailQuery = useQuery({
    queryKey: queryKeys.productDetail(params.productId),
    queryFn: () => fetchProductDetail(params.productId),
    enabled: params.productId !== null,
  });

  const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    setCount(Number(e.target.value));
  };
  const onChangeAddressDetail = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.target.value);
  };
  const onChangeAccessMemo = (e: ChangeEvent<HTMLInputElement>) => {
    setAccessMemo(e.target.value);
  };
  const onChangePickupMemo = (e: ChangeEvent<HTMLInputElement>) => {
    setPickupMemo(e.target.value);
  };
  const onChangePickupTime = (e: ChangeEvent<HTMLInputElement>) => {
    setPickupTime(`${e.target.value}:00`);
  };
  const onChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };
  const onClickShowItemButton = (itemId: string) => {
    if (showItemId === itemId) {
      setShowItemId('0');
    } else {
      setShowItemId(itemId);
    }
  };
  const onClickModeButton = () => {
    setIsDisabled(!isDisabled);
  };
  const onClickListButton = () => {
    router.push('/product');
    router.refresh();
  };
  const onCompletePostcodePopup = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
  };
  const onClickPostcodeButton = () => {
    openDaumPostcodePopup({ onComplete: onCompletePostcodePopup });
  };

  useEffect(() => {
    if (productDetailQuery.data) {
      setCount(productDetailQuery.data.count);
      setAddress(productDetailQuery.data.address);
      setAddressDetail(productDetailQuery.data.addressDetail);
      setAccessMemo(productDetailQuery.data.accessMemo);
      setPickupMemo(productDetailQuery.data.pickupMemo);
      setPickupTime(dayjs(productDetailQuery.data.pickupTime).format('YYYY-MM-DDTHH:mm:ss'));
      setStatus(productDetailQuery.data.status);
    }
  }, [productDetailQuery.data]);

  return (
    <div className={commonStyles.section}>
      <Sidebar />
      {isDisabled ? (
        <div className={commonStyles.notice}>읽기 모드</div>
      ) : (
        <div className={cx(commonStyles.notice, commonStyles.edit)}>편집 모드</div>
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
          <button type='button' className={commonStyles.right} onClick={onClickModeButton}>
            {isDisabled ? '수정하기' : '저장하기'}
          </button>
        </div>
        <div className={cx(commonStyles.card, commonStyles.flex)}>
          <ul>
            <li>
              <p>수거ID</p>
              <span>{productDetailQuery.data?.productId}</span>
            </li>
            <li>
              <p>회원 이름</p>
              <span>{productDetailQuery.data?.user.username}</span>
            </li>
            <li>
              <p>회원 이메일</p>
              <Link href={`/member/${productDetailQuery.data?.memberId}`}>
                <span>{productDetailQuery.data?.user.email}</span>
              </Link>
            </li>
            <li>
              <p>신청일시</p>
              <span>{convertDate(productDetailQuery.data?.requestTime)}</span>
            </li>
          </ul>
        </div>
        <div className={commonStyles.card}>
          <h2 className={commonStyles.title}>개수</h2>
          <input type='number' value={count} disabled={isDisabled} onChange={onChangeCount} />
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
          <input
            type='text'
            value={addressDetail}
            placeholder='상세주소'
            disabled={isDisabled}
            onChange={onChangeAddressDetail}
          />
          <div className={commonStyles.divider} />

          <h2 className={commonStyles.title}>공동 현관 출입 방법</h2>
          <input
            type='text'
            value={accessMemo}
            disabled={isDisabled}
            onChange={onChangeAccessMemo}
          />
          <div className={commonStyles.divider} />

          <h2 className={commonStyles.title}>수거 시 요청 사항</h2>
          <input
            type='text'
            value={pickupMemo}
            disabled={isDisabled}
            onChange={onChangePickupMemo}
          />
          <div className={commonStyles.divider} />

          <h2 className={commonStyles.title}>수거일시</h2>
          <input
            type='datetime-local'
            value={pickupTime}
            disabled={isDisabled}
            min={dayjs(productDetailQuery.data?.requestTime).format('YYYY-MM-DDTHH:mm')}
            onChange={onChangePickupTime}
          />
        </div>
        <div className={commonStyles.card}>
          <h2 className={commonStyles.title}>상태</h2>
          <select value={status} disabled={isDisabled} onChange={onChangeStatus}>
            {PRODUCT_STATUS.map((data) => (
              <option key={data.value} value={data.value}>
                {data.name}
              </option>
            ))}
          </select>
        </div>
        <div className={commonStyles.card}>
          <h2 className={commonStyles.title}>물품</h2>
          <button type='button' className={commonStyles.addBtn} disabled={isDisabled}>
            물품 추가
          </button>
          {productDetailQuery.data?.items?.map((data) => {
            const sellRule = data.sellRule.split('_');
            return (
              <div key={data.itemId} className={commonStyles.card}>
                <div className={commonStyles.item}>
                  <h2>
                    P{productDetailQuery.data?.productId}-{data.itemId}
                  </h2>
                  <button
                    type='button'
                    aria-label='showItemId'
                    className={showItemId !== data.itemId ? commonStyles.hide : ''}
                    onClick={() => onClickShowItemButton(data.itemId)}
                  />
                </div>
                {showItemId === data.itemId && (
                  <>
                    <div className={commonStyles.divider} />

                    <h2 className={commonStyles.title}>감정 내용</h2>
                    <div className={commonStyles.valuation}>
                      <ul>
                        <li>
                          <p>카테고리</p>
                          <input type='text' value={data.category} disabled={isDisabled} />
                        </li>
                        <li>
                          <p>구성품</p>
                          <input type='text' value={data.parts} disabled={isDisabled} />
                        </li>
                        <li>
                          <p>기능작동</p>
                          <input type='text' value={data.opStatus} disabled={isDisabled} />
                        </li>
                        <li>
                          <p>코멘트</p>
                          <textarea rows={5} value={data.comment} disabled={isDisabled} />
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <p>등급</p>
                          <input type='text' value={data.grade} disabled={isDisabled} />
                        </li>
                        <li>
                          <p>평균시세</p>
                          <input
                            type='text'
                            value={addCommas(data.avgPrice)}
                            disabled={isDisabled}
                          />
                        </li>
                        <li>
                          <p>가격(일반판매)</p>
                          <input
                            type='text'
                            value={addCommas(data.sellPrice)}
                            disabled={isDisabled}
                          />
                        </li>
                        <li>
                          <p>가격(바로판매)</p>
                          <input
                            type='text'
                            value={addCommas(data.directSellPrice)}
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
                        checked={sellRule[0] === '1'}
                        disabled={isDisabled}
                      />
                      <label htmlFor='processing-public'>일반판매</label>
                      <input
                        type='checkbox'
                        id='processing-quick'
                        name='processing'
                        value='quick'
                        checked={sellRule[1] === '1'}
                        disabled={isDisabled}
                      />
                      <label htmlFor='processing-quick'>바로판매</label>
                      <input
                        type='checkbox'
                        id='processing-disuse'
                        name='processing'
                        value='disuse'
                        checked={sellRule[2] === '1'}
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
                        checked={data.pickupStatus === '0'}
                        disabled={isDisabled}
                      />
                      <label htmlFor='recovery-no'>미신청</label>
                      <input
                        type='radio'
                        id='recovery-yes'
                        name='recovery'
                        value='yes'
                        checked={data.pickupStatus === '1'}
                        disabled={isDisabled}
                      />
                      <label htmlFor='recovery-yes'>신청</label>
                    </div>
                    <div className={commonStyles.divider} />

                    <h2 className={commonStyles.title}>판매기간</h2>
                    <div className={commonStyles.date}>
                      <input
                        type='date'
                        value={dayjs(data.sellStartTime).format('YYYY-MM-DD')}
                        disabled={isDisabled}
                        min={dayjs(pickupTime).format('YYYY-MM-DD')}
                      />
                      <p>-</p>
                      <input
                        type='date'
                        value={dayjs(data.sellEndTime).format('YYYY-MM-DD')}
                        disabled={isDisabled}
                        min={dayjs(data.sellStartTime).format('YYYY-MM-DD')}
                      />
                    </div>
                    <div className={commonStyles.divider} />

                    <h2 className={commonStyles.title}>상태</h2>
                    <select value={data.itemStatus} disabled={isDisabled}>
                      {PRODUCT_ITEM_STATUS.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.name}
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
            );
          })}
        </div>
        <div className={cx(commonStyles.actionBtn, commonStyles.flex)}>
          <button type='button' className={commonStyles.center} onClick={onClickListButton}>
            목록 보기
          </button>
        </div>
      </div>
    </div>
  );
}
