import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { ShowDateTime } from '../../components/date';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({ params }: any) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export async function getStaticPaths() {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export default function Post({ postData }: any) {
    return <Layout>
        <Head>
            <title>{postData.name}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.name}</h1>
            <div className={utilStyles.lightText}>
                <ShowDateTime dateTimeString={postData.createdAt} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: `<p>Flavour: ${postData.flavour}</p><p>Cost: ￥${postData.price}</p><p>Packaging: ${postData.type}</p><p>Size: ${postData.mL} mL</p>` }} />
            <div>
                <img src={"data:image/jpeg;base64, "+postData.imageBase64} />
            </div>
        </article>
    </Layout>
}
