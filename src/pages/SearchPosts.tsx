import { useQuery } from "@apollo/client";
import { AnimatePresence } from "framer-motion";
import { PathMatch, useMatch, useParams } from "react-router-dom";
import Post from "../components/feed/Post";
import PageTitle from "../components/PageTitle";
import SEARCH_POSTS from "../documents/queries/searchPosts.query";
import UploadPost from "./UploadPost";

const SearchPosts = () => {
  const uploadPostPathMath: PathMatch<"keyword"> | null = useMatch(
    `/search/:keyword/posts/upload`
  );

  const { keyword } = useParams();
  const { data } = useQuery(SEARCH_POSTS, {
    variables: {
      keyword,
    },
  });

  return (
    <div>
      <AnimatePresence>{uploadPostPathMath && <UploadPost />}</AnimatePresence>
      <PageTitle title="Search"></PageTitle>
      {data?.searchPosts[0] ? (
        data?.searchPosts?.map((post: any) => <Post key={post.id} {...post} />)
      ) : (
        <div>"{keyword}" 검색 결과 없음</div>
      )}
    </div>
  );
};
export default SearchPosts;
