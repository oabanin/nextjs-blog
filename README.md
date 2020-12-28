This is a starter template for [Learn Next.js](https://nextjs.org/learn).

---
Архитектура 
- pages (КАТАЛОГ ОБЯЗАТЕЛЕН) - nextJs имеет встроенный роутинг, code splitting и lazy.loading компонентов. чтобы перейти на соседний урл нужно использовать <Link href="/"></link>. страницы раздаются из каталога pages.
index.js - /
_app.js (так должно назіваться) - для подключения общих стилей для сайта ../styles/global.css
- public  (КАТАЛОГ ОБЯЗАТЕЛЕН)  - public - изображения и другие assets, отдаются их єтой папкм
- components - для компонентов (в примере обертка layout)
- styles - css (scss) общие стили для всего сайта (загружаются не как чанки), css модуль utils
- posts - посты в формате Markdown для примера пре-рендера статических страниц с данными
- lib/posts.js - api для получения данных постов (в данном случае чтения из каталога)
---

LAYOUT это обертка для index.js и first_page.js, но переменные переданные в этот компонент через props не попадают в _app.js 
Layout содержит логику отображения Home или отдельного поста в index.js, а также общую часть для first_post и home (добавляет для всех обернутых страниц в head мета теги и фавиконки)
- {' '} используется для разделеняи строк

---

CSS

CSS модули 
модули css должны иметь имя *.module.css; .module.scss or .module.sass
 CSS Modules automatically generates unique class names.
перед использование sass нужно доустановить сначала его
npm install sass

Global Styles СCS
To load global CSS files, create a file called pages/_app.js with the following content:
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

In Next.js, you can add global CSS files by importing them from pages/_app.js. You cannot import global CSS anywhere else.
Т.к. инлайн стили на странице имеют самый высокий приоритет, то они будут перебивать стили в global.css

по умолчанию используется postcss
To customize PostCSS config, you can create a top-level file called postcss.config.js. 
рекомендуется использовать postcss-preset-env и postcss-flexbugs-fixes чтобы добиться поведения по умолчанию
но их все равно необходимо установить  postcss-preset-env  и postcss-flexbugs-fixes
 npm install tailwindcss postcss-preset-env postcss-flexbugs-fixes

<style jsx>{`
        .container {
          min-height: 100vh;
 	  ...
        }
`}</style>

----

PRERENDER

By default, Next.js pre-renders every page
Two Forms of Pre-rendering
- Static Generation
- Server-side Rendering 
You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

getStaticProps используется для пререндеринга статистических html с данными
getStaticProps runs at build time in production, and Inside the function, you can fetch external data and send it as props to the page.
getStaticProps напоминает HOC connect



