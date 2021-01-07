import Head from 'next/head'
import Link from 'next/link' // доступ к элементу 
import Router from 'next/router';
import { useRouter } from 'next/router'; // доступ напрямую к роутеру

import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts' //api-шная функция для получения данных
import Date from '../components/date'; //для представления даты в удобном формате


function ActiveLink({ children, href }) { // example Router-link component
  const router = useRouter()
  const style = {
    marginRight: 10,
    color: router.pathname === href ? 'red' : 'black',
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}


//Порядок выполнения getStaticPaths -> Post
//компоненты которым необходимы данный перед статическим пререндером
//(1)
export async function getStaticProps() { //асинхронная функция выполняющаяся перед рендерингом Home, 
  //получает данные и засовывает их в props, по типу HOC connect
  // используется в компонентах которым необходимы данные перед статическим пререндером страниц
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

//(2)
export default function Home({ allPostsData }) { // в пропсах данные от getStaticProps
  const router = useRouter();
  return (
    <Layout home> {/* Прокидываем переменную home=true через обертку layout. */}
      {/*Layout содержит логику отображения Home или отдельного поста в index.js, а также общую часть для first_post*/}
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>Hello, i am Oleh. I am a frontend developer. You can contact me at email juristaba@gmail.com or by phone 095-016-22-39  </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Router Link</h2>
        <div>
          <a href='#' onClick={(e) => {
            e.preventDefault;
            router.push('/posts/first_post');

          }}>
            Router Link (router.push('/posts/first_post'), a href=#)
          </a>
          <div>
            <button onClick={(e) => {
              e.preventDefault;
              router.push('/posts/first_post');

            }}>
              Router button - useRouter
          </button>
          </div>
          <div>
            <button onClick={(e) => {
              e.preventDefault;
              Router.push('/posts/first_post');

            }}>
              Router button - Router
          </button>
          </div>

          <h2>other links</h2>
          <div>
            <a href='/posts/first_post'>Bad link (reloading)</a>
          </div>
          <div>
            <Link href={'/posts/first_post'}><a>Link from 'next/link' (no reloading)</a></Link>
          </div>
          <div>
            <Link href='/posts/first_post'><a>Link from 'next/link' (no reloading)</a></Link>
          </div>
          <div>
            <Link href="/index">Index page</Link>
          </div>




        </div>
      </section>

    </Layout>
  )
}