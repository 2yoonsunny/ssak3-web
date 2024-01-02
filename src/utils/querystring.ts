import { ReadonlyURLSearchParams } from 'next/navigation';

type MakeQueryStringParams = {
  param: string;
  value: string;
  searchParams: ReadonlyURLSearchParams;
  pathname: string;
  isResetPage?: boolean;
};

export function makeQueryString({
  param,
  value,
  searchParams,
  pathname,
  isResetPage = false,
}: MakeQueryStringParams): string {
  const newParams = new URLSearchParams(searchParams);
  newParams.set(param, value);
  if (isResetPage) {
    newParams.set('page', '1');
  }
  return `${pathname}?${newParams.toString()}`;
}
