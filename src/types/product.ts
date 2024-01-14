import { MemberType } from '@/types/member';

export type ProductType = {
  productId: number;
  memberId: number;
  status: string;
  count: number;
  requestTime: string;
  pickupTime: string;
  photo?: string;
  address: string;
  addressDetail: string;
  accessMemo: string;
  pickupMemo: string;
  user: MemberType;
  items: ItemType[];
};

export type ItemType = {
  productId: number;
  itemId: string;
  category: string;
  parts: string;
  opStatus: string;
  comment: string;
  grade: string;
  avgPrice: number;
  sellPrice: number;
  directSellPrice: number;
  photo: number;
  sellRule: string;
  pickupStatus: string;
  sellStartTime: string;
  sellEndTime: string;
  itemStatus: string;
};

export type UpdateProductRequestParams = {
  productId: number;
  status: string;
  count: number;
  pickupTime: string;
  photo?: string;
  address: string;
  addressDetail: string;
  accessMemo?: string;
  pickupMemo?: string;
  items: ItemType[];
};

export type DeleteItemsRequestParams = {
  productId: number;
  itemIds: number[];
};
