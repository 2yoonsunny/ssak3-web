export type MemberType = {
  memberId: number;
  username: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  address?: string;
  monthlyCount?: number;
  totalCount?: number;
  point?: number; // 수정 가능
};
