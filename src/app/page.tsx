import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Login.module.scss';
import Logo from '@/components/Logo';

export default function Home() {
  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <Logo width='100%' height='100%' color='#1CC8FF' />
        <div className={styles.form}>
          <p>이메일</p>
          <input type='email' value='admin@ssak3.web' disabled />
          <p>비밀번호</p>
          <input type='password' value='ssakssakssak' disabled />
        </div>
        <Link href={{ pathname: '/product', query: { page: 1, size: 10 } }}>
          로그인
        </Link>
      </div>
    </div>
  );
}
