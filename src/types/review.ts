export type ReviewType = {
  reviewId: number;
  memberId: number;
  productId: number;
  title: string;
  content: string;
  createdAt: string;
  status: number;
  history?: ReviewHistoryType[];
};

export type ReviewHistoryType = {
  id: number;
  reviewId: number;
  historyReason: string;
  createdAt: string;
};

export type UpdateReviewRequestParams = {
  reviewId: number;
  status: number;
  reason: string;
};
