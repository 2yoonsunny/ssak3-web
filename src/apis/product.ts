import axios from 'axios';
import { ProductType } from '@/types/product';

export async function fetchProductDetail(productId: string): Promise<ProductType> {
  // const wait = (timeout: number) => {
  //   return new Promise((resolve) => setTimeout(resolve, timeout));
  // };
  // await wait(2000);
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${productId}`;
  const { data } = await axios.get(url);
  return data;
}
