import { useRouter } from 'next/router';
import Link from 'next/link';

//(2) Компонент получает из getInitialProps пропсы (данные апи). это фронтенд
const Post = ({ posts }) => {
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
Post.getInitialProps = async (ctx) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const json = await res.json();
    return { posts: json }
}


export default Post;