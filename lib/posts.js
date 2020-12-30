import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'; //Parse front-matter from a string or file.parse the metadata in each markdown file.

import remark from 'remark';     //To render markdown content, we’ll use the remark library.
import html from 'remark-html' ; //To render markdown content, we’ll use the remark library.

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {  // функция возвращает заголовки постов для index.js
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {

  //функция для компонента (page) с динамическими маршрутами. возвращает все маршруты (возможные url)
  const fileNames = fs.readdirSync(postsDirectory)
  //
  // возвращает массив с возможными значениями. ответ данной функции выглядит вот таким образом
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}


export async function getPostData(id) {
  //функция для компонента (page) с динамическими маршрутами. возвращает данніе по одному маршруту ( url)
  //по предоставленному id получаем текст, тайтл и другие данные о посте
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)
  

  // Use remark to convert markdown into HTML string

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id

  const retObj = {
    id,
    contentHtml,
    ...matterResult.data //тут нет контента
  };

  //console.log(retObj);
  // возвращаем объект типа 
/*  {
    id: 'pre-rendering',
    title: 'Two Forms of Pre-rendering',
    date: '2020-01-01',
    contentHtml: "<p>....."
  }
    
  }*/
  return retObj;
}