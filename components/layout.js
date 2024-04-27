import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

const name = 'Sutkhet';
export const siteTitle = 'Next.js Sample Website';




export default function Layout({ children, home }) {
  const router = useRouter();
  const profileImageLinkRef = useRef(null);
  
  useEffect(() => {
    
    if (router.pathname === '/') {
      
      console.log(profileImageLinkRef.current)
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home || 1 ? (
          <>
            <Link href={router.pathname === '/'?"":'/'} className={utilStyles.colorInherit} ref={profileImageLinkRef}>
              <Image
              id="profileImage"
              priority
              src="/images/profile.jpg"
              className={`${utilStyles.borderCircle} ${styles.headerImage}`}
              height={144}
              width={144}
              alt=""
              style={{border: '5px solid #555'}}
              onLoad={(e)=>{  }}
            />
            </Link>
              {router.pathname !== '/'?'':(<h1 id="blogName" className={`${utilStyles.heading2Xl} ${styles.blogName}`} style={{color: 'orange'}}
             >{name+' Diary'}</h1>)}
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
                style={{border: '3px solid #555'}}
              />
            </Link>
            <h2 className={utilStyles.headingLg} style={{color: 'orange'}}>
              {/* <Link href="/" className={utilStyles.colorInherit}>
                {name}
                </Link> */}
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {router.pathname !== '/' && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}