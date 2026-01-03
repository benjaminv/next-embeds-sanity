import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import PageBuilder from 'components/PageBuilder'
import * as demo from 'lib/demo.data'
import type { Page, Settings } from 'lib/sanity.queries'
import Head from 'next/head'
import Error from 'next/error'

export interface PagePageProps {
    preview?: boolean
    loading?: boolean
    page: Page
    settings?: Settings
}

export default function PagePage(props: PagePageProps) {
    const { preview, loading, page, settings } = props
    const { title = demo.title } = settings || {}

    const slug = page?.slug?.current

    if (!slug && !preview) {
        return <Error statusCode={404} />
    }

    return (
        <>
            <Head>
                <title>{page.heading || page.name} | {title}</title>
            </Head>

            <Layout preview={preview} loading={loading}>
                <Container>
                    <BlogHeader title={title} level={2} />
                    {preview && !page ? (
                        <div className="text-center py-20">Loading…</div>
                    ) : (
                        <div className="my-12 lg:my-24">
                            <div className="pb-6 border-b border-gray-100">
                                <div className="max-w-3xl">
                                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                                        {page.heading}
                                    </h1>
                                    {page.subheading && (
                                        <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                                            {page.subheading}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <PageBuilder page={page} />
                        </div>
                    )}
                </Container>
            </Layout>
        </>
    )
}
