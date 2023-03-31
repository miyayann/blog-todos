import Link from "next/link";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { getAllPostsData } from "../lib/post";

export async function getStaticProps() {
  const filteredPosts = await getAllPostsData();
  return {
    props: {
      filteredPosts,
    },
    revalidate: 3,
  };
}

export default function BlogPage({ filteredPosts }) {
  return (
    <Layout title="Blog Page">
      <ul>
        {filteredPosts && 
          filteredPosts.map((post) => <Post key={post.id} post={post}/>)
        }
      </ul>
      <Link href="/main-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
}
