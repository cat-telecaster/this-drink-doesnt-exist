import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import EntryForm from '../components/entry-form';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData, getSortedDrinksData } from "../lib/posts";
import {NextPage} from "next";

export async function getStaticProps() {
  const allPostsData = await getSortedDrinksData();
  return {
    props: {
      allPostsData
    },
  };
}

type AllPostDataType = {
    id: string;
    name: string;
    flavour: string;
    price: number;
    type: string;
    mL: number;
    // date: string;
    // title: string;
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
            <EntryForm/>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData?.map(({ id, name }) => (
                <li className={utilStyles.listItem} key={id}>
                  <Link href={`/posts/${id}`}>
                    <a>{name}</a>
                  </Link>
                  <br />
                  {/*<small className={utilStyles.lightText}>*/}
                  {/*  <Date dateString={date} />*/}
                  {/*</small>*/}
                </li>
            ))}
          </ul>
        </section>
      </Layout>
  );
}

export default Home
