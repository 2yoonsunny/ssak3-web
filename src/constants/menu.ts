export type MenuType = { index: number; name: string; path: string };

export const menu: MenuType[] = [
  {
    index: 0,
    name: '수거 관리',
    path: '/product',
  },
  {
    index: 1,
    name: '회원 관리',
    path: '/member',
  },
  {
    index: 2,
    name: '리뷰 관리',
    path: '/review',
  },
];
