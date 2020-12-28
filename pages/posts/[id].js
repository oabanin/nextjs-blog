import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts'; 
/*импортируем функцию которая возвращает массив с возможными значениями динамического параметра [id] */
/*импортируем функцию которая получает значение динамического параметра [id] и отрабатывает по нему, возвращая данные */

//Порядок выполнения getStaticPaths -> getStaticProps (param) -> Post

//(3)
export default function Post() {
  return <Layout>...</Layout>
}


//(1)
export async function getStaticPaths() {  // эта функция должна вернуть объект с возможными путями
  const paths = getAllPostIds();  //функция возвращает такой массив
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
export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}