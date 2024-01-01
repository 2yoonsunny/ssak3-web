export type OptionType = {
  index: number;
  name: string;
  value: string;
};

export type PageInfoType = {
  total: number;
  lastPage: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export type PointType = {
  id: number;
  memberId: number;
  productId: number;
  itemId: number;
  point: number;
  type: string;
  reason: string;
  createdAt: string;
};

export type AddPointRequestParams = {
  memberId: number;
  productId?: number;
  itemId?: number;
  point: number;
  reason: string;
  type: string;
};
