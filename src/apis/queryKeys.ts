export const queryKeys = {
  member: ['member'] as const,
  product: ['product'] as const,
  review: ['review'] as const,

  memberDetail: (memberId: string) => [...queryKeys.member, memberId] as const,
  productDetail: (productId: string) => [...queryKeys.product, productId] as const,
  reviewDetail: (reviewId: string) => [...queryKeys.review, reviewId] as const,
};
