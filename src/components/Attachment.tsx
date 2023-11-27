'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Attachment.module.scss';
import commonStyles from '@/styles/Common.module.scss';

type AttachmentProps = {
  src: string;
  filename: string;
  showDelete?: boolean;
  disabled?: boolean;
};

export default function Attachment({
  src,
  filename,
  showDelete = false,
  disabled = false,
}: AttachmentProps) {
  const [showViewer, setShowViewer] = useState<boolean>(false);

  const onClickViewer = () => {
    setShowViewer(!showViewer);
  };
  const onClickDeleteButton = () => {};

  return (
    <div className={styles.attachment}>
      <Image src={src} alt='attachment' priority width={72} height={72} />
      <p>{filename}</p>
      {showDelete ? (
        <button
          type='button'
          aria-label='delete'
          disabled={disabled}
          className={styles.delete}
          onClick={onClickDeleteButton}
        />
      ) : (
        <button type='button' aria-label='viewer' onClick={onClickViewer} />
      )}
      {showViewer && (
        <>
          <div
            className={commonStyles.dim}
            onClick={onClickViewer}
            role='none'
          />
          <div className={styles.viewer}>
            <Image src={src} alt='attachment' priority fill />
            <div className={commonStyles.actionBtn}>
              <button type='button' onClick={onClickViewer}>
                닫기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
