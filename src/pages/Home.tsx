import { useQuery } from "@apollo/client";
import Post from "../components/feed/Post";
import PageTitle from "../components/PageTitle";
import FEED_QUERY from "../documents/queries/seeFeed.query";
import { AnimatePresence } from "framer-motion";
import { useMatch, PathMatch } from "react-router-dom";
import UploadPost from "./UploadPost";
import { useCallback, useEffect } from "react";

const Home = () => {
  const uploadPostPathMath: PathMatch<string> | null =
    useMatch("/posts/upload");
  const { data, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });

  //pagination posts
  const handleScroll = useCallback(async (): Promise<void> => {
    const scrollTop: number = document.documentElement.scrollTop;
    const innerHeight: number = window.innerHeight;
    const scrollHeight: number = document.body.scrollHeight;
    if (scrollTop + innerHeight >= scrollHeight) {
      await fetchMore({ variables: { offset: data?.seeFeed?.length } });
    }
  }, [data, fetchMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <AnimatePresence>
        {uploadPostPathMath &&
          uploadPostPathMath.pathname === "/posts/upload" && <UploadPost />}
      </AnimatePresence>

      <PageTitle title="Home"></PageTitle>
      {data?.seeFeed?.map((post: any) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};
export default Home;
