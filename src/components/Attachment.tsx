'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Attachment.module.scss';
import commonStyles from '@/styles/Common.module.scss';

type AttachmentProps = {
  src: string;
  filename: string;
  showDelete?: boolean;
};

export default function Attachment({
  src,
  filename,
  showDelete = false,
}: AttachmentProps) {
  const [showViewer, setShowViewer] = useState(false);

  const onClickViewer = () => {
    setShowViewer(!showViewer);
  };
  const onClickDelete = () => {};

  return (
    <div className={styles.attachment}>
      <Image src={src} alt='attachment' priority width={72} height={72} />
      <p>{filename}</p>
      {showDelete ? (
        <button
          type='button'
          aria-label='delete'
          className={styles.delete}
          onClick={onClickDelete}
        />
      ) : (
        <button type='button' aria-label='viewer' onClick={onClickViewer} />
      )}
      {showViewer && (
        <>
          <div className={styles.dim} onClick={onClickViewer} role='none' />
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
