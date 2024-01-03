import axios from 'axios';
import { AddPointRequestParams } from '@/types/common';
import { MemberType } from '@/types/member';

export async function fetchMemberDetail(memberId: string): Promise<MemberType> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${memberId}`;
  const { data } = await axios.get(url);
  return data;
}

export async function addPoint({
  memberId,
  point,
  reason,
  type,
}: AddPointRequestParams): Promise<MemberType> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/addPoint`;
  const { data } = await axios.post(url, {
    memberId,
    point,
    reason,
    type,
  });
  return data;
}
