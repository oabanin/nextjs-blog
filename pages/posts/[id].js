import Head from 'next/head'

import Layout from '../../components/layout';
import Date from '../../components/date.js'
import { getAllPostIds, getPostData } from '../../lib/posts';

import utilStyles from '../../styles/utils.module.css'
/*импортируем функцию которая возвращает массив с возможными значениями динамического параметра [id] */
/*импортируем функцию которая получает значение динамического параметра [id] и отрабатывает по нему, возвращая данные */


//динамические маршруты
//Порядок выполнения getStaticPaths -> getStaticProps ({params}) -> Post

//(3)
// в эту функцию прилетает postData из getStaticProps
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}


//(1)
export function getStaticPaths() {
  // даем серверу понять какие возможные пути может принимать [id], иначе 404
  // эта функция должна вернуть объект с возможными путями
  // эта функция выполняется на сервере
  // 
  const paths = getAllPostIds();
  //функция возвращает массив следующего вида
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

  // Return a list of possible value for id
  return {
    paths, //запихиваем массив в объект с ключем paths
    fallback: false // если false, то при отсутствии такого пути выдает 404, еще есть blocking и true
  }
}

//(2)
export async function getStaticProps(props) {
  // обрабатываем полученный id
  // эта функция выполняется на сервере
  // в props прилетает объект следующего вида, нам нужен только params
  /*
  {
    params: { id: 'pre-rendering' },
    locales: undefined,
    locale: undefined,
    defaultLocale: undefined
   }*/
  const { params } = props;
  const postData = await getPostData(params.id); // получаем по id данные


  return {
    props: { // возвращаем объект следующего вида с полученными данными для использования в компоненте
      postData
    }
  }

  //{props:{postData:{id:"pre-rendering",title:"Two Forms of Pre-rendering",date:"2020-01-01"}}}


}