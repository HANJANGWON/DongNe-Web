import { gql, useQuery } from "@apollo/client";
import Post from "../components/feed/Post";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, POST_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PostFragment
      user {
        username
        fullName
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${POST_FRAGMENT}
  ${COMMENT_FRAGMENT}
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
