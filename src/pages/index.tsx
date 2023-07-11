import Concept from 'components/pages/home/concept/Concept';
import MainVisual from 'components/pages/home/mainVisual/MainVisual';
import Workflow from 'components/pages/home/workflow/Workflow';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>小幡大貴ポートフォリオ | 小幡大貴</title>
        <meta name="description" content="小幡大貴ポートフォリオ | 小幡大貴" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <MainVisual />
        <Concept />
        <Workflow />
      </div>
    </>
  );
}
