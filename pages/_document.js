import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document { //Наследуемся от документа
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" /> {/*применится для всего приложения */}
                    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main /> {/* наши компоненты - pages, components/layout итд (все между div id="__next")*/}
                    Text between Main and NextScript
                    <NextScript /> {/*Скрипты после div id="__next"*/}
                </body>
            </Html>
        )
    }
}

export default MyDocument