import axios from 'axios';
import { ProductType, UpdateProductRequestParams, DeleteItemRequestParams } from '@/types/product';

export async function fetchProductDetail(productId: string): Promise<ProductType> {
  // const wait = (timeout: number) => {
  //   return new Promise((resolve) => setTimeout(resolve, timeout));
  // };
  // await wait(2000);
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${productId}`;
  const { data } = await axios.get(url);
  return data;
}

export async function updateProduct({
  productId,
  status,
  count,
  pickupTime,
  photo,
  address,
  addressDetail,
  accessMemo,
  pickupMemo,
  items,
}: UpdateProductRequestParams): Promise<ProductType> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${productId}`;
  const { data } = await axios.patch(url, {
    status,
    count,
    pickupTime,
    photo,
    address,
    addressDetail,
    accessMemo,
    pickupMemo,
    items,
  });
  return data;
}

export async function deleteItem({ productId, itemId }: DeleteItemRequestParams): Promise<void> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/deleteItem`;
  await axios.delete(url, { data: { productId, itemId } });
}
