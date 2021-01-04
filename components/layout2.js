import Link from 'next/link' // доступ к элементу 

export function Layout({ children }) {
    return (<>
        <nav>

            <Link href={'/'}><a>Home</a></Link>
            <Link href={'/posts/first_post'}><a>First_post</a></Link>
        </nav>
        <main>
            {children}
        </main>
        <style jsx>{` 
            nav {
                display: flex;
                justify-content: space-around;
                width: 100%;
                position: fixed;
                top:0;
                background-color: blue;
            }`}
        </style> {/*Локализованные стили - в рамках одного компонента */}
    </>)
}