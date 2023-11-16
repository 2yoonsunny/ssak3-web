import { ReadonlyURLSearchParams } from 'next/navigation';

type MakeQueryStringParams = {
  params: string;
  value: string;
  searchParams: ReadonlyURLSearchParams;
  pathname: string;
};

export function makeQueryString(props: MakeQueryStringParams): string {
  const newParams = new URLSearchParams(props.searchParams);
  newParams.set(props.params, props.value);
  return `${props.pathname}?${newParams.toString()}`;
}
