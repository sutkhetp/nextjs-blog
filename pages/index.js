import Head from 'next/head';

import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';
import layoutStyles from '../components/layout.module.css';
import React, { useState, useEffect } from 'react';

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://nextjs-blog-ebec7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json?orderBy="time"');
  let posts = await res.json();
  if (posts) {
    // now posts is like { _xclwlrdswq: { title: 'blabla', body: 'blabla' }, ...}
    posts = Object.keys(posts).map((key) => ({ id: key, ...posts[key] }));
    posts.sort((a, b) => {
      if (a.time>b.time) return -1;
      else if (a.time<b.time) return 1;
      else return 0;
    });
  }
  posts = posts || [];
  // Pass data to the page via props
  return { props: { posts } }
}

export default function Home({ posts }) {

  useEffect(() => {
    if (typeof blogName != 'undefined') {
      blogName.classList.remove(layoutStyles['collapsed']);
    }
    if (typeof profileImage != 'undefined') {
      profileImage.classList.remove(layoutStyles.headerImage_collapsed);
    }
  });

  return (

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h3><Link href={`./newpost`}>+new post</Link></h3>
        <h2 className={utilStyles.headingLg}></h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, title, date}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    
    
  );
}