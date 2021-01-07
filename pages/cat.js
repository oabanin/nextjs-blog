import { useRouter } from 'next/router';
import Link from 'next/link';

import { useState, useEffect } from "react";

//(2) Компонент получает из getInitialProps пропсы (данные апи). это фронтенд
const Post = ({ posts: serverPosts }) => {

    const [posts, setPosts] = useState(serverPosts); // по умолчанию ставим стейт такой как прилетел с getInitialProps (null или данные)
    useEffect(() => {
        async function load() {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const json = await response.json();
            setPosts(json);
        }

        if (!serverPosts) load(); // если прилетел null грузим на фронтенде
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
    if (!posts) return "Loading";
    return (
        <>


            {/* <pre> {JSON.stringify(posts, null, 2)}</pre> */}

            <ul>
                {posts.map(post => <li key={post.id}>

                    {/* <Link href={`/useRouter/${post.id}`} > */}
                    {/* чтобы не было перезагрузки страницы при переходе */}
                    <Link href={"/useRouter/[test]"} as={`/useRouter/${post.id}`}>
                        <a>{post.title}</a>
                    </Link>
                </li>)}
            </ul>
        </>)
}


//(1) это выполняется на бэкенде. api находится на другом сервере, если было бы на нашем правильно делать было бы запрос к БД напрямую
// Post.getInitialProps = async (ctx) => {
//     if (!ctx.req) return { posts: null } // возвращаем нулевой объект для загрузкки на фронте
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const json = await res.json();
//     return { posts: json }
// }

//(1) документация рекомендует вместо get initialprops, работает также само, изменяется формат возврата объекьа
// но при этом мы лишаемся возможности уменьшить задержку для пользователя при переходе между ссылками на сайте
export async function getServerSideProps(context) {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const json = await res.json();

    if (!json) {
        return { props: { posts: null } };
    }

    return {
        props: { posts: json }, // will be passed to the page component as props
    }
}


export default Post;