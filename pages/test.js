import useSWR from 'swr';
import Layout, { siteTitle } from '../components/layout';

async function addPost({ title, body }) {
    title = title || "The Turing Machine";
    body = body || "test body";
    const res = await fetch('https://nextjs-blog-ebec7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', {
        method: 'POST',
        body: JSON.stringify({
            title: "The Turing Machine2",
            body: "test body2",
            date: new Date().toISOString().split('T')[0],
        })
    });
    if (!res.ok) {
        console.log('resp not ok status is ', res.status);
    }

    const content = await res.json();
    console.log(content);
}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const repo = await res.json()
    // Pass data to the page via props
    return { props: { repo } }
  }
   
  export default function Page({ repo }) {
    return (
        <Layout>
        <p>{repo.stargazers_count}</p>
        <button onClick={addPost}>add post</button>
        </Layout>
    )
  }