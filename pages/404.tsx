import { Layout } from '../components/layout2';
import classes from '../styles/error.module.css'

export default function Custom404() {

  return (
    <Layout>
      <h1 className={classes.error} >404 - Page Not Found</h1>
    </Layout>
  )
}