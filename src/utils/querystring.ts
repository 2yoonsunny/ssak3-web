import { ReadonlyURLSearchParams } from 'next/navigation';

type MakeQueryStringParams = {
  param: string;
  value: string;
  searchParams: ReadonlyURLSearchParams;
  pathname: string;
};

export function makeQueryString({
  param,
  value,
  searchParams,
  pathname,
}: MakeQueryStringParams): string {
  const newParams = new URLSearchParams(searchParams);
  newParams.set(param, value);
  return `${pathname}?${newParams.toString()}`;
}
