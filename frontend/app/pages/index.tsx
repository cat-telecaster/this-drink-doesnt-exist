import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import InputAdornments from '../components/entry-form-components/text-field';
import TypeSelectBox from '../components/entry-form-components/type-selectbox';
import SubmitDeleteButtons from '../components/entry-form-components/buttons';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from "../lib/posts";
import {NextPage} from "next";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    },
  };
}

type AllPostDataType = {
    id: string;
    date: string;
    title: string;
}

type HomeProps = { allPostsData: AllPostDataType[] }

const Home: NextPage<HomeProps> = ({ allPostsData }) => {
  return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
            <h2 className={utilStyles.headingLg}>AIAIAIAAIIAIAIAIIIIIIAAAAAA</h2>
            <div className={utilStyles.entryForm}>
                <InputAdornments/>
                <TypeSelectBox/>
                <SubmitDeleteButtons/>
            </div>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData?.map(({ id, date, title }) => (
                <li className={utilStyles.listItem} key={id}>
                  <Link href={`/posts/${id}`}>
                    <a>{title}</a>
                  </Link>
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={date} />
                  </small>
                </li>
            ))}
          </ul>
        </section>
      </Layout>
  );
}

export default Home
