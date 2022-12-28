import { useQuery } from "@apollo/client";
import Post from "../components/feed/Post";
import PageTitle from "../components/PageTitle";
import FEED_QUERY from "../documents/queries/seeFeed.query";
import { AnimatePresence } from "framer-motion";
import { useMatch, PathMatch } from "react-router-dom";
import UploadPost from "./UploadPost";

const Home = () => {
  const uploadPostPathMath: PathMatch<string> | null =
    useMatch("/posts/upload");
  const { data, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  fetchMore({
    variables: {
      offset: data?.seeFeed?.length,
    },
  });

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
