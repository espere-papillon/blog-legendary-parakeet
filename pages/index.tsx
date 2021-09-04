import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import {client} from "../contentfull";

export default function Home ({title, home}: {title: string, home: any}) {
    console.log(home)
  return (
    <div>
      <Head>
        <title>{home.fields.title}</title>
      </Head>

      <main>
          <h1>{home.fields.title}</h1>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
    const home = await client.getEntries({
        content_type: 'home',
        limit: 1
    })

    const [homePage] = home.items
    return {
        props: {
            title: 'Blog',
            home: homePage,
        }
    }
}
