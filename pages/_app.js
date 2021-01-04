import '../styles/global.css'

export default function App(props) {
  const { Component, pageProps } = props;
  return (<>
    <Component {...pageProps} />
    <style jsx>{`
      body {
        font-family: sans-serif;
      }
    `}</style> {/* так подключать стили шрифторв, которые были подключены через link rel в _document.js*/}
  </>)
}

// <Component> с помощью пропсов меняет текущую страницу которая находится в pages
// <Component> это и есть страница в pages