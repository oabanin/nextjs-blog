This is a starter template for [Learn Next.js](https://nextjs.org/learn).

---
## Архитектура 


- pages (КАТАЛОГ ОБЯЗАТЕЛЕН) - nextJs имеет встроенный роутинг, code splitting и lazy.loading компонентов. чтобы перейти на соседний урл нужно использовать <Link href="/"></link>. страницы раздаются из каталога pages.

|-- /pages/index.js - домашняяя страница

|-- /pages/_app.js - the App component to initialize pages - для подключения общих стилей для сайта ../styles/global.css

|-- /pages/404.js

|-- /pages/_document.js  - Custom Document

|-- /pages/любой другой файл

-- /pages/api (каталог)

 |-- /pages/api/hello.js -api

-- /pages/posts (каталог) - необязателен, но удобен, используется в качестве категорий для динамической маршрутизации

 |--- /pages/posts/[id].js - для динамической маршрутизации

|- public  (КАТАЛОГ ОБЯЗАТЕЛЕН)  - public - изображения и другие assets, отдаются их єтой папкм

|- components - для компонентов (в примере обертка layout)

|- styles - css (scss) общие стили для всего сайта (загружаются не как чанки), css модуль utils

|- posts - посты в формате Markdown для примера пре-рендера статических страниц с данными

|- lib/posts.js - api для получения данных постов (в данном случае чтения из каталога)

---

LAYOUT это обертка для index.js и first_page.js, но переменные переданные в этот компонент через props не попадают в _app.js 
Layout содержит логику отображения Home или отдельного поста в index.js, а также общую часть для first_post и home (добавляет для всех обернутых страниц в head мета теги и фавиконки)
layout — статическая часть сайта. Т.е. шаблон во внутрь которого уже что то динамится или меняется.
отличие layout и _document.js - layoutов может быть много, а _document.js  один и применяется ко всему приложению

- {' '} используется для разделеняи строк


_app.js и _document.js никуда подключать не нужно - они сами подключаются

---

## CSS

### CSS модули 
модули css должны иметь имя *.module.css; .module.scss or .module.sass
 CSS Modules automatically generates unique class names.
перед использование sass нужно доустановить сначала его
npm install sass

### Global Styles СCS
To load global CSS files, create a file called pages/_app.js with the following content:
```
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

In Next.js, you can add global CSS files by importing them from pages/_app.js. You cannot import global CSS anywhere else.
Т.к. инлайн стили на странице имеют самый высокий приоритет, то они будут перебивать стили в global.css

по умолчанию используется postcss
To customize PostCSS config, you can create a top-level file called postcss.config.js. 
рекомендуется использовать postcss-preset-env и postcss-flexbugs-fixes чтобы добиться поведения по умолчанию
но их все равно необходимо установить  postcss-preset-env  и postcss-flexbugs-fixes
 npm install tailwindcss postcss-preset-env postcss-flexbugs-fixes

```
<style jsx>{`
        .container {
          min-height: 100vh;
 	  ...
        }
`}</style>
```

---

## DATA FETCHING

### getInitialProps  (Комбинирование SSR и фронтенд)
Если пользоваться по старинке useState && useEffect для асинхронной загрузки данных то пропадает SSR. чтобы был SSR необходимо использовать getInitialProps. getInitialProps это статический метод компонента который выполняется первым, получает необходимые данные и передает дальше в сам компонент.

При первоначальном рендеринге getInitialProps выполняется на сервере, но если сайт уже загружен и мы делаем переход на новую страницу, то данный метод будет вызываться уже на фронтенде и некторых объектов уже не будет. 

Если апи медленный и чтобы пользователю было комфортнее перемешаться, мы проверяем первоначальный ли это запрос (если существует объект req), если нет то значит это переход между страницами, прерываем работу getInitialProps  возвращая пустой объет, и грузим теже данные через фронтенд страндартсными методами (useEffect, useState)

Таким образом если это робот - медленно подтягиваются данные, формируются SSR страницы, если это юзверь который серфит - работу по подгрузке данных с апи выполняет его браузер, а сначала ему показывается макет без данных



```
//(2) Компонент получает из getInitialProps пропсы (данные апи)
const Post = ({ posts }) => <pre>{JSON.stringify(posts, null, 2)}</pre>

//(1) getInitialProps может выполняется как на бэкенде (если сначала грузится это страница), так и на фронтенде (комбинировання функция)
//если на эту страницу выполнен переход - то на фронтенде, и некоторые объекты отпадают)
//api находится на другом сервере, если было бы на нашем правильно делать было бы запрос к БД напрямую
// поэтому нужно проверять перед тем как делать на фронте или бэке какие то операции
Post.getInitialProps = async (ctx) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const json = await res.json()
    return { posts: json } // 
}
```

если нужен только SSR Nextjs рекомендует getServerSideProps (там почти такой же синтаксис)

---

## PRERENDER

By default, Next.js pre-renders every page
#### Two Forms of Pre-rendering
- Static Generation
- Server-side Rendering 
- You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

### getStaticProps 

- getStaticProps используется для пререндеринга ТОЛЬКО СТАТИЧЕСКИХ html с данными и только ВО ВРЕМЯ СБОРКИ, работает на бєкенде
- getStaticProps only runs on the server-side. Поэтому можно сразу делать запрос к БД. нельзя делать запрос к api написанной в posts/api
- getStaticProps может использовать только в файлах страницах (в каталоге pages)
- getStaticProps runs at build time in production, and Inside the function, you can fetch external data and send it as props to the page.
- getStaticProps напоминает HOC connect
- Если вам нужно получить данные во время запроса, а не во время сборки, вы можете попробовать рендеринг на стороне сервера

### getServerSideProps (выполняется только на бэкенде)

- To use Server-side Rendering, you need to export getServerSideProps instead of getStaticProps from your page.
- Вы должны использовать getServerSideProps только в том случае, если вам нужно предварительно отрисовать страницу, данные которой должны быть получены во время запроса
- параметр context содержит параметры запроса.

### Client-side Rendering
- If you do not need to pre-render the data, you can also use the following strategy (called Client-side Rendering):
- Statically generate (pre-render) parts of the page that do not require external data.
- When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.
- This approach works well for user dashboard pages, for example. 

```
useSWR()
import useSWR from 'swr'
function Profile() {
  const { data, error } = useSWR('/api/user', fetch)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

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


---

### API ROUTES (ENDPOINTS)
СОздаются в pages/api/hello.js
```
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' })
}
```

### TYPESCRIPT

По умолчанию TS не установлен
- Создаем tsconfig.json (пустой)
- выполняем npm install --save-dev typescript @types/react @types/node
- в файл tsconfig.json автоматически вносятся изменения
- создается next-env.d.ts в котором прописываются некоторые параметры (не нужно импортировать react в файлы jsx)
- для многих объектов, которые передаются в качестве аргументов в функции nextJS (Типа getInitialProps, request, response) есть свои типы в next -  NextApiRequest, NextApiResponse, NextPageContext итд. если их обозначать то редактор будет подсказывать ключи этих объектов. Но если поле это имя файла в объекте query - нужно создавать собственный интерфейс, наследоваться от встроенного и расширять его, добавляя вручную поля
