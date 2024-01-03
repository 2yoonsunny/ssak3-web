'use client';

import React from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import cx from 'classnames';
import commonStyles from '@/styles/Common.module.scss';
import { makeQueryString } from '@/utils/querystring';
import { PageInfoType } from '@/types/common';

type PaginationProps = {
  pageInfo: PageInfoType;
};

export default function Pagination({ pageInfo }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get('page'));

  const onClickPrevButton = () => {
    const newParams = makeQueryString({
      param: 'page',
      value: String(page - 1),
      searchParams,
      pathname,
    });
    router.push(newParams);
  };
  const onClickNextButton = () => {
    const newParams = makeQueryString({
      param: 'page',
      value: String(page + 1),
      searchParams,
      pathname,
    });
    router.push(newParams);
  };

  if (!pageInfo) return '';
  return (
    <div className={commonStyles.pageIndicator}>
      <button
        type='button'
        aria-label='prevList'
        disabled={!pageInfo.hasPrev}
        className={cx(commonStyles.prev, !pageInfo.hasPrev && commonStyles.disabled)}
        onClick={onClickPrevButton}
      />
      <button
        type='button'
        aria-label='nextList'
        disabled={!pageInfo.hasNext}
        className={cx(commonStyles.next, !pageInfo.hasNext && commonStyles.disabled)}
        onClick={onClickNextButton}
      />
    </div>
  );
}
