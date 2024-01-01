export type ReviewType = {
  reviewId: number;
  memberId: number;
  productId: number;
  title: string;
  content: string;
  createdAt: string;
  status: string;
  history?: ReviewHistoryType[];
};

export type ReviewHistoryType = {
  id: number;
  reviewId: number;
  status: string;
  historyReason: string;
  createdAt: string;
};

export type UpdateReviewRequestParams = {
  reviewId: number;
  status: number;
  reason: string;
};
