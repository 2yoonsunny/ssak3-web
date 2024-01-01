import axios from 'axios';
import { ReviewType, UpdateReviewRequestParams } from '@/types/review';

export async function fetchReviewDetail(reviewId: string): Promise<ReviewType> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/review/${reviewId}`;
  const { data } = await axios.get(url);
  return data;
}

export async function updateReview({
  reviewId,
  status,
  reason,
}: UpdateReviewRequestParams): Promise<ReviewType> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/review/${reviewId}`;
  const { data } = await axios.patch(url, {
    status,
    reason,
  });
  return data;
}
