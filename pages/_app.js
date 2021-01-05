import '../styles/global.css'

export default function App(props) {
  const { Component, pageProps } = props;
  return (<>
    <Component {...pageProps} />
    {/* <style jsx global>{`
      body {
        font-family: 'Roboto';
      }
    `}</style> так подключать стили шрифторв, которые были подключены через link rel в _document.js. global обязательно. или через отдельный файл */}
  </>)
}

// <Component> с помощью пропсов меняет текущую страницу которая находится в pages
// <Component> это и есть страница в pages