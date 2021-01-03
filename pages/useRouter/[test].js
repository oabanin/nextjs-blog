import { useRouter } from 'next/router';

const Post = () => {
    const router = useRouter();
    console.log(router);

    return (<>
        <h2>{router.query.test}</h2>
        {/* {JSON.stringify(router, null, 2)} */}

    </>)
}

export default Post;