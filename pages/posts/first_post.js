import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';

export default function hhhh ({aaaa}){  // функция не должна быть анонимой
	return ( 
	<>
	  <Layout>
	  <Head>  
        <title>First Post</title>  {/*Так определяется title*/}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
		<Link href="/">				
	      <a className="foo" rel="noopener noreferrer">
	        Hello World
	      </a>
	    </Link>{/*ссылки на маршруты*/}
	  </Layout>
    </>
    )
}