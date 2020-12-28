import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts' //api-шная функция для получения данных

export async function getStaticProps() { //асинхронная функция выполняющаяся перед рендерингом Home, получает данные и засовывает их в props, по типу HOC connect
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({allPostsData}) { // в пропсах данные от getStaticProps
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
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>

    </Layout>
  )
}