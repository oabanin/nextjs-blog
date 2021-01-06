import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { Layout } from '../../components/layout2';

//(2) Компонент получает из getInitialProps пропсы (данные апи). это фронтенд
const Post = ({ post: serverPost }) => {
    const router = useRouter();

    const [post, setPost] = useState(serverPost); // по умолчанию присваиваем прилетевшие посты в стейт
    useEffect(() => {

        async function load() {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${router.query.test}`)
            const json = await res.json()
            setPost(json);
        }
        if (!serverPost) load(); // если с сервера прилетел post null запуска на фронте

    }, [])

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



    // if (!post) return "<>Loading</>"
    return (<>
        <Layout>
            <h2>Router.query: {router.query.test}</h2>
        </Layout>
        userId: {post && post.userId}<br />
        id: {post && post.id}<br />
        title: {post && post.title}<br />
        body: {post && post.body}<br />

        {/* <pre> {JSON.stringify(posts, null, 2)}</pre> */}



        <Link href={"/cat"}>
            <a>Posts list</a>
        </Link>


    </>)
}


//(1) getInitialProps  выполняется на бэкенде (если сначала грузится это страница),
//если на эту страницу выполнен переход - то на фронтенде, и некоторые объекты отпадают)
//api находится на другом сервере, если было бы на нашем правильно делать было бы запрос к БД напрямую
Post.getInitialProps = async (context) => {
    // если нет объекта request 
    // то значит это был переход между страницами, а значит возвращаем null и подтягиваем данные через фронтенд
    // делается это чтобы уменьшить задержку getInitialProps если api долго отвечает, 
    // отрисовать часть интерфейса и потом по стандарту его подгрузить
    if (!context.req) return {
        post: null
    }
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.query.test}`)
    const json = await res.json()
    return { post: json }
}


export default Post;