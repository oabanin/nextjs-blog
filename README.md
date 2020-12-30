This is a starter template for [Learn Next.js](https://nextjs.org/learn).

---
## Архитектура 


\- pages (КАТАЛОГ ОБЯЗАТЕЛЕН) - nextJs имеет встроенный роутинг, code splitting и lazy.loading компонентов. чтобы перейти на соседний урл нужно использовать <Link href="/"></link>. страницы раздаются из каталога pages.
|-- index.js - домашняяя страница
|-- _app.js (так должно назіваться) - для подключения общих стилей для сайта ../styles/global.css
|-- 404.js
|-- любой другой файл
\-- 
\-- posts (каталог) - необязателен, но удобен, используется в качестве категорий для динамической маршрутизации
 --- [id].js - для динамической маршрутизации
|- public  (КАТАЛОГ ОБЯЗАТЕЛЕН)  - public - изображения и другие assets, отдаются их єтой папкм
|- components - для компонентов (в примере обертка layout)
|- styles - css (scss) общие стили для всего сайта (загружаются не как чанки), css модуль utils
|- posts - посты в формате Markdown для примера пре-рендера статических страниц с данными
|- lib/posts.js - api для получения данных постов (в данном случае чтения из каталога)
---

LAYOUT это обертка для index.js и first_page.js, но переменные переданные в этот компонент через props не попадают в _app.js 
Layout содержит логику отображения Home или отдельного поста в index.js, а также общую часть для first_post и home (добавляет для всех обернутых страниц в head мета теги и фавиконки)
- {' '} используется для разделеняи строк

---

##CSS

###CSS модули 
модули css должны иметь имя *.module.css; .module.scss or .module.sass
 CSS Modules automatically generates unique class names.
перед использование sass нужно доустановить сначала его
npm install sass

###Global Styles СCS
To load global CSS files, create a file called pages/_app.js with the following content:
```export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}```

In Next.js, you can add global CSS files by importing them from pages/_app.js. You cannot import global CSS anywhere else.
Т.к. инлайн стили на странице имеют самый высокий приоритет, то они будут перебивать стили в global.css

по умолчанию используется postcss
To customize PostCSS config, you can create a top-level file called postcss.config.js. 
рекомендуется использовать postcss-preset-env и postcss-flexbugs-fixes чтобы добиться поведения по умолчанию
но их все равно необходимо установить  postcss-preset-env  и postcss-flexbugs-fixes
 npm install tailwindcss postcss-preset-env postcss-flexbugs-fixes

```<style jsx>{`
        .container {
          min-height: 100vh;
 	  ...
        }
`}</style>```

---

##PRERENDER

By default, Next.js pre-renders every page
#### Two Forms of Pre-rendering
- Static Generation
- Server-side Rendering 
- You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

###getStaticProps 

- getStaticProps используется для пререндеринга ТОЛЬКО СТАТИЧЕСКИХ html с данными и только ВО ВРЕМЯ СБОРКИ, работает на бєкенде
- getStaticProps only runs on the server-side. Поэтому можно сразу делать запрос к БД. нельзя делать запрос к api написанной в posts/api
- getStaticProps может использовать только в файлах страницах (в каталоге pages)
- getStaticProps runs at build time in production, and Inside the function, you can fetch external data and send it as props to the page.
- getStaticProps напоминает HOC connect
- Если вам нужно получить данные во время запроса, а не во время сборки, вы можете попробовать рендеринг на стороне сервера

###getServerSideProps

- To use Server-side Rendering, you need to export getServerSideProps instead of getStaticProps from your page.
- Вы должны использовать getServerSideProps только в том случае, если вам нужно предварительно отрисовать страницу, данные которой должны быть получены во время запроса
- параметр context содержит параметры запроса.

###Client-side Rendering
- If you do not need to pre-render the data, you can also use the following strategy (called Client-side Rendering):
- Statically generate (pre-render) parts of the page that do not require external data.
- When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.
- This approach works well for user dashboard pages, for example. 

```useSWR()
import useSWR from 'swr'
function Profile() {
  const { data, error } = useSWR('/api/user', fetch)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}```

---

## Динамическая маршрутизация (getStaticPaths -> getStaticProps) 
- Файл должен біть с именем [id].js и находиться в pages/posts (обязательнов в pages но не обязательна подпапка). 
(имя ключа зависит от названия файла)
- pages/posts/[...id].js matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on.
в файле помимо кода компонента нужно єкспортировать также 2 функции со специальными именами:
1. export async function getStaticPaths() - функция должна возвращать массив paths с названиями путей (какие значения может принимать [id])
2. export async function getStaticProps({params}) - в функцию прилетает объект params с ключем id, функция должна возвращать
- getStaticPaths и getStaticProps выполняются на сервере. поэтому можно обращаться нужно напрямую к БД, а не через API в posts/api
- Порядок выполнения: `getStaticPaths -> getStaticProps({params}) -> Post({props});`
- в Post прилетают пропсы (результат выполнения getStaticProps). При этом из getStaticPaths в getStaticProps между собой ничего не передается

#