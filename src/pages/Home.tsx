import { gql, useQuery } from "@apollo/client";
import Post from "../components/feed/Post";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        fullName
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
      isLiked
    }
  }
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      {data?.seeFeed?.map((post: any) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};
export default Home;
