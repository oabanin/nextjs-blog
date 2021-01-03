import { useRouter } from 'next/router';

const Post = () => {
    const router = useRouter();
    console.log(router);

    return (<>
        <h2>Index catalog (index page)</h2>


    </>)
}

export default Post;