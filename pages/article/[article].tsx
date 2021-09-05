import React from 'react';
import {GetStaticProps, GetStaticPaths} from 'next'
import {client} from "../../contentfull/index";
import {IArticle, IArticleFields} from "../../contentful";
import Head from 'next/head'
import {documentToReactComponents} from "@contentful/rich-text-react-renderer"
import {Container, Row, Col, Card, CardTitle, CardText, Button} from 'reactstrap'

export default function Article ({article}: {article: IArticle}) {
    return (
        <>
            <Head>
                <title>{article.fields.title}</title>
            </Head>
            <Container>
                <h1 className={'py-3'}>{article.fields.title}</h1>
                <p className={'py-2'}>{documentToReactComponents(article.fields.content!)}</p>
            </Container>
        </>
    );
};

export const getStaticPath: GetStaticPaths = async () => {
    const articleEntries = await client.getEntries<IArticleFields>({
        content_type: 'article'
    })
    return {
        paths: articleEntries.items.map(item => ({
            params: {article: item.fields.slug}
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const slug = params!.article!;
    const articleEntries = await client.getEntries<IArticleFields>({
        content_type: 'article',
        limit: 1,
        'fields.slug': slug
    })

    const [article] = articleEntries.items
    return {
        props: {
            article,
        }
    }
}