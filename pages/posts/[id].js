import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts'; 
/*импортируем функцию которая возвращает массив с возможными значениями динамического параметра [id] */
/*импортируем функцию которая получает значение динамического параметра [id] и отрабатывает по нему, возвращая данные */

//Порядок выполнения getStaticPaths -> getStaticProps ({params}) -> Post

//(3)
// в эту функцию прилетает postData из getStaticProps
export default function Post(props) {
	const { postData } = props;
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  )
}


//(1)
export async function getStaticPaths() {  
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
    fallback: false
  }
}

//(2)
export async function getStaticProps(props) {
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
  const postData = getPostData(params.id); // получаем по id данные

  return {
    props: { // возвращаем объект следующего вида с полученными данными для использования в компоненте
      postData
    }
  }

//{props:{postData:{id:"pre-rendering",title:"Two Forms of Pre-rendering",date:"2020-01-01"}}}


}