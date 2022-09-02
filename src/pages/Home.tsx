import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import Avatar from "../components/shared/Avatar";
import { FatText } from "../components/shared/shared";

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
    }
  }
`;
const PostContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;
const PostHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const FullName = styled(FatText)`
  margin-left: 15px;
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      {data?.seeFeed?.map((post: any) => (
        <PostContainer key={post.id}>
          <PostHeader>
            <Avatar lg url={post.user.avatar} />
            <FullName>{post.user.fullName}</FullName>
          </PostHeader>
        </PostContainer>
      ))}
    </div>
  );
};
export default Home;
