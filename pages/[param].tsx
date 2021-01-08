import Head from "next/head";

//(3)
// в эту функцию прилетает postData из getStaticProps
export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>
          {postData.date}
        </div>
       {postData.param}
      </article>
      </>
  )
}


//(1)
export function getStaticPaths() {  
// даем серверу понять какие возможные пути может принимать [id], иначе 404
// эта функция должна вернуть объект с возможными путями
// эта функция выполняется на сервере

  return {
    paths : [
    {
      params: {
        param: 'test1'
      }
    },
    {
      params: {
        param: 'test2'
      }
    }
  ],
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
  //const postData = await getPostData(params.param); // получаем по param данные


  return {props:{postData:{param:"test1",title:"test title",date:"2020-22-01"}}}

//{props:{postData:{param:"test1",title:"test title",date:"2020-22-01"}}}


}