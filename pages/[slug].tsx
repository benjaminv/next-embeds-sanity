import PagePage from 'components/PagePage'
import { readToken } from 'lib/sanity.api'
import {
    getAllPagesSlugs,
    getClient,
    getPage,
    getSettings,
} from 'lib/sanity.client'
import { Page, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
    page: Page
    settings?: Settings
}

interface Query {
    [key: string]: string
}

export default function PageSlugRoute(props: PageProps) {
    const { settings, page, previewMode } = props

    if (!page?._id) {
        return (
            <div className="py-40 container">
                <h1 className="text-4xl font-bold">Page not found</h1>
                <p className="mt-2 text-gray-500">This page does not exist yet.</p>
            </div>
        )
    }

    return <PagePage page={page} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
    const { preview: previewMode = false, previewData, params = {} } = ctx
    const client = getClient(
        previewMode ? { token: readToken, perspective: previewData } : undefined,
    )

    const [settings, page] = await Promise.all([
        getSettings(client),
        getPage(client, params.slug),
    ])

    if (!page) {
        return { notFound: true }
    }

    return {
        props: {
            page,
            settings,
            previewMode,
            previewPerspective: typeof previewData === 'string' ? previewData : null,
            token: previewMode ? readToken : '',
        },
    }
}

export const getStaticPaths = async () => {
    const slugs = await getAllPagesSlugs()

    return {
        paths: slugs?.map((slug) => `/${slug}`) || [],
        fallback: 'blocking',
    }
}
