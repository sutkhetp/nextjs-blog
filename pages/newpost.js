import Script from 'next/script';
import Layout, { siteTitle } from '../components/layout';
import Head from 'next/head';


import { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';


export default function createNewPost() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
        console.log(editorRef.current.getContent());
        }
    };

    const [postTitle, setPostTitle] = useState("");

    async function submitNewPost() {
        const newPost = {
            title: postTitle,
            body: editorRef.current.getContent(),
        };

        let d = new Date();
        d.setTime(d.getTime() + (d.getTimezoneOffset()*-1)*60*1000);
        
        const res = await fetch('https://nextjs-blog-ebec7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', {
            method: 'POST',
            body: JSON.stringify({
                ...newPost,
                date: d.toISOString().split('T')[0],
                time: d.getTime(),
            })
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data?.name);
        }
    }

    return (
        
            <div>
                <h1>new post</h1>
                <>
                    <label>Title </label>
                    <input id="title" type="text" 
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                    />
                </>
                <br/>
                <Editor
                    tinymceScriptSrc='/js/tinymce/tinymce.min.js'
                    onInit={(_evt, editor) => editorRef.current = editor}
                    initialValue='<p>This is the initial content of the editor.</p>'
                    init={{
                        plugins: ['image'],
                    }}
                />
                <button onClick={log}>Log editor content</button>
                <button onClick={submitNewPost}>submit</button>
            </div>
        
        
    );
}