import { gql, useQuery } from "@apollo/client";
import Post from "../components/feed/Post";
import PageTitle from "../components/PageTitle";

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
      comments {
        id
        user {
          fullName
          avatar
        }
        payload
        isMine
        createdAt
      }
      commentsNumber
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
      <PageTitle title="Home"></PageTitle>
      {data?.seeFeed?.map((post: any) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};
export default Home;
