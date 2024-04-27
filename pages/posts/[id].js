import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import layoutStyles from '../../components/layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import React, { useState, useEffect } from 'react';



export default function Post({ postData }) {
  
  useEffect(() => {
    if (typeof blogName != 'undefined') {
      blogName.classList.add(layoutStyles['collapsed']);
    }
    if (typeof profileImage != 'undefined') {
      profileImage.classList.add(layoutStyles.headerImage_collapsed);
    }
  });
  

    return (
        <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData?.date || '2024-05-16'} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.body }} />
      </article>
    </>
    );
  }
  
  
  export async function getServerSideProps({ params }) {
    // Fetch data from external API
    const res = await fetch(`https://nextjs-blog-ebec7-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${params.id}.json`);
    const post = await res.json();
    // Pass data to the page via props
    return { props: { postData: post } }
  }


  