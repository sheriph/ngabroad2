import React from "react";
import ArticleComponent from "../../component/articlecomponent";
import { useRouter } from "next/router";

import { SleekTheme } from "../../component/themes";
import { getAllPosts, getAllPostsSlugs, getAllTitles } from "../../lib/api";

export default function ({ paginate, count, allTitles }) {
  const router = useRouter();
  const { pid } = router.query;
  //  console.log("paginate", paginate)

  return (
    <SleekTheme
      subtitle="by category"
      title="Collection of interesting articles"
      jsx={
        <ArticleComponent
          posts={paginate}
          count={count}
          allTitles={allTitles}
          isAmp={false}
        />
      }
      pageTitle="Articles"
      page={true}
      isAmp={undefined}
    />
  );
}

/* export async function getStaticProps({ params }) {
  console.log("params", params);
  const post = "hello post";
  // const post = await getSinglePost(params.pid);
  return { props: { post } };
} */

export async function getStaticPaths() {
  let after = "null";
  let allNodes = [];
  for (let i = 0; i < 100; i++) {
    const posts = await getAllPostsSlugs(after);
    allNodes = allNodes.concat(posts.nodes);
    after = posts.pageInfo.endCursor;
    if (posts.pageInfo.hasNextPage) {
      continue;
    } else {
      break;
    }
  }

  const linksNumber = Array.from(
    Array(Math.ceil(allNodes.length / 50)).keys()
  ).map((item) => item + 1);

  const paths = linksNumber.map((linkNumber, index) => {
    return { params: { pid: `${linkNumber}` } };
  });

  console.log("paths", paths);

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  try {
    const { pid } = params;
    const start = Number(pid) * 50 - 50;
    const end = Number(pid) * 50;
    let after = "null";
    let allNodes = [];
    for (let i = 0; i < 100; i++) {
      const posts = await getAllTitles(after);
      allNodes = allNodes.concat(posts.nodes);
      after = posts.pageInfo.endCursor;
      if (posts.pageInfo.hasNextPage) {
        continue;
      } else {
        break;
      }
    }
    const allTitles = allNodes.map((item) => ({
      title: item.title,
      slug: item.slug,
    }));
    const totalCount = Math.ceil(allNodes.length / 50);
    console.log("totalCount", totalCount);
    let paginate = allNodes.slice(start, end);
    return {
      props: {
        // posts: paginate,
        count: totalCount,
        // allNodes: allNodes,
        paginate: paginate,
        allTitles: allTitles,
      },
      revalidate: 1,
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
}
