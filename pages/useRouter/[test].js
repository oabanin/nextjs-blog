import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { Layout } from '../../components/layout2';

//(2) Компонент получает из getInitialProps пропсы (данные апи). это фронтенд
const Post = ({ post }) => {
    //ЕСЛИ ИСПОЛЬЗОВАТЬ в таком виде пропадает SSR
    // const [posts, setPosts] = useState();
    // useEffect(() => {
    //     async function load() {
    //         const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    //         const json = await response.json();
    //         setPosts(json);
    //     }

    //     load();
    // }, [])
    const router = useRouter();



    return (<>
        <Layout>
            <h2>Router.query: {router.query.test}</h2>
        </Layout>
        userId: {post.userId}<br />
        id: {post.id}<br />
        title: {post.title}<br />
        body: {post.body}<br />

        {/* <pre> {JSON.stringify(posts, null, 2)}</pre> */}



        <Link href={"/cat"}>
            <a>Posts list</a>
        </Link>


    </>)
}


//(1) это выполняется на бэкенде. api находится на другом сервере, если было бы на нашем правильно делать было бы запрос к БД напрямую
Post.getInitialProps = async (context) => {
    console.log(context.query.test);
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.query.test}`)
    const json = await res.json()
    return { post: json }
}


export default Post;