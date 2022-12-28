import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useParams, useMatch, PathMatch } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import Button from "../components/shared/Button";
import { FatText } from "../components/shared/shared";
import FOLLOW_USER_MUTATION from "../documents/mutations/followUser.mutation";
import UNFOLLOW_USER_MUTATION from "../documents/mutations/unfollowUser.mutation";
import SEE_PROFILE_QUERY from "../documents/queries/seeProfile.query";
import useUser from "../hooks/useUser";
import UploadPost from "./UploadPost";
import ProfilePost from "./ProfilePost";

type ProfileParams = {
  username: string;
};

interface PostProps {
  bg: string;
}

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
  font-size: 15px;
  display: felx;
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

const ProfileBtn = styled(Button).attrs({
  as: "div",
})`
  margin-left: 20px;
  margin-top: 0px;
  width: 50%;
`;

const Profile = () => {
  const uploadPostPathMath: PathMatch<"username"> | null = useMatch(
    `/users/:username/posts/upload`
  );
  const postProfilePathMath: PathMatch<"postId"> | null = useMatch(
    `/users/:username/post/:postId`
  );
  const { username } = useParams<ProfileParams>();
  const { data: userData } = useUser();
  const client = useApolloClient();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });
  const unfollowUserUpdate = (cache: any, result: any) => {
    const {
      data: {
        unfollowUser: { ok },
      },
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev: boolean) {
          return false;
        },
        totalFollowers(prev: number) {
          return prev - 1;
        },
      },
    });
    const { me } = userData;
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev: number) {
          return prev - 1;
        },
      },
    });
  };
  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    update: unfollowUserUpdate,
  });
  const followUserCompleted = (data: any) => {
    const {
      followUser: { ok },
    } = data;
    if (!ok) {
      return;
    }
    const { cache } = client;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev: boolean) {
          return true;
        },
        totalFollowers(prev: number) {
          return prev + 1;
        },
      },
    });
    const { me } = userData;
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev: number) {
          return prev + 1;
        },
      },
    });
  };
  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    onCompleted: followUserCompleted,
  });
  const getButton = (seeProfile: any) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return (
        <ProfileBtn>
          <Link to={`/users/${userData?.me?.username}/edit`}>프로필 수정</Link>
        </ProfileBtn>
      );
    }
    if (isFollowing) {
      return <ProfileBtn onClick={() => unfollowUser()}>Unfollow</ProfileBtn>;
    } else {
      return <ProfileBtn onClick={() => followUser()}>Follow</ProfileBtn>;
    }
  };
  return (
    <div>
      <AnimatePresence>{uploadPostPathMath && <UploadPost />}</AnimatePresence>
      <AnimatePresence>
        {postProfilePathMath && <ProfilePost />}
      </AnimatePresence>
      <PageTitle
        title={loading ? "로딩중..." : `${data?.seeProfile?.username}의 프로필`}
      />
      <Header>
        <Avatar src={data?.seeProfile?.avatar} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile ? getButton(data.seeProfile) : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> 팔로워
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> 팔로잉
                </span>
              </Item>
            </List>
          </Row>

          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.posts.map((post: any) => (
          <Link key={post.id} to={`post/${post.id}`}>
            <Post key={post.id} bg={post.file}>
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
          </Link>
        ))}
      </Grid>
    </div>
  );
};

export default Profile;
