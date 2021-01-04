import { useRouter } from 'next/router';
import { Layout } from '../../components/layout2';

const Post = () => {
    const router = useRouter();
    console.log(router);

    return (<>
        <Layout>
            <h2>{router.query.test}</h2>
        </Layout>
        {/* {JSON.stringify(router, null, 2)} */}

    </>)
}

export default Post;