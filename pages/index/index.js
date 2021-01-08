import { useRouter } from 'next/router';
import Link from 'next/link';

const Post = ({ title }) => {
    const router = useRouter();
    console.log(router);

    return (<>
        <h2>{title}</h2>
        <Link href="/">Index page</Link>

    </>)
}

export default Post;

Post.getInitialProps = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const json = await data.json();
    await new Promise(resolve => { // искусственная задержка
        setTimeout(resolve, 3300)
    })


    return {
        title: json.title
    }
}