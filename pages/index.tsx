import {GetStaticProps} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {client} from "../contentfull/index";
import {IHome, IHomeFields, IArticleFields, IArticle} from "../contentful";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer"
import {Container, Row, Col, Card, CardTitle, CardText, Button} from 'reactstrap'

export default function Home({title, home, articles}: { title: string, home: IHome, articles: IArticle[]}) {
    console.log(home)
    return (
        <div>
            <Head>
                <title>{home.fields.title}</title>
            </Head>

            <main>
                <div className={'text-center p-5 text-white'} style={{background: `url("https:${home.fields.background?.fields.file.url}") no-repeat center / cover`, minHeight: 300}}>
                    <h1 className={'mt-5'}>{home.fields.title}</h1>
                    <p className={'mb-5'}>{documentToReactComponents(home.fields.description!)}</p>
                </div>
                <Container className={'p-5'}>
                    <Row>
                        {articles.map(article => <Col sm={4} key={article.fields.slug}>
                            <Card body>
                                <CardTitle tag={'h5'}>{article.fields.title}</CardTitle>
                                <CardText>{article.fields.description}</CardText>
                                <Link href={`/article/${article.fields.slug}`}>
                                    <Button>{article.fields.buttonText}</Button>
                                </Link>
                            </Card>
                        </Col>)}
                    </Row>
                </Container>
            </main>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const home = await client.getEntries<IHomeFields>({
        content_type: 'home',
        limit: 1
    })

    const articleEntries = await client.getEntries<IArticleFields>({
        content_type: 'article',
        //select: 'fields.title, fields.slug, fields.description, fields.buttonText',
    })

    const [homePage] = home.items
    return {
        props: {
            title: 'Blog',
            home: homePage,
            articles: articleEntries.items,
        }
    }
}
