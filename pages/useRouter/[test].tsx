import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { Layout } from '../../components/layout2';
import { NextPageContext } from 'next';
import { Cat } from '../../interfaces/cat';


interface PostPageProps {
    post: Cat
}

//(2) Компонент получает из getInitialProps пропсы (данные апи). это фронтенд
const Post = ({ post: serverPost }: PostPageProps) => {
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


//(1) getInitialProps может выполняется как на бэкенде (если сначала грузится это страница), так и на фронтенде
//если на эту страницу выполнен переход - то на фронтенде, и некоторые объекты отпадают)
//api находится на другом сервере, если было бы на нашем правильно делать было бы запрос к БД напрямую
// Post.getInitialProps = async (context) => {
//     // если нет объекта request 
//     // то значит это был переход между страницами, а значит возвращаем null и подтягиваем данные через фронтенд
//     // делается это чтобы уменьшить задержку getInitialProps если api долго отвечает, 
//     // отрисовать часть интерфейса и потом по стандарту его подгрузить
//     if (!context.req) return {
//         post: null
//     }
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.query.test}`)
//     const json = await res.json()
//     return { post: json }
// }


interface TestPageNextContext extends NextPageContext { // наследуемся от NextPageContext
    //создаем интерфейс с указанием параметра - имени файла
    query: {
        test: string // название файла - параметр
    }
}


// (1) документация рекомендует getServerSideProps вместо getInitialProps (более современные методы)
// данная функция вызывается исключительно на серверной части
// поэтому можно делать запросы напрямую к Базе данный не боясь что будет выполняться на клиенте
// документация рекомендует вместо get initialprops, работает также само, изменяется формат возврата объекьа
// но при этом мы лишаемся возможности уменьшить задержку для пользователя при переходе между ссылками на сайте
export async function getServerSideProps(context: TestPageNextContext) {
    // if (!context.req) return {  // эта проверка уже не нужна тк. вызывается только на сервере
    //     post: null
    // }


    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.query.test}`)
    const json: Cat = await res.json()


    return {
        props: { post: json }, // will be passed to the page component as props
    }
}


export default Post;