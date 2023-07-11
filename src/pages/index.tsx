import Blog from 'components/pages/home/blog/Blog';
import Concept from 'components/pages/home/concept/Concept';
import Contact from 'components/pages/home/contact/Contact';
import MainVisual from 'components/pages/home/mainVisual/MainVisual';
import Work from 'components/pages/home/work/Work';
import Workflow from 'components/pages/home/workflow/Workflow';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>TEAMMATE</title>
        <meta name="description" content="つくる人が楽しいと、 みる人も楽しい TEAMMATE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <MainVisual />
        <Concept />
        <Workflow />
        <Work />
        <Blog />
        <Contact />
      </div>
    </>
  );
}
