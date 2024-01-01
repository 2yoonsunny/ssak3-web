import { OptionType } from '@/types/common';

export const PRODUCT_STATUS: OptionType[] = [
  { index: 0, name: '신청완료', value: '0' },
  { index: 1, name: '키트배송중', value: '1' },
  { index: 2, name: '키트배송완료', value: '2' },
  { index: 3, name: '물건픽업중', value: '3' },
  { index: 4, name: '물건픽업완료', value: '4' },
  { index: 5, name: '물건검수중', value: '5' },
  { index: 6, name: '물건검수완료', value: '6' },
  { index: 7, name: '처리선택중', value: '7' },
  { index: 8, name: '처리선택완료', value: '8' },
  { index: 9, name: '정산완료', value: '9' },
];

export const PRODUCT_ITEM_STATUS: OptionType[] = [
  { index: 0, name: '대기중', value: '0' },
  { index: 1, name: '판매중', value: '1' },
  { index: 2, name: '폐기중', value: '2' },
  { index: 3, name: '회수중', value: '3' },
  { index: 4, name: '일반판매완료', value: '4' },
  { index: 5, name: '바로판매완료', value: '5' },
  { index: 6, name: '폐기완료', value: '6' },
  { index: 7, name: '회수완료', value: '7' },
];

export const REVIEW_STATUS: OptionType[] = [
  { index: 0, name: '게시', value: '0' },
  { index: 1, name: '숨김', value: '1' },
];
