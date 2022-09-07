import { gql, useQuery } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../components/shared/shared";
import { POST_FRAGMENT } from "../fragments";

type ProfileParams = {
  username: string;
};

interface PostProps {
  bg: string;
}

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      username
      fullName
      bio
      avatar
      posts {
        ...PostFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
      isManager
    }
  }
  ${POST_FRAGMENT}
`;
const Header = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  margin-left: 50px;
  height: 230px;
  width: 230px;
  border-radius: 50%;
  background-color: #2c2c2c;
`;

const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Post = styled.div`
  background-image: url(${(props: PostProps) => props.bg});
  width: 200px;
  height: 200px;
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const Column = styled.div`
  margin: 50px 0px 50px 130px;
`;

const Profile = () => {
  const { username } = useParams<ProfileParams>();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  return (
    <div>
      <Header>
        <Avatar src={data?.seeProfile?.avatar} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>

          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.posts.map((post: any) => (
          <Post bg={post.file}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {post.likes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {post.commentsNumber}
              </Icon>
            </Icons>
          </Post>
        ))}
      </Grid>
    </div>
  );
};

export default Profile;
