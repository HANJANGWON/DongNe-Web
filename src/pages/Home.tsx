import { useQuery } from "@apollo/client";
import Post from "../components/feed/Post";
import PageTitle from "../components/PageTitle";
import FEED_QUERY from "../documents/queries/seeFeed.query";

const Home = () => {
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
      <PageTitle title="Home"></PageTitle>
      {data?.seeFeed?.map((post: any) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};
export default Home;
